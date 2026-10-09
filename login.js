'use strict';
(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const data = window.MEDICORE_DEMO_DATA || {};
  const profiles = data['Patient Profiles'] || [];
  const login = $('#demoLogin');
  const shell = $('.app-shell');
  if (!login || !shell) return;

  const selectedId = localStorage.getItem('medicore-demo-patient-id');
  const selected = profiles.find(p => p.Patient_ID === selectedId);
  const loggedIn = Boolean(selected);
  login.hidden = loggedIn;
  shell.hidden = !loggedIn;
  document.body.classList.toggle('demo-logged-out', !loggedIn);

  const select = $('#patientSelect');
  const preview = $('#patientPreview');
  const enter = $('#enterDemo');
  const datasetDetails = $('#datasetDetails');

  const esc = value => String(value ?? 'Not provided').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const related = (sheet, id) => (data[sheet] || []).filter(row => row.Patient_ID === id);
  const detail = (label, value) => `<div class="patient-detail"><small>${esc(label)}</small><strong>${esc(value || 'Not provided')}</strong></div>`;

  function populate(preferredId) {
    const rows = profiles;
    select.innerHTML = `<option value="">Choose a fictional patient…</option>` + rows.map(p =>
      `<option value="${esc(p.Patient_ID)}">${esc(p.Display_Name)} · ${esc(p.Patient_ID)} · ${esc(p.Age_Group)}</option>`).join('');
    if (preferredId && rows.some(p => p.Patient_ID === preferredId)) select.value = preferredId;
    else if (rows.length === 1) select.value = rows[0].Patient_ID;
    renderPreview();
  }
  function renderPreview() {
    const p = profiles.find(row => row.Patient_ID === select.value);
    enter.disabled = !p;
    if (!p) {
      preview.innerHTML = `<p>${profiles.length} fictional profiles are available. Choose one to see its associated records before opening the workspace.</p>`;
      return;
    }
    const docs = related('Documents', p.Patient_ID);
    const meds = related('Medications', p.Patient_ID);
    const labs = related('Lab Results', p.Patient_ID);
    const symptoms = related('Symptoms & Triage', p.Patient_ID);
    const consults = related('Consult Summaries', p.Patient_ID);
    const events = related('Timeline Events', p.Patient_ID);
    const privacy = related('Privacy & Consent', p.Patient_ID)[0];
    preview.innerHTML = `
      <span class="patient-id">${esc(p.Patient_ID)} · SYNTHETIC PROFILE</span>
      <h2>${esc(p.Display_Name)}</h2>
      <div class="patient-detail-grid">
        ${detail('Age / group', `${p.Age_Years} years · ${p.Age_Group}`)}
        ${detail('Sex (demo)', p.Sex_for_demo)}
        ${detail('City', p.City)}
        ${detail('Date of birth', p.Date_of_Birth)}
        ${detail('Profile managed by', p.Profile_Managed_By)}
        ${detail('Known allergies', p.Known_Allergies)}
        ${detail('Documented conditions', p.Chronic_Conditions_Documented)}
        ${detail('Emergency contact', p.Emergency_Contact_Label)}
      </div>
      <div class="patient-data-sections">
        ${section('Documents', docs.length, docs.map(r=>r.Document_Title).slice(0,3))}
        ${section('Medication records', meds.length, meds.map(r=>r.Medication_Name_As_Documented).slice(0,3))}
        ${section('Lab results', labs.length, labs.map(r=>`${r.Test_Name}: ${r.Result_Value ?? 'Not recorded'} ${r.Unit||''}`).slice(0,3))}
        ${section('Symptoms & triage', symptoms.length, symptoms.map(r=>r.Reported_Concern).slice(0,2))}
        ${section('Consult summaries', consults.length, consults.map(r=>r.Reason_for_Visit_As_Documented).slice(0,2))}
        ${section('Timeline events', events.length, events.map(r=>r.Event_Title).slice(0,3))}
      </div>
      <p class="login-footnote">${esc(privacy?.ABHA_Link_Status || 'Mock / not connected to ABDM')} · ${esc(p.Data_Status)}</p>`;
  }
  function section(title, count, examples) {
    return `<div class="patient-data-section"><strong>${esc(title)} · ${count}</strong><span>${examples.length ? examples.map(esc).join(' · ') : 'No rows for this profile'}</span></div>`;
  }
  select.addEventListener('change', renderPreview);
  enter.addEventListener('click', () => {
    if (!select.value || !profiles.some(p => p.Patient_ID === select.value)) return;
    localStorage.setItem('medicore-demo-patient-id', select.value);
    localStorage.setItem('medicore-demo-login-active', 'yes');
    location.hash = '#overview';
    location.reload();
  });
  $('#logoutButton')?.addEventListener('click', () => {
    localStorage.removeItem('medicore-demo-patient-id');
    localStorage.removeItem('medicore-demo-login-active');
    location.hash = '#overview';
    location.reload();
  });
  $('#exploreAllData').addEventListener('click', () => {
    const opening = datasetDetails.hidden;
    datasetDetails.hidden = !opening;
    if (opening) {
      datasetDetails.innerHTML = `<strong>Workbook included in this demo</strong><ul>${Object.entries(data).map(([name, rows])=>`<li>${esc(name)}: ${rows.length} rows</li>`).join('')}</ul><p>All records originate from the attached workbook. Values are fictional; use only for UI demonstration. The original sheet names and field labels are preserved in data/demo-dataset.js.</p>`;
    }
  });
  // A persistent, explicit way to switch between synthetic patient profiles.
  const sidebar = $('#sidebar');
  if (sidebar && !$('#switchDemoPatient')) {
    const switcher = document.createElement('button');
    switcher.id = 'switchDemoPatient';
    switcher.className = 'login-secondary';
    switcher.type = 'button';
    switcher.textContent = 'Switch demo patient';
    switcher.style.marginTop = 'auto';
    switcher.addEventListener('click', () => {
      localStorage.removeItem('medicore-demo-patient-id');
      localStorage.removeItem('medicore-demo-login-active');
      location.reload();
    });
    sidebar.appendChild(switcher);
  }
  populate(selected?.Patient_ID || '');
})();
