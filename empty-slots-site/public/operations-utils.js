(function exposeOperationsUtils(root, factory) {
  const api = factory(root.StaffUtils || (typeof require === "function" ? require("./staff-utils") : null));
  if (typeof module === "object" && module.exports) module.exports = api;
  root.OperationsUtils = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createOperationsUtils(StaffUtils) {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function parseDutyTime(dateText, timeText) {
    const dateMatch = String(dateText || "").match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
    const timeMatch = String(timeText || "").trim().match(/^(?:(\d{1,2})\s+([A-Za-z]{3})\s+)?(\d{1,2}):(\d{2})$/);
    if (!dateMatch || !timeMatch) return null;
    let day = Number(dateMatch[1]);
    let month = MONTHS.findIndex((value) => value.toLowerCase() === dateMatch[2].toLowerCase());
    if (timeMatch[1]) day = Number(timeMatch[1]);
    if (timeMatch[2]) month = MONTHS.findIndex((value) => value.toLowerCase() === timeMatch[2].toLowerCase());
    if (month < 0) return null;
    const value = new Date(Date.UTC(Number(dateMatch[3]), month, day, Number(timeMatch[3]), Number(timeMatch[4])));
    return Number.isNaN(value.getTime()) ? null : value;
  }

  function rowKey(row) {
    return [row.date, row.flight_id || row.flight, row.sla, row.start_utc, row.release_utc].map((value) => String(value || "")).join("|");
  }

  function dutyMinutes(row) {
    const start = parseDutyTime(row.date, row.start_utc);
    const end = parseDutyTime(row.date, row.release_utc);
    return start && end && end > start ? Math.round((end - start) / 60000) : 0;
  }

  function buildPeople(rows, staffDirectory) {
    const people = new Map();
    const add = (label) => {
      const identity = StaffUtils?.parseStaffIdentity(label);
      if (!identity) return null;
      if (!people.has(identity.key)) people.set(identity.key, { ...identity, duties: [] });
      return people.get(identity.key);
    };
    for (const label of staffDirectory || []) add(label);
    for (const row of rows || []) {
      for (const label of row.staff || []) {
        const person = add(label);
        if (person && !person.duties.some((duty) => rowKey(duty) === rowKey(row))) person.duties.push(row);
      }
    }
    return [...people.values()];
  }

  function rankCandidates(duty, rows, staffDirectory, options = {}) {
    const dutyStart = parseDutyTime(duty.date, duty.start_utc);
    const dutyEnd = parseDutyTime(duty.date, duty.release_utc);
    if (!dutyStart || !dutyEnd) return [];
    const maxGapMinutes = Number(options.maxGapMinutes ?? 240);
    const excludedKey = options.excludedKey || "";
    const candidates = [];
    for (const person of buildPeople(rows, staffDirectory)) {
      if (person.key === excludedKey) continue;
      const timed = person.duties.map((row) => ({ row, start: parseDutyTime(row.date, row.start_utc), end: parseDutyTime(row.date, row.release_utc) })).filter((item) => item.start && item.end);
      if (timed.some((item) => item.start < dutyEnd && item.end > dutyStart)) continue;
      const sameDay = timed.filter((item) => item.row.date === duty.date);
      let closest = null;
      for (const item of sameDay) {
        const gap = item.end <= dutyStart ? dutyStart - item.end : item.start >= dutyEnd ? item.start - dutyEnd : Infinity;
        if (!closest || gap < closest.gapMs) closest = { ...item, gapMs: gap, position: item.end <= dutyStart ? "before" : "after" };
      }
      const freeAllDay = sameDay.length === 0;
      const gapMinutes = closest && Number.isFinite(closest.gapMs) ? Math.round(closest.gapMs / 60000) : null;
      if (!freeAllDay && (gapMinutes == null || gapMinutes > maxGapMinutes)) continue;
      const slaExperience = person.duties.filter((row) => row.sla === duty.sla).length;
      const adjacent = gapMinutes != null && gapMinutes <= 30;
      let score = freeAllDay ? 4 : 5;
      if (slaExperience) score += 3;
      if (adjacent) score += 2;
      candidates.push({
        ...person,
        score,
        freeAllDay,
        sameDayDuties: sameDay.map((item) => item.row),
        closestDuty: closest?.row || null,
        closestPosition: closest?.position || "",
        connectionGapMinutes: gapMinutes,
        slaExperience,
        adjacent,
      });
    }
    return candidates.sort((a, b) => b.score - a.score || (a.connectionGapMinutes ?? Infinity) - (b.connectionGapMinutes ?? Infinity) || a.name.localeCompare(b.name));
  }

  function simulateCoverage(duty, candidate, rows, plannedAssignments = [], options = {}) {
    const targetKey = rowKey(duty);
    const candidateLabel = candidate?.label || [candidate?.initials, candidate?.name].filter(Boolean).join(" - ");
    const candidateIdentity = StaffUtils?.parseStaffIdentity(candidateLabel);
    if (!candidateIdentity) return null;

    const assignments = (plannedAssignments || []).filter((item) => item?.rowKey !== targetKey);
    assignments.push({ rowKey: targetKey, candidateKey: candidateIdentity.key, candidateLabel });
    const candidatePlannedKeys = new Set(assignments
      .filter((item) => (item.candidateKey || StaffUtils?.parseStaffIdentity(item.candidateLabel)?.key) === candidateIdentity.key)
      .map((item) => item.rowKey));
    const assignmentsByRow = new Map();
    for (const assignment of assignments) {
      if (!assignment?.rowKey || !assignment?.candidateLabel) continue;
      if (!assignmentsByRow.has(assignment.rowKey)) assignmentsByRow.set(assignment.rowKey, []);
      assignmentsByRow.get(assignment.rowKey).push(assignment);
    }

    let appliedAssignments = 0;
    const simulatedRows = (rows || []).map((row) => {
      const planned = assignmentsByRow.get(rowKey(row)) || [];
      if (!planned.length) return { ...row, staff: [...(row.staff || [])] };
      const staff = [...(row.staff || [])];
      const staffKeys = new Set(staff.map((label) => StaffUtils?.parseStaffIdentity(label)?.key).filter(Boolean));
      let added = 0;
      let remaining = Number(row.missing || 0);
      for (const assignment of planned) {
        const identity = StaffUtils?.parseStaffIdentity(assignment.candidateLabel);
        if (!identity || staffKeys.has(identity.key) || remaining <= 0) continue;
        staff.push(assignment.candidateLabel);
        staffKeys.add(identity.key);
        added += 1;
        remaining -= 1;
      }
      appliedAssignments += added;
      return {
        ...row,
        staff,
        assigned: Number(row.assigned || 0) + added,
        missing: Math.max(0, Number(row.missing || 0) - added),
      };
    });

    const target = simulatedRows.find((row) => rowKey(row) === targetKey);
    const person = buildPeople(simulatedRows, []).find((item) => item.key === candidateIdentity.key);
    const dayDuties = (person?.duties || [])
      .filter((row) => row.date === duty.date)
      .map((row) => ({ row, start: parseDutyTime(row.date, row.start_utc), end: parseDutyTime(row.date, row.release_utc) }))
      .filter((item) => item.start && item.end && item.end > item.start)
      .sort((a, b) => a.start - b.start);
    const conflicts = [];
    for (let left = 0; left < dayDuties.length; left += 1) {
      for (let right = left + 1; right < dayDuties.length; right += 1) {
        if (dayDuties[right].start >= dayDuties[left].end) break;
        if (candidatePlannedKeys.has(rowKey(dayDuties[left].row)) || candidatePlannedKeys.has(rowKey(dayDuties[right].row))) {
          conflicts.push({ first: dayDuties[left].row, second: dayDuties[right].row });
        }
      }
    }
    const shortGapMinutes = Number(options.shortGapMinutes ?? 30);
    const shortGaps = [];
    for (let index = 1; index < dayDuties.length; index += 1) {
      const previous = dayDuties[index - 1];
      const current = dayDuties[index];
      const minutes = Math.round((current.start - previous.end) / 60000);
      if (minutes >= 0 && minutes < shortGapMinutes && (candidatePlannedKeys.has(rowKey(previous.row)) || candidatePlannedKeys.has(rowKey(current.row)))) {
        shortGaps.push({ minutes, first: previous.row, second: current.row });
      }
    }
    const totalMinutes = dayDuties.reduce((sum, item) => sum + Math.round((item.end - item.start) / 60000), 0);
    const spanMinutes = dayDuties.length ? Math.round((dayDuties.at(-1).end - dayDuties[0].start) / 60000) : 0;
    const beforeMissing = (rows || []).reduce((sum, row) => sum + Number(row.missing || 0), 0);
    const afterMissing = simulatedRows.reduce((sum, row) => sum + Number(row.missing || 0), 0);

    return {
      candidate: candidateIdentity,
      target,
      simulatedRows,
      appliedAssignments,
      beforeMissing,
      afterMissing,
      filledPositions: beforeMissing - afterMissing,
      dayDutyCount: dayDuties.length,
      totalMinutes,
      spanMinutes,
      conflicts,
      shortGaps,
      longSpan: spanMinutes > Number(options.longSpanHours ?? 10) * 60,
    };
  }

  function aggregate(rows, keyFn) {
    const map = new Map();
    for (const row of rows) {
      const key = keyFn(row);
      if (!map.has(key)) map.set(key, { key, groups: 0, missing: 0, missingMinutes: 0 });
      const item = map.get(key);
      item.groups += 1;
      item.missing += Number(row.missing || 0);
      item.missingMinutes += Number(row.missing || 0) * dutyMinutes(row);
    }
    return [...map.values()].sort((a, b) => String(a.key).localeCompare(String(b.key)));
  }

  function buildWarnings(rows, staffDirectory) {
    const warnings = [];
    for (const row of rows) {
      if (!parseDutyTime(row.date, row.start_utc) || !parseDutyTime(row.date, row.release_utc)) {
        warnings.push({ type: "Invalid time", severity: "high", text: `${row.date} ${row.flight} ${row.sla} has an unparsed duty time.` });
      }
    }
    for (const person of buildPeople(rows, staffDirectory)) {
      const duties = person.duties.map((row) => ({ row, start: parseDutyTime(row.date, row.start_utc), end: parseDutyTime(row.date, row.release_utc) })).filter((item) => item.start && item.end).sort((a, b) => a.start - b.start);
      for (let index = 1; index < duties.length; index += 1) {
        const previous = duties[index - 1];
        const current = duties[index];
        if (current.start < previous.end) warnings.push({ type: "Overlap", severity: "high", person, text: `${person.name}: ${previous.row.flight} ${previous.row.sla} overlaps ${current.row.flight} ${current.row.sla}.` });
        else if ((current.start - previous.end) / 60000 < 30) warnings.push({ type: "Short gap", severity: "medium", person, text: `${person.name}: ${Math.round((current.start - previous.end) / 60000)} min between ${previous.row.flight} and ${current.row.flight}.` });
      }
      const byDate = new Map();
      for (const duty of duties) {
        if (!byDate.has(duty.row.date)) byDate.set(duty.row.date, []);
        byDate.get(duty.row.date).push(duty);
      }
      for (const [date, dayDuties] of byDate) {
        const spanHours = (dayDuties.at(-1).end - dayDuties[0].start) / 3600000;
        if (spanHours > 10) warnings.push({ type: "Long span", severity: "medium", person, text: `${person.name}: ${spanHours.toFixed(1)} hour span on ${date}.` });
      }
    }
    return warnings;
  }

  function buildWorkload(rows, staffDirectory) {
    return buildPeople(rows, staffDirectory).map((person) => {
      const uniqueDuties = person.duties;
      const minutes = uniqueDuties.reduce((sum, row) => sum + dutyMinutes(row), 0);
      const slas = [...new Set(uniqueDuties.map((row) => row.sla).filter(Boolean))].sort();
      const byDate = new Map();
      for (const row of uniqueDuties) {
        const start = parseDutyTime(row.date, row.start_utc);
        const end = parseDutyTime(row.date, row.release_utc);
        if (!start || !end) continue;
        if (!byDate.has(row.date)) byDate.set(row.date, []);
        byDate.get(row.date).push({ start, end });
      }
      let longestSpanHours = 0;
      for (const duties of byDate.values()) {
        duties.sort((a, b) => a.start - b.start);
        longestSpanHours = Math.max(longestSpanHours, (duties.at(-1).end - duties[0].start) / 3600000);
      }
      return { ...person, dutyCount: uniqueDuties.length, hours: minutes / 60, slas, longestSpanHours };
    }).sort((a, b) => b.hours - a.hours || a.name.localeCompare(b.name));
  }

  const berlinDateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  const berlinPartsCache = new Map();
  function getBerlinCalendarParts(date) {
    const key = Math.floor(date.getTime() / 3600000);
    if (berlinPartsCache.has(key)) return berlinPartsCache.get(key);
    const parts = Object.fromEntries(berlinDateFormatter.formatToParts(date).map((part) => [part.type, part.value]));
    const res = {
      isoDate: `${parts.year}-${parts.month}-${parts.day}`,
      weekday: parts.weekday,
    };
    if (berlinPartsCache.size > 2000) berlinPartsCache.clear();
    berlinPartsCache.set(key, res);
    return res;
  }

  function summarizeDutyHours(rows, windows, holidayDates = []) {
    const holidays = holidayDates instanceof Set ? holidayDates : new Set(holidayDates);
    const totals = {
      dutyCount: 0,
      totalMinutes: 0,
      weekdayMinutes: 0,
      saturdayMinutes: 0,
      sundayMinutes: 0,
      holidayMinutes: 0,
    };
    const seen = new Set();

    for (const row of rows || []) {
      const key = rowKey(row);
      if (seen.has(key)) continue;
      seen.add(key);
      const dutyStart = parseDutyTime(row.date, row.start_utc);
      const dutyEnd = parseDutyTime(row.date, row.release_utc);
      if (!dutyStart || !dutyEnd || dutyEnd <= dutyStart) continue;
      let countedDuty = false;

      for (const window of windows || []) {
        const start = new Date(Math.max(dutyStart.getTime(), new Date(window.start).getTime()));
        const end = new Date(Math.min(dutyEnd.getTime(), new Date(window.end).getTime()));
        if (end <= start) continue;
        countedDuty = true;

        let cursor = start.getTime();
        const endTime = end.getTime();
        while (cursor < endTime) {
          const nextHour = (Math.floor(cursor / 3600000) + 1) * 3600000;
          const next = Math.min(endTime, nextHour);
          const minutes = (next - cursor) / 60000;
          const calendar = getBerlinCalendarParts(new Date(cursor + ((next - cursor) / 2)));
          totals.totalMinutes += minutes;
          if (calendar.weekday === "Sat") totals.saturdayMinutes += minutes;
          else if (calendar.weekday === "Sun") totals.sundayMinutes += minutes;
          else totals.weekdayMinutes += minutes;
          if (holidays.has(calendar.isoDate)) totals.holidayMinutes += minutes;
          cursor = next;
        }
      }
      if (countedDuty) totals.dutyCount += 1;
    }
    return totals;
  }

  function airlineCode(row) {
    const flight = String(row?.flight || "").trim().toUpperCase();
    return (flight.match(/^([A-Z0-9]{2,3})(?=\s*\d)/) || [])[1] || flight.split(/\s+/)[0] || "Other";
  }

  function operationalPeriod(row) {
    const scheduledHour = Number((String(row?.scheduled_utc || "").match(/(\d{1,2}):\d{2}/) || [])[1]);
    const start = parseDutyTime(row?.date, row?.start_utc);
    const hour = Number.isFinite(scheduledHour) ? scheduledHour : start?.getUTCHours();
    if (!Number.isFinite(hour) || hour < 0 || hour > 23) return { key: "unknown", label: "Time unavailable", range: "No scheduled time", order: 4 };
    if (hour < 6) return { key: "early", label: "Early", range: "00:00–05:59", order: 0 };
    if (hour < 12) return { key: "morning", label: "Morning", range: "06:00–11:59", order: 1 };
    if (hour < 18) return { key: "afternoon", label: "Afternoon", range: "12:00–17:59", order: 2 };
    return { key: "evening", label: "Evening", range: "18:00–23:59", order: 3 };
  }

  function buildAirlineRoster(rows, windows, options = {}) {
    const query = String(options.query || "").trim().toLowerCase();
    const selectedSla = String(options.sla || "").trim().toUpperCase();
    return (windows || []).map((window) => {
      const dayRows = (rows || []).filter((row) => {
        const start = parseDutyTime(row.date, row.start_utc);
        const end = parseDutyTime(row.date, row.release_utc);
        if (!start || !end || start >= new Date(window.end) || end <= new Date(window.start)) return false;
        if (selectedSla && String(row.sla || "").toUpperCase() !== selectedSla) return false;
        const searchable = [airlineCode(row), row.flight, row.route, row.aircraft, row.direction, row.sla, row.type, row.movement, ...(row.staff || [])].join(" ").toLowerCase();
        return !query || searchable.includes(query);
      });
      const airlines = new Map();
      for (const row of dayRows) {
        const code = airlineCode(row);
        if (!airlines.has(code)) airlines.set(code, { code, flights: new Map() });
        const flightKey = String(row.flight_id || [row.flight, row.route, row.scheduled_utc].join("|"));
        const airline = airlines.get(code);
        if (!airline.flights.has(flightKey)) {
          airline.flights.set(flightKey, {
            key: flightKey,
            flight: row.flight || "Unknown flight",
            route: row.route || "",
            aircraft: row.aircraft || "",
            direction: row.direction || "",
            scheduled: row.scheduled_utc || "",
            duties: [],
          });
        }
        airline.flights.get(flightKey).duties.push(row);
      }
      const groupedAirlines = [...airlines.values()].map((airline) => {
        const flights = [...airline.flights.values()].map((flight) => {
          flight.duties.sort((a, b) => String(a.start_utc || "").localeCompare(String(b.start_utc || "")) || String(a.sla || "").localeCompare(String(b.sla || "")));
          const staff = [...new Set(flight.duties.flatMap((row) => row.staff || []))].sort();
          return {
            ...flight,
            period: operationalPeriod(flight.duties[0]),
            staff,
            required: flight.duties.reduce((sum, row) => sum + Number(row.required || 0), 0),
            assigned: flight.duties.reduce((sum, row) => sum + Number(row.assigned || 0), 0),
            missing: flight.duties.reduce((sum, row) => sum + Number(row.missing || 0), 0),
          };
        }).sort((a, b) => String(a.scheduled || "").localeCompare(String(b.scheduled || "")) || a.flight.localeCompare(b.flight));
        const periods = new Map();
        for (const flight of flights) {
          if (!periods.has(flight.period.key)) periods.set(flight.period.key, { ...flight.period, flights: [] });
          periods.get(flight.period.key).flights.push(flight);
        }
        const groupedPeriods = [...periods.values()].map((period) => ({
          ...period,
          flightCount: period.flights.length,
          required: period.flights.reduce((sum, flight) => sum + flight.required, 0),
          assigned: period.flights.reduce((sum, flight) => sum + flight.assigned, 0),
          missing: period.flights.reduce((sum, flight) => sum + flight.missing, 0),
        })).sort((a, b) => a.order - b.order);
        return {
          code: airline.code,
          flights,
          periods: groupedPeriods,
          flightCount: flights.length,
          dutyCount: flights.reduce((sum, flight) => sum + flight.duties.length, 0),
          required: flights.reduce((sum, flight) => sum + flight.required, 0),
          assigned: flights.reduce((sum, flight) => sum + flight.assigned, 0),
          missing: flights.reduce((sum, flight) => sum + flight.missing, 0),
        };
      }).sort((a, b) => b.missing - a.missing || a.code.localeCompare(b.code));
      return {
        isoDate: window.isoDate,
        start: new Date(window.start),
        end: new Date(window.end),
        airlines: groupedAirlines,
        flightCount: groupedAirlines.reduce((sum, airline) => sum + airline.flightCount, 0),
        dutyCount: dayRows.length,
        required: dayRows.reduce((sum, row) => sum + Number(row.required || 0), 0),
        assigned: dayRows.reduce((sum, row) => sum + Number(row.assigned || 0), 0),
        missing: dayRows.reduce((sum, row) => sum + Number(row.missing || 0), 0),
      };
    });
  }

  function buildFlightSchedule(rows, windows, options = {}) {
    const query = String(options.query || "").trim().toLowerCase();
    const selectedSla = String(options.sla || "").trim().toUpperCase();
    const coverage = String(options.coverage || "all").toLowerCase();
    const direction = String(options.direction || "all").toLowerCase();
    const airline = String(options.airline || "all").trim().toUpperCase();

    return (windows || []).map((window) => {
      const grouped = new Map();
      for (const row of rows || []) {
        const start = parseDutyTime(row.date, row.start_utc);
        const end = parseDutyTime(row.date, row.release_utc);
        if (!start || !end || start >= new Date(window.end) || end <= new Date(window.start)) continue;
        if (selectedSla && String(row.sla || "").toUpperCase() !== selectedSla) continue;

        if (airline !== "ALL" && airlineCode(row).toUpperCase() !== airline) continue;

        const rowDir = String(row.direction || "").toLowerCase();
        if (direction === "arr" && !rowDir.includes("arr") && !rowDir.includes("in")) continue;
        if (direction === "dep" && !rowDir.includes("dep") && !rowDir.includes("out")) continue;

        const searchable = [row.flight, row.route, row.aircraft, row.direction, row.sla, row.type, row.movement, ...(row.staff || [])].join(" ").toLowerCase();
        if (query && !searchable.includes(query)) continue;
        const key = String(row.flight_id || [row.flight, row.route, row.scheduled_utc].join("|"));
        if (!grouped.has(key)) grouped.set(key, {
          key,
          flight: row.flight || "Unknown flight",
          route: row.route || "",
          aircraft: row.aircraft || "",
          direction: row.direction || "",
          scheduled: row.scheduled_utc || "",
          duties: [],
        });
        grouped.get(key).duties.push(row);
      }
      let flights = [...grouped.values()].map((flight) => {
        flight.duties.sort((a, b) => String(a.start_utc || "").localeCompare(String(b.start_utc || "")) || String(a.sla || "").localeCompare(String(b.sla || "")));
        return {
          ...flight,
          required: flight.duties.reduce((sum, row) => sum + Number(row.required || 0), 0),
          assigned: flight.duties.reduce((sum, row) => sum + Number(row.assigned || 0), 0),
          missing: flight.duties.reduce((sum, row) => sum + Number(row.missing || 0), 0),
        };
      });

      if (coverage === "gaps") flights = flights.filter((flight) => flight.missing > 0);
      else if (coverage === "covered") flights = flights.filter((flight) => flight.missing === 0);

      flights.sort((a, b) => String(a.scheduled || "").localeCompare(String(b.scheduled || "")) || a.flight.localeCompare(b.flight));
      return {
        isoDate: window.isoDate,
        start: new Date(window.start),
        end: new Date(window.end),
        flights,
        flightCount: flights.length,
        dutyCount: flights.reduce((sum, flight) => sum + flight.duties.length, 0),
        required: flights.reduce((sum, flight) => sum + flight.required, 0),
        assigned: flights.reduce((sum, flight) => sum + flight.assigned, 0),
        missing: flights.reduce((sum, flight) => sum + flight.missing, 0),
      };
    });
  }

  function inspectDaySchedule(duties, options = {}) {
    const maxDutyMinutes = Number(options.maxDutyHours ?? 8) * 60;
    const maxSpanMinutes = Number(options.maxSpanHours ?? 10) * 60;
    const bufferMinutes = Number(options.bufferMinutes ?? 30);
    const breakAfterMinutes = Number(options.breakAfterHours ?? 6) * 60;
    const breakMinutes = Number(options.breakMinutes ?? 30);
    const timed = (duties || []).map((row) => ({ row, start: parseDutyTime(row.date, row.start_utc), end: parseDutyTime(row.date, row.release_utc) }))
      .filter((item) => item.start && item.end && item.end > item.start)
      .sort((a, b) => a.start - b.start);
    const totalMinutes = timed.reduce((sum, item) => sum + Math.round((item.end - item.start) / 60000), 0);
    const spanMinutes = timed.length ? Math.round((timed.at(-1).end - timed[0].start) / 60000) : 0;
    let shortestBufferMinutes = null;
    let longestContinuousMinutes = 0;
    let blockStart = timed[0]?.start || null;
    const violations = [];
    for (let index = 1; index < timed.length; index += 1) {
      const gap = Math.round((timed[index].start - timed[index - 1].end) / 60000);
      shortestBufferMinutes = shortestBufferMinutes == null ? gap : Math.min(shortestBufferMinutes, gap);
      if (gap < 0) violations.push("overlap");
      else if (gap < bufferMinutes) violations.push("buffer");
      if (breakMinutes > 0 && gap >= breakMinutes) {
        longestContinuousMinutes = Math.max(longestContinuousMinutes, Math.round((timed[index - 1].end - blockStart) / 60000));
        blockStart = timed[index].start;
      }
    }
    if (timed.length) longestContinuousMinutes = Math.max(longestContinuousMinutes, Math.round((timed.at(-1).end - blockStart) / 60000));
    if (totalMinutes > maxDutyMinutes) violations.push("hours");
    if (spanMinutes > maxSpanMinutes) violations.push("span");
    if (breakMinutes > 0 && timed.length > 1 && longestContinuousMinutes > breakAfterMinutes) violations.push("break");
    return { valid: violations.length === 0, violations: [...new Set(violations)], dutyCount: timed.length, totalMinutes, spanMinutes, shortestBufferMinutes, longestContinuousMinutes };
  }

  function isAvailableForDuty(personKey, row, rules = []) {
    const dutyStart = parseDutyTime(row.date, row.start_utc);
    const dutyEnd = parseDutyTime(row.date, row.release_utc);
    if (!dutyStart || !dutyEnd) return false;
    const isoDate = dutyStart.toISOString().slice(0, 10);
    const weekday = String(dutyStart.getUTCDay());
    const matches = (rules || []).filter((rule) => rule.personKey === personKey
      && isoDate >= rule.startDate && isoDate <= rule.endDate
      && (!rule.dates?.length || rule.dates.includes(isoDate))
      && (!rule.weekdays?.length || rule.weekdays.includes(weekday)));
    if (!matches.length) return true;
    const rule = matches.at(-1);
    if (rule.shift === "unavailable") return false;
    if (rule.shift === "full") return true;
    const ranges = { morning: ["04:00", "12:00"], evening: ["12:00", "23:59"] };
    const [from, to] = ranges[rule.shift] || [rule.from || "00:00", rule.to || "23:59"];
    const windowStart = new Date(`${isoDate}T${from}:00Z`);
    let windowEnd = new Date(`${isoDate}T${to}:00Z`);
    if (windowEnd <= windowStart) windowEnd = new Date(windowEnd.getTime() + 86400000);
    return dutyStart >= windowStart && dutyEnd <= windowEnd;
  }

  function isoWeekKey(date) {
    const day = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(day.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((day - yearStart) / 86400000) + 1) / 7);
    return `${day.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
  }

  function inspectPeriodWorkload(duties, options = {}) {
    const weeks = new Map();
    const months = new Map();
    const seen = new Set();
    for (const row of duties || []) {
      const key = rowKey(row);
      if (seen.has(key)) continue;
      seen.add(key);
      const start = parseDutyTime(row.date, row.start_utc);
      if (!start) continue;
      const minutes = dutyMinutes(row);
      const date = start.toISOString().slice(0, 10);
      const weekKey = isoWeekKey(start);
      const monthKey = date.slice(0, 7);
      if (!weeks.has(weekKey)) weeks.set(weekKey, { key: weekKey, minutes: 0, dates: new Set() });
      weeks.get(weekKey).minutes += minutes;
      weeks.get(weekKey).dates.add(date);
      if (!months.has(monthKey)) months.set(monthKey, { key: monthKey, minutes: 0 });
      months.get(monthKey).minutes += minutes;
    }
    const maxWeeklyMinutes = Number(options.maxWeeklyHours || 0) * 60;
    const maxMonthlyMinutes = Number(options.maxMonthlyHours || 0) * 60;
    const maxDays = Number(options.maxWorkingDaysPerWeek || 7);
    const violations = [];
    if (maxWeeklyMinutes && [...weeks.values()].some((week) => week.minutes > maxWeeklyMinutes)) violations.push("weeklyHours");
    if ([...weeks.values()].some((week) => week.dates.size > maxDays)) violations.push("weeklyDays");
    if (maxMonthlyMinutes && [...months.values()].some((month) => month.minutes > maxMonthlyMinutes)) violations.push("monthlyHours");
    return { valid: violations.length === 0, violations, weeks: [...weeks.values()].map((week) => ({ ...week, dates: [...week.dates] })), months: [...months.values()] };
  }

  function buildAutoPlan(rows, staffDirectory, selectedKeys, windows, options = {}) {
    const selected = new Set(selectedKeys || []);
    const windowList = windows || [];
    const people = buildPeople(rows || [], staffDirectory || []).filter((person) => selected.has(person.key));
    const schedules = new Map(people.map((person) => [person.key, [...person.duties]]));
    const gapRows = (rows || []).filter((row) => {
      if (Number(row.missing || 0) <= 0) return false;
      if (Array.isArray(options.allowedSlas) && !options.allowedSlas.includes(row.sla)) return false;
      const start = parseDutyTime(row.date, row.start_utc);
      const end = parseDutyTime(row.date, row.release_utc);
      return start && end && windowList.some((window) => start < new Date(window.end) && end > new Date(window.start));
    }).sort((a, b) => parseDutyTime(a.date, a.start_utc) - parseDutyTime(b.date, b.start_utc) || Number(b.missing || 0) - Number(a.missing || 0));
    const assignments = [];
    const unfilled = [];
    for (const row of gapRows) {
      const assignedKeys = new Set((row.staff || []).map((label) => StaffUtils?.parseStaffIdentity(label)?.key).filter(Boolean));
      for (let position = 0; position < Number(row.missing || 0); position += 1) {
        const eligible = [];
        for (const person of people) {
          if (assignedKeys.has(person.key)) continue;
          if (!isAvailableForDuty(person.key, row, options.availabilityRules)) continue;
          const sameDay = (schedules.get(person.key) || []).filter((duty) => duty.date === row.date);
          const inspection = inspectDaySchedule([...sameDay, row], options);
          if (!inspection.valid) continue;
          const periodInspection = inspectPeriodWorkload([...(schedules.get(person.key) || []), row], options);
          if (!periodInspection.valid) continue;
          const experience = person.duties.filter((duty) => duty.sla === row.sla).length;
          eligible.push({ person, inspection, score: (experience * 1000) - inspection.totalMinutes - (inspection.dutyCount * 10) });
        }
        eligible.sort((a, b) => b.score - a.score || a.person.name.localeCompare(b.person.name));
        const best = eligible[0];
        if (!best) {
          unfilled.push({ row, position: position + 1 });
          continue;
        }
        schedules.get(best.person.key).push(row);
        assignedKeys.add(best.person.key);
        assignments.push({ row, person: best.person, inspection: best.inspection, position: position + 1 });
      }
    }
    const staffSummaries = people.map((person) => {
      const plannedRows = assignments.filter((item) => item.person.key === person.key).map((item) => item.row);
      const dayDates = [...new Set([...(schedules.get(person.key) || []).map((row) => row.date), ...plannedRows.map((row) => row.date)])];
      const days = dayDates.map((date) => ({ date, ...inspectDaySchedule((schedules.get(person.key) || []).filter((row) => row.date === date), options) }));
      return { person, plannedCount: plannedRows.length, days };
    });
    return { assignments, unfilled, staffSummaries, gapCount: gapRows.length, requestedPositions: gapRows.reduce((sum, row) => sum + Number(row.missing || 0), 0), options };
  }

  function validateAutoAssignments(rows, staffDirectory, assignments, options = {}) {
    const people = new Map(buildPeople(rows || [], staffDirectory || []).map((person) => [person.key, person]));
    const schedules = new Map([...people].map(([key, person]) => [key, [...person.duties]]));
    const violations = [];
    const rowPeople = new Map();
    for (const assignment of assignments || []) {
      if (!assignment?.personKey) continue;
      const person = people.get(assignment.personKey);
      if (!person) {
        violations.push({ assignment, codes: ["staff"] });
        continue;
      }
      if (!isAvailableForDuty(person.key, assignment.row, options.availabilityRules)) {
        violations.push({ assignment, person, codes: ["availability"] });
        continue;
      }
      const key = rowKey(assignment.row);
      if (!rowPeople.has(key)) rowPeople.set(key, new Set((assignment.row.staff || []).map((label) => StaffUtils?.parseStaffIdentity(label)?.key).filter(Boolean)));
      if (rowPeople.get(key).has(person.key)) {
        violations.push({ assignment, person, codes: ["duplicate"] });
        continue;
      }
      rowPeople.get(key).add(person.key);
      schedules.get(person.key).push(assignment.row);
    }
    const summaries = [];
    for (const [personKey, schedule] of schedules) {
      const person = people.get(personKey);
      const dates = [...new Set(schedule.map((row) => row.date))];
      const days = dates.map((date) => ({ date, ...inspectDaySchedule(schedule.filter((row) => row.date === date), options) }));
      for (const day of days.filter((item) => !item.valid)) violations.push({ person, date: day.date, codes: day.violations });
      const period = inspectPeriodWorkload(schedule, options);
      if (!period.valid) violations.push({ person, codes: period.violations });
      summaries.push({ person, days });
    }
    return { valid: violations.length === 0, violations, summaries };
  }

  function buildAnalytics(rows, staffDirectory) {
    const gaps = (rows || []).filter((row) => Number(row.missing || 0) > 0);
    const byHour = aggregate(gaps, (row) => String(row.start_utc || "").match(/(\d{2}):\d{2}$/)?.[1] || "Unknown");
    return {
      gapGroups: gaps.length,
      missingPositions: gaps.reduce((sum, row) => sum + Number(row.missing || 0), 0),
      missingHours: gaps.reduce((sum, row) => sum + Number(row.missing || 0) * dutyMinutes(row) / 60, 0),
      byDate: aggregate(gaps, (row) => row.date || "Unknown"),
      bySla: aggregate(gaps, (row) => row.sla || "Unknown").sort((a, b) => b.missing - a.missing),
      byHour,
      warnings: buildWarnings(rows || [], staffDirectory || []),
      workload: buildWorkload(rows || [], staffDirectory || []),
    };
  }

  function compareSnapshots(current, previous) {
    const enrichGaps = (snapshot) => {
      const rows = new Map((snapshot?.rows || []).map((row) => [rowKey(row), row]));
      return new Map((snapshot?.gaps || []).map((gap) => {
        const source = rows.get(gap.key);
        return [gap.key, { ...gap, staff: gap.staff || source?.staff || [] }];
      }));
    };
    const currentMap = enrichGaps(current);
    const previousMap = enrichGaps(previous);
    const opened = [...currentMap.values()].filter((gap) => !previousMap.has(gap.key));
    const resolved = [...previousMap.values()].filter((gap) => !currentMap.has(gap.key));
    const staffKey = (gap) => [...new Set(gap?.staff || [])].map(String).sort().join("|");
    const changed = [...currentMap.values()].filter((gap) => previousMap.has(gap.key) && (
      gap.missing !== previousMap.get(gap.key).missing
      || gap.required !== previousMap.get(gap.key).required
      || gap.assigned !== previousMap.get(gap.key).assigned
      || staffKey(gap) !== staffKey(previousMap.get(gap.key))
    ));
    return { opened, resolved, changed };
  }

  return { parseDutyTime, rowKey, dutyMinutes, buildPeople, rankCandidates, getDutyGapCandidates: rankCandidates, simulateCoverage, airlineCode, operationalPeriod, buildAirlineRoster, buildFlightSchedule, inspectDaySchedule, inspectPeriodWorkload, isAvailableForDuty, buildAutoPlan, validateAutoAssignments, buildWarnings, buildWorkload, summarizeDutyHours, buildAnalytics, compareSnapshots };
});
