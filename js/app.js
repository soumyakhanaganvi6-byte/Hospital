/**
 * LIFECARE HOSPITAL - MODERN & PREMIUM WEB APPLICATION JAVASCRIPT
 * Brand: LifeCare Hospital (Blue + White Aesthetic)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDoctorDirectory();
  initDepartmentFilter();
  initBookingSystem();
  initLabPortal();
  initAmbulanceDispatch();
  initFaqAccordion();
  initChatWidget();
  initSmoothScroll();
});

/* ==========================================================================
   1. DOCTORS DATA STORE
   ========================================================================== */
const doctorsData = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    deptKey: 'cardiology',
    specialty: 'Interventional Cardiology',
    degrees: 'MD, FACC, FSCAI (Harvard Medical)',
    experience: '16+ Years Experience',
    rating: '4.9',
    reviews: 480,
    fee: '$80',
    room: 'Cardio Suite 302',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    availability: 'Available Today',
    nextSlot: 'Today, 03:30 PM',
    bio: 'Dr. Jenkins is the Director of the LifeCare Cardiac Catheterization Lab. She specializes in complex coronary angioplasty, transcatheter aortic valve replacements (TAVR), and preventative cardiology.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance',
    deptKey: 'neurology',
    specialty: 'Neurology & Stroke Care',
    degrees: 'MD, DM, FAAN (Johns Hopkins)',
    experience: '18+ Years Experience',
    rating: '4.95',
    reviews: 520,
    fee: '$90',
    room: 'Neurosciences Block 405',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    availability: 'Available Today',
    nextSlot: 'Today, 04:15 PM',
    bio: 'Dr. Marcus Vance leads the Comprehensive Stroke & Epilepsy Center. He has published over 60 clinical research papers and pioneered acute stroke reperfusion protocols.'
  },
  {
    id: 'doc-3',
    name: 'Dr. David Chen',
    deptKey: 'orthopedics',
    specialty: 'Orthopedic & Robotic Joint Surgery',
    degrees: 'MD, MS (Ortho), FAAOS',
    experience: '14+ Years Experience',
    rating: '4.88',
    reviews: 395,
    fee: '$75',
    room: 'Ortho Wing 204',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    availability: 'Available Tomorrow',
    nextSlot: 'Tomorrow, 10:00 AM',
    bio: 'Dr. Chen specializes in computer-navigated robotic knee and hip replacements, sports ligament reconstructions, and minimally invasive spinal interventions.'
  },
  {
    id: 'doc-4',
    name: 'Dr. Elena Rostova',
    deptKey: 'pediatrics',
    specialty: 'Pediatric Care & Neonatology',
    degrees: 'MD (Pediatrics), FAAP',
    experience: '12+ Years Experience',
    rating: '4.92',
    reviews: 430,
    fee: '$65',
    room: 'Children Wellness 108',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
    availability: 'Available Today',
    nextSlot: 'Today, 05:00 PM',
    bio: 'Dr. Elena Rostova is beloved by young patients and parents alike. She oversees neonatal intensive care and specializes in pediatric growth, respiratory allergies, and childhood wellness.'
  },
  {
    id: 'doc-5',
    name: 'Dr. Robert Hayes',
    deptKey: 'emergency',
    specialty: 'Trauma & Emergency Critical Care',
    degrees: 'MD, FACEP, Trauma Fellow',
    experience: '17+ Years Experience',
    rating: '4.97',
    reviews: 610,
    fee: '$85',
    room: 'Level 1 Trauma Triage',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    availability: 'On-Duty 24/7',
    nextSlot: 'Immediate Triage / 24/7',
    bio: 'Chief of Emergency and Trauma Services at LifeCare Hospital. Dr. Hayes oversees acute resuscitation, mobile ICU dispatches, and emergency polytrauma protocols.'
  },
  {
    id: 'doc-6',
    name: 'Dr. Priya Sharma',
    deptKey: 'oncology',
    specialty: 'Medical Oncology & Immunotherapy',
    degrees: 'MD, DM (Oncology), ESMO Certified',
    experience: '15+ Years Experience',
    rating: '4.94',
    reviews: 370,
    fee: '$85',
    room: 'Cancer Institute 501',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    availability: 'Available Today',
    nextSlot: 'Today, 02:45 PM',
    bio: 'Dr. Sharma leads precision oncology and targeted immunotherapies at LifeCare Cancer Institute, working with multidisciplinary tumor boards to customize curative treatment plans.'
  }
];

