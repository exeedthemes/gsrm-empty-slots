const test = require("node:test");
const assert = require("node:assert/strict");
const { dateScanSucceeded, extractFlightSodRows, extractStaffDirectory, fetchFlightLinks, parseSodGroups } = require("./server");

test("extracts the full staff directory while keeping only selected staff allocated", () => {
  const html = `
    <table><tbody>
      <tr>
        <td>CKIN</td><td>Agent</td><td>Required: 2</td><td>08:00</td><td>10:00</td><td>02:00</td>
        <td><select>
          <option value="1" selected>DNE - Daniela Neuner</option>
          <option value="2">ABC - Alice Brown</option>
          <option value="3">XYZ - Xavier Young</option>
        </select></td>
      </tr>
      <tr><td>ABC - Alice Brown</td></tr>
    </tbody></table>`;

  assert.deepEqual(extractStaffDirectory(html).sort(), [
    "ABC - Alice Brown",
    "DNE - Daniela Neuner",
    "XYZ - Xavier Young",
  ]);
  assert.deepEqual(parseSodGroups(html, "18-Aug-2026")[0].staff.sort(), [
    "ABC - Alice Brown",
    "DNE - Daniela Neuner",
  ]);
});

test("parses allocated staff from every SOD table", () => {
  const html = `
    <table><tr><td>GATE</td><td>Agent</td><td>Required: 1</td><td>10:00</td><td>11:00</td><td>01:00</td></tr>
      <tr><td>AAA - Agent One</td></tr></table>
    <table><tr><td>ASVC</td><td>Agent</td><td>Required: 1</td><td>12:00</td><td>13:00</td><td>01:00</td></tr>
      <tr><td>BBB - Agent Two</td></tr></table>`;

  const groups = parseSodGroups(html, "18-Aug-2026");
  assert.equal(groups.length, 2);
  assert.deepEqual(groups.map((group) => group.staff), [
    ["AAA - Agent One"],
    ["BBB - Agent Two"],
  ]);
});

test("does not classify a date with endpoint errors as successfully scanned", () => {
  assert.equal(dateScanSucceeded({ errors: [] }), true);
  assert.equal(dateScanSucceeded({ errors: [{ error: "SOD HTTP 429" }] }), false);
});

test("flight-list endpoint failures are surfaced instead of becoming a zero-flight success", async () => {
  const response = {
    ok: () => false,
    status: () => 404,
    json: async () => ({}),
    text: async () => "",
  };
  const context = { request: { get: async () => response } };

  await assert.rejects(
    fetchFlightLinks(context, "31-Aug-2026"),
    /Could not load flights for 31-Aug-2026.*HTTP 404/
  );
});

test("a confirmed empty date remains a valid zero-flight result", async () => {
  const responses = [
    { ok: () => true, status: () => 200, json: async () => ({ items: [] }) },
    { ok: () => true, status: () => 200, text: async () => "<html></html>" },
  ];
  const context = { request: { get: async () => responses.shift() } };

  assert.deepEqual(await fetchFlightLinks(context, "31-Aug-2026"), []);
});

test("reuses parsed flight SOD data across filter changes and bypasses it on refresh", async () => {
  const sodHtml = `
    <table><tbody><tr>
      <td>CKIN</td><td>Agent</td><td>Required: 1</td><td>18 Aug 08:00</td><td>18 Aug 10:00</td><td>02:00</td>
    </tr></tbody></table>`;
  let requests = 0;
  const context = {
    request: {
      get: async (url) => {
        requests += 1;
        if (url.includes("get-handling-airport")) {
          return { ok: () => true, status: () => 200, json: async () => ({ status: true, airport_id: 7 }) };
        }
        return { ok: () => true, status: () => 200, text: async () => sodHtml };
      },
    },
  };
  const flight = { id: "991234567", text: "XX 123 | MUC-FRA | D-TEST | STD 18 09:00" };
  const start = new Date(Date.UTC(2026, 7, 18, 0, 0));
  const end = new Date(Date.UTC(2026, 7, 18, 23, 59));

  const first = await extractFlightSodRows(context, flight, "18-Aug-2026", start, end, [], true, "one@example.com");
  const filtered = await extractFlightSodRows(context, flight, "18-Aug-2026", start, end, ["GATE"], true, "one@example.com");

  assert.equal(first.rows.length, 1);
  assert.equal(filtered.rows.length, 0);
  assert.equal(requests, 2);

  await extractFlightSodRows(context, flight, "18-Aug-2026", start, end, [], true, "two@example.com");
  assert.equal(requests, 3);

  await extractFlightSodRows(context, flight, "18-Aug-2026", start, end, [], true, "one@example.com", true);
  assert.equal(requests, 4);
});
