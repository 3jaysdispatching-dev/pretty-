/* DispatchOS - Fleet Management Application */

// ============ STATE & DATA ============
let state = {
  loads: [],
  drivers: [],
  invoices: [],
  notifications: [],
  rates: {
    base: 1.5,
    hotload: 2.0,
    reefer: 0.2,
    hazmat: 0.15
  },
  config: {
    mapbox: '',
    twilio_sid: '',
    twilio_token: '',
    twilio_from: '',
    samsara: ''
  },
  company: {
    name: '',
    mc: '',
    dot: '',
    email: ''
  },
  map: null,
  routeMap: null,
  currentView: 'dashboard'
};

// Mock data generators
function generateMockData() {
  // Generate drivers
  const driverNames = ['John Smith', 'Maria Garcia', 'James Wilson', 'Ahmed Hassan', 'Lisa Chen', 'Carlos Rodriguez'];
  const trucks = ['T-101', 'T-102', 'T-103', 'T-104', 'T-105', 'T-106'];
  const cities = ['Chicago, IL', 'Nashville, TN', 'Atlanta, GA', 'Dallas, TX', 'Denver, CO', 'Los Angeles, CA'];
  const statuses = ['available', 'busy', 'alert', 'offline'];

  state.drivers = driverNames.map((name, i) => ({
    id: i + 1,
    name: name,
    phone: `+1 555 ${String(i).padStart(3, '0')} 000${i}`,
    truck: trucks[i],
    location: cities[i],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    hos_left: Math.floor(Math.random() * 14) + 1,
    current_load: i % 3 === 0 ? `L-${String(i + 100).padStart(4, '0')}` : null,
    lat: 40 + Math.random() * 10,
    lng: -95 + Math.random() * 30,
    license_exp: '2026-12-31',
    eld: 'Connected'
  }));

  // Generate loads
  const origins = ['Chicago, IL', 'Houston, TX', 'Atlanta, GA', 'New York, NY', 'Denver, CO'];
  const destinations = ['Los Angeles, CA', 'Nashville, TN', 'Dallas, TX', 'Seattle, WA', 'Phoenix, AZ'];
  const commodities = ['Electronics', 'Food & Beverage', 'Automotive', 'Furniture', 'Machinery'];
  const loadStatuses = ['Pending', 'Assigned', 'At Pickup', 'In Transit', 'Delivered'];

  state.loads = Array.from({ length: 12 }, (_, i) => ({
    id: `L-${String(i + 1001).padStart(4, '0')}`,
    origin: origins[i % origins.length],
    destination: destinations[i % destinations.length],
    commodity: commodities[i % commodities.length],
    weight: Math.floor(Math.random() * 40000) + 10000,
    driver: state.drivers[i % state.drivers.length]?.name || 'Unassigned',
    status: loadStatuses[i % loadStatuses.length],
    rate: Math.floor(Math.random() * 3000) + 1000,
    priority: ['Normal', 'Hot', 'Low'][Math.floor(Math.random() * 3)],
    shipper: `Shipper ${i + 1}`,
    customer: `Customer ${i + 1}`,
    eta: '2h 45m'
  }));

  // Generate invoices
  state.invoices = state.loads.slice(0, 6).map((load, i) => ({
    id: `INV-${String(i + 5001).padStart(4, '0')}`,
    load_id: load.id,
    customer: load.customer,
    linehaul: load.rate,
    fsc: Math.floor(load.rate * 0.15),
    detention: Math.floor(Math.random() * 200),
    driver_payout: Math.floor(load.rate * 0.65),
    total: load.rate + Math.floor(load.rate * 0.15),
    status: 'Pending',
    due_date: '2026-06-15'
  }));

  // Generate notifications
  state.notifications = [
    { id: 1, type: 'alert', title: 'Driver Alert', msg: 'Driver L-1005 HOS expired', time: '2m ago', read: false },
    { id: 2, type: 'success', title: 'Load Delivered', msg: 'Load L-1001 delivered on time', time: '15m ago', read: true },
    { id: 3, type: 'info', title: 'Maintenance Due', msg: 'Truck T-102 maintenance due soon', time: '1h ago', read: true }
  ];
}