/* ==========================================================================
   2. NAVBAR & HEADER BEHAVIOR
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.main-header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile nav on click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* ==========================================================================
   3. DOCTOR DIRECTORY & FILTERING
   ========================================================================== */
function initDoctorDirectory() {
  const container = document.getElementById('doctorsGridContainer');
  const searchInput = document.getElementById('doctorSearchInput');
  const deptSelect = document.getElementById('doctorDeptFilter');

  if (!container) return;

  function renderDoctors(list) {
    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1;">
          <i class="fa-solid fa-user-doctor" style="font-size: 3rem; color: #94a3b8; margin-bottom: 12px;"></i>
          <h3 style="color: #0f172a; margin-bottom: 6px;">No Specialists Found</h3>
          <p style="color: #64748b;">Try adjusting your search criteria or selecting a different specialty department.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(doc => `
      <div class="doctor-card" data-id="${doc.id}">
        <div class="doctor-img-wrap">
          <img src="${doc.image}" alt="${doc.name}" class="doctor-img" loading="lazy">
          <div class="doctor-availability-badge badge-available">
            <span class="dot"></span>
            <span>${doc.availability}</span>
          </div>
          <div class="doctor-rating-badge">
            <i class="fa-solid fa-star"></i>
            <span>${doc.rating} (${doc.reviews})</span>
          </div>
        </div>
        <div class="doctor-body">
          <span class="doctor-specialty">${doc.specialty}</span>
          <h3 class="doctor-name">${doc.name}</h3>
          <p class="doctor-degrees">${doc.degrees}</p>
          
          <div class="doctor-stats">
            <div class="doctor-stat-item">
              <span>${doc.experience}</span>
              <span style="font-size:0.75rem; color:#64748b;">Clinical Practice</span>
            </div>
            <div class="doctor-stat-item" style="text-align: right;">
              <span style="color: #0066cc;">${doc.fee}</span>
              <span style="font-size:0.75rem; color:#64748b;">Consultation</span>
            </div>
          </div>

          <div style="font-size: 0.8rem; color: #059669; font-weight: 600; margin-bottom: 14px; display:flex; align-items:center; gap:6px;">
            <i class="fa-regular fa-clock"></i> Next Slot: ${doc.nextSlot}
          </div>

          <div class="doctor-actions">
            <button type="button" class="btn btn-secondary btn-sm" onclick="openDoctorModal('${doc.id}')">
              <i class="fa-solid fa-id-card"></i> Profile
            </button>
            <button type="button" class="btn btn-primary btn-sm" onclick="selectDoctorForBooking('${doc.name}', '${doc.deptKey}')">
              <i class="fa-solid fa-calendar-check"></i> Book
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function filterDoctors() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const dept = deptSelect ? deptSelect.value : 'all';

    const filtered = doctorsData.filter(doc => {
      const matchesQuery = doc.name.toLowerCase().includes(query) ||
                           doc.specialty.toLowerCase().includes(query) ||
                           doc.degrees.toLowerCase().includes(query);
      const matchesDept = (dept === 'all') || (doc.deptKey === dept);
      return matchesQuery && matchesDept;
    });

    renderDoctors(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterDoctors);
  if (deptSelect) deptSelect.addEventListener('change', filterDoctors);

  // Initial render
  renderDoctors(doctorsData);
}

// Global modal triggers
window.openDoctorModal = function(docId) {
  const doc = doctorsData.find(d => d.id === docId);
  if (!doc) return;

  const modalContainer = document.getElementById('doctorModalContent');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div style="display: flex; gap: 24px; align-items: center; margin-bottom: 24px; flex-wrap: wrap;">
      <img src="${doc.image}" alt="${doc.name}" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 4px solid #0066cc;">
      <div>
        <span style="background: #e8f2fc; color: #0066cc; font-size: 0.8rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">${doc.specialty}</span>
        <h2 style="font-size: 1.6rem; color: #0a2540; margin-top: 6px;">${doc.name}</h2>
        <p style="color: #64748b; font-size: 0.88rem;">${doc.degrees}</p>
        <p style="color: #059669; font-weight: 700; font-size: 0.85rem; margin-top: 4px;">
          <i class="fa-solid fa-location-dot"></i> ${doc.room}
        </p>
      </div>
    </div>

    <div style="background: #f8fafc; padding: 18px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
      <h4 style="font-size: 0.95rem; color: #0a2540; margin-bottom: 6px;">Clinical Biography & Expertise</h4>
      <p style="font-size: 0.9rem; color: #475569; line-height: 1.6;">${doc.bio}</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; text-align: center;">
      <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px;">
        <span style="font-size: 0.75rem; color: #64748b; display: block;">Experience</span>
        <strong style="color: #0a2540; font-size: 1.1rem;">${doc.experience.split(' ')[0]}</strong>
      </div>
      <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px;">
        <span style="font-size: 0.75rem; color: #64748b; display: block;">Rating</span>
        <strong style="color: #f59e0b; font-size: 1.1rem;"><i class="fa-solid fa-star"></i> ${doc.rating}</strong>
      </div>
      <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px;">
        <span style="font-size: 0.75rem; color: #64748b; display: block;">Fee</span>
        <strong style="color: #0066cc; font-size: 1.1rem;">${doc.fee}</strong>
      </div>
    </div>

    <div style="display: flex; gap: 12px; justify-content: flex-end;">
      <button class="btn btn-secondary" onclick="closeModal('doctorProfileModal')">Close</button>
      <button class="btn btn-primary" onclick="closeModal('doctorProfileModal'); selectDoctorForBooking('${doc.name}', '${doc.deptKey}')">
        <i class="fa-solid fa-calendar-check"></i> Book Consultation
      </button>
    </div>
  `;

  openModal('doctorProfileModal');
};

window.selectDoctorForBooking = function(docName, deptKey) {
  // Populate dropdowns in the booking section
  const deptSelect = document.getElementById('bookDepartment');
  const docSelect = document.getElementById('bookDoctor');

  if (deptSelect && deptKey) {
    deptSelect.value = deptKey;
    populateDoctorSelect(deptKey);
  }

  if (docSelect && docName) {
    docSelect.value = docName;
  }

  // Scroll to booking section smoothly
  const bookingSec = document.getElementById('appointment-booking');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
    showToast(`Selected ${docName}. Please choose your date and time slot.`);
  }
};

/* ==========================================================================
   4. DEPARTMENT TABS FILTER
   ========================================================================== */
function initDepartmentFilter() {
  const tabs = document.querySelectorAll('.dept-tab-btn');
  const cards = document.querySelectorAll('.dept-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-category');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE APPOINTMENT BOOKING SYSTEM
   ========================================================================== */
function initBookingSystem() {
  const form = document.getElementById('appointmentForm');
  const deptSelect = document.getElementById('bookDepartment');
  const docSelect = document.getElementById('bookDoctor');
  const slotButtons = document.querySelectorAll('.slot-btn');
  const timeSlotInput = document.getElementById('bookTimeSlot');
  const visitTypeButtons = document.querySelectorAll('.type-toggle-btn');
  const visitTypeInput = document.getElementById('bookVisitType');
  const datePicker = document.getElementById('bookDate');

  // Set minimum date to today
  if (datePicker) {
    const today = new Date().toISOString().split('T')[0];
    datePicker.min = today;
    datePicker.value = today;
  }

  // Time slot buttons handler
  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (timeSlotInput) {
        timeSlotInput.value = btn.getAttribute('data-slot');
      }
    });
  });

  // Visit Type toggle
  visitTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      visitTypeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (visitTypeInput) {
        visitTypeInput.value = btn.getAttribute('data-type');
      }
    });
  });

  // Department change triggers doctor dropdown update
  if (deptSelect) {
    deptSelect.addEventListener('change', () => {
      populateDoctorSelect(deptSelect.value);
    });
  }

  // Booking Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookName').value.trim();
      const phone = document.getElementById('bookPhone').value.trim();
      const email = document.getElementById('bookEmail').value.trim();
      const dept = deptSelect.options[deptSelect.selectedIndex].text;
      const doctor = docSelect.value || 'Senior Consultant On-Duty';
      const date = datePicker.value;
      const time = timeSlotInput.value || '09:30 AM';
      const visitType = visitTypeInput ? visitTypeInput.value : 'In-Person Consultation';

      if (!name || !phone || !email) {
        showToast('Please fill in all required patient information fields.', 'error');
        return;
      }

      // Generate unique token
      const tokenNumber = 'LC-APT-' + Math.floor(100000 + Math.random() * 900000);
      const roomAssigned = doctor.includes('Jenkins') ? 'Cardio Suite 302' :
                           doctor.includes('Vance') ? 'Neuro Block 405' :
                           doctor.includes('Chen') ? 'Ortho Wing 204' :
                           doctor.includes('Rostova') ? 'Pediatric Wing 108' :
                           doctor.includes('Hayes') ? 'Trauma Center' : 'Consultation Wing A-12';

      // Render slip in confirmation modal
      const slipContainer = document.getElementById('confirmationSlipContent');
      if (slipContainer) {
        slipContainer.innerHTML = `
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: #ecfdf5; color: #059669; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 12px;">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <h2 style="color: #0a2540; font-size: 1.5rem; margin-bottom: 4px;">Appointment Confirmed!</h2>
            <p style="color: #64748b; font-size: 0.88rem;">An SMS and email confirmation have been sent to ${email}.</p>
          </div>

          <div class="confirmation-slip">
            <div class="slip-header">
              <div>
                <strong style="color: #0a2540; font-size: 1.1rem; display: block;">LifeCare Hospital</strong>
                <span style="font-size: 0.78rem; color: #64748b;">Outpatient Booking Pass</span>
              </div>
              <span class="slip-token">${tokenNumber}</span>
            </div>

            <div class="slip-rows">
              <div class="slip-row-item">
                <label>Patient Name</label>
                <span>${name}</span>
              </div>
              <div class="slip-row-item">
                <label>Contact Phone</label>
                <span>${phone}</span>
              </div>
              <div class="slip-row-item">
                <label>Specialist Doctor</label>
                <span>${doctor}</span>
              </div>
              <div class="slip-row-item">
                <label>Department</label>
                <span>${dept}</span>
              </div>
              <div class="slip-row-item">
                <label>Date & Time</label>
                <span>${date} | ${time}</span>
              </div>
              <div class="slip-row-item">
                <label>Room / Facility</label>
                <span>${roomAssigned}</span>
              </div>
              <div class="slip-row-item">
                <label>Consultation Format</label>
                <span style="color: #0066cc;">${visitType}</span>
              </div>
              <div class="slip-row-item">
                <label>Payment Mode</label>
                <span>Pay at Hospital Desk / Cashless TPA</span>
              </div>
            </div>
          </div>

          <div style="background: #eff6ff; padding: 12px 16px; border-radius: 8px; font-size: 0.82rem; color: #1e40af; margin-bottom: 24px; display: flex; align-items: center; gap: 10px;">
            <i class="fa-solid fa-circle-info" style="font-size: 1.1rem;"></i>
            <span>Please arrive 15 minutes prior to your designated slot with your photo ID and previous medical records.</span>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">
            <button class="btn btn-secondary" onclick="window.print()">
              <i class="fa-solid fa-print"></i> Print Slip
            </button>
            <button class="btn btn-primary" onclick="closeModal('bookingConfirmationModal')">
              <i class="fa-solid fa-check"></i> Done
            </button>
          </div>
        `;
        openModal('bookingConfirmationModal');
        showToast('Appointment successfully scheduled!');
        form.reset();
      }
    });
  }
}

