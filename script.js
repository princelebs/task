// --- START paste into browser console ---
// finds the form on page
const form = document.querySelector('form');

// helper to get input by exact placeholder text
const byPlaceholder = (ph) => document.querySelector(`input[placeholder="${ph}"]`);

// inputs as present in your index.html
const nameInput = byPlaceholder('student name');
const classInput = byPlaceholder('student class');
const mathsInput = byPlaceholder('enter maths mark');
const webdevInput = byPlaceholder('enter web dev mark');
const clangInput = byPlaceholder('enter c lang mark');
const vedikInput = byPlaceholder('enter vedik maths mark');
const ctpsInput = byPlaceholder('enter ctps mark');

// create table area only once
let tableContainer = document.querySelector('#student-table-container');
if (!tableContainer) {
  tableContainer = document.createElement('div');
  tableContainer.id = 'student-table-container';
  // place it below the form's box for clean layout
  const loginBox = document.querySelector('.login-box') || document.body;
  loginBox.parentNode.insertBefore(tableContainer, loginBox.nextSibling);

  // build table
  const tbl = document.createElement('table');
  tbl.id = 'student-table';
  tbl.style.width = '100%';
  tbl.style.marginTop = '16px';
  tbl.style.borderCollapse = 'collapse';
  tbl.innerHTML = `
    <thead>
      <tr>
        <th style="border:1px solid #ddd;padding:8px;text-align:left">Name</th>
        <th style="border:1px solid #ddd;padding:8px;text-align:left">Class</th>
        <th style="border:1px solid #ddd;padding:8px;text-align:left">Maths</th>
        <th style="border:1px solid #ddd;padding:8px;text-align:left">Web Dev</th>
        <th style="border:1px solid #ddd;padding:8px;text-align:left">C Lang</th>
        <th style="border:1px solid #ddd;padding:8px;text-align:left">Vedic Maths</th>
        <th style="border:1px solid #ddd;padding:8px;text-align:left">CTPS</th>
        <th style="border:1px solid #ddd;padding:8px;text-align:left">Total</th>
      </tr>
    </thead>
    <tbody></tbody>
    <tfoot>
      <tr>
        <td colspan="7" style="border:1px solid #ddd;padding:8px;text-align:right;font-weight:bold">Grand Total (all students):</td>
        <td id="grand-total" style="border:1px solid #ddd;padding:8px;font-weight:bold">0</td>
      </tr>
    </tfoot>
  `;
  tableContainer.appendChild(tbl);
}

// convenience refs
const tbody = document.querySelector('#student-table tbody');
const grandTotalCell = document.getElementById('grand-total');

// track grand total
let grandTotal = 0;

// safe parse mark (empty -> 0)
function parseMark(v) {
  if (v === null || v === undefined) return 0;
  const n = parseFloat(String(v).trim());
  return Number.isNaN(n) ? 0 : n;
}

// on submit handler
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput ? nameInput.value.trim() : '';
    const cls = classInput ? classInput.value.trim() : '';

    const maths = parseMark(mathsInput ? mathsInput.value : '');
    const webdev = parseMark(webdevInput ? webdevInput.value : '');
    const clang = parseMark(clangInput ? clangInput.value : '');
    const vedik = parseMark(vedikInput ? vedikInput.value : '');
    const ctps = parseMark(ctpsInput ? ctpsInput.value : '');

    const total = maths + webdev + clang + vedik + ctps;

    // create row
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="border:1px solid #ddd;padding:8px">${escapeHtml(name)}</td>
      <td style="border:1px solid #ddd;padding:8px">${escapeHtml(cls)}</td>
      <td style="border:1px solid #ddd;padding:8px">${maths}</td>
      <td style="border:1px solid #ddd;padding:8px">${webdev}</td>
      <td style="border:1px solid #ddd;padding:8px">${clang}</td>
      <td style="border:1px solid #ddd;padding:8px">${vedik}</td>
      <td style="border:1px solid #ddd;padding:8px">${ctps}</td>
      <td style="border:1px solid #ddd;padding:8px;font-weight:bold">${total}</td>
    `;
    tbody.appendChild(tr);

    // update grand total
    grandTotal += total;
    grandTotalCell.textContent = grandTotal;

    // optional: clear marks (but keep name/class if you want)
    if (mathsInput) mathsInput.value = '';
    if (webdevInput) webdevInput.value = '';
    if (clangInput) clangInput.value = '';
    if (vedikInput) vedikInput.value = '';
    if (ctpsInput) ctpsInput.value = '';
  });
} else {
  console.warn('Form not found on page.');
}

// small helper to avoid HTML injection in table
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
// --- END