// ============ UI INITIALIZATION ============
function init() {
  generateMockData();
  loadLocalStorage();
  renderDashboard();
  initMap();
  populateDriverDropdowns();
  renderSetupGuide();
}

// ============ NAVIGATION & VIEWS ============
function navigate(el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');

  const view = el.dataset.view;
  state.currentView = view;
  
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${view}`).classList.add('active');

  document.getElementById('page-title').textContent = 
    el.textContent.trim().split('\n')[0];

  // Render view-specific content
  switch (view) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'loads':
      renderLoads();
      break;
    case 'drivers':
      renderDrivers();
      break;
    case 'compliance':
      renderCompliance();
      break;
    case 'billing':
      renderBilling();
      break;
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('hidden');
}

// ============ DASHBOARD ============
function renderDashboard() {
  const activeDrivers = state.drivers.filter(d => d.status === 'available' || d.status === 'busy').length;
  const activeLoads = state.loads.filter(l => l.status !== 'Delivered').length;
  const alertCount = state.drivers.filter(d => d.status === 'alert').length;

  document.getElementById('stat-active').textContent = `${activeDrivers} Active`;
  document.getElementById('stat-loads').textContent = `${activeLoads} Loads`;
  document.getElementById('stat-alerts').textContent = `${alertCount} Alert${alertCount !== 1 ? 's' : ''}`;

  // KPI Grid
  const kpiHtml = `
    <div class="kpi-card">
      <div class="kpi-label">Revenue Today</div>
      <div class="kpi-value">$${(activeLoads * 1500).toLocaleString()}</div>
      <div class="kpi-label">+12% vs yesterday</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Active Loads</div>
      <div class="kpi-value">${activeLoads}</div>
      <div class="kpi-label">${activeDrivers} drivers on road</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Fleet Utilization</div>
      <div class="kpi-value">${Math.round((activeDrivers / state.drivers.length) * 100)}%</div>
      <div class="kpi-label">5 available</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">On-Time Delivery</div>
      <div class="kpi-value">98.5%</div>
      <div class="kpi-label">Last 30 days</div>
    </div>
  `;
  document.getElementById('kpi-grid').innerHTML = kpiHtml;

  // Loads in progress
  const loadsHtml = state.loads.filter(l => l.status !== 'Delivered').slice(0, 5).map(l => `
    <tr>
      <td><strong>${l.id}</strong></td>
      <td>${l.origin} → ${l.destination}</td>
      <td>${l.driver}</td>
      <td><span class="status-badge status-${l.status.toLowerCase().replace(/\s+/g, '')}">${l.status}</span></td>
      <td>${l.eta}</td>
    </tr>
  `).join('');
  document.getElementById('dash-loads-body').innerHTML = loadsHtml;

  // Fleet status
  const driverList = state.drivers.slice(0, 6).map(d => `
    <div class="activity-item">
      <div class="activity-badge"><span class="status-dot ${d.status}"></span></div>
      <div class="activity-text">
        <strong>${d.name}</strong><br>
        ${d.truck} • ${d.location}<br>
        <small style="color:var(--text-muted)">${d.status.toUpperCase()}</small>
      </div>
    </div>
  `).join('');
  document.getElementById('dash-drivers-list').innerHTML = driverList || '<p style="padding:16px;color:var(--text-muted)">No drivers</p>';

  // Activity feed
  const activityHtml = `
    <div class="activity-item">
      <div class="activity-badge">📍</div>
      <div class="activity-text">
        Load <strong>L-1003</strong> picked up in Chicago
        <div class="activity-time">5m ago</div>
      </div>
    </div>
    <div class="activity-item">
      <div class="activity-badge">✓</div>
      <div class="activity-text">
        Load <strong>L-1001</strong> delivered
        <div class="activity-time">1h ago</div>
      </div>
    </div>
    <div class="activity-item">
      <div class="activity-badge">⚠️</div>
      <div class="activity-text">
        Driver <strong>Ahmed Hassan</strong> HOS warning
        <div class="activity-time">2h ago</div>
      </div>
    </div>
  `;
  document.getElementById('activity-feed').innerHTML = activityHtml;
}

// ============ LOADS ============
function renderLoads() {
  const loadsHtml = state.loads.map(l => `
    <tr class="${l.status === 'Pending' ? 'alert-row' : ''}">
      <td><strong>${l.id}</strong></td>
      <td>${l.origin}</td>
      <td>${l.destination}</td>
      <td>${l.commodity}</td>
      <td>${l.driver}</td>
      <td><span class="status-badge status-${l.status.toLowerCase().replace(/\s+/g, '')}">${l.status}</span></td>
      <td>$${l.rate.toLocaleString()}</td>
      <td><span style="padding:4px 8px;border-radius:4px;background:${l.priority === 'Hot' ? 'rgba(239,68,68,0.1)' : l.priority === 'Low' ? 'rgba(107,114,128,0.1)' : 'rgba(59,130,246,0.1)'};color:${l.priority === 'Hot' ? 'var(--danger)' : l.priority === 'Low' ? 'var(--text-muted)' : 'var(--info)'};font-weight:600;font-size:11px">${l.priority}</span></td>
      <td><button class="btn-sm" onclick="editLoad('${l.id}')">Edit</button></td>
    </tr>
  `).join('');
  document.getElementById('loads-body').innerHTML = loadsHtml;
}

function filterLoads(query) {
  const status = document.getElementById('load-status-f').value;
  const priority = document.getElementById('load-priority-f').value;

  const filtered = state.loads.filter(l =>
    (l.id.includes(query) || l.origin.includes(query) || l.destination.includes(query)) &&
    (!status || l.status === status) &&
    (!priority || l.priority === priority)
  );

  const loadsHtml = filtered.map(l => `
    <tr class="${l.status === 'Pending' ? 'alert-row' : ''}">
      <td><strong>${l.id}</strong></td>
      <td>${l.origin}</td>
      <td>${l.destination}</td>
      <td>${l.commodity}</td>
      <td>${l.driver}</td>
      <td><span class="status-badge status-${l.status.toLowerCase().replace(/\s+/g, '')}">${l.status}</span></td>
      <td>$${l.rate.toLocaleString()}</td>
      <td><span style="padding:4px 8px;border-radius:4px;background:${l.priority === 'Hot' ? 'rgba(239,68,68,0.1)' : l.priority === 'Low' ? 'rgba(107,114,128,0.1)' : 'rgba(59,130,246,0.1)'};color:${l.priority === 'Hot' ? 'var(--danger)' : l.priority === 'Low' ? 'var(--text-muted)' : 'var(--info)'};font-weight:600;font-size:11px">${l.priority}</span></td>
      <td><button class="btn-sm" onclick="editLoad('${l.id}')">Edit</button></td>
    </tr>
  `).join('');
  document.getElementById('loads-body').innerHTML = loadsHtml || '<tr><td colspan="9" style="text-align:center;padding:20px;color:var(--text-muted)">No loads found</td></tr>';
}

function exportLoads() {
  let csv = 'Load #,Origin,Destination,Commodity,Driver,Status,Rate,Priority\n';
  state.loads.forEach(l => {
    csv += `${l.id},"${l.origin}","${l.destination}","${l.commodity}","${l.driver}","${l.status}","${l.rate}","${l.priority}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'loads.csv';
  a.click();
  showToast('Loads exported successfully', 'success');
}

