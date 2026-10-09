# Manual Regression Checklist

Run through this checklist in a browser after code changes.

## Startup and navigation
- [ ] Open `index.html` with Live Server or `python -m http.server 8000`.
- [ ] Confirm the MediCore logo and favicon load.
- [ ] Open every sidebar route and confirm the correct page appears.
- [ ] Confirm footer navigation links work.
- [ ] Confirm browser back/forward navigation works with hash routes.

## Themes and responsive layout
- [ ] Switch Light → Dark → Light; check sidebar, top bar, content, inputs, modal, footer, and helper panel.
- [ ] Refresh and confirm the selected theme is restored as expected.
- [ ] Test at desktop width, tablet width, and a narrow mobile viewport.
- [ ] Open and close the mobile sidebar and its backdrop.
- [ ] Confirm reduced-motion preferences suppress decorative motion.

## Interactions
- [ ] Open/close the floating help panel and submit a sample question.
- [ ] Test the English/Hindi toggle and refresh.
- [ ] Toggle easy-reading mode on and off.
- [ ] Add/edit/remove a medication record.
- [ ] Add and filter timeline events.
- [ ] Select symptoms and create a visit-preparation summary.
- [ ] Save profile and settings changes.
- [ ] Print/download the consultation brief.
- [ ] Export demo data and reset demo data.
- [ ] Confirm invalid required fields show a helpful message.

## Safety and privacy messaging
- [ ] Confirm the UI still labels the assistant and medical features as prototype/demo features.
- [ ] Use synthetic data only; do not test with real patient documents.
- [ ] Confirm document upload does not claim to have read or interpreted file contents.