function populateDoctorSelect(deptKey) {
  const docSelect = document.getElementById('bookDoctor');
  if (!docSelect) return;

  docSelect.innerHTML = '<option value="">Select Doctor</option>';

  const filtered = deptKey && deptKey !== 'all' 
    ? doctorsData.filter(d => d.deptKey === deptKey)
    : doctorsData;

  filtered.forEach(doc => {
    const opt = document.createElement('option');
    opt.value = doc.name;
    opt.textContent = `${doc.name} (${doc.specialty})`;
    docSelect.appendChild(opt);
  });
}

/* ==========================================================================
   6. PATIENT PORTAL & LAB REPORT CHECKER
   ========================================================================== */
const mockLabReports = {
  'LC-84920': {
    patientName: 'Michael Vance',
    patientId: 'LC-84920',
    age: 46,
    gender: 'Male',
    date: '2026-09-27',
    doctor: 'Dr. Sarah Jenkins (Cardiology)',
    testTitle: 'Complete Blood Count (CBC) & Advanced Lipid Profile',
    status: 'Ready for Download',
    tests: [
      { name: 'Hemoglobin (Hb)', result: '14.8 g/dL', ref: '13.5 - 17.5 g/dL', status: 'Normal' },
      { name: 'Total White Blood Cells (WBC)', result: '6,400 /uL', ref: '4,500 - 11,000 /uL', status: 'Normal' },
      { name: 'Platelet Count', result: '240,000 /uL', ref: '150,000 - 450,000 /uL', status: 'Normal' },
      { name: 'Total Cholesterol', result: '192 mg/dL', ref: '< 200 mg/dL', status: 'Normal' },
      { name: 'Triglycerides', result: '145 mg/dL', ref: '< 150 mg/dL', status: 'Normal' },
      { name: 'HDL Cholesterol (Good)', result: '48 mg/dL', ref: '> 40 mg/dL', status: 'Normal' },
      { name: 'LDL Cholesterol (Bad)', result: '115 mg/dL', ref: '< 100 mg/dL', status: 'Borderline' }
    ],
    remarks: 'Lipid panel indicates optimal cardiac biomarkers. Recommend regular aerobic exercise and low saturated fat Mediterranean diet. Routine follow-up in 6 months.'
  },
  'LC-55102': {
    patientName: 'Sarah Williams',
    patientId: 'LC-55102',
    age: 38,
    gender: 'Female',
    date: '2026-09-26',
    doctor: 'Dr. Marcus Vance (Neurology)',
    testTitle: 'Brain MRI & Neurovascular Imaging',
    status: 'Ready for Download',
    tests: [
      { name: 'Cerebral Parenchyma', result: 'Normal anatomical volume', ref: 'Normal', status: 'Normal' },
      { name: 'Ventricular System', result: 'Normal dimensions & symmetry', ref: 'Normal', status: 'Normal' },
      { name: 'Intracranial Vasculature', result: 'No aneurysm or stenoses', ref: 'Patent flow', status: 'Normal' },
      { name: 'White Matter Signal', result: 'Unremarkable', ref: 'No ischemia', status: 'Normal' }
    ],
    remarks: 'Clear intracranial scan. No space occupying lesion or vascular malformation identified. Migraine management protocol initiated.'
  },
  'LC-99314': {
    patientName: 'David Miller',
    patientId: 'LC-99314',
    age: 52,
    gender: 'Male',
    date: '2026-09-28',
    doctor: 'Dr. Robert Hayes (Trauma Care)',
    testTitle: 'Comprehensive Metabolic Panel & Liver Function Test',
    status: 'Processing (Ready in 2 Hours)',
    tests: [],
    remarks: 'Specimen under robotic biochemical analysis in LifeCare Central Pathology Lab.'
  }
};