function saveLoad() {
  const load = {
    id: `L-${String(Math.max(...state.loads.map(l => parseInt(l.id.slice(2))), 1000) + 1).padStart(4, '0')}`,
    origin: document.getElementById('f-origin').value,
    destination: document.getElementById('f-dest').value,
    commodity: document.getElementById('f-comm').value,
    weight: parseInt(document.getElementById('f-weight').value) || 0,
    driver: document.getElementById('f-driver').value || 'Unassigned',
    status: 'Pending',
    rate: parseInt(document.getElementById('f-rate').value) || 0,
    priority: document.getElementById('f-priority').value,
    shipper: document.getElementById('f-shipper').value,
    customer: document.getElementById('f-customer').value,
    eta: '–'
  };

  if (!load.origin || !load.destination) {
    showToast('Origin and destination required', 'error');
    return;
  }

  state.loads.push(load);
  saveLocalStorage();
  closeModal('load-modal');
  renderLoads();
  showToast(`Load ${load.id} created`, 'success');
}

function editLoad(id) {
  showToast('Edit functionality available in pro version', 'info');
}

// ============ DRIVERS ============
function renderDrivers() {
  const kpiHtml = `
    <div class="kpi-card">
      <div class="kpi-label">Total Drivers</div>
      <div class="kpi-value">${state.drivers.length}</div>
      <div class="kpi-label">${state.drivers.filter(d => d.status === 'available').length} available</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Avg Hours Worked</div>
      <div class="kpi-value">48h</div>
      <div class="kpi-label">This week</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">HOS Violations</div>
      <div class="kpi-value">0</div>
      <div class="kpi-label">Last 90 days</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Avg Safety Score</div>
      <div class="kpi-value">95/100</div>
      <div class="kpi-label">↑ 2 pts</div>
    </div>
  `;
  document.getElementById('driver-kpis').innerHTML = kpiHtml;

  const driversHtml = state.drivers.map(d => `
    <tr>
      <td><strong>${d.name}</strong></td>
      <td>${d.truck}</td>
      <td>${d.location}</td>
      <td><span class="status-dot ${d.status}"></span>${d.status.charAt(0).toUpperCase() + d.status.slice(1)}</td>
      <td>${d.hos_left}h</td>
      <td>${d.current_load || '–'}</td>
      <td>${d.phone}</td>
      <td><button class="btn-sm" onclick="contactDriver('${d.id}')">Contact</button></td>
    </tr>
  `).join('');
  document.getElementById('drivers-body').innerHTML = driversHtml;

  // Populate driver dropdown for loads
  const driverOptions = state.drivers.map(d => `<option value="${d.name}">${d.name} (${d.truck})</option>`).join('');
  document.getElementById('f-driver').innerHTML = '<option value="">Auto-match nearest available</option>' + driverOptions;
}

function filterDrivers(query) {
  const status = document.getElementById('driver-status-f').value;

  const filtered = state.drivers.filter(d =>
    (d.name.toLowerCase().includes(query.toLowerCase()) || 
     d.truck.includes(query) || 
     d.location.includes(query)) &&
    (!status || d.status === status)
  );

  const driversHtml = filtered.map(d => `
    <tr>
      <td><strong>${d.name}</strong></td>
      <td>${d.truck}</td>
      <td>${d.location}</td>
      <td><span class="status-dot ${d.status}"></span>${d.status.charAt(0).toUpperCase() + d.status.slice(1)}</td>
      <td>${d.hos_left}h</td>
      <td>${d.current_load || '–'}</td>
      <td>${d.phone}</td>
      <td><button class="btn-sm" onclick="contactDriver('${d.id}')">Contact</button></td>
    </tr>
  `).join('');
  document.getElementById('drivers-body').innerHTML = driversHtml || '<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--text-muted)">No drivers found</td></tr>';
}

function contactDriver(id) {
  const driver = state.drivers.find(d => d.id === id);
  if (driver && state.config.twilio_from) {
    showToast(`Texting ${driver.name} at ${driver.phone}`, 'success');
  } else {
    showToast('Configure Twilio in Settings to send messages', 'info');
  }
}

function saveDriver() {
  const driver = {
    id: state.drivers.length + 1,
    name: document.getElementById('dn-name').value,
    phone: document.getElementById('dn-phone').value,
    truck: document.getElementById('dn-truck').value,
    location: document.getElementById('dn-base').value,
    status: 'available',
    hos_left: 14,
    current_load: null,
    lat: 40 + Math.random() * 10,
    lng: -95 + Math.random() * 30,
    license_exp: document.getElementById('dn-lic').value,
    eld: 'Connected'
  };

  if (!driver.name) {
    showToast('Driver name required', 'error');
    return;
  }

  state.drivers.push(driver);
  saveLocalStorage();
  closeModal('driver-modal');
  renderDrivers();
  showToast(`Driver ${driver.name} added`, 'success');
}

