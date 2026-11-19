// Realistic sample exam schedules for all 7 subjects
export const initialExams = [
  // 1. Java (Ongoing)
  {
    id: 'exam-java-101',
    subjectId: 'sub-java',
    subject: 'Java',
    code: 'CS601',
    date: '2026-09-28',
    startTime: '10:00 AM',
    endTime: '11:00 PM',
    duration: 60, // in minutes
    totalQuestions: 20,
    passingScore: 10,
    status: 'Ongoing',
    description: 'Core Java OOP concepts, Collections Framework, Exception Handling, and Multithreading.',
    instructor: 'Dr. Robert Vance'
  },
  // 2. Software Testing (Ongoing)
  {
    id: 'exam-st-101',
    subjectId: 'sub-st',
    subject: 'Software Testing',
    code: 'CS602',
    date: '2026-09-28',
    startTime: '09:00 AM',
    endTime: '11:59 PM',
    duration: 60,
    totalQuestions: 20,
    passingScore: 10,
    status: 'Ongoing',
    description: 'STLC, Black-Box & White-Box Testing, Boundary Value Analysis, and Test Automation.',
    instructor: 'Prof. Sarah Jenkins'
  },
  // 3. ADA (Upcoming)
  {
    id: 'exam-ada-101',
    subjectId: 'sub-ada',
    subject: 'ADA — Analysis and Design of Algorithms',
    code: 'CS603',
    date: '2026-10-02',
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    duration: 60,
    totalQuestions: 20,
    passingScore: 10,
    status: 'Upcoming',
    description: 'Asymptotic notation, Divide & Conquer, Dynamic Programming, and Greedy Algorithms.',
    instructor: 'Dr. Alan Turing'
  },
  // 4. Cloud Computing (Upcoming)
  {
    id: 'exam-cc-101',
    subjectId: 'sub-cc',
    subject: 'Cloud Computing',
    code: 'CS604',
    date: '2026-10-05',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    duration: 60,
    totalQuestions: 20,
    passingScore: 10,
    status: 'Upcoming',
    description: 'IaaS, PaaS, SaaS, Virtualization, Cloud Security, and Containerization.',
    instructor: 'Prof. Michael Chang'
  },
  // 5. Presentation Skills (Upcoming)
  {
    id: 'exam-ps-101',
    subjectId: 'sub-ps',
    subject: 'Presentation Skills',
    code: 'HU601',
    date: '2026-10-08',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    duration: 60,
    totalQuestions: 20,
    passingScore: 10,
    status: 'Upcoming',
    description: 'Verbal & non-verbal communication, slide design, Q&A handling, and audience engagement.',
    instructor: 'Prof. Emily Watson'
  },
  // 6. Startups (Completed / Previous)
  {
    id: 'exam-startups-101',
    subjectId: 'sub-startups',
    subject: 'Startups',
    code: 'MG601',
    date: '2026-09-20',
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    duration: 60,
    totalQuestions: 20,
    passingScore: 10,
    status: 'Previous',
    description: 'Entrepreneurship fundamentals, Lean Startup, Business Model Canvas, Pitching & Funding.',
    instructor: 'Prof. David Miller'
  },
  // 7. E-Commerce (Completed / Previous)
  {
    id: 'exam-ecom-101',
    subjectId: 'sub-ecom',
    subject: 'E-Commerce',
    code: 'IT601',
    date: '2026-09-22',
    startTime: '03:00 PM',
    endTime: '04:00 PM',
    duration: 60,
    totalQuestions: 20,
    passingScore: 10,
    status: 'Previous',
    description: 'B2B/B2C models, payment gateways, e-commerce security, SEO, and digital marketing.',
    instructor: 'Dr. Linda Carter'
  }
];
