# GSRM Empty SOD Slots

Local web app for scanning GSRM Flight Comms SOD forms and finding staffing gaps where required staff exceeds assigned staff.

## Run

```sh
npm install
npm start
```

Then open `http://localhost:4173`.

## Notes

- The app asks for AVBIS credentials locally and uses them only to request AVBIS pages/endpoints.
- Large date ranges can be slow because AVBIS rate-limits SOD endpoint requests.
- Use the airline dropdown and smaller date ranges when possible.