function populateDriverDropdowns() {
  const driverOptions = state.drivers.map(d => `<option value="${d.name}">${d.name}</option>`).join('');
  document.getElementById('f-driver').innerHTML = '<option value="">Auto-match</option>' + driverOptions;
  document.getElementById('inv-load').innerHTML = state.loads.map(l => `<option value="${l.id}">${l.id}</option>`).join('');
}

// ============ ROUTE PLANNER ============
function optimizeRoute() {
  const origin = document.getElementById('r-origin').value;
  const dest = document.getElementById('r-dest').value;
  const weight = document.getElementById('r-weight').value;
  const truck = document.getElementById('r-truck').value;

  if (!origin || !dest) {
    showToast('Origin and destination required', 'error');
    return;
  }

  const distance = Math.floor(Math.random() * 1500) + 300;
  const hours = Math.round(distance / 65);
  const rate = Math.round(distance * 1.5);

  document.getElementById('route-result').style.display = 'block';
  document.getElementById('route-stats').innerHTML = `
    <div class="stat-box">
      <div class="stat-value">${distance} mi</div>
      <div class="stat-label">Distance</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${hours}h</div>
      <div class="stat-label">Duration</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">$${rate.toLocaleString()}</div>
      <div class="stat-label">Est. Rate</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${truck}</div>
      <div class="stat-label">Equipment</div>
    </div>
  `;

  const suggested = state.drivers.filter(d => d.status === 'available').slice(0, 3);
  document.getElementById('suggested-drivers').innerHTML = suggested.map(d => `
    <div class="activity-item">
      <div class="activity-badge">✓</div>
      <div class="activity-text">
        <strong>${d.name}</strong><br>
        ${d.truck} • ${d.location}<br>
        <button class="btn-sm" style="margin-top:6px" onclick="assignLoad('${d.id}')">Assign</button>
      </div>
    </div>
  `).join('');
}

function assignLoad(driverId) {
  const driver = state.drivers.find(d => d.id === driverId);
  showToast(`Route assigned to ${driver.name}`, 'success');
  document.getElementById('route-result').style.display = 'none';
}

// ============ COMPLIANCE ============
function renderCompliance() {
  // Rate list
  const rateHtml = Object.entries(state.rates).map(([key, val]) => `
    <div class="rate-item">
      <span class="rate-name">${key.replace('_', ' ').toUpperCase()}</span>
      <span class="rate-value">$${val.toFixed(2)}</span>
    </div>
  `).join('');
  document.getElementById('rate-list').innerHTML = rateHtml;

  // Compliance table
  const compHtml = state.drivers.map(d => `
    <tr>
      <td><strong>${d.name}</strong></td>
      <td>${d.truck}</td>
      <td>${d.hos_left}h remaining</td>
      <td><span class="status-badge" style="background:rgba(16,185,129,0.1);color:var(--success)">${d.eld}</span></td>
      <td>0</td>
      <td>2026-03-15</td>
      <td>${d.license_exp}</td>
    </tr>
  `).join('');
  document.getElementById('comp-body').innerHTML = compHtml;
}

function calcFSC() {
  const price = parseFloat(document.getElementById('fuel-price').value) || 0;
  const miles = parseFloat(document.getElementById('fuel-miles').value) || 0;
  const mpg = parseFloat(document.getElementById('fuel-mpg').value) || 6.5;

  const gallonsUsed = miles / mpg;
  const fsc = gallonsUsed * price;

  document.getElementById('fsc-result').textContent = `FSC: $${fsc.toFixed(2)}`;
}

