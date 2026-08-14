import { SOLUTIONS } from './solutions'

export const SITE = {
  name: 'CogniCoders',
  url: 'https://cognicoders.in',
  email: 'info@cognicoders.in',
  description:
    'CogniCoders builds AI-powered software for identity, workforce and visitor management — face recognition attendance, time & attendance, visitor management, queue management, safety induction and HRMS for security, healthcare and enterprise.',
}

const SOLUTION_KEYWORDS: Record<string, string[]> = {
  'face-recognition-system': [
    'face recognition attendance system',
    'facial recognition access control',
    'face recognition software India',
    'AI attendance system',
    'touchless attendance',
  ],
  'visitor-management-system': [
    'visitor management system',
    'visitor management software India',
    'digital visitor log',
    'visitor registration kiosk',
    'front desk software',
  ],
  'time-and-attendance-system': [
    'time and attendance software',
    'biometric attendance system',
    'attendance management software',
    'shift scheduling software',
    'employee time tracking',
  ],
  'safety-induction-system': [
    'safety induction software',
    'digital induction onboarding',
    'contractor induction management',
    'workplace safety compliance',
    'safety training software',
  ],
  'meal-management-system': [
    'canteen management software',
    'meal management system',
    'employee meal booking',
    'cafeteria management software',
  ],
  'queue-management-system': [
    'queue management system',
    'queue management software India',
    'token system for hospitals',
    'appointment scheduling software',
    'waiting time reduction',
  ],
  'project-management-system': [
    'project management software',
    'project tracking tool',
    'task management software',
  ],
  erp: ['ERP software India', 'ERP for SMEs', 'enterprise resource planning system'],
  hrms: [
    'HRMS software India',
    'human resource management system',
    'HR management software',
    'payroll and HR software',
  ],
  'hospital-management-system': [
    'hospital management system',
    'HMS software India',
    'OPD management software',
    'healthcare management software',
    'clinic management software',
  ],
}

export interface SeoRecord {
  title: string
  description: string
  keywords: string[]
  jsonLd: object[]
}

const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE.url}${item.path}`,
  })),
})

const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
}

function clip(text: string, max = 160): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`
}

const softwareApp = (slug: string): object | null => {
  const s = SOLUTIONS.find((x) => x.slug === slug)
  if (!s) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${s.name} by CogniCoders`,
    url: `${SITE.url}/solutions/${s.slug}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: `${s.tagline} ${s.desc}`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  }
}

const WEB_SITE_JSONLD: object = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
}

const PAGES: Record<string, Omit<SeoRecord, 'jsonLd'>> = {
  '/': {
    title: 'CogniCoders — Biometric, Attendance & Visitor Management Software',
    description:
      'AI face recognition attendance, time & attendance, visitor management, queue management and HRMS software — built in India for security, healthcare and enterprise. Book a demo.',
    keywords: [
      'biometric attendance system',
      'face recognition attendance',
      'visitor management software',
      'queue management system',
      'HRMS software India',
      'workforce management software',
    ],
  },
  '/about': {
    title: 'About CogniCoders — The team behind the software',
    description:
      'CogniCoders is a product engineering company building AI-powered software for identity, workforce and visitor management across India.',
    keywords: ['about CogniCoders', 'product engineering company India', 'software company'],
  },
  '/solutions': {
    title: 'Software Solutions — Face Recognition, Attendance, Visitor & Queue Management | CogniCoders',
    description:
      'Explore CogniCoders products: face recognition, visitor management, time & attendance, safety induction, meal management, queue management, ERP, HRMS and hospital systems.',
    keywords: [
      'attendance software solutions',
      'biometric solutions India',
      'visitor management products',
      'hospital management software',
      'ERP HRMS software',
    ],
  },
  '/industries': {
    title: 'Industries We Serve — Security, Healthcare, Manufacturing & More | CogniCoders',
    description:
      'CogniCoders software powers security and identification, healthcare, manufacturing, education and enterprise — see how our solutions fit your industry.',
    keywords: [
      'attendance system for hospitals',
      'queue management for banks',
      'biometric for manufacturing',
      'visitor management for offices',
    ],
  },
  '/services': {
    title: 'Services — Product Engineering, AI & Computer Vision | CogniCoders',
    description:
      'CogniCoders offers end-to-end product engineering, AI and computer vision, custom software and QA services from India.',
    keywords: [
      'product engineering services',
      'computer vision development India',
      'custom software development',
      'AI services',
    ],
  },
  '/careers': {
    title: 'Careers at CogniCoders — Software Engineering, AI & Design Roles',
    description:
      'Join CogniCoders. We are hiring backend, React, AI/computer vision, QA, UI/UX and implementation roles in Bengaluru and Tirunelveli.',
    keywords: [
      'CogniCoders careers',
      'software engineering jobs India',
      'computer vision engineer jobs',
      'UI UX designer jobs',
    ],
  },
  '/internships': {
    title: 'Internships at CogniCoders — Software, AI, QA, UI/UX & Business',
    description:
      'Kickstart your career with a CogniCoders internship across software development, AI & computer vision, QA & testing, UI/UX design and business.',
    keywords: [
      'software internship India',
      'AI internship',
      'UI UX internship',
      'computer vision internship',
    ],
  },
  '/contact': {
    title: 'Contact CogniCoders — Book a Demo & Get Pricing',
    description:
      'Talk to CogniCoders about biometric attendance, visitor management, queue management and more. Reach us in Bengaluru or Tirunelveli or book a demo today.',
    keywords: [
      'contact CogniCoders',
      'book a demo',
      'attendance software pricing',
      'biometric company India',
    ],
  },
}

function canonicalPath(pathname: string): string {
  if (pathname === '/') return '/'
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

function baseRecord(route: string): SeoRecord {
  const page = PAGES[route] ?? PAGES['/']
  const jsonLd: object[] = [org, WEB_SITE_JSONLD]
  if (route === '/') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: SOLUTIONS.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.name,
        url: `${SITE.url}/solutions/${s.slug}`,
      })),
    })
  }
  return { ...page, jsonLd }
}

export function resolveSeo(pathname: string): SeoRecord & { canonical: string } {
  const clean = canonicalPath(pathname)
  const match = clean.match(/^\/solutions\/([\w-]+)$/)
  const canonical = `${SITE.url}${clean}`

  if (match) {
    const solution = SOLUTIONS.find((s) => s.slug === match[1])
    if (solution) {
      const app = softwareApp(solution.slug)
      const jsonLd: object[] = [org]
      if (app) jsonLd.push(app)
      jsonLd.push(breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Solutions', path: '/solutions' },
        { name: solution.name, path: `/solutions/${solution.slug}` },
      ]))
      return {
        title: `${solution.name} | CogniCoders`,
        description: clip(`${solution.tagline} ${solution.desc}`),
        keywords: SOLUTION_KEYWORDS[solution.slug] ?? [],
        jsonLd,
        canonical,
      }
    }
  }

  const record = baseRecord(clean)
  return { ...record, canonical }
}