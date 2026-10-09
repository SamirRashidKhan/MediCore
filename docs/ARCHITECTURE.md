# MediCore Frontend Architecture

## 1. Architecture style

MediCore is a plain HTML/CSS/JavaScript single-page frontend. It does not currently use React, a package manager, a bundler, or a backend service. The static page shell lives in `index.html`; page-specific content is rendered by functions in `app.js`; visual presentation is centralized in `styles.css`.

## 2. Runtime flow

1. Browser loads `index.html`.
2. The document loads `styles.css`, `app.js` (deferred), and the local assets.
3. `app.js` initializes demo state from browser storage or default sample state.
4. Hash routes select the active workspace screen.
5. The selected renderer creates screen content inside `#pageContent`.
6. Delegated event handlers respond to buttons/forms in static and dynamically rendered content.
7. State changes are saved to local storage where possible, then the affected screen is rendered again.

## 3. Main modules (within `app.js`)

- **State initialization/persistence:** loads defaults and merges saved data; saves app state in browser storage.
- **Navigation/rendering:** handles hash routes and screen-specific rendering.
- **Records:** accepts selected file metadata and maintains the local demo library; it does not extract document text.
- **Medication records:** creates, edits, removes, and changes demo status for user-entered medication records. It does not validate prescriptions or schedule notifications.
- **Timeline:** maintains user-entered events and displays them by date/type.
- **Profile/settings:** edits demo profile values and interface preferences.
- **Consultation brief:** prepares a patient-visit summary and supports print/text download.
- **Symptom notes:** creates a summary for discussion with a clinician; it is not a triage system.
- **Quick-help assistant:** responds using keyword/rule-based canned guidance and routes users to relevant screens. It is not a live LLM.
- **UI helpers:** modal dialog, toast notifications, mobile navigation, theme toggle, language toggle, and easy-reading mode.

## 4. State and persistence

The app uses a JavaScript state object as the source of truth for demo records. Browser `localStorage` is used for persistence when available. This is convenient for a local prototype, but it is not a security boundary and does not provide encryption, server backup, access control, or cross-device synchronization. A separate language preference may also be saved locally.

## 5. Styling and themes

`styles.css` owns the design system. Keep shared semantic variables and both theme definitions together. Components should consume the active theme's tokens for background, surface, text, muted text, primary action, border, and focus states. Check every route in both themes after changing shared CSS. Preserve the supplied MediCore logo and favicon as image assets.

## 6. Current data flow

```text
User interaction
      ↓
Event listener / form handler (app.js)
      ↓
Validate and update local demo state
      ↓
Save to browser localStorage (if available)
      ↓
Render updated screen into #pageContent
```

For document uploads, the current flow ends at file metadata; there is no OCR step. For assistant questions, the flow ends at local rule-based responses; there is no external model request.

## 7. Suggested future production architecture

```text
Web frontend
    ↓ HTTPS API
Backend API + authentication / authorization
    ├── Secure document upload and malware/type validation
    ├── OCR service → extracted text
    ├── Schema validation + user confirmation
    ├── AI summarization service with evidence references and safety checks
    ├── FHIR-aligned health-record mapping
    └── Audit logging and access controls
             ↓
Encrypted database + private object storage
```

This is a future-state suggestion, not functionality currently present in this codebase. Real health data would require a security, privacy, clinical-safety, and legal review before launch.

## 8. Important boundaries

- No real OCR or diagnostic interpretation.
- No live AI model or API integration.
- No backend/database connection.
- No real push notifications or medication scheduling.
- No real ABHA/ABDM integration; a mock field is not an integration.
- No secure medical vault; local browser storage is demo-only.


## Synthetic demo login and dataset
`index.html` contains the login gate. `data/demo-dataset.js` defines `window.MEDICORE_DEMO_DATA`, generated from the provided workbook. `login.js` searches the Patient Profiles sheet, previews linked rows by Patient_ID, and stores the selected ID in localStorage. `app.js` uses that ID to hydrate the existing workspace's name, age, sex, document list, medication list, and timeline events. This is a demo profile picker only, not authentication or access control. All dataset content is shipped to the client.
