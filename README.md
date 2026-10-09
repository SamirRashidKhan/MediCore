# MediCore — The Art of Healing

A responsive, static frontend prototype for a personal health copilot. It helps a user organize demo health information, keep a simple timeline, record medication details, prepare a consultation brief, and navigate the workspace with a rule-based helper.

> **Prototype and safety notice:** This project is a frontend demo. It is not a medical device, does not diagnose, and must not be used for emergencies or medication decisions. It is not connected to a live OCR service, clinical AI model, backend API, or secure medical database. Use synthetic/demo data only.

## Quick start

### Option A — VS Code Live Server (recommended)
1. Extract/open the `MediCore-Health-Copilot` folder in VS Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Use the left sidebar to navigate the screens. Use the top-right controls to switch theme or language.

### Option B — Python static server
Run from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

No build step, npm install, or bundler is required. Google Fonts are loaded from the web; the system font fallback is used if offline.

## Project structure

```text
MediCore-Health-Copilot/
├── index.html                 # App shell, sidebar, topbar, footer, dialogs, help widget
├── styles.css                 # Design tokens, light/dark themes, components, responsive rules
├── app.js                     # State, page rendering, navigation, forms, interactions, local storage
├── assets/
│   ├── medicore-logo.png      # Main brand logo used in the UI
│   └── medicore-icon.png      # Favicon and Apple touch icon
├── docs/
│   └── ARCHITECTURE.md        # Architecture, data flow, state model, limitations
├── tests/
│   └── manual-test-checklist.md # Manual regression checks
├── .gitignore                 # Editor/OS noise and local logs
└── README.md                  # Setup, codebase guide, and safety notes
```

## Main files

### `index.html`
Contains the single-page application shell: sidebar navigation, top bar, theme/language controls, dynamic page container (`#pageContent`), brand footer, floating help assistant, toast region, and modal dialog. The favicon and logo are loaded from `assets/` using relative paths.

### `styles.css`
Contains the complete visual system, including shared CSS variables, light and dark theme rules, typography, responsive layouts, navigation, cards, forms, dialogs, footer, help widget, spotlight/ambient effects, and reduced-motion accommodations. Keep theme-dependent colours in the centralized token rules rather than adding isolated hard-coded colours to individual components.

### `app.js`
Contains the application logic: local demo state, persistence, route navigation, screen rendering, document metadata, medication records, timeline events, profile/settings, consultation export/print, symptom note preparation, the helper's rule-based replies, language toggle, theme toggle, mobile sidebar, modal interactions, and toasts.

## Current screens/features

- Overview dashboard
- AI health assistant screen
- Medical records and upload metadata
- Weekly check-in
- Medication list/reminder records (not real notifications)
- Health timeline
- Symptom notes for clinician discussion (not triage)
- Consultation brief with print/text export
- Personal profile
- Settings/privacy demo controls
- Floating quick-help panel available throughout the app
- Light and dark themes
- English/Hindi language toggle for supported interface strings
- Larger-text accessibility toggle
- Responsive mobile sidebar
- Local demo-data export and reset
- MediCore logo, favicon, and “THE ART OF HEALING” branding

## Architecture overview

This is a **client-only single-page application** using plain HTML, CSS, and JavaScript. Navigation is hash-based (`#overview`, `#records`, etc.); `app.js` renders the selected screen inside `#pageContent`. Shared page chrome remains in `index.html`. Application data is held in a JavaScript state object and saved to browser `localStorage` where available.

