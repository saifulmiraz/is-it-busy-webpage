# 📍 Is it Busy?

A mobile-first webpage for crowdsourced campus facility busyness reports. Students tap one button to report how busy a facility is, and everyone can check the live status before they walk over.

**🔗 Live demo:** [grand-dolphin-52f674.netlify.app](https://grand-dolphin-52f674.netlify.app/)

Built by **Team Venus** for **ITIH101 Innovation Hub 1** at the Central Institute of Technology and Innovation (CITI).

---

## The problem

Students walk to the cafeteria, library, or gym only to find it packed — or avoid it entirely on a wrong assumption that it's busy. There's no reliable, real-time information source for campus-specific facilities. Commercial services like Google Maps cover public businesses, not internal campus venues.

**Is it Busy?** solves this with a "human-in-the-loop" crowdsourcing model: the people already at a facility become the data source. A two-second tap helps everyone else.

---

## Features

- **One-tap reporting** — three clear status options: Empty, Getting Full, Packed
- **Live status display** — shows the latest report and how long ago it was made (e.g. "Reported 8 minutes ago")
- **Stale-data detection** — reports older than 120 minutes are flagged so users aren't misled by outdated info
- **Multiple facilities** — Cafeteria, Library, and Gym, switchable from a single page
- **Mobile-first** — large tap targets, colour-coded status, works one-handed on any phone browser
- **No login, no app** — just open the link and tap
- **Anonymous** — no personal data is collected
- **Auto-refresh** — the status updates every 30 seconds

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Front-end | HTML, CSS, JavaScript (no frameworks) |
| Back-end | Google Apps Script (serverless endpoints) |
| Data store | Google Sheets (append-only log) |
| Hosting | Netlify (static deployment) |

The architecture is deliberately simple and free to run: a static page talks to a Google Apps Script web app, which reads and writes rows in a Google Sheet.

```
Browser  →  Netlify (static front-end)  →  Google Apps Script  →  Google Sheet
```

---

## How it works

1. A student at a facility opens the page and taps a status button.
2. The front-end sends the facility name and status to a Google Apps Script endpoint.
3. The script appends a timestamped row to a Google Sheet.
4. When anyone loads the page, it fetches the most recent report for the selected facility and displays the status, its colour code, and how long ago it was reported.
5. If the latest report is older than the stale threshold, a warning is shown.

---

## Setup

To run your own copy:

1. Create a Google Sheet with the headings `Timestamp`, `Facility`, `Status` in row 1.
2. Open **Extensions → Apps Script**, paste in the back-end script, and deploy it as a **Web app** with access set to **Anyone**.
3. Copy the web app URL and paste it into the `SCRIPT_URL` constant near the top of the `<script>` section in `index.html`.
4. Deploy `index.html` to any static host (e.g. Netlify drag-and-drop).

You can change the facilities and the stale threshold via the `FACILITIES` and `STALE_MINUTES` constants in `index.html`.

---

## Team Venus

| Name | Role |
|------|------|
| Saiful Islam Miraz | Team Leader |
| Buddhadeb Das Hit | Team Member |
| Shanker Bhandari | Team Member |

---

## License

Created for educational purposes as part of ITIH101 Innovation Hub 1.
