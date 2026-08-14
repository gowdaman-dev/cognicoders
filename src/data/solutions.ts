import {
  Fingerprint,
  IdentificationBadge,
  Clock,
  ShieldCheck,
  ForkKnife,
  Queue,
  Kanban,
  GearSix,
  UsersThree,
  Hospital,
  type Icon,
} from '@phosphor-icons/react'

export interface Solution {
  slug: string
  icon: Icon
  name: string
  tagline: string
  desc: string
  idealFor: string
  benefits: string[]
  features: { title: string; desc: string }[]
}

export const SOLUTIONS: Solution[] = [
  {
    icon: Fingerprint,
    slug: 'face-recognition-system',
    name: 'Face Recognition System',
    tagline: 'AI-Powered Identity Verification You Can Trust',
    desc: 'Identify and authenticate people in real time with advanced facial recognition. Power contactless access, attendance and security across your facilities — fast, accurate and privacy-conscious by design.',
    idealFor: 'Used across secure facilities, offices, campuses and high-traffic entry points.',
    benefits: [
      'Strengthen security with reliable identity verification.',
      'Eliminate cards, PINs and shared credentials.',
      'Power attendance and access from a single technology.',
    ],
    features: [
      { title: 'Real-Time Recognition', desc: 'Identify enrolled individuals in seconds, even at scale.' },
      { title: 'Contactless Access', desc: 'Enable touch-free entry for doors, gates and turnstiles.' },
      { title: 'Liveness Detection', desc: 'Prevent spoofing with anti-fraud liveness checks.' },
      { title: 'Watchlist Alerts', desc: 'Flag unauthorized individuals instantly to security.' },
      { title: 'Seamless Integration', desc: 'Connect with attendance, visitor and access systems.' },
    ],
  },
  {
    icon: IdentificationBadge,
    slug: 'visitor-management-system',
    name: 'Visitor Management System',
    tagline: 'A Professional, Secure First Impression for Every Guest',
    desc: 'Modernize your front desk with a digital check-in experience that is fast for visitors and secure for you. Handle pre-registration, on-site check-in, badge printing and host notifications — while keeping a complete record of who is on your premises.',
    idealFor: 'Perfect for corporate offices, secure facilities, hospitals and campuses.',
    benefits: [
      'Enhance security and emergency evacuation accuracy.',
      'Project a modern, professional brand image.',
      'Maintain a digital, searchable visitor log.',
    ],
    features: [
      { title: 'Pre-Registration', desc: 'Invite guests in advance with QR-coded passes for fast entry.' },
      { title: 'Self Check-In Kiosk', desc: 'Capture details, photos and signatures in seconds.' },
      { title: 'Badge Printing', desc: 'Print professional visitor badges automatically on arrival.' },
      { title: 'Host Notifications', desc: 'Alert employees instantly when their guest arrives.' },
      { title: 'Watchlist & Compliance', desc: 'Screen visitors, capture agreements and meet security policies.' },
    ],
  },
  {
    icon: Clock,
    slug: 'time-and-attendance-system',
    name: 'Time & Attendance System',
    tagline: 'Accurate Workforce Tracking, Without the Guesswork',
    desc: 'Capture attendance precisely and effortlessly across shifts, sites and teams. Combine biometric, card and mobile capture with powerful scheduling and reporting for a real-time view of your workforce.',
    idealFor: 'Suited to organizations managing hourly, shift-based or multi-site workforces.',
    benefits: [
      'Eliminate buddy-punching and time fraud.',
      'Save hours of manual timesheet reconciliation.',
      'Improve payroll accuracy and employee trust.',
    ],
    features: [
      { title: 'Multi-Mode Capture', desc: 'Biometric, face recognition, RFID card and mobile check-in.' },
      { title: 'Shift & Roster Management', desc: 'Build schedules, manage rotations and overtime rules.' },
      { title: 'Leave Management', desc: 'Apply, approve and track leave with full visibility.' },
      { title: 'Real-Time Dashboards', desc: 'Monitor presence, lateness and absence as it happens.' },
      { title: 'Payroll Integration', desc: 'Export verified hours directly to payroll and HRMS.' },
    ],
  },
  {
    icon: ShieldCheck,
    slug: 'safety-induction-system',
    name: 'Safety Induction System',
    tagline: 'Digital Safety Onboarding for Every Worker and Visitor',
    desc: 'Ensure everyone entering your site understands the rules before they step on the floor. Digitize onboarding, training and compliance for employees, contractors and visitors — replacing paper forms with a fast, trackable workflow.',
    idealFor: 'Ideal for manufacturing plants, construction sites and warehouses.',
    benefits: [
      'Reduce onboarding time and paperwork.',
      'Strengthen regulatory compliance and audit readiness.',
      'Lower incident risk through consistent training.',
    ],
    features: [
      { title: 'Digital Inductions', desc: 'Deliver interactive modules with videos, quizzes and acknowledgements.' },
      { title: 'Kiosk & Mobile', desc: 'Complete inductions on-site or on personal devices.' },
      { title: 'Certification & Expiry', desc: 'Track competencies and flag expiring certifications.' },
      { title: 'Compliance Records', desc: 'Keep an audit-ready log of who completed what and when.' },
      { title: 'Multi-Language', desc: 'Reach a diverse workforce in their preferred language.' },
    ],
  },
  {
    icon: ForkKnife,
    slug: 'meal-management-system',
    name: 'Meal Management System',
    tagline: 'Effortless Cafeteria and Meal Operations',
    desc: 'Take the friction out of feeding your workforce. Manage meal booking, allocation, counting and billing — reducing waste, controlling costs and giving employees a smooth dining experience.',
    idealFor: 'Ideal for factories, campuses, hospitals and corporate canteens.',
    benefits: [
      'Reduce food wastage and procurement costs.',
      'Simplify billing and subsidy management.',
      'Improve the employee dining experience.',
    ],
    features: [
      { title: 'Meal Booking', desc: 'Let staff pre-book meals via app, kiosk or card.' },
      { title: 'Headcount Forecasting', desc: 'Plan kitchen quantities accurately to cut waste.' },
      { title: 'Cashless Payments', desc: 'Support payroll deduction, wallets and subsidies.' },
      { title: 'Menu & Vendor Management', desc: 'Manage menus, pricing and multiple vendors.' },
      { title: 'Consumption Reports', desc: 'Track usage and costs by department, shift or site.' },
    ],
  },
  {
    icon: Queue,
    slug: 'queue-management-system',
    name: 'Queue Management System',
    tagline: 'Turn Waiting Lines into Smooth, Organized Flows',
    desc: 'Replace chaotic queues with an orderly, transparent experience. Issue tokens, route visitors to the right counter, and keep everyone informed — improving satisfaction and staff efficiency.',
    idealFor: 'Well suited to hospitals, clinics, banks and government offices.',
    benefits: [
      'Reduce perceived and actual waiting times.',
      'Balance staff workload across counters.',
      'Improve customer and patient satisfaction.',
    ],
    features: [
      { title: 'Token & Ticketing', desc: 'Issue digital or printed tokens via kiosk, web or mobile.' },
      { title: 'Smart Routing', desc: 'Direct customers to the right counter automatically.' },
      { title: 'Display & Announcements', desc: 'Show live queue status with audio call-outs.' },
      { title: 'Appointment Integration', desc: 'Blend walk-ins with scheduled appointments.' },
      { title: 'Analytics', desc: 'Measure wait times, service times and peak load.' },
    ],
  },
  {
    icon: Kanban,
    slug: 'project-management-system',
    name: 'Project Management System',
    tagline: 'Plan, Track and Deliver Every Project with Confidence',
    desc: 'Keep teams aligned and projects on schedule. Bring tasks, timelines, resources and collaboration into one workspace so you always know where every project stands.',
    idealFor: 'Built for project-driven teams in IT, engineering and services.',
    benefits: [
      'Improve on-time, on-budget delivery.',
      'Increase visibility for stakeholders.',
      'Reduce status meetings with live dashboards.',
    ],
    features: [
      { title: 'Task & Milestone Tracking', desc: 'Break work into tasks and monitor progress.' },
      { title: 'Gantt & Kanban Views', desc: 'Visualize plans from timelines to boards.' },
      { title: 'Resource Allocation', desc: 'Assign people and balance workloads.' },
      { title: 'Time & Budget Tracking', desc: 'Log effort and keep projects within budget.' },
      { title: 'Collaboration & Files', desc: 'Centralize discussions, documents and updates.' },
    ],
  },
  {
    icon: GearSix,
    slug: 'erp',
    name: 'Enterprise Resource Planning (ERP)',
    tagline: 'One Connected System to Run Your Entire Business',
    desc: 'Unify finance, inventory, sales, procurement and operations in a single source of truth. Eliminate data silos and give leadership real-time insight to make better decisions.',
    idealFor: 'Designed for growing SMEs and enterprises consolidating systems.',
    benefits: [
      'Eliminate duplicate data entry across departments.',
      'Gain a unified, real-time view of the business.',
      'Scale operations without adding complexity.',
    ],
    features: [
      { title: 'Finance & Accounting', desc: 'Manage ledgers, invoicing, payments and reporting.' },
      { title: 'Inventory & Procurement', desc: 'Track stock, suppliers and purchase orders.' },
      { title: 'Sales & CRM', desc: 'Manage the customer journey from lead to fulfillment.' },
      { title: 'Reporting & Analytics', desc: 'Drive decisions with dashboards and reports.' },
      { title: 'Modular & Scalable', desc: 'Start with what you need and expand over time.' },
    ],
  },
  {
    icon: UsersThree,
    slug: 'hrms',
    name: 'Human Resource Management System (HRMS)',
    tagline: 'Manage the Entire Employee Lifecycle in One Place',
    desc: 'From hire to retire, centralize every HR function. Automate routine tasks, empower employees with self-service, and give HR the data and tools to support a thriving workforce.',
    idealFor: 'Ideal for organizations modernizing and unifying HR operations.',
    benefits: [
      'Reduce HR administrative workload.',
      'Improve employee experience and engagement.',
      'Ensure compliance and data accuracy.',
    ],
    features: [
      { title: 'Employee Records', desc: 'Maintain a secure, single source of employee data.' },
      { title: 'Recruitment & Onboarding', desc: 'Manage hiring pipelines and digital onboarding.' },
      { title: 'Payroll & Compensation', desc: 'Process payroll accurately with compliance.' },
      { title: 'Performance Management', desc: 'Set goals, run reviews and track development.' },
      { title: 'Self-Service Portal', desc: 'Let employees manage leave, payslips and details.' },
    ],
  },
  {
    icon: Hospital,
    slug: 'hospital-management-system',
    name: 'Hospital Management System',
    tagline: 'End-to-End Software for Modern Healthcare Operations',
    desc: 'Run your entire facility from a single, integrated platform. Connect patient care, clinical workflows, administration and billing — helping providers deliver better care with less administrative burden.',
    idealFor: 'Built for hospitals, clinics, diagnostic centers and multi-specialty facilities.',
    benefits: [
      'Improve patient experience and reduce wait times.',
      'Streamline billing and revenue cycle management.',
      'Centralize clinical and operational data securely.',
    ],
    features: [
      { title: 'Patient Registration & EMR', desc: 'Manage records, history and electronic medical records.' },
      { title: 'Appointments & OPD/IPD', desc: 'Handle scheduling, outpatient and inpatient workflows.' },
      { title: 'Billing & Insurance', desc: 'Automate invoicing, claims and payment tracking.' },
      { title: 'Pharmacy & Inventory', desc: 'Manage medicines, stock and supplies in real time.' },
      { title: 'Lab & Diagnostics', desc: 'Order tests and capture results in the patient record.' },
    ],
  },
]
