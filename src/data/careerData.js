// Career data structure for the advisor
export const careerData = {
  streams: {
    science: {
      name: "Science",
      color: "bg-blue-500",
      icon: "🔬",
      degrees: [
        {
          name: "B.Sc. Computer Science",
          duration: "3 years",
          careers: ["Software Engineer", "Data Scientist", "Web Developer", "System Analyst"]
        },
        {
          name: "B.Tech/B.E.",
          duration: "4 years", 
          careers: ["Software Engineer", "Mechanical Engineer", "Civil Engineer", "Electrical Engineer"]
        },
        {
          name: "MBBS",
          duration: "5.5 years",
          careers: ["Doctor", "Surgeon", "Medical Officer", "Specialist"]
        },
        {
          name: "B.Sc. Physics/Chemistry",
          duration: "3 years",
          careers: ["Research Scientist", "Lab Technician", "Quality Analyst", "Teacher"]
        }
      ]
    },
    commerce: {
      name: "Commerce",
      color: "bg-green-500",
      icon: "💼",
      degrees: [
        {
          name: "B.Com",
          duration: "3 years",
          careers: ["Accountant", "Bank Officer", "Tax Consultant", "Auditor"]
        },
        {
          name: "BBA",
          duration: "3 years",
          careers: ["Business Analyst", "Marketing Executive", "HR Manager", "Operations Manager"]
        },
        {
          name: "CA (Chartered Accountant)",
          duration: "4-5 years",
          careers: ["Chartered Accountant", "Financial Advisor", "Tax Consultant", "CFO"]
        },
        {
          name: "CS (Company Secretary)",
          duration: "3-4 years",
          careers: ["Company Secretary", "Legal Advisor", "Compliance Officer", "Corporate Lawyer"]
        }
      ]
    },
    arts: {
      name: "Arts/Humanities",
      color: "bg-purple-500",
      icon: "🎨",
      degrees: [
        {
          name: "B.A. English",
          duration: "3 years",
          careers: ["Content Writer", "Journalist", "Editor", "English Teacher"]
        },
        {
          name: "B.A. Psychology",
          duration: "3 years",
          careers: ["Psychologist", "Counselor", "HR Executive", "Social Worker"]
        },
        {
          name: "LLB (Law)",
          duration: "3-5 years",
          careers: ["Lawyer", "Judge", "Legal Advisor", "Corporate Counsel"]
        },
        {
          name: "B.Des (Design)",
          duration: "4 years",
          careers: ["Graphic Designer", "UI/UX Designer", "Product Designer", "Creative Director"]
        }
      ]
    }
  }
};

// Quiz questions data
export const quizQuestions = [
  {
    id: 1,
    question: "Do you enjoy solving mathematical problems and equations?",
    category: "science",
    weight: 2
  },
  {
    id: 2,
    question: "Are you interested in understanding how things work scientifically?",
    category: "science",
    weight: 2
  },
  {
    id: 3,
    question: "Do you like working with numbers and financial calculations?",
    category: "commerce",
    weight: 2
  },
  {
    id: 4,
    question: "Are you interested in business, trade, and economics?",
    category: "commerce",
    weight: 2
  },
  {
    id: 5,
    question: "Do you enjoy reading, writing, and creative expression?",
    category: "arts",
    weight: 2
  },
  {
    id: 6,
    question: "Are you interested in history, literature, and social issues?",
    category: "arts",
    weight: 2
  },
  {
    id: 7,
    question: "Do you enjoy conducting experiments and research?",
    category: "science",
    weight: 1
  },
  {
    id: 8,
    question: "Are you good at managing money and budgets?",
    category: "commerce",
    weight: 1
  },
  {
    id: 9,
    question: "Do you like to express yourself through art, music, or writing?",
    category: "arts",
    weight: 1
  },
  {
    id: 10,
    question: "Are you interested in technology and innovation?",
    category: "science",
    weight: 1
  }
];

// Sample colleges data
export const collegesData = [
  {
    id: 1,
    name: "IIT Delhi",
    location: "New Delhi",
    type: "Engineering",
    streams: ["science"],
    courses: ["B.Tech", "M.Tech", "PhD"],
    fees: "₹2,50,000/year",
    rating: 4.8,
    admissionOpen: true
  },
  {
    id: 2,
    name: "SRCC - Delhi University",
    location: "New Delhi", 
    type: "Commerce",
    streams: ["commerce"],
    courses: ["B.Com", "B.A. Economics"],
    fees: "₹50,000/year",
    rating: 4.7,
    admissionOpen: true
  },
  {
    id: 3,
    name: "St. Xavier's College",
    location: "Mumbai",
    type: "Multi-disciplinary",
    streams: ["science", "commerce", "arts"],
    courses: ["B.Sc", "B.Com", "B.A.", "BMS"],
    fees: "₹80,000/year", 
    rating: 4.6,
    admissionOpen: false
  },
  {
    id: 4,
    name: "AIIMS Delhi",
    location: "New Delhi",
    type: "Medical",
    streams: ["science"],
    courses: ["MBBS", "B.Sc. Nursing"],
    fees: "₹25,000/year",
    rating: 4.9,
    admissionOpen: true
  },
  {
    id: 5,
    name: "JNU",
    location: "New Delhi",
    type: "Arts & Social Sciences",
    streams: ["arts"],
    courses: ["B.A.", "M.A.", "PhD"],
    fees: "₹30,000/year",
    rating: 4.5,
    admissionOpen: true
  }
];

// Scholarships data
export const scholarshipsData = [
  {
    id: 1,
    name: "PM Scholarship Scheme",
    amount: "₹36,000/year",
    eligibility: "For children of Ex-servicemen",
    deadline: "2025-10-15",
    streams: ["science", "commerce", "arts"]
  },
  {
    id: 2,
    name: "Merit-cum-Means Scholarship",
    amount: "₹1,00,000/year",
    eligibility: "Income < ₹6 Lakhs, 80%+ marks",
    deadline: "2025-09-30",
    streams: ["science", "commerce", "arts"]
  },
  {
    id: 3,
    name: "National Talent Search Exam",
    amount: "₹1,250/month",
    eligibility: "Top performers in NTSE",
    deadline: "2025-11-30",
    streams: ["science", "commerce", "arts"]
  }
];