function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
  // Clear form if it's a new load/driver
  if (modalId === 'load-modal') {
    document.querySelectorAll('#load-modal input, #load-modal select, #load-modal textarea').forEach(el => el.value = '');
  } else if (modalId === 'driver-modal') {
    document.querySelectorAll('#driver-modal input, #driver-modal select').forEach(el => el.value = '');
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

function closeModalBg(event, modalId) {
  if (event.target.id === modalId) {
    closeModal(modalId);
  }
}

function saveRates() {
  showToast('Rates updated', 'success');
  closeModal('rate-modal');
}

// ============ BILLING ============
function renderBilling() {
  const billingKpis = `
    <div class="kpi-card">
      <div class="kpi-label">Revenue This Month</div>
      <div class="kpi-value">$${(state.invoices.reduce((s, i) => s + i.total, 0)).toLocaleString()}</div>
      <div class="kpi-label">+8% vs last month</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Driver Payouts</div>
      <div class="kpi-value">$${(state.invoices.reduce((s, i) => s + i.driver_payout, 0)).toLocaleString()}</div>
      <div class="kpi-label">Pending</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Avg Rate Per Mile</div>
      <div class="kpi-value">$2.15</div>
      <div class="kpi-label">Industry avg $2.10</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Outstanding</div>
      <div class="kpi-value">$${(state.invoices.filter(i => i.status === 'Pending').reduce((s, i) => s + i.total, 0)).toLocaleString()}</div>
      <div class="kpi-label">3 invoices due</div>
    </div>
  `;
  document.getElementById('billing-kpis').innerHTML = billingKpis;

  const billingHtml = state.invoices.map(i => `
    <tr>
      <td><strong>${i.id}</strong></td>
      <td>${i.load_id}</td>
      <td>${i.customer}</td>
      <td>$${i.total.toLocaleString()}</td>
      <td>$${i.driver_payout.toLocaleString()}</td>
      <td>$${i.fsc.toLocaleString()}</td>
      <td><span class="status-badge" style="background:rgba(245,158,11,0.1);color:var(--warning)">${i.status}</span></td>
      <td>${i.due_date}</td>
      <td><button class="btn-sm" onclick="editInvoice('${i.id}')">Edit</button></td>
    </tr>
  `).join('');
  document.getElementById('billing-body').innerHTML = billingHtml;
}

function exportInvoices() {
  let csv = 'Invoice #,Load,Customer,Amount,Driver Payout,Status,Due Date\n';
  state.invoices.forEach(i => {
    csv += `${i.id},${i.load_id},"${i.customer}",${i.total},${i.driver_payout},"${i.status}","${i.due_date}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'invoices.csv';
  a.click();
  showToast('Invoices exported successfully', 'success');
}

function prefillInvoice() {
  const loadId = document.getElementById('inv-load').value;
  const load = state.loads.find(l => l.id === loadId);
  if (load) {
    document.getElementById('inv-customer').value = load.customer;
    document.getElementById('inv-rate').value = load.rate;
    calcInvoice();
  }
}

function calcInvoice() {
  const linehaul = parseFloat(document.getElementById('inv-rate').value) || 0;
  const fsc = parseFloat(document.getElementById('inv-fsc').value) || 0;
  const detention = parseFloat(document.getElementById('inv-det').value) || 0;
  const pctPayout = parseFloat(document.getElementById('inv-pct').value) || 65;

  const subtotal = linehaul + fsc + detention;
  const driverPayout = Math.round(subtotal * (pctPayout / 100));
  const companyKeep = subtotal - driverPayout;

  document.getElementById('invoice-totals').innerHTML = `
    <div>
      <div class="total-row">
        <span>Linehaul</span>
        <span>$${linehaul.toLocaleString()}</span>
      </div>
      <div class="total-row">
        <span>Fuel Surcharge</span>
        <span>$${fsc.toLocaleString()}</span>
      </div>
      <div class="total-row">
        <span>Detention</span>
        <span>$${detention.toLocaleString()}</span>
      </div>
      <div class="total-row final">
        <span>Total Revenue</span>
        <span>$${subtotal.toLocaleString()}</span>
      </div>
    </div>
    <div>
      <div class="total-row">
        <span>Driver Payout (${pctPayout}%)</span>
        <span>$${driverPayout.toLocaleString()}</span>
      </div>
      <div class="total-row">
        <span>Company Revenue</span>
        <span>$${companyKeep.toLocaleString()}</span>
      </div>
      <div class="total-row final">
        <span>Margin</span>
        <span>${Math.round((companyKeep / subtotal) * 100)}%</span>
      </div>
    </div>
  `;
}

function saveInvoice() {
  const invoice = {
    id: `INV-${String(Math.max(...state.invoices.map(i => parseInt(i.id.slice(4))), 5000) + 1).padStart(4, '0')}`,
    load_id: document.getElementById('inv-load').value,
    customer: document.getElementById('inv-customer').value,
    linehaul: parseFloat(document.getElementById('inv-rate').value),
    fsc: parseFloat(document.getElementById('inv-fsc').value),
    detention: parseFloat(document.getElementById('inv-det').value),
    driver_payout: Math.round((parseFloat(document.getElementById('inv-rate').value) + parseFloat(document.getElementById('inv-fsc').value)) * (parseFloat(document.getElementById('inv-pct').value) / 100)),
    total: parseFloat(document.getElementById('inv-rate').value) + parseFloat(document.getElementById('inv-fsc').value) + parseFloat(document.getElementById('inv-det').value),
    status: 'Pending',
    due_date: document.getElementById('inv-due').value
  };

  state.invoices.push(invoice);
  saveLocalStorage();
  closeModal('invoice-modal');
  renderBilling();
  showToast(`Invoice ${invoice.id} created`, 'success');
}

function editInvoice(id) {
  showToast('Edit functionality available in pro version', 'info');
}

// ============ MAP INTEGRATION ============
function initMap() {
  // Initialize Leaflet map if Mapbox token not available
  if (!state.config.mapbox) {
    const mapEl = document.getElementById('map');
    if (mapEl && !state.map) {
      state.map = L.map('map').setView([39.8283, -98.5795], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(state.map);

      // Add driver markers
      state.drivers.forEach(d => {
        const color = d.status === 'alert' ? '#ef4444' : d.status === 'available' ? '#10b981' : '#3b82f6';
        const marker = L.circleMarker([d.lat, d.lng], {
          radius: 8,
          fillColor: color,
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(state.map);
        marker.bindPopup(`<strong>${d.name}</strong><br>${d.truck}<br>${d.status}`);
      });
    }

    // Initialize route map
    const routeMapEl = document.getElementById('route-map');
    if (routeMapEl && !state.routeMap) {
      state.routeMap = L.map('route-map').setView([39.8283, -98.5795], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(state.routeMap);
    }
  }
}

function filterMapDrivers() {
  const filter = document.getElementById('map-filter').value;
  // Recreate map with filtered markers
  if (state.map) {
    state.map.eachLayer(layer => {
      if (layer instanceof L.CircleMarker) {
        state.map.removeLayer(layer);
      }
    });

    const filtered = filter ? state.drivers.filter(d => d.status === filter) : state.drivers;
    filtered.forEach(d => {
      const color = d.status === 'alert' ? '#ef4444' : d.status === 'available' ? '#10b981' : '#3b82f6';
      const marker = L.circleMarker([d.lat, d.lng], {
        radius: 8,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(state.map);
      marker.bindPopup(`<strong>${d.name}</strong><br>${d.truck}<br>${d.status}`);
    });
  }
}

// ============ NOTIFICATIONS ============
function showNotifications() {
  const panel = document.getElementById('notif-panel');
  panel.classList.toggle('active');

  if (panel.classList.contains('active')) {
    const notifHtml = state.notifications.map((n, i) => `
      <div class="notif-item ${!n.read ? 'unread' : ''}" onclick="markNotifRead(${i})">
        <strong>${n.title}</strong><br>
        ${n.msg}<br>
        <small style="color:var(--text-muted)">${n.time}</small>
      </div>
    `).join('');
    document.getElementById('notif-list').innerHTML = notifHtml;
  }
}

function markNotifRead(index) {
  state.notifications[index].read = true;
  showNotifications();
}

// ============ SETTINGS ============
function renderSetupGuide() {
  const guide = `
    <div class="setup-step">
      <h4>🗺️ 1. Get Mapbox API Key (Free)</h4>
      <p>For real-time fleet mapping:</p>
      <ol style="padding-left:20px;font-size:12px;color:var(--text-muted)">
        <li>Visit <a href="https://account.mapbox.com" target="_blank" class="help-link">account.mapbox.com</a></li>
        <li>Create free account</li>
        <li>Copy your default public token</li>
        <li>Paste in API Configuration below</li>
      </ol>
    </div>
    <div class="setup-step">
      <h4>📞 2. Get Twilio API Keys (Free Trial)</h4>
      <p>For SMS driver notifications:</p>
      <ol style="padding-left:20px;font-size:12px;color:var(--text-muted)">
        <li>Visit <a href="https://www.twilio.com/try-twilio" target="_blank" class="help-link">twilio.com/try-twilio</a></li>
        <li>Verify phone number</li>
        <li>Get Account SID, Auth Token, and Twilio phone</li>
        <li>Add to Settings</li>
      </ol>
    </div>
    <div class="setup-step">
      <h4>🚚 3. Get Samsara API Key (Optional)</h4>
      <p>For vehicle telematics integration:</p>
      <ol style="padding-left:20px;font-size:12px;color:var(--text-muted)">
        <li>Visit <a href="https://cloud.samsara.com" target="_blank" class="help-link">cloud.samsara.com</a></li>
        <li>Sign up or login</li>
        <li>Generate API key in settings</li>
        <li>Add to Settings</li>
      </ol>
    </div>
    <div class="setup-step">
      <h4>✅ All Set!</h4>
      <p>Your DispatchOS is ready to manage loads, drivers, and billing. Start by:</p>
      <ol style="padding-left:20px;font-size:12px;color:var(--text-muted)">
        <li>Adding your drivers</li>
        <li>Creating your first load</li>
        <li>Monitoring fleet live</li>
      </ol>
    </div>
  `;
  document.getElementById('setup-guide').innerHTML = guide;
}

function saveSettings() {
  state.config = {
    mapbox: document.getElementById('cfg-mapbox').value,
    twilio_sid: document.getElementById('cfg-twilio-sid').value,
    twilio_token: document.getElementById('cfg-twilio-token').value,
    twilio_from: document.getElementById('cfg-twilio-from').value,
    samsara: document.getElementById('cfg-samsara').value
  };
  saveLocalStorage();
  document.getElementById('settings-msg').textContent = '✓ Settings saved';
  showToast('API configuration saved', 'success');
}

function saveCompany() {
  state.company = {
    name: document.getElementById('cfg-company').value,
    mc: document.getElementById('cfg-mc').value,
    dot: document.getElementById('cfg-dot').value,
    email: document.getElementById('cfg-email').value
  };
  saveLocalStorage();
  showToast('Company profile saved', 'success');
}

// ============ LOCAL STORAGE ============
function saveLocalStorage() {
  localStorage.setItem('dispatchos', JSON.stringify(state));
}

function loadLocalStorage() {
  const saved = localStorage.getItem('dispatchos');
  if (saved) {
    const parsed = JSON.parse(saved);
    state.config = parsed.config || state.config;
    state.company = parsed.company || state.company;

    // Restore form values
    document.getElementById('cfg-mapbox').value = state.config.mapbox;
    document.getElementById('cfg-twilio-sid').value = state.config.twilio_sid;
    document.getElementById('cfg-twilio-from').value = state.config.twilio_from;
    document.getElementById('cfg-samsara').value = state.config.samsara;

    document.getElementById('cfg-company').value = state.company.name;
    document.getElementById('cfg-mc').value = state.company.mc;
    document.getElementById('cfg-dot').value = state.company.dot;
    document.getElementById('cfg-email').value = state.company.email;
  }
}

// ============ TOAST NOTIFICATIONS ============
function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', init);
