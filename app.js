// Sample data and screens for the Pass Validity Checker prototype.
// There is no backend or real QR scanning. All people and passes below are made up.

// Fixed so the sample statuses stay the same whenever the prototype is opened.
// A real app would use the current date at the moment of the scan.
const SCAN_DATE = "2026-11-06";

const PEOPLE = [
  {
    id: "MI872",
    name: "Meera Iyer",
    location: "Ludhiana, Punjab",
    type: "Resident Guest",
    photo: "photos/meera.jpg",
    scannedAt: "10:42",
    permits: [
      {
        kind: "car",
        model: "Hyundai Grand i10",
        number: "PB02 AB 1234",
        periods: [["2026-02-01", "2026-06-08"], ["2026-09-01", "2027-02-28"]],
      },
      {
        kind: "mobile",
        model: "Redmi Note 8",
        number: "98765 01234",
        periods: [["2026-04-01", "2027-03-31"]],
      },
    ],
  },
  {
    id: "RG415",
    name: "Rohan Gill",
    location: "Jalandhar, Punjab",
    type: "Resident Guest",
    photo: "photos/rohan.jpg",
    scannedAt: "10:36",
    permits: [
      {
        kind: "car",
        model: "Maruti Swift",
        number: "PB08 CD 5678",
        periods: [["2026-05-01", "2026-11-01"], ["2026-11-20", "2026-11-30"]],
      },
      {
        kind: "mobile",
        model: "Samsung Galaxy M14",
        number: "98140 05678",
        periods: [["2026-01-16", "2027-01-15"]],
      },
    ],
  },
  {
    id: "HK764",
    name: "Harpreet Kaur",
    location: "Amritsar, Punjab",
    type: "Resident Guest",
    photo: "photos/harpreet.jpg",
    scannedAt: "10:21",
    permits: [
      {
        kind: "car",
        model: "Honda City",
        number: "PB02 EF 4321",
        periods: [["2026-04-15", "2026-10-14"]],
      },
      {
        kind: "mobile",
        model: "Vivo Y20",
        number: "98720 04321",
        periods: [["2026-04-15", "2026-10-14"]],
      },
    ],
  },
  {
    id: "VS190",
    name: "Vikram Sethi",
    location: "Patiala, Punjab",
    type: "Resident Guest",
    photo: "photos/vikram.jpg",
    scannedAt: "10:05",
    permits: [
      {
        kind: "car",
        model: "Tata Nexon",
        number: "PB11 GH 8765",
        periods: [["2026-07-01", "2027-06-30"]],
      },
    ],
  },
  {
    id: "GB703",
    name: "Gurdev Bajwa",
    location: "Moga, Punjab",
    type: "Resident Guest",
    photo: "photos/gurdev.jpg",
    scannedAt: "09:58",
    permits: [
      {
        kind: "mobile",
        model: "Nokia G21",
        number: "98550 07703",
        periods: [["2026-04-13", "2027-04-12"]],
      },
    ],
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const KIND_LABEL = { car: "Car", mobile: "Mobile" };

const svg = (size, attrs, body) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${attrs}>${body}</svg>`;

const KIND_PATHS = {
  car: '<path d="M4 16V12l2-5a2 2 0 0 1 2-1.3h8A2 2 0 0 1 18 7l2 5v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"></path><path d="M4 12h16M6 17v2M18 17v2"></path>',
  mobile: '<rect x="6.5" y="2.5" width="11" height="19" rx="2"></rect><path d="M11 18h2"></path>',
};

const SCAN_FRAME_PATH = '<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M7 12h10"></path>';

const TICK_BADGE = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#12703F"></circle><path d="M7 12.5l3.4 3.4 6.6-7.3" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

const CROSS_BADGE = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#B3261E"></circle><path d="M8.5 8.5l7 7M15.5 8.5l-7 7" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"></path></svg>';

// ISO date strings sort chronologically, so plain string comparison is enough.
function currentPeriod(permit) {
  return permit.periods.find(([from, to]) => from <= SCAN_DATE && SCAN_DATE <= to);
}

function formatDate(iso) {
  const [year, month, day] = iso.split("-");
  return `${day} ${MONTHS[Number(month) - 1]} ${year}`;
}

function nextPersonId(id) {
  const index = PEOPLE.findIndex((person) => person.id === id);
  return PEOPLE[(index + 1) % PEOPLE.length].id;
}

function renderTopBar() {
  return `
    <header class="topbar">
      <a href="#/" aria-label="SDS Pass Validity Checker, go to home">
        <span class="topbar-brand">SDS</span>
        <span class="topbar-divider" aria-hidden="true"></span>
        <h1>Pass Validity Checker</h1>
      </a>
    </header>`;
}

function renderMiniStatus(permit) {
  const valid = Boolean(currentPeriod(permit));
  const mark = valid
    ? '<path d="M4 12.5l5 5L20 6.5"></path>'
    : '<path d="M6 6l12 12M18 6L6 18"></path>';
  return `
    <span class="mini-status ${valid ? "is-valid" : "is-invalid"}" role="img" aria-label="${KIND_LABEL[permit.kind]} permit ${valid ? "valid" : "invalid"}">
      ${svg(20, 'stroke-width="1.75"', KIND_PATHS[permit.kind])}
      ${svg(12, 'stroke-width="3.5"', mark)}
    </span>`;
}

function renderHome() {
  const cards = PEOPLE.map((person) => `
    <a class="person-card" href="#/pass/${person.id}">
      <img src="${person.photo}" alt="Photo of ${person.name}">
      <span class="person-card-text">
        <span class="person-card-name">${person.name}</span>
        <span class="person-card-meta">${person.id} · ${person.scannedAt}</span>
      </span>
      <span class="person-card-permits">${person.permits.map(renderMiniStatus).join("")}</span>
    </a>`).join("");

  return `
    ${renderTopBar()}
    <main class="screen home">
      <a class="scan-action" href="#/scan/${PEOPLE[0].id}">
        ${svg(48, 'stroke-width="1.5"', SCAN_FRAME_PATH)}
        <span>Scan pass QR code</span>
      </a>
      <section class="recent">
        <h2>Recently scanned</h2>
        ${cards}
      </section>
    </main>`;
}

function renderPermit(permit, index) {
  const period = currentPeriod(permit);
  const valid = Boolean(period);
  const open = state.openPermits.has(index);
  const status = valid
    ? `<span class="permit-status is-valid">${TICK_BADGE}Valid</span>`
    : `<span class="permit-status is-invalid">${CROSS_BADGE}Invalid</span>`;
  const till = valid
    ? `<p class="permit-till">Till <strong>${formatDate(period[1])}</strong></p>`
    : "";
  const periods = open
    ? `<div class="validity-list">${permit.periods
        .map(([from, to]) => `<span>${formatDate(from)} - ${formatDate(to)}</span>`)
        .join("")}</div>`
    : "";

  return `
    <section class="permit ${valid ? "" : "is-invalid"}" aria-label="${KIND_LABEL[permit.kind]} permit">
      <span class="permit-icon">${svg(32, 'stroke-width="1.5"', KIND_PATHS[permit.kind])}</span>
      <div class="permit-body">
        <p class="permit-model">${permit.model}</p>
        <div class="permit-number-row">
          <p class="permit-number">${permit.number}</p>
          ${status}
        </div>
        ${till}
        <button type="button" class="validity-toggle" data-toggle-permit="${index}" aria-expanded="${open}">
          <span>Validity</span>
          ${svg(20, 'stroke-width="2"', '<path d="M6 9l6 6 6-6"></path>')}
        </button>
        ${periods}
      </div>
    </section>`;
}

function renderPass(person) {
  return `
    ${renderTopBar()}
    <main class="screen pass">
      <section class="profile">
        <div class="profile-main">
          <img class="profile-photo" src="${person.photo}" alt="Photo of ${person.name}">
          <div class="profile-text">
            <h2 class="profile-name">${person.name}</h2>
            <p class="profile-id">${person.id}</p>
            <p class="profile-location">${person.location}</p>
          </div>
        </div>
        <p class="profile-type">${person.type}</p>
      </section>
      <div class="permits">${person.permits.map(renderPermit).join("")}</div>
    </main>
    <div class="footer-action">
      <a class="primary-button" href="#/scan/${nextPersonId(person.id)}">Scan next pass</a>
    </div>`;
}

// Draws a QR-style pattern for the mock camera view. It is decorative and does not encode anything.
function fakeQrPath() {
  const size = 25;
  const inFinder = (x, y) =>
    (x < 8 && y < 8) || (x > size - 9 && y < 8) || (x < 8 && y > size - 9);
  const finder = (x, y) =>
    `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`;

  let path = "";
  let seed = 31872;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      if (!inFinder(x, y) && seed % 100 < 48) path += `M${x} ${y}h1v1h-1z`;
    }
  }
  return path + finder(0, 0) + finder(size - 7, 0) + finder(0, size - 7);
}

function renderScan(nextId) {
  return `
    ${renderTopBar()}
    <main class="camera ${state.torchOn ? "torch-on" : ""}">
      <div class="camera-pass" aria-hidden="true">
        <svg width="200" height="200" viewBox="0 0 25 25" fill="#15202B"><path d="${fakeQrPath()}"></path></svg>
      </div>
      <div class="camera-frame" aria-hidden="true">
        <span class="corner corner-tl"></span>
        <span class="corner corner-tr"></span>
        <span class="corner corner-br"></span>
        <span class="corner corner-bl"></span>
        <span class="scan-line"></span>
      </div>
      <a class="simulate-scan" href="#/pass/${nextId}" aria-label="Simulate a successful scan"></a>
      <div class="camera-controls">
        <a class="camera-button" href="#/" aria-label="Close camera">
          ${svg(24, 'stroke-width="2"', '<path d="M6 6l12 12M18 6L6 18"></path>')}
        </a>
        <button type="button" class="camera-button" data-toggle-torch aria-label="Torch" aria-pressed="${state.torchOn}">
          ${svg(22, 'stroke-width="1.75"', '<path d="M7 3h10v3l-3 4v11h-4V10L7 6z"></path><path d="M7 6h10M12 13v2"></path>')}
        </button>
      </div>
      <p class="camera-hint">Keep the QR code inside the frame</p>
    </main>`;
}

const app = document.getElementById("app");
const state = { openPermits: new Set(), torchOn: false };

function render() {
  const [, screen, id] = location.hash.split("/");
  const person = PEOPLE.find((candidate) => candidate.id === id);

  if (screen === "pass" && person) {
    app.innerHTML = renderPass(person);
  } else if (screen === "scan" && person) {
    app.innerHTML = renderScan(person.id);
  } else {
    app.innerHTML = renderHome();
  }
}

// Expanded cards and the torch reset whenever the screen changes.
window.addEventListener("hashchange", () => {
  state.openPermits.clear();
  state.torchOn = false;
  render();
});

app.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-toggle-permit]");
  if (toggle) {
    const index = Number(toggle.dataset.togglePermit);
    if (state.openPermits.has(index)) state.openPermits.delete(index);
    else state.openPermits.add(index);
    render();
    return;
  }

  if (event.target.closest("[data-toggle-torch]")) {
    state.torchOn = !state.torchOn;
    render();
  }
});

render();
