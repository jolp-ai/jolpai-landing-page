'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('main-nav');
function closeMenu(returnFocus = false) {
  if (!menuToggle || !mainNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  mainNav.classList.remove('is-open');
  if (returnFocus) menuToggle.focus();
}
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mainNav.classList.toggle('is-open', open);
});
mainNav?.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
const examples = {
  services: {label:'Enquiry to appointment',title:'Be there for the next opportunity.',description:'Capture an enquiry, check the details and help a customer take the next step—even when your team is busy.',link:'ai-voice-agents.html',linkText:'Explore voice & appointment agents ↗',nodes:['New enquiry received','Details organized & checked','Booking or human handover'],labels:['CUSTOMER','AI + YOUR BUSINESS RULES','YOUR TEAM']},
  commerce: {label:'Question to resolution',title:'Make the next answer easier to find.',description:'Help shoppers get answers from your approved product and policy information, while your team handles the exceptions.',link:'ai-customer-support.html',linkText:'Explore customer support ↗',nodes:['Customer asks a question','Approved information retrieved','Answer or support handover'],labels:['CUSTOMER','YOUR KNOWLEDGE BASE','CUSTOMER SUPPORT']},
  professional: {label:'Documents to decisions',title:'Less paperwork between you and your client.',description:'Organize incoming documents, extract the information you need and put incomplete or uncertain items in front of the right person.',link:'document-processing.html',linkText:'Explore document processing ↗',nodes:['Client documents received','Key information extracted','Your team reviews & approves'],labels:['CLIENT INTAKE','AI + VALIDATION RULES','HUMAN APPROVAL']},
  software: {label:'Scattered tools to connected work',title:'Give your systems a common language.',description:'Connect the tools behind your product and bring approved information together, with permissions and clear failure handling.',link:'custom-ai.html',linkText:'Explore custom AI & integrations ↗',nodes:['A request or event arrives','Connected systems exchange data','Result logged & team notified'],labels:['YOUR APPLICATION','CUSTOM INTEGRATION','YOUR TEAM']}
};
const explorer = document.querySelector('[data-solution-explorer]');
if (explorer) {
  const tabs = Array.from(explorer.querySelectorAll('[role="tab"]'));
  function selectTab(tab) {
    const item = examples[tab.dataset.solution];
    if (!item) return;
    tabs.forEach(el => { const selected = el === tab; el.setAttribute('aria-selected', String(selected)); el.tabIndex = selected ? 0 : -1; });
    explorer.querySelector('[role="tabpanel"]').setAttribute('aria-labelledby', tab.id);
    for (const key of ['label','title','description']) explorer.querySelector(`[data-solution-${key}]`).textContent = item[key];
    const link = explorer.querySelector('[data-solution-link]');
    link.href = item.link; link.textContent = item.linkText;
    explorer.querySelectorAll('[data-flow]').forEach((el,i) => { el.textContent = item.nodes[i]; });
    explorer.querySelectorAll('[data-flow-label]').forEach((el,i) => { el.textContent = item.labels[i]; });
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(tabs[next]); tabs[next].focus(); }
    });
  });
}
const form = document.getElementById('enquiry-form');
if (form) {
  const serviceField = document.getElementById('service');
  const requested = new URLSearchParams(window.location.search).get('service');
  if (Array.from(serviceField.options).some(option => option.value === requested)) serviceField.value = requested;
  const result = document.getElementById('enquiry-result');
  let emailText = '';
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name')).trim();
    const message = String(data.get('message')).trim();
    if (!name || message.length < 10) {
      const field = !name ? document.getElementById('name') : document.getElementById('message');
      field.setCustomValidity(!name ? 'Please enter your name.' : 'Please share at least 10 characters about your project.');
      field.reportValidity();
      field.addEventListener('input', () => field.setCustomValidity(''), {once:true});
      return;
    }
    const service = serviceField.options[serviceField.selectedIndex].textContent;
    const company = String(data.get('company')).trim();
    emailText = `Hello Jolpai,\n\nI’d like to discuss an AI or automation project.\n\nName: ${name}\nEmail: ${String(data.get('email')).trim()}\nCompany: ${company || 'Not provided'}\nInterested in: ${service}\n\nWhat I’d like to improve:\n${message}\n\nThank you,\n${name}`;
    document.getElementById('enquiry-preview').textContent = emailText;
    document.getElementById('send-enquiry').href = `mailto:i@jolp.ai?subject=${encodeURIComponent(`Project enquiry${company ? ' — ' + company : ''}`)}&body=${encodeURIComponent(emailText)}`;
    document.getElementById('copy-status').textContent = '';
    form.hidden = true; result.hidden = false;
    document.getElementById('enquiry-result-title').focus();
  });
  document.getElementById('edit-enquiry').addEventListener('click', () => {
    result.hidden = true; form.hidden = false; document.getElementById('name').focus();
  });
  document.getElementById('copy-enquiry').addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(emailText);
      status.textContent = 'Message copied. Paste it into an email to i@jolp.ai.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange(); range.selectNodeContents(document.getElementById('enquiry-preview'));
      selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Message selected. Use your device’s copy command, then paste it into an email.';
    }
  });
}