```text
Browser
  ├── index.html
  │    ├── Shared sidebar / topbar / footer
  │    ├── Dynamic page container (#pageContent)
  │    ├── Floating help panel
  │    └── Modal + toast region
  ├── styles.css
  │    ├── Theme tokens (light/dark)
  │    ├── Components and states
  │    └── Responsive + motion/accessibility rules
  ├── app.js
  │    ├── Route handling and page renderers
  │    ├── Demo state + localStorage persistence
  │    ├── Event delegation and form actions
  │    └── Rule-based help + export/print helpers
  └── assets/
       ├── medicore-logo.png
       └── medicore-icon.png
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for more details.

## Data and privacy

- Demo profile, settings, medication entries, timeline entries, and document metadata are stored in this browser's `localStorage` when supported.
- Local storage is not encrypted medical storage. Anyone with access to the browser profile may be able to inspect it.
- The document upload prototype records metadata only; it does not OCR or interpret the file contents.
- The helper is rule-based and does not call a live AI model or external API.
- Reset demo data from Settings to clear the app's saved demo state in this browser. This does not delete files from the device.
- Do not put real patient records, identifiers, prescriptions, or other sensitive health information into this prototype.

## Theme and language notes

- Light mode uses the Soft Blue + White palette defined in the supplied design specification.
- Dark mode uses the separate Navy + White palette defined in the supplied design specification.
- The theme selection is stored in the app's demo settings; the interface should be checked in both themes after any CSS change.
- The language toggle currently translates supported interface labels and messages. It is not a complete translation of every medical explanation or all user-entered content.
- Inter is the primary typeface, loaded from Google Fonts with a sans-serif fallback.

## Development guidance

1. Add new screen markup through the existing page-rendering pattern in `app.js` and register navigation routes consistently.
2. Use semantic CSS tokens for colours, surfaces, text, borders, and focus states.
3. Use event delegation for controls created dynamically inside `#pageContent`.
4. Escape user-entered strings before inserting them into HTML; prefer `textContent` when rendering plain text.
5. Keep medical copy cautious and evidence-bound. Do not infer a diagnosis, suggest medication changes, or imply a test value is safe without clinical context.
6. For a production implementation, add a secure backend, authentication/authorization, encrypted storage, audit logging, validated OCR/extraction, and a clinician-reviewed AI pipeline before handling real patient data.

## Validation

Run the manual checklist in [`tests/manual-test-checklist.md`](tests/manual-test-checklist.md) before sharing a new build. Source-level syntax and HTML checks are useful, but they do not replace browser testing across desktop and mobile.


## Synthetic patient login demo

The application now opens on a patient-selection screen backed by the attached `DataSet.xlsx` workbook, converted to `data/demo-dataset.js`. The workbook's sheets and column names are preserved in the generated JavaScript data file.

### How to use the demo
1. Open this folder using VS Code Live Server or run `python -m http.server 8000` from this folder.
2. Search by patient name, ID, city, or age group.
3. Select a fictional profile to preview demographics and counts/examples for linked documents, medication records, lab results, symptoms, consultation summaries, and timeline events.
4. Select **Open patient workspace** to enter the existing MediCore UI.
5. Use **Switch demo patient** at the bottom of the sidebar to return to the selection screen.

No password is requested because this is a frontend demonstration, not a real authentication system. The selected profile ID is stored in browser local storage. The app maps the selected synthetic profile's name, age, sex, documents, medications, and timeline into the existing workspace.

### Data source and safety
- Source: user-provided `DataSet.xlsx`.
- Included sheets: Read Me, Patient Profiles, Documents, Medications, Lab Results, Symptoms & Triage, Consult Summaries, Timeline Events, Privacy & Consent, and UI Test Cases.
- All rows are synthetic according to the workbook's own Read Me sheet. They are not real patients and must not be used for medical decisions.
- This is client-side demo data shipped to every browser. It is not protected by server authentication or encrypted medical storage.
- No live OCR, clinical AI, backend database, real ABHA/ABDM connection, or real login is provided.
- Lab values and medication text are displayed as documented; the interface does not independently diagnose or recommend treatment.

### New files
- `data/demo-dataset.js`: workbook rows encoded as a browser-readable JavaScript object.\n- `data/DataSet.xlsx`: original workbook supplied for this demo.
- `login.js`: search/filter patient selector, preview, dataset sheet counts, and switching profiles.
