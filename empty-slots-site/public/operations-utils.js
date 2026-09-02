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

  function isSameFlightDuty(a, b) {
    if (!a || !b) return false;
    if (a === b) return true;
    if (rowKey(a) === rowKey(b)) return true;
    const flightA = String(a.flight_id || a.flight || "").trim().toUpperCase();
    const flightB = String(b.flight_id || b.flight || "").trim().toUpperCase();
    const dateA = String(a.date || "").trim();
    const dateB = String(b.date || "").trim();
    return Boolean(flightA && flightB && flightA === flightB && dateA && dateB && dateA === dateB);
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
        const isSameFlight = isSameFlightDuty(previous.row, current.row);
        if (current.start < previous.end && !isSameFlight) warnings.push({ type: "Overlap", severity: "high", person, text: `${person.name}: ${previous.row.flight} ${previous.row.sla} overlaps ${current.row.flight} ${current.row.sla}.` });
        else if ((current.start - previous.end) / 60000 < 30 && !isSameFlight) warnings.push({ type: "Short gap", severity: "medium", person, text: `${person.name}: ${Math.round((current.start - previous.end) / 60000)} min between ${previous.row.flight} and ${current.row.flight}.` });
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

  function getAirlineLogoUrl(codeOrRow, size = 70, dark = false) {
    const code = typeof codeOrRow === "object" && codeOrRow !== null ? airlineCode(codeOrRow) : String(codeOrRow || "").trim().toUpperCase();
    if (!code || code === "OTHER" || code === "ALL") return "";
    const cleanCode = code.replace(/[^A-Z0-9]/g, "");
    if (!cleanCode) return "";
    const px = Number(size) > 35 ? "70px" : "35px";
    const mode = dark ? "dark/" : "";
    return `https://www.gstatic.com/flights/airline_logos/${px}/${mode}${cleanCode}.png`;
  }

  function getAirlineLogoImg(codeOrRow, options = {}) {
    const url = getAirlineLogoUrl(codeOrRow, options.size || 70, options.dark || false);
    if (!url) return "";
    const code = typeof codeOrRow === "object" && codeOrRow !== null ? airlineCode(codeOrRow) : String(codeOrRow || "").trim().toUpperCase();
    const size = Number(options.size || 24);
    const className = options.className || "airline-logo-img";
    const extraStyle = options.style || "";
    return `<img src="${url}" alt="${code}" class="${className}" onerror="this.style.display='none';" loading="lazy" style="width:${size}px; height:${size}px; vertical-align:middle; object-fit:contain; border-radius:4px; ${extraStyle}" />`;
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
    const selectedSlas = Array.isArray(options.sla)
      ? options.sla.map((s) => String(s).trim().toUpperCase()).filter(Boolean)
      : (options.sla ? [String(options.sla).trim().toUpperCase()] : []);
    return (windows || []).map((window) => {
      const dayRows = (rows || []).filter((row) => {
        const start = parseDutyTime(row.date, row.start_utc);
        const end = parseDutyTime(row.date, row.release_utc);
        if (!start || !end || start >= new Date(window.end) || end <= new Date(window.start)) return false;
        if (selectedSlas.length > 0 && !selectedSlas.includes(String(row.sla || "").toUpperCase())) return false;
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
          if (!flight.scheduled && flight.duties[0]?.start_utc) {
            flight.scheduled = flight.duties[0].start_utc;
          }
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
    const selectedSlas = Array.isArray(options.sla)
      ? options.sla.map((s) => String(s).trim().toUpperCase()).filter(Boolean)
      : (options.sla ? [String(options.sla).trim().toUpperCase()] : []);
    const coverage = String(options.coverage || "all").toLowerCase();
    const direction = String(options.direction || "all").toLowerCase();
    const airline = String(options.airline || "all").trim().toUpperCase();

    return (windows || []).map((window) => {
      const grouped = new Map();
      for (const row of rows || []) {
        const start = parseDutyTime(row.date, row.start_utc);
        const end = parseDutyTime(row.date, row.release_utc);
        if (!start || !end || start >= new Date(window.end) || end <= new Date(window.start)) continue;
        if (selectedSlas.length > 0 && !selectedSlas.includes(String(row.sla || "").toUpperCase())) continue;

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
        if (!flight.scheduled && flight.duties[0]?.start_utc) {
          flight.scheduled = flight.duties[0].start_utc;
        }
        return {
          ...flight,
          required: flight.duties.reduce((sum, row) => sum + Number(row.required || 0), 0),
          assigned: flight.duties.reduce((sum, row) => sum + Number(row.assigned || 0), 0),
          missing: flight.duties.reduce((sum, row) => sum + Number(row.missing || 0), 0),
        };
      });

      if (coverage === "gaps") flights = flights.filter((flight) => flight.missing > 0);
      else if (coverage === "covered") flights = flights.filter((flight) => flight.missing === 0);
      else if (coverage === "overlaps") {
        flights = flights.filter((flight) => flight.duties.some((duty) => {
          const staffNames = duty.staff || [];
          if (!staffNames.length) return false;
          return staffNames.some((name) => {
            const staffDuties = (rows || []).filter((r) => (r.staff || []).includes(name));
            return inspectDaySchedule(staffDuties).violations.includes("overlap");
          });
        }));
      }

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

  function getContractHoursLimit(personKey, staffContracts = {}) {
    const type = (staffContracts?.[personKey] || "PT").toUpperCase();
    if (type === "FT") {
      return { contract: "FT", weeklyHours: 40, monthlyHours: 160 };
    }
    return { contract: "PT", weeklyHours: 20, monthlyHours: 80 };
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
      const prev = timed[index - 1];
      const curr = timed[index];
      const isSameFlight = isSameFlightDuty(prev.row, curr.row);
      const gap = Math.round((curr.start - prev.end) / 60000);
      shortestBufferMinutes = shortestBufferMinutes == null ? gap : Math.min(shortestBufferMinutes, gap);
      if (gap < 0 && !isSameFlight) violations.push("overlap");
      else if (gap < bufferMinutes && !isSameFlight) violations.push("buffer");
      if (breakMinutes > 0 && gap >= breakMinutes) {
        longestContinuousMinutes = Math.max(longestContinuousMinutes, Math.round((prev.end - blockStart) / 60000));
        blockStart = curr.start;
      }
    }
    if (timed.length) longestContinuousMinutes = Math.max(longestContinuousMinutes, Math.round((timed.at(-1).end - blockStart) / 60000));
    if (totalMinutes > maxDutyMinutes) violations.push("hours");
    if (spanMinutes > maxSpanMinutes) violations.push("span");
    if (breakAfterMinutes > 0 && (longestContinuousMinutes > breakAfterMinutes || (totalMinutes > breakAfterMinutes && timed.length === 1))) violations.push("break");
    return { valid: violations.length === 0, violations: [...new Set(violations)], dutyCount: timed.length, totalMinutes, spanMinutes, shortestBufferMinutes, longestContinuousMinutes };
  }

  function isAvailableForDuty(personKey, row, rules = []) {
    const pKey = (StaffUtils?.parseStaffIdentity(personKey)?.key || String(personKey || "")).toUpperCase();
    const dutyStart = parseDutyTime(row.date, row.start_utc);
    const dutyEnd = parseDutyTime(row.date, row.release_utc);
    if (!dutyStart || !dutyEnd) return false;
    const isoDate = dutyStart.toISOString().slice(0, 10);
    const weekday = String(dutyStart.getUTCDay());
    const matches = (rules || []).filter((rule) => {
      const rKey = (StaffUtils?.parseStaffIdentity(rule.personKey)?.key || String(rule.personKey || "")).toUpperCase();
      return rKey === pKey
        && (!rule.startDate || isoDate >= rule.startDate)
        && (!rule.endDate || isoDate <= rule.endDate)
        && (!rule.dates?.length || rule.dates.includes(isoDate))
        && (!rule.weekdays?.length || rule.weekdays.includes(weekday));
    });
    if (!matches.length) return true;
    const rule = matches.at(-1);
    if (rule.shift === "unavailable" || rule.shift === "vacation" || rule.shift === "off") return false;
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
    const staffContracts = options.staffContracts || {};
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
      const rowStart = parseDutyTime(row.date, row.start_utc);
      const isSundayDuty = rowStart && rowStart.getUTCDay() === 0;

      for (let position = 0; position < Number(row.missing || 0); position += 1) {
        const eligible = [];
        for (const person of people) {
          if (assignedKeys.has(person.key)) continue;
          if (!isAvailableForDuty(person.key, row, options.availabilityRules)) continue;
          const sameDay = (schedules.get(person.key) || []).filter((duty) => duty.date === row.date);
          const inspection = inspectDaySchedule([...sameDay, row], options);
          if (!inspection.valid) continue;

          // Enforce per-person contract limits (PT: 20h/wk, 80h/mo vs FT: 40h/wk, 160h/mo)
          const contractInfo = getContractHoursLimit(person.key, staffContracts);
          const personOptions = {
            ...options,
            maxWeeklyHours: options.maxWeeklyHours || contractInfo.weeklyHours,
            maxMonthlyHours: options.maxMonthlyHours || contractInfo.monthlyHours,
          };
          const periodInspection = inspectPeriodWorkload([...(schedules.get(person.key) || []), row], personOptions);
          if (!periodInspection.valid) continue;

          const experience = person.duties.filter((duty) => duty.sla === row.sla).length;
          let score = (experience * 1000) - inspection.totalMinutes - (inspection.dutyCount * 10);

          // Morning vs Evening shift comfort: avoid double shifts and mixing morning/evening on the same day
          if (sameDay.length > 0) {
            score -= 2000; // Prefer staff without existing duty on the same day
            const isGapMorning = (row.start_utc || "00:00") < "12:00";
            const isMixedShiftType = sameDay.some((duty) => {
              const isDutyMorning = (duty.start_utc || "00:00") < "12:00";
              return isDutyMorning !== isGapMorning;
            });
            if (isMixedShiftType) {
              score -= 5000; // Heavily penalize mixing morning and evening shifts on the same day
            }
          }

          // Equal Sunday balancing score adjustment: penalize candidates who already have assigned Sunday duties
          if (isSundayDuty) {
            const sundayDutyCount = (schedules.get(person.key) || []).filter((duty) => {
              const dt = parseDutyTime(duty.date, duty.start_utc);
              return dt && dt.getUTCDay() === 0;
            }).length;
            score -= (sundayDutyCount * 10000);
          }

          eligible.push({ person, inspection, score });
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

  function calculateStaffRequirements(rows, staffDirectory, options = {}) {
    const staffContracts = options.staffContracts || {};
    const people = buildPeople(rows || [], staffDirectory || []);
    const totalStaff = people.length;
    let ptCount = 0;
    let ftCount = 0;
    for (const p of people) {
      if ((staffContracts[p.key] || "PT").toUpperCase() === "FT") {
        ftCount += 1;
      } else {
        ptCount += 1;
      }
    }

    const scannedRows = rows || [];
    const totalDutyMinutes = scannedRows.reduce((sum, r) => sum + (dutyMinutes(r) * Number(r.required || r.assigned || 1)), 0);
    const totalDutyHours = totalDutyMinutes / 60;

    let sundayDutyMinutes = 0;
    let sundayShiftCount = 0;
    const sundayDates = new Set();

    for (const r of scannedRows) {
      const start = parseDutyTime(r.date, r.start_utc);
      if (start && start.getUTCDay() === 0) {
        const count = Number(r.required || r.assigned || 1);
        sundayDutyMinutes += dutyMinutes(r) * count;
        sundayShiftCount += count;
        sundayDates.add(r.date);
      }
    }

    const totalSundayHours = sundayDutyMinutes / 60;
    const monthlyStaffCapacityHours = (ptCount * 80) + (ftCount * 160);
    const weeklyStaffCapacityHours = (ptCount * 20) + (ftCount * 40);

    const fteNeeded = totalDutyHours / 160;
    const pteNeeded = totalDutyHours / 80;
    const avgSundayShiftsPerStaff = totalStaff > 0 ? Number((sundayShiftCount / totalStaff).toFixed(1)) : 0;

    return {
      totalStaff,
      ptCount,
      ftCount,
      totalDutyHours: Number(totalDutyHours.toFixed(1)),
      totalSundayHours: Number(totalSundayHours.toFixed(1)),
      sundayShiftCount,
      sundayDaysCount: sundayDates.size,
      monthlyStaffCapacityHours,
      weeklyStaffCapacityHours,
      fteNeeded: Number(fteNeeded.toFixed(2)),
      pteNeeded: Number(pteNeeded.toFixed(2)),
      avgSundayShiftsPerStaff,
      capacityUtilization: monthlyStaffCapacityHours > 0 ? Math.round((totalDutyHours / monthlyStaffCapacityHours) * 100) : 0,
    };
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

  function comparePersonRosters(current, previous, options = {}) {
    const parseStaff = (row) => {
      const labels = Array.isArray(row?.staff) ? row.staff : [];
      return labels.map((l) => StaffUtils?.parseStaffIdentity(l) || { key: String(l).toUpperCase(), name: String(l), initials: "" }).filter(Boolean);
    };

    const getDayKey = (dateStr) => {
      if (!dateStr) return "";
      const parsedDate = parseDutyTime(dateStr, "00:00");
      if (parsedDate && !isNaN(parsedDate.getTime())) {
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return weekdays[parsedDate.getUTCDay()];
      }
      try {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
          const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          return weekdays[d.getUTCDay()];
        }
      } catch (e) {}
      return String(dateStr);
    };

    const rangesOverlap = current?.startDate && previous?.endDate && current.startDate <= previous.endDate && previous.startDate <= current.endDate;
    const matchByDayOfWeek = options.matchByDayOfWeek !== undefined ? options.matchByDayOfWeek : !rangesOverlap;

    const buildDutyMap = (snapshot) => {
      const map = new Map();
      const counts = new Map();
      for (const r of (snapshot?.rows || [])) {
        const timeSegment = matchByDayOfWeek ? getDayKey(r.date) : r.date;
        const groupKey = [timeSegment, r.flight_id || r.flight, r.sla].map((v) => String(v || "")).join("|");
        const idx = (counts.get(groupKey) || 0);
        counts.set(groupKey, idx + 1);
        const key = `${groupKey}|${idx}`;
        map.set(key, r);
      }
      return map;
    };

    const currentRows = buildDutyMap(current);
    const previousRows = buildDutyMap(previous);
    const allKeys = new Set([...currentRows.keys(), ...previousRows.keys()]);

    const staffMap = new Map();
    const registerStaff = (row) => {
      for (const p of parseStaff(row)) {
        if (!staffMap.has(p.key)) staffMap.set(p.key, p);
      }
    };
    for (const r of currentRows.values()) registerStaff(r);
    for (const r of previousRows.values()) registerStaff(r);
    for (const s of [...(current?.staffDirectory || []), ...(previous?.staffDirectory || [])]) {
      const p = StaffUtils?.parseStaffIdentity(s) || { key: String(s).toUpperCase(), name: String(s), initials: "" };
      if (p && !staffMap.has(p.key)) staffMap.set(p.key, p);
    }

    const allStaff = [...staffMap.values()].sort((a, b) => a.name.localeCompare(b.name));
    const entries = [];

    for (const key of allKeys) {
      const curr = currentRows.get(key);
      const prev = previousRows.get(key);
      const ref = curr || prev;

      const prevStaff = prev ? parseStaff(prev) : [];
      const currStaff = curr ? parseStaff(curr) : [];

      const prevKeys = new Set(prevStaff.map((p) => p.key));
      const currKeys = new Set(currStaff.map((p) => p.key));

      const removedStaff = prevStaff.filter((p) => !currKeys.has(p.key));
      const addedStaff = currStaff.filter((p) => !prevKeys.has(p.key));

      const durationMinutes = Number(ref.durationMinutes || dutyMinutes(ref) || 0);

      let kind = "UNCHANGED";
      let detail = "";

      const timingChanged = prev && curr && (prev.start_utc !== curr.start_utc || prev.release_utc !== curr.release_utc);

      if (removedStaff.length > 0 && addedStaff.length > 0) {
        kind = "REPLACED";
        detail = `Replaced: ${removedStaff.map((p) => p.name).join(", ")} → ${addedStaff.map((p) => p.name).join(", ")}`;
      } else if (addedStaff.length > 0 && !prev) {
        kind = "ADDED";
        detail = "New flight duty in current scan";
      } else if (removedStaff.length > 0 && !curr) {
        kind = "REMOVED";
        detail = "Flight duty removed from current scan";
      } else if (addedStaff.length > 0) {
        kind = "ADDED";
        detail = `Assigned to duty (${addedStaff.map((p) => p.name).join(", ")})`;
      } else if (removedStaff.length > 0) {
        kind = "REMOVED";
        detail = `Unassigned from duty (${removedStaff.map((p) => p.name).join(", ")})`;
      } else if (timingChanged) {
        kind = "HOURS_MODIFIED";
        detail = `Timing changed: ${prev.start_utc}–${prev.release_utc} → ${curr.start_utc}–${curr.release_utc}`;
      }

      entries.push({
        key,
        row: ref,
        prevRow: prev || null,
        currRow: curr || null,
        kind,
        detail,
        durationMinutes,
        durationHours: durationMinutes / 60,
        prevStaff,
        currStaff,
        removedStaff,
        addedStaff,
        timingChanged,
      });
    }

    const getStaffAuditSummary = (targetKey = "ALL") => {
      const isAll = targetKey === "ALL" || !targetKey;
      let prevTotalHours = 0;
      let currTotalHours = 0;
      let prevDutyCount = 0;
      let currDutyCount = 0;
      let replacedCount = 0;
      let addedCount = 0;
      let removedCount = 0;
      let modifiedHoursCount = 0;

      const filteredEntries = [];

      for (const entry of entries) {
        const wasInPrev = isAll ? entry.prevStaff.length > 0 : entry.prevStaff.some((p) => p.key === targetKey);
        const wasInCurr = isAll ? entry.currStaff.length > 0 : entry.currStaff.some((p) => p.key === targetKey);

        if (!wasInPrev && !wasInCurr) continue;

        const prevH = wasInPrev ? (entry.prevRow ? (dutyMinutes(entry.prevRow) / 60) : entry.durationHours) : 0;
        const currH = wasInCurr ? (entry.currRow ? (dutyMinutes(entry.currRow) / 60) : entry.durationHours) : 0;

        if (wasInPrev) {
          prevTotalHours += prevH;
          prevDutyCount += 1;
        }
        if (wasInCurr) {
          currTotalHours += currH;
          currDutyCount += 1;
        }

        let personKind = entry.kind;
        let personDetail = entry.detail;

        if (!isAll) {
          const isRemoved = wasInPrev && !wasInCurr;
          const isAdded = !wasInPrev && wasInCurr;
          const isReplacedOut = isRemoved && entry.addedStaff.length > 0;
          const isReplacedIn = isAdded && entry.removedStaff.length > 0;

          if (isReplacedOut) {
            personKind = "REPLACED";
            personDetail = `Replaced by: ${entry.addedStaff.map((p) => `${p.name}${p.initials ? ` [${p.initials}]` : ""}`).join(", ")}`;
            replacedCount += 1;
          } else if (isReplacedIn) {
            personKind = "REPLACED";
            personDetail = `Replaced: ${entry.removedStaff.map((p) => `${p.name}${p.initials ? ` [${p.initials}]` : ""}`).join(", ")}`;
            replacedCount += 1;
          } else if (isAdded) {
            personKind = "ADDED";
            personDetail = "Newly assigned shift";
            addedCount += 1;
          } else if (isRemoved) {
            personKind = "REMOVED";
            personDetail = "Unassigned shift";
            removedCount += 1;
          } else if (entry.timingChanged || prevH !== currH) {
            personKind = "HOURS_MODIFIED";
            personDetail = `Shift duration modified (${prevH.toFixed(1)}h → ${currH.toFixed(1)}h)`;
            modifiedHoursCount += 1;
          } else {
            personKind = "UNCHANGED";
            personDetail = "Duty timing unchanged";
          }
        } else {
          if (entry.kind === "REPLACED") replacedCount += 1;
          else if (entry.kind === "ADDED") addedCount += 1;
          else if (entry.kind === "REMOVED") removedCount += 1;
          else if (entry.kind === "HOURS_MODIFIED") modifiedHoursCount += 1;
        }

        filteredEntries.push({
          ...entry,
          personKind,
          personDetail,
          prevHours: prevH,
          currHours: currH,
          hoursDelta: currH - prevH,
        });
      }

      return {
        targetKey,
        targetPerson: staffMap.get(targetKey) || (isAll ? { key: "ALL", name: "All Staff Members", initials: "ALL" } : null),
        prevTotalHours,
        currTotalHours,
        netHoursDelta: currTotalHours - prevTotalHours,
        prevDutyCount,
        currDutyCount,
        netDutyDelta: currDutyCount - prevDutyCount,
        replacedCount,
        addedCount,
        removedCount,
        modifiedHoursCount,
        entries: filteredEntries,
      };
    };

    return {
      allStaff,
      entries,
      getStaffAuditSummary,
    };
  }

  function autoAdjustRoster(rows, staffDirectory, options = {}) {
    const minBreakMinutes = Number(options.minBreakMinutes ?? options.bufferMinutes ?? 30);
    const conflictType = options.resolveConflictType || "both"; // 'both', 'overlaps_only', 'breaks_only'
    const maxMovements = Number(options.maxAdjustMovements || 0); // 0 = unlimited

    const peopleList = buildPeople(rows || [], staffDirectory || []);
    const peopleMap = new Map(peopleList.map((p) => [p.key, p]));

    const clonedRows = (rows || []).map((row) => ({
      ...row,
      staff: Array.isArray(row.staff) ? [...row.staff] : [],
    }));

    const rowMap = new Map(clonedRows.map((r) => [rowKey(r), r]));

    const getRowPersonKeys = (row) => new Set((row.staff || []).map((s) => StaffUtils?.parseStaffIdentity(s)?.key).filter(Boolean));

    const buildSchedules = () => {
      const sched = new Map(peopleList.map((p) => [p.key, []]));
      for (const row of clonedRows) {
        const pKeys = getRowPersonKeys(row);
        for (const pk of pKeys) {
          if (sched.has(pk)) sched.get(pk).push(row);
        }
      }
      return sched;
    };

    const isViolationForType = (insp) => {
      if (insp.valid) return false;
      const hasOverlap = (insp.violations || []).includes("overlap");
      const hasBreak = (insp.violations || []).includes("buffer") || (insp.violations || []).includes("break");
      if (conflictType === "overlaps_only") return hasOverlap;
      if (conflictType === "breaks_only") return hasBreak && !hasOverlap;
      return hasOverlap || hasBreak;
    };

    const isTargetConflict = (gap) => {
      if (conflictType === "overlaps_only") return gap < 0;
      if (conflictType === "breaks_only") return gap >= 0 && gap < minBreakMinutes;
      return gap < minBreakMinutes;
    };

    let schedules = buildSchedules();
    const reassignments = [];
    let initialViolations = 0;

    for (const [personKey, duties] of schedules.entries()) {
      const dates = [...new Set(duties.map((d) => d.date))];
      for (const date of dates) {
        const dayDuties = duties.filter((d) => d.date === date);
        const insp = inspectDaySchedule(dayDuties, { ...options, bufferMinutes: minBreakMinutes });
        if (isViolationForType(insp)) {
          initialViolations += 1;
        }
      }
    }

    for (let pass = 0; pass < 3; pass += 1) {
      if (maxMovements > 0 && reassignments.length >= maxMovements) break;
      schedules = buildSchedules();
      let changedInPass = false;

      for (const person of peopleList) {
        if (maxMovements > 0 && reassignments.length >= maxMovements) break;
        const duties = schedules.get(person.key) || [];
        if (!duties.length) continue;

        // Pass A: Check for availability or vacation violations (duty assigned on unavailable weekday or during vacation)
        for (const dutyToMove of duties) {
          if (maxMovements > 0 && reassignments.length >= maxMovements) break;
          if (!isAvailableForDuty(person.key, dutyToMove, options.availabilityRules)) {
            const currentStaffLabels = dutyToMove.staff || [];
            const identityToMove = currentStaffLabels.find((s) => StaffUtils?.parseStaffIdentity(s)?.key === person.key);
            if (!identityToMove) continue;

            const candidates = [];
            for (const candidatePerson of peopleList) {
              if (candidatePerson.key === person.key) continue;

              const bAssignedKeys = getRowPersonKeys(dutyToMove);
              if (bAssignedKeys.has(candidatePerson.key)) continue;

              if (Array.isArray(options.allowedSlas) && options.allowedSlas.length && !options.allowedSlas.includes(dutyToMove.sla)) continue;
              if (!isAvailableForDuty(candidatePerson.key, dutyToMove, options.availabilityRules)) continue;

              const bDuties = schedules.get(candidatePerson.key) || [];
              const bSameDay = bDuties.filter((d) => d.date === dutyToMove.date);
              const bInsp = inspectDaySchedule([...bSameDay, dutyToMove], { ...options, bufferMinutes: minBreakMinutes });
              if (!bInsp.valid) continue;

              const contractInfo = getContractHoursLimit(candidatePerson.key, options.staffContracts);
              const candidateOptions = {
                ...options,
                maxWeeklyHours: options.maxWeeklyHours || contractInfo.weeklyHours,
                maxMonthlyHours: options.maxMonthlyHours || contractInfo.monthlyHours,
              };
              const bPeriod = inspectPeriodWorkload([...bDuties, dutyToMove], candidateOptions);
              if (!bPeriod.valid) continue;

              const score = (bInsp.valid ? 1000 : 500) + (bInsp.shortestBufferMinutes || 0);
              candidates.push({ candidatePerson, score, bInsp });
            }

            candidates.sort((a, b) => b.score - a.score || a.candidatePerson.name.localeCompare(b.candidatePerson.name));
            const bestCandidate = candidates[0];

            if (bestCandidate) {
              const targetRowInCloned = rowMap.get(rowKey(dutyToMove));
              if (targetRowInCloned) {
                targetRowInCloned.staff = targetRowInCloned.staff.filter((s) => StaffUtils?.parseStaffIdentity(s)?.key !== person.key);
                const newLabel = `${bestCandidate.candidatePerson.initials || "STF"} - ${bestCandidate.candidatePerson.name}`;
                targetRowInCloned.staff.push(newLabel);
                targetRowInCloned.assigned = targetRowInCloned.staff.length;
                targetRowInCloned.missing = Math.max(0, Number(targetRowInCloned.required || 0) - targetRowInCloned.assigned);

                reassignments.push({
                  rowKey: rowKey(dutyToMove),
                  flight: dutyToMove.flight,
                  sla: dutyToMove.sla,
                  date: dutyToMove.date,
                  start_utc: dutyToMove.start_utc,
                  release_utc: dutyToMove.release_utc,
                  fromPerson: person,
                  toPerson: bestCandidate.candidatePerson,
                  reason: `Resolved availability / vacation conflict on ${dutyToMove.date}`,
                });

                changedInPass = true;
                break;
              }
            }
          }
        }

        if (changedInPass) break;
        if (duties.length < 2) continue;

        const byDate = new Map();
        for (const d of duties) {
          if (!byDate.has(d.date)) byDate.set(d.date, []);
          byDate.get(d.date).push(d);
        }

        for (const [date, dayDuties] of byDate.entries()) {
          if (maxMovements > 0 && reassignments.length >= maxMovements) break;
          const timed = dayDuties.map((d) => ({ row: d, start: parseDutyTime(d.date, d.start_utc), end: parseDutyTime(d.date, d.release_utc) }))
            .filter((item) => item.start && item.end && item.end > item.start)
            .sort((a, b) => a.start - b.start);

          for (let i = 1; i < timed.length; i += 1) {
            if (maxMovements > 0 && reassignments.length >= maxMovements) break;
            const prev = timed[i - 1];
            const curr = timed[i];
            const gap = Math.round((curr.start - prev.end) / 60000);

            const isSameFlight = isSameFlightDuty(prev.row, curr.row);
            if (isTargetConflict(gap) && !isSameFlight) {
              const targetDutiesToMove = [curr.row, prev.row];

              for (const dutyToMove of targetDutiesToMove) {
                const currentStaffLabels = dutyToMove.staff || [];
                const identityToMove = currentStaffLabels.find((s) => StaffUtils?.parseStaffIdentity(s)?.key === person.key);
                if (!identityToMove) continue;

                const candidates = [];
                for (const candidatePerson of peopleList) {
                  if (candidatePerson.key === person.key) continue;

                  const bAssignedKeys = getRowPersonKeys(dutyToMove);
                  if (bAssignedKeys.has(candidatePerson.key)) continue;

                  if (Array.isArray(options.allowedSlas) && options.allowedSlas.length && !options.allowedSlas.includes(dutyToMove.sla)) continue;
                  if (!isAvailableForDuty(candidatePerson.key, dutyToMove, options.availabilityRules)) continue;

                  const bDuties = schedules.get(candidatePerson.key) || [];
                  const bSameDay = bDuties.filter((d) => d.date === dutyToMove.date);
                  const bInsp = inspectDaySchedule([...bSameDay, dutyToMove], { ...options, bufferMinutes: minBreakMinutes });
                  if (!bInsp.valid) continue;

                  const contractInfo = getContractHoursLimit(candidatePerson.key, options.staffContracts);
                  const candidateOptions = {
                    ...options,
                    maxWeeklyHours: options.maxWeeklyHours || contractInfo.weeklyHours,
                    maxMonthlyHours: options.maxMonthlyHours || contractInfo.monthlyHours,
                  };
                  const bPeriod = inspectPeriodWorkload([...bDuties, dutyToMove], candidateOptions);
                  if (!bPeriod.valid) continue;

                  const personRemainingDay = dayDuties.filter((d) => rowKey(d) !== rowKey(dutyToMove));
                  const pInsp = inspectDaySchedule(personRemainingDay, { ...options, bufferMinutes: minBreakMinutes });

                  const score = (pInsp.valid ? 1000 : 500) + (bInsp.shortestBufferMinutes || 0);
                  candidates.push({ candidatePerson, score, bInsp });
                }

                candidates.sort((a, b) => b.score - a.score || a.candidatePerson.name.localeCompare(b.candidatePerson.name));
                const bestCandidate = candidates[0];

                if (bestCandidate) {
                  const targetRowInCloned = rowMap.get(rowKey(dutyToMove));
                  if (targetRowInCloned) {
                    targetRowInCloned.staff = targetRowInCloned.staff.filter((s) => StaffUtils?.parseStaffIdentity(s)?.key !== person.key);
                    const newLabel = `${bestCandidate.candidatePerson.initials || "STF"} - ${bestCandidate.candidatePerson.name}`;
                    targetRowInCloned.staff.push(newLabel);
                    targetRowInCloned.assigned = targetRowInCloned.staff.length;
                    targetRowInCloned.missing = Math.max(0, Number(targetRowInCloned.required || 0) - targetRowInCloned.assigned);

                    reassignments.push({
                      rowKey: rowKey(dutyToMove),
                      flight: dutyToMove.flight,
                      sla: dutyToMove.sla,
                      date: dutyToMove.date,
                      start_utc: dutyToMove.start_utc,
                      release_utc: dutyToMove.release_utc,
                      fromPerson: person,
                      toPerson: bestCandidate.candidatePerson,
                      reason: gap < 0 ? `Resolved overlap (${gap}m)` : `Enforced minimum break (${gap}m < ${minBreakMinutes}m requirement)`,
                    });

                    changedInPass = true;
                    break;
                  }
                }
              }
              if (changedInPass) break;
            }
          }
          if (changedInPass) break;
        }
        if (changedInPass) break;
      }
      if (!changedInPass) break;
    }

    schedules = buildSchedules();
    let remainingViolations = 0;
    for (const [personKey, duties] of schedules.entries()) {
      const dates = [...new Set(duties.map((d) => d.date))];
      for (const date of dates) {
        const dayDuties = duties.filter((d) => d.date === date);
        const insp = inspectDaySchedule(dayDuties, { ...options, bufferMinutes: minBreakMinutes });
        if (isViolationForType(insp)) {
          remainingViolations += 1;
        }
      }
    }

    const resolvedViolations = Math.max(0, initialViolations - remainingViolations);

    return {
      adjustedRows: clonedRows,
      reassignments,
      initialViolationsCount: initialViolations,
      resolvedViolationsCount: resolvedViolations,
      remainingViolationsCount: remainingViolations,
      conflictType,
      minBreakMinutes,
      summary: {
        totalReassignments: reassignments.length,
        initialViolations,
        resolvedViolations,
        remainingViolations,
      },
    };
  }

  function validateShiftSwap(dutyA, staffA, dutyB, staffB, rows = [], staffDirectory = [], options = {}) {
    const resolveStaffInfo = (staffInput) => {
      if (!staffInput) return { key: "", name: "", initials: "" };
      if (typeof staffInput === "object") {
        return {
          key: staffInput.key || (staffInput.name ? staffInput.name.toUpperCase() : ""),
          name: staffInput.name || staffInput.key || "",
          initials: staffInput.initials || staffInput.station || "",
        };
      }
      const parsed = StaffUtils?.parseStaffIdentity(staffInput);
      if (parsed) return parsed;
      const str = String(staffInput).trim();
      return { key: str.toUpperCase(), name: str, initials: str };
    };

    const infoA = resolveStaffInfo(staffA);
    const infoB = resolveStaffInfo(staffB);
    const keyA = infoA.key;
    const keyB = infoB.key;
    const nameA = infoA.name || keyA;
    const nameB = infoB.name || keyB;

    const rowKeyA = dutyA ? rowKey(dutyA) : null;
    const rowKeyB = dutyB ? rowKey(dutyB) : null;
    const isTwoWaySwap = Boolean(dutyB && rowKeyB);

    // Get current duties for both staff
    const dutiesForStaff = (personKey) => {
      return (rows || []).filter((r) => {
        return (r.staff || []).some((s) => (StaffUtils?.parseStaffIdentity(s)?.key || s) === personKey);
      });
    };

    const currentDutiesA = dutiesForStaff(keyA);
    const currentDutiesB = dutiesForStaff(keyB);

    // Simulate new duty list for Staff A
    let nextDutiesA = currentDutiesA.filter((d) => rowKey(d) !== rowKeyA);
    if (isTwoWaySwap && dutyB) {
      nextDutiesA = [...nextDutiesA, dutyB];
    }

    // Simulate new duty list for Staff B
    let nextDutiesB = currentDutiesB.filter((d) => isTwoWaySwap ? rowKey(d) !== rowKeyB : true);
    if (dutyA) {
      nextDutiesB = [...nextDutiesB, dutyA];
    }

    const targetDates = [...new Set([dutyA?.date, dutyB?.date].filter(Boolean))];

    const evaluatePerson = (personKey, personName, dutiesList) => {
      const violations = [];
      let allValid = true;
      let worstInspection = null;
      let totalMins = 0;
      let maxSpanMins = 0;
      let minBuffer = Infinity;

      for (const date of targetDates) {
        const dayDuties = dutiesList.filter((d) => d.date === date);
        const insp = inspectDaySchedule(dayDuties, options);
        if (!insp.valid) {
          allValid = false;
          violations.push(...(insp.violations || []).map((v) => `${date}: ${v}`));
        }
        if (!worstInspection || (!insp.valid && worstInspection.valid)) {
          worstInspection = insp;
        }
        totalMins += insp.totalDutyMinutes || 0;
        if ((insp.daySpanMinutes || 0) > maxSpanMins) maxSpanMins = insp.daySpanMinutes;
        if (Number.isFinite(insp.shortestBufferMinutes) && insp.shortestBufferMinutes < minBuffer) {
          minBuffer = insp.shortestBufferMinutes;
        }
      }

      // Check period limits (weekly/monthly)
      const periodInsp = inspectPeriodWorkload(dutiesList, options);
      if (!periodInsp.valid) {
        allValid = false;
        violations.push(...(periodInsp.violations || []));
      }

      // Check availability rules
      let availValid = true;
      if (options.rules && options.rules.length) {
        for (const duty of dutiesList) {
          if (targetDates.includes(duty.date)) {
            if (!isAvailableForDuty(personKey, duty, options.rules)) {
              availValid = false;
              violations.push(`Availability rule violation for ${duty.date} (${duty.start_utc}–${duty.release_utc})`);
            }
          }
        }
      }

      return {
        key: personKey,
        name: personName,
        valid: allValid && availValid,
        violations: [...new Set(violations)],
        inspection: worstInspection || { valid: true, violations: [] },
        availabilityValid: availValid,
        simulatedDutiesCount: dutiesList.length,
        totalDutyMinutes: totalMins,
        daySpanMinutes: maxSpanMins,
        shortestBufferMinutes: Number.isFinite(minBuffer) ? minBuffer : null,
      };
    };

    const evalA = evaluatePerson(keyA, nameA, nextDutiesA);
    const evalB = evaluatePerson(keyB, nameB, nextDutiesB);

    const messages = [];
    if (!evalA.valid) {
      messages.push(`${nameA}: ${evalA.violations.join(", ")}`);
    }
    if (!evalB.valid) {
      messages.push(`${nameB}: ${evalB.violations.join(", ")}`);
    }

    return {
      valid: evalA.valid && evalB.valid,
      staffA: evalA,
      staffB: evalB,
      isTwoWaySwap,
      messages,
      summaryText: (evalA.valid && evalB.valid)
        ? (isTwoWaySwap ? `Clean 2-way swap between ${nameA} and ${nameB}. No conflicts detected.` : `Clean duty transfer to ${nameB}. No conflicts detected.`)
        : `Conflicts detected: ${messages.join(" | ")}`,
    };
  }

  function hasOverlappingShifts(duties) {
    const insp = inspectDaySchedule(duties);
    return (insp.violations || []).includes("overlap");
  }

  return { parseDutyTime, rowKey, dutyMinutes, buildPeople, rankCandidates, getDutyGapCandidates: rankCandidates, simulateCoverage, airlineCode, getAirlineLogoUrl, getAirlineLogoImg, operationalPeriod, buildAirlineRoster, buildFlightSchedule, inspectDaySchedule, inspectPeriodWorkload, isAvailableForDuty, getContractHoursLimit, buildAutoPlan, calculateStaffRequirements, autoAdjustRoster, validateShiftSwap, validateAutoAssignments, buildWarnings, buildWorkload, summarizeDutyHours, buildAnalytics, compareSnapshots, comparePersonRosters, hasOverlappingShifts };
});