function initLabPortal() {
  const searchBtn = document.getElementById('searchLabReportBtn');
  const input = document.getElementById('labReportInput');
  const resultCard = document.getElementById('reportResultCard');
  const sampleChips = document.querySelectorAll('.sample-chip');

  sampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const code = chip.getAttribute('data-code');
      if (input) input.value = code;
      checkReport(code);
    });
  });

  if (searchBtn && input) {
    searchBtn.addEventListener('click', () => {
      checkReport(input.value.trim().toUpperCase());
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        checkReport(input.value.trim().toUpperCase());
      }
    });
  }

  function checkReport(code) {
    if (!code) {
      showToast('Please enter a valid Patient ID or Report Code.', 'error');
      return;
    }

    const report = mockLabReports[code];

    if (!resultCard) return;

    if (!report) {
      resultCard.style.display = 'block';
      resultCard.innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.2rem; color: #e11d48; margin-bottom: 10px;"></i>
          <h4 style="color: #0a2540; font-size: 1.15rem; margin-bottom: 6px;">Report Not Found for ID: ${code}</h4>
          <p style="color: #64748b; font-size: 0.88rem;">Please check the ID printed on your lab bill receipt (e.g., LC-84920) or contact the 24/7 Pathology Help Desk at 1-800-LIFE-CARE.</p>
        </div>
      `;
      return;
    }

    const isReady = report.status.includes('Ready');

    resultCard.style.display = 'block';
    resultCard.innerHTML = `
      <div class="report-header">
        <div class="report-patient-info">
          <h4>${report.patientName} (${report.gender}, ${report.age} yrs)</h4>
          <span>Patient ID: <strong>${report.patientId}</strong> | Test Date: ${report.date}</span>
        </div>
        <span class="status-badge ${isReady ? 'status-ready' : 'status-pending'}">
          <i class="fa-solid ${isReady ? 'fa-circle-check' : 'fa-clock'}"></i> ${report.status}
        </span>
      </div>

      <div class="report-details-grid">
        <div class="report-detail-item">
          <label>Investigation Name</label>
          <span>${report.testTitle}</span>
        </div>
        <div class="report-detail-item">
          <label>Referring Physician</label>
          <span>${report.doctor}</span>
        </div>
        <div class="report-detail-item">
          <label>Laboratory Center</label>
          <span>LifeCare Central Diagnostic Wing</span>
        </div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 16px;">
        ${isReady ? `
          <button class="btn btn-secondary btn-sm" onclick="viewLabReportDetails('${report.patientId}')">
            <i class="fa-solid fa-file-waveform"></i> View Diagnostic Sheet
          </button>
          <button class="btn btn-primary btn-sm" onclick="downloadMockPdf('${report.patientId}')">
            <i class="fa-solid fa-download"></i> Download Verified PDF
          </button>
        ` : `
          <span style="font-size: 0.85rem; color: #d97706; font-weight: 600;">
            <i class="fa-solid fa-spinner fa-spin"></i> Tests currently in progress. Refresh in a while.
          </span>
        `}
      </div>
    `;
  }
}

window.viewLabReportDetails = function(reportId) {
  const report = mockLabReports[reportId];
  if (!report) return;

  const modal = document.getElementById('labReportModalContent');
  if (!modal) return;

  const tableRows = report.tests.map(t => `
    <tr>
      <td><strong>${t.name}</strong></td>
      <td><strong>${t.result}</strong></td>
      <td style="color: #64748b;">${t.ref}</td>
      <td><span class="${t.status === 'Normal' ? 'val-normal' : 'val-flag'}">${t.status}</span></td>
    </tr>
  `).join('');

  modal.innerHTML = `
    <div style="border-bottom: 2px solid #0066cc; padding-bottom: 14px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h2 style="color: #0a2540; font-size: 1.5rem; line-height: 1.1;">LifeCare Hospital</h2>
        <span style="font-size: 0.75rem; color: #0066cc; font-weight: 700; letter-spacing: 1px;">CENTRAL CLINICAL PATHOLOGY & IMAGING</span>
      </div>
      <div style="text-align: right; font-size: 0.8rem; color: #64748b;">
        <span>Accredited: CAP & ISO 15189</span><br>
        <strong>Report #${report.patientId}</strong>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.85rem; background: #f8fafc; padding: 14px; border-radius: 8px; margin-bottom: 16px;">
      <div><strong>Patient Name:</strong> ${report.patientName} (${report.age} yrs / ${report.gender})</div>
      <div><strong>Report Date:</strong> ${report.date}</div>
      <div><strong>Referred By:</strong> ${report.doctor}</div>
      <div><strong>Status:</strong> <span style="color: #059669; font-weight: 700;">Verified & Released</span></div>
    </div>

    <h4 style="font-size: 1rem; color: #0a2540; margin-bottom: 8px;">${report.testTitle}</h4>

    <table class="lab-table">
      <thead>
        <tr>
          <th>Investigation Parameter</th>
          <th>Observed Value</th>
          <th>Reference Range</th>
          <th>Flag</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>

    <div style="background: #f0fdf4; border-left: 4px solid #059669; padding: 12px; margin-bottom: 20px; font-size: 0.85rem; color: #166534;">
      <strong>Pathologist Clinical Impression:</strong><br>
      ${report.remarks}
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 14px; font-size: 0.8rem; color: #64748b;">
      <div>
        <i class="fa-solid fa-shield-halved" style="color: #059669;"></i> Digitally Verified & Tamper-Proof Cryptographic Hash
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn btn-secondary btn-sm" onclick="window.print()">
          <i class="fa-solid fa-print"></i> Print
        </button>
        <button class="btn btn-primary btn-sm" onclick="closeModal('labReportModal')">
          Close
        </button>
      </div>
    </div>
  `;

  openModal('labReportModal');
};

window.downloadMockPdf = function(reportId) {
  showToast(`Generating certified PDF for Report ${reportId}...`);
  setTimeout(() => {
    window.viewLabReportDetails(reportId);
    showToast('Verified Diagnostic Report opened in print-ready layout.');
  }, 600);
};

/* ==========================================================================
   7. 24/7 EMERGENCY & AMBULANCE DISPATCH SIMULATOR
   ========================================================================== */
function initAmbulanceDispatch() {
  const form = document.getElementById('ambulanceDispatchForm');
  const tracker = document.getElementById('dispatchTracker');
  const etaText = document.getElementById('dispatchEtaText');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = document.getElementById('ambulanceAddress').value.trim();
    const phone = document.getElementById('ambulancePhone').value.trim();

    if (!address || !phone) {
      showToast('Please provide immediate pickup address and callback phone.', 'error');
      return;
    }

    if (tracker) {
      tracker.style.display = 'block';
      tracker.innerHTML = `
        <div class="tracker-status">
          <i class="fa-solid fa-spinner fa-spin"></i> Locating Nearest Mobile ICU Ambulance...
        </div>
        <div class="tracker-eta">Pinging GPS coordinates for "${address}"...</div>
      `;

      setTimeout(() => {
        tracker.innerHTML = `
          <div class="tracker-status">
            <i class="fa-solid fa-truck-medical" style="color: #e11d48;"></i> LifeCare Mobile ICU Unit #14 DISPATCHED!
          </div>
          <div class="tracker-eta">
            <strong>Estimated Arrival: 7 Minutes</strong><br>
            Paramedic In-Charge: Officer James Cole & Triage RN Lisa Vance.<br>
            Emergency Dispatch Desk has rung ${phone}. Keep line open!
          </div>
        `;
        showToast('AMBULANCE DISPATCH CONFIRMED! Siren Unit #14 is en route.', 'error');
      }, 1800);
    }
  });
}

/* ==========================================================================
   8. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   9. INTERACTIVE AI HEALTH ASSISTANT CHAT WIDGET
   ========================================================================== */
function initChatWidget() {
  const triggerBtn = document.getElementById('chatWidgetBtn');
  const chatWindow = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatCloseBtn');
  const sendBtn = document.getElementById('chatSendBtn');
  const chatInput = document.getElementById('chatInput');
  const msgContainer = document.getElementById('chatMessages');
  const chips = document.querySelectorAll('.chat-chip');

  if (!triggerBtn || !chatWindow) return;

  triggerBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active') && chatInput) {
      chatInput.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.textContent.trim();
      handleUserMessage(text);
    });
  });

  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
      const text = chatInput.value.trim();
      if (text) {
        handleUserMessage(text);
        chatInput.value = '';
      }
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const text = chatInput.value.trim();
        if (text) {
          handleUserMessage(text);
          chatInput.value = '';
        }
      }
    });
  }

  function handleUserMessage(userText) {
    appendMessage(userText, 'user');

    // Bot response logic
    setTimeout(() => {
      const botResponse = generateBotReply(userText.toLowerCase());
      appendMessage(botResponse, 'bot');
    }, 450);
  }

  function appendMessage(text, sender) {
    if (!msgContainer) return;

    const div = document.createElement('div');
    div.className = `chat-msg chat-msg-${sender}`;
    div.innerHTML = text;
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function generateBotReply(q) {
    if (q.includes('book') || q.includes('appointment') || q.includes('schedule')) {
      return `You can book an appointment directly through our online system! <br><br>
      <a href="#appointment-booking" style="display:inline-block; margin-top:4px; font-weight:700; color:#0066cc;" onclick="document.getElementById('chatWindow').classList.remove('active');">
        👉 Click here to Book Appointment
      </a>`;
    }
    if (q.includes('emergency') || q.includes('ambulance') || q.includes('urgent')) {
      return `🚨 <strong>24/7 Emergency Alert:</strong><br>
      Please call our direct Trauma Hotline at <strong style="color:#e11d48;">1-800-LIFE-CARE</strong> or +1 (800) 543-3227. Our mobile ICU ambulances arrive in under 8 minutes.`;
    }
    if (q.includes('report') || q.includes('lab') || q.includes('test') || q.includes('blood')) {
      return `🔬 <strong>Diagnostic Lab Reports:</strong><br>
      Enter your Patient ID (e.g. <code>LC-84920</code>) in our Lab Portal below to download your verified test results. <br>
      <a href="#lab-portal" style="font-weight:700; color:#0066cc;" onclick="document.getElementById('chatWindow').classList.remove('active');">
        Go to Patient Lab Portal &rarr;
      </a>`;
    }
    if (q.includes('doctor') || q.includes('specialist') || q.includes('cardio') || q.includes('neuro')) {
      return `👨‍⚕️ LifeCare Hospital has over 250 board-certified specialists in Cardiology, Neurology, Orthopedics, Pediatrics, and Oncology.<br>
      <a href="#doctors" style="font-weight:700; color:#0066cc;" onclick="document.getElementById('chatWindow').classList.remove('active');">
        View Doctors Directory &rarr;
      </a>`;
    }
    if (q.includes('hour') || q.includes('timing') || q.includes('visiting')) {
      return `🕒 <strong>Visiting & OPD Hours:</strong><br>
      • Emergency & Trauma: <strong>24 Hours / 7 Days</strong><br>
      • Outpatient Consultations: <strong>08:00 AM - 08:00 PM</strong><br>
      • Inpatient Visiting Hours: <strong>10:00 AM - 01:00 PM & 05:00 PM - 07:30 PM</strong>`;
    }
    if (q.includes('insurance') || q.includes('cashless') || q.includes('cost') || q.includes('tpa')) {
      return `💳 We partner with over 45+ premier health insurance providers including BlueCross, Aetna, Cigna, and UnitedHealthcare for 100% cashless claims. Our TPA desk handles all approvals in under 45 minutes.`;
    }
    return `Thank you for contacting LifeCare Hospital! I can assist you with booking doctor appointments, emergency assistance, lab report tracking, or hospital directions. What would you like help with?`;
  }
}

/* ==========================================================================
   10. MODAL UTILITIES
   ========================================================================== */
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Close modal when clicking outside overlay
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ==========================================================================
   11. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
window.showToast = function(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}" style="color: ${type === 'success' ? '#059669' : '#e11d48'}; font-size: 1.2rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

/* ==========================================================================
   12. SMOOTH SCROLL & ACTIVE LINK SPY
   ========================================================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
