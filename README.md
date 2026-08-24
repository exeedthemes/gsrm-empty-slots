# GSRM Empty SOD Slots

Local web app for scanning GSRM Flight Comms SOD forms and finding staffing gaps where required staff exceeds assigned staff.

The **Duty Roster** tab also shows who is allocated and who is free for a selected date range and daily UTC time window. Its filter panel can narrow a multi-date scan by roster date range, staff or assignment text, availability, and SLA; it can be collapsed in full-screen mode, and the visible roster can be downloaded as CSV. A compact toggle adds duty hours for every staff/day and each person's hours across the selected range. For a reliable free-staff list, scan a broad enough range (for example, the full week) so the app can discover staff from their allocations.

Below the roster filters, switch between **Staff roster** and **Flight schedule**. The flight schedule shows every arrival and departure together in scheduled-time order for each day, without grouping by airline or direction. Flights with gaps open automatically, staff chips open replacement finding, gap buttons open the coverage planner, and the roster CSV follows the active view.

The roster also includes a local **Automatic coverage planner**. Choose eligible staff and scanned SLAs, then configure daily, weekly, and monthly hour limits, weekly working days, duty-span limits, turnaround buffers, and qualifying breaks. Staff availability can be saved for a day, multiple calendar-selected dates, a range, a full month, or selected weekdays, with full-day, morning, evening, custom-hour, and unavailable options. The planner uses those availability rules and existing allocations, rejects overlaps, and proposes balanced coverage. Every proposed or unfilled slot can be manually reassigned from the selected-staff list before exporting the flight schedule CSV.

Every gap now includes a **Fill gap** planner that ranks conflict-free candidates, including staff who are fully free that day and staff connecting from a nearby duty. The planner exposes the extracted aircraft, schedule, duty type, movement, and assigned staff, and it stores an operational status and note for each gap in the local browser. **Action CSV** exports the gaps, planning status, assigned staff, and ranked candidates.

Selecting a candidate also opens a local **coverage simulation**. It recalculates remaining missing positions, the candidate's daily duty hours and span, short turnarounds, and overlaps across all currently selected assignments. Simulations are reversible and never write changes to AVBIS.

The **Insights** tab summarizes missing positions and staff-hours by date, SLA, and start hour. It also flags overlapping allocations, short duty gaps, long daily spans, and invalid timestamps. Its combined staff workload and duty-hours overview follows the selected Duty Roster period and filters. The **History** tab retains up to eight completed scan summaries in the local browser and compares the latest two scans for new, resolved, and changed gaps.

Candidate SLA experience is inferred only from duties visible in the current scan. It is a planning signal, not confirmation that a staff member is qualified or approved for that duty.

## Run

```sh
npm install
npm start
```

Then open `http://localhost:4173`.

## Notes

- The app asks for AVBIS credentials locally and uses them only to request AVBIS pages/endpoints.
- Large date ranges can be slow because AVBIS rate-limits SOD endpoint requests.
- Use the multi-select airline dropdown and smaller date ranges when possible.
- When public holidays are enabled, German and Bavarian public holidays are added automatically for the selected years. Extra holiday dates can still be entered manually.
