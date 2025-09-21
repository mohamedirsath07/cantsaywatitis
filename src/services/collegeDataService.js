// College Data Service
class CollegeDataService {
  constructor() {
    this.colleges = [];
    this.initialized = false;
  }

  // Parse CSV data and initialize the service
  async initialize() {
    if (this.initialized) return;
    
    try {
      // In a real application, you would fetch this from an API or load the CSV
      // For now, we'll use the provided data structure
      this.colleges = this.parseCollegeData();
      this.initialized = true;
      console.log('College data initialized with', this.colleges.length, 'colleges');
    } catch (error) {
      console.error('Failed to initialize college data:', error);
    }
  }

  // Parse the college data from the CSV structure
  parseCollegeData() {
    const collegeData = [
      // Tamil Nadu Engineering Colleges
      {
        id: 1,
        state: "Tamil Nadu",
        district: "Coimbatore",
        name: "Government College of Technology",
        location: "Coimbatore",
        stream: "B.Tech/B.E",
        affiliation: "Anna University",
        established: 1945,
        fee: "₹50,000/year",
        feeAmount: 50000,
        seats: 900,
        marksRequired: null,
        managementType: "Government",
        category: "Engineering",
        ranking: 1,
        rating: 4.7,
        specializations: ["Computer Science", "Mechanical", "Civil", "Electrical", "Electronics"]
      },
      {
        id: 2,
        state: "Tamil Nadu",
        district: "Sivaganga",
        name: "Alagappa Chettiar College of Engineering and Technology",
        location: "Karaikudi",
        stream: "B.Tech/B.E",
        affiliation: "Anna University",
        established: 1952,
        fee: "₹45,000/year",
        feeAmount: 45000,
        seats: 800,
        marksRequired: null,
        managementType: "Government",
        category: "Engineering",
        ranking: 2,
        rating: 4.5,
        specializations: ["Computer Science", "Mechanical", "Civil", "Electrical"]
      },
      {
        id: 3,
        state: "Tamil Nadu",
        district: "Salem",
        name: "Government College of Engineering",
        location: "Salem",
        stream: "B.Tech/B.E",
        affiliation: "Anna University",
        established: 1966,
        fee: "₹45,000/year",
        feeAmount: 45000,
        seats: 600,
        marksRequired: null,
        managementType: "Government",
        category: "Engineering",
        ranking: 3,
        specializations: ["Computer Science", "Mechanical", "Civil", "Electrical"]
      },
      {
        id: 4,
        state: "Tamil Nadu",
        district: "Tirunelveli",
        name: "Government College of Engineering",
        location: "Tirunelveli",
        stream: "B.Tech/B.E",
        affiliation: "Anna University",
        established: 1981,
        fee: "₹45,000/year",
        feeAmount: 45000,
        seats: 600,
        marksRequired: null,
        managementType: "Government",
        category: "Engineering",
        ranking: 4,
        specializations: ["Computer Science", "Mechanical", "Civil", "Electrical"]
      },

      // Tamil Nadu Medical Colleges
      {
        id: 5,
        state: "Tamil Nadu",
        district: "Madurai",
        name: "AIIMS Madurai",
        location: "Madurai",
        stream: "MBBS",
        affiliation: "AIIMS",
        established: 2021,
        fee: "₹5,000/year",
        feeAmount: 5000,
        seats: 50,
        marksRequired: 650,
        managementType: "Government",
        category: "Medical",
        ranking: 1,
        rating: 4.8,
        specializations: ["General Medicine", "Surgery", "Pediatrics", "Cardiology"]
      },
      {
        id: 6,
        state: "Tamil Nadu",
        district: "Chennai",
        name: "Madras Medical College",
        location: "Chennai",
        stream: "MBBS",
        affiliation: "TN Dr.MGR Medical University",
        established: 1835,
        fee: "₹10,000/year",
        feeAmount: 10000,
        seats: 250,
        marksRequired: 600,
        managementType: "Government",
        category: "Medical",
        ranking: 2,
        specializations: ["General Medicine", "Surgery", "Pediatrics", "Gynecology"]
      },
      {
        id: 7,
        state: "Tamil Nadu",
        district: "Chennai",
        name: "Stanley Medical College",
        location: "Chennai",
        stream: "MBBS",
        affiliation: "TN Dr.MGR Medical University",
        established: 1838,
        fee: "₹10,000/year",
        feeAmount: 10000,
        seats: 250,
        marksRequired: 590,
        managementType: "Government",
        category: "Medical",
        ranking: 3,
        specializations: ["General Medicine", "Surgery", "Pediatrics", "Orthopedics"]
      },

      // Karnataka Colleges
      {
        id: 8,
        state: "Karnataka",
        district: "Surathkal",
        name: "National Institute of Technology Karnataka",
        location: "Surathkal",
        stream: "B.Tech/B.E",
        affiliation: "NIT Surathkal",
        established: 1960,
        fee: "₹5.5 Lakhs",
        feeAmount: 550000,
        seats: 909,
        marksRequired: null,
        managementType: "Central Government",
        category: "Engineering",
        ranking: 1,
        specializations: ["Computer Science", "Mechanical", "Civil", "Chemical", "Electronics"]
      },
      {
        id: 9,
        state: "Karnataka",
        district: "Bangalore",
        name: "University Visvesvaraya College of Engineering",
        location: "Bangalore",
        stream: "B.Tech/B.E",
        affiliation: "Bangalore University",
        established: 1917,
        fee: "₹25,000/year",
        feeAmount: 25000,
        seats: 780,
        marksRequired: null,
        managementType: "Government",
        category: "Engineering",
        ranking: 2,
        specializations: ["Computer Science", "Mechanical", "Civil", "Electronics", "Chemical"]
      },
      {
        id: 10,
        state: "Karnataka",
        district: "Bangalore",
        name: "Bangalore Medical College and Research Institute",
        location: "Bangalore",
        stream: "MBBS",
        affiliation: "RGUHS",
        established: 1955,
        fee: "₹15,000/year",
        feeAmount: 15000,
        seats: 250,
        marksRequired: 580,
        managementType: "Government",
        category: "Medical",
        ranking: 4,
        specializations: ["General Medicine", "Surgery", "Pediatrics", "Dermatology"]
      },

      // Maharashtra Colleges
      {
        id: 11,
        state: "Maharashtra",
        district: "Mumbai",
        name: "Indian Institute of Technology Bombay",
        location: "Mumbai",
        stream: "B.Tech/B.E",
        affiliation: "IIT Bombay",
        established: 1958,
        fee: "₹8.5 Lakhs",
        feeAmount: 850000,
        seats: 1360,
        marksRequired: null,
        managementType: "Central Government",
        category: "Engineering",
        ranking: 1,
        rating: 4.9,
        specializations: ["Computer Science", "Mechanical", "Aerospace", "Chemical", "Electronics", "Metallurgy"]
      },
      {
        id: 12,
        state: "Maharashtra",
        district: "Nagpur",
        name: "Visvesvaraya National Institute of Technology",
        location: "Nagpur",
        stream: "B.Tech/B.E",
        affiliation: "VNIT Nagpur",
        established: 1960,
        fee: "₹5.5 Lakhs",
        feeAmount: 550000,
        seats: 965,
        marksRequired: null,
        managementType: "Central Government",
        category: "Engineering",
        ranking: 2,
        specializations: ["Computer Science", "Mechanical", "Civil", "Electronics", "Mining"]
      },
      {
        id: 13,
        state: "Maharashtra",
        district: "Pune",
        name: "Armed Forces Medical College",
        location: "Pune",
        stream: "MBBS",
        affiliation: "AFMC",
        established: 1948,
        fee: "No Fee",
        feeAmount: 0,
        seats: 130,
        marksRequired: 630,
        managementType: "Central Government",
        category: "Medical",
        ranking: 1,
        specializations: ["General Medicine", "Surgery", "Pediatrics", "Military Medicine"]
      },

      // West Bengal Colleges
      {
        id: 14,
        state: "West Bengal",
        district: "Kharagpur",
        name: "Indian Institute of Technology Kharagpur",
        location: "Kharagpur",
        stream: "B.Tech/B.E",
        affiliation: "IIT Kharagpur",
        established: 1951,
        fee: "₹8.5 Lakhs",
        feeAmount: 850000,
        seats: 1500,
        marksRequired: null,
        managementType: "Central Government",
        category: "Engineering",
        ranking: 1,
        specializations: ["Computer Science", "Mechanical", "Mining", "Civil", "Electronics", "Ocean Engineering"]
      },
      {
        id: 15,
        state: "West Bengal",
        district: "Kolkata",
        name: "Jadavpur University Faculty of Engineering",
        location: "Kolkata",
        stream: "B.Tech/B.E",
        affiliation: "Jadavpur University",
        established: 1955,
        fee: "₹15,000/year",
        feeAmount: 15000,
        seats: 900,
        marksRequired: null,
        managementType: "Government",
        category: "Engineering",
        ranking: 2,
        specializations: ["Computer Science", "Electronics", "Mechanical", "Civil", "Chemical"]
      },
      {
        id: 16,
        state: "West Bengal",
        district: "Kolkata",
        name: "Medical College and Hospital",
        location: "Kolkata",
        stream: "MBBS",
        affiliation: "West Bengal University of Health Sciences",
        established: 1835,
        fee: "₹12,000/year",
        feeAmount: 12000,
        seats: 250,
        marksRequired: 570,
        managementType: "Government",
        category: "Medical",
        ranking: 5,
        specializations: ["General Medicine", "Surgery", "Pediatrics", "Psychiatry"]
      },

      // Delhi Colleges
      {
        id: 17,
        state: "Delhi",
        district: "New Delhi",
        name: "Indian Institute of Technology Delhi",
        location: "New Delhi",
        stream: "B.Tech/B.E",
        affiliation: "IIT Delhi",
        established: 1961,
        fee: "₹2,50,000/year",
        feeAmount: 250000,
        seats: 1200,
        marksRequired: null,
        managementType: "Central Government",
        category: "Engineering",
        ranking: 1,
        rating: 4.8,
        specializations: ["Computer Science", "Mechanical", "Civil", "Electrical", "Chemical", "Textile Technology"]
      },
      {
        id: 18,
        state: "Delhi",
        district: "New Delhi",
        name: "All India Institute of Medical Sciences Delhi",
        location: "New Delhi",
        stream: "MBBS",
        affiliation: "AIIMS",
        established: 1956,
        fee: "₹25,000/year",
        feeAmount: 25000,
        seats: 100,
        marksRequired: 680,
        managementType: "Central Government",
        category: "Medical",
        ranking: 1,
        rating: 4.9,
        specializations: ["General Medicine", "Surgery", "Pediatrics", "Cardiology", "Neurology", "Oncology"]
      },
      {
        id: 19,
        state: "Delhi",
        district: "New Delhi",
        name: "Delhi Technological University",
        location: "New Delhi",
        stream: "B.Tech/B.E",
        affiliation: "DTU",
        established: 1941,
        fee: "₹1,50,000/year",
        feeAmount: 150000,
        seats: 1400,
        marksRequired: null,
        managementType: "Government",
        category: "Engineering",
        ranking: 2,
        rating: 4.5,
        specializations: ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"]
      },
      {
        id: 20,
        state: "Delhi",
        district: "New Delhi",
        name: "University of Delhi - Science Colleges",
        location: "New Delhi",
        stream: "B.Sc",
        affiliation: "University of Delhi",
        established: 1922,
        fee: "₹25,000/year",
        feeAmount: 25000,
        seats: 800,
        marksRequired: null,
        managementType: "Central Government",
        category: "Science",
        ranking: 1,
        rating: 4.7,
        specializations: ["Physics", "Chemistry", "Mathematics", "Computer Science", "Life Sciences"]
      },

      // Uttar Pradesh Colleges
      {
        id: 21,
        state: "Uttar Pradesh",
        district: "Kanpur",
        name: "Indian Institute of Technology Kanpur",
        location: "Kanpur",
        stream: "B.Tech/B.E",
        affiliation: "IIT Kanpur",
        established: 1959,
        fee: "₹8.5 Lakhs",
        feeAmount: 850000,
        seats: 1100,
        marksRequired: null,
        managementType: "Central Government",
        category: "Engineering",
        ranking: 1,
        rating: 4.8,
        specializations: ["Computer Science", "Mechanical", "Aerospace", "Chemical", "Materials Science"]
      },
      {
        id: 22,
        state: "Uttar Pradesh",
        district: "Allahabad",
        name: "Motilal Nehru National Institute of Technology",
        location: "Allahabad",
        stream: "B.Tech/B.E",
        affiliation: "NIT Allahabad",
        established: 1961,
        fee: "₹5.5 Lakhs",
        feeAmount: 550000,
        seats: 840,
        marksRequired: null,
        managementType: "Central Government",
        category: "Engineering",
        ranking: 2,
        rating: 4.4,
        specializations: ["Computer Science", "Mechanical", "Civil", "Electronics", "Chemical"]
      },
      {
        id: 23,
        state: "Uttar Pradesh",
        district: "Lucknow",
        name: "King George Medical University",
        location: "Lucknow",
        stream: "MBBS",
        affiliation: "KGMU",
        established: 1911,
        fee: "₹15,000/year",
        feeAmount: 15000,
        seats: 250,
        marksRequired: 575,
        managementType: "Government",
        category: "Medical",
        ranking: 6,
        rating: 4.3,
        specializations: ["General Medicine", "Surgery", "Pediatrics", "Cardiology"]
      },

      // Maharashtra Science Colleges
      {
        id: 24,
        state: "Maharashtra",
        district: "Mumbai",
        name: "St. Xavier's College",
        location: "Mumbai",
        stream: "B.Sc",
        affiliation: "Mumbai University",
        established: 1869,
        fee: "₹80,000/year",
        feeAmount: 80000,
        seats: 500,
        marksRequired: null,
        managementType: "Private Aided",
        category: "Science",
        ranking: 1,
        rating: 4.6,
        specializations: ["Physics", "Chemistry", "Mathematics", "Life Sciences", "Computer Science"]
      },
      {
        id: 25,
        state: "Maharashtra",
        district: "Mumbai",
        name: "Ramnarain Ruia Autonomous College",
        location: "Mumbai",
        stream: "B.Sc",
        affiliation: "Mumbai University",
        established: 1937,
        fee: "₹45,000/year",
        feeAmount: 45000,
        seats: 600,
        marksRequired: null,
        managementType: "Government",
        category: "Science",
        ranking: 2,
        rating: 4.4,
        specializations: ["Physics", "Chemistry", "Mathematics", "Botany", "Zoology"]
      },

      // Rajasthan Colleges
      {
        id: 26,
        state: "Rajasthan",
        district: "Jaipur",
        name: "Malaviya National Institute of Technology",
        location: "Jaipur",
        stream: "B.Tech/B.E",
        affiliation: "NIT Jaipur",
        established: 1963,
        fee: "₹5.5 Lakhs",
        feeAmount: 550000,
        seats: 840,
        marksRequired: null,
        managementType: "Central Government",
        category: "Engineering",
        ranking: 2,
        rating: 4.3,
        specializations: ["Computer Science", "Mechanical", "Civil", "Electronics", "Chemical"]
      },
      {
        id: 27,
        state: "Rajasthan",
        district: "Jodhpur",
        name: "All India Institute of Medical Sciences",
        location: "Jodhpur",
        stream: "MBBS",
        affiliation: "AIIMS",
        established: 2012,
        fee: "₹5,000/year",
        feeAmount: 5000,
        seats: 125,
        marksRequired: 640,
        managementType: "Central Government",
        category: "Medical",
        ranking: 2,
        rating: 4.7,
        specializations: ["General Medicine", "Surgery", "Pediatrics", "Oncology"]
      },

      // Gujarat Colleges
      {
        id: 22,
        state: "Gujarat",
        district: "Ahmedabad",
        name: "L.D. College of Engineering",
        location: "Ahmedabad",
        stream: "B.Tech/B.E",
        affiliation: "Gujarat Technological University",
        established: 1948,
        fee: "₹30,000/year",
        feeAmount: 30000,
        seats: 720,
        marksRequired: null,
        managementType: "Government",
        category: "Engineering",
        ranking: 3,
        specializations: ["Computer Science", "Mechanical", "Civil", "Electronics", "Chemical"]
      },
      {
        id: 23,
        state: "Gujarat",
        district: "Ahmedabad",
        name: "B.J. Medical College",
        location: "Ahmedabad",
        stream: "MBBS",
        affiliation: "Gujarat University",
        established: 1946,
        fee: "₹18,000/year",
        feeAmount: 18000,
        seats: 250,
        marksRequired: 565,
        managementType: "Government",
        category: "Medical",
        ranking: 7,
        specializations: ["General Medicine", "Surgery", "Pediatrics", "Ophthalmology"]
      },

      // Kerala Colleges
      {
        id: 24,
        state: "Kerala",
        district: "Calicut",
        name: "National Institute of Technology Calicut",
        location: "Calicut",
        stream: "B.Tech/B.E",
        affiliation: "NIT Calicut",
        established: 1961,
        fee: "₹5.5 Lakhs",
        feeAmount: 550000,
        seats: 909,
        marksRequired: null,
        managementType: "Central Government",
        category: "Engineering",
        ranking: 2,
        specializations: ["Computer Science", "Mechanical", "Civil", "Electronics", "Chemical"]
      },
      {
        id: 25,
        state: "Kerala",
        district: "Thiruvananthapuram",
        name: "Government Medical College",
        location: "Thiruvananthapuram",
        stream: "MBBS",
        affiliation: "Kerala University of Health Sciences",
        established: 1951,
        fee: "₹12,000/year",
        feeAmount: 12000,
        seats: 200,
        marksRequired: 560,
        managementType: "Government",
        category: "Medical",
        ranking: 8,
        specializations: ["General Medicine", "Surgery", "Pediatrics", "Neurology"]
      },

      // Science and Commerce Colleges
      {
        id: 26,
        state: "Tamil Nadu",
        district: "Chennai",
        name: "Presidency College",
        location: "Chennai",
        stream: "B.Sc",
        affiliation: "University of Madras",
        established: 1840,
        fee: "₹5,000/year",
        feeAmount: 5000,
        seats: 500,
        marksRequired: null,
        managementType: "Government",
        category: "Science",
        ranking: 1,
        specializations: ["Physics", "Chemistry", "Mathematics", "Computer Science", "Biology"]
      },
      {
        id: 27,
        state: "West Bengal",
        district: "Kolkata",
        name: "Presidency University",
        location: "Kolkata",
        stream: "B.Sc",
        affiliation: "Presidency University",
        established: 1817,
        fee: "₹6,000/year",
        feeAmount: 6000,
        seats: 400,
        marksRequired: null,
        managementType: "Government",
        category: "Science",
        ranking: 2,
        specializations: ["Physics", "Chemistry", "Mathematics", "Economics", "Statistics"]
      },
      {
        id: 28,
        state: "Tamil Nadu",
        district: "Chennai",
        name: "Presidency College",
        location: "Chennai",
        stream: "B.Com",
        affiliation: "University of Madras",
        established: 1840,
        fee: "₹4,000/year",
        feeAmount: 4000,
        seats: 300,
        marksRequired: null,
        managementType: "Government",
        category: "Commerce",
        ranking: 1,
        specializations: ["Accounting", "Finance", "Marketing", "Economics", "Business Administration"]
      },

      // Architecture Colleges
      {
        id: 29,
        state: "Tamil Nadu",
        district: "Chennai",
        name: "Anna University School of Architecture",
        location: "Chennai",
        stream: "B.Arch",
        affiliation: "Anna University",
        established: 1957,
        fee: "₹50,000/year",
        feeAmount: 50000,
        seats: 40,
        marksRequired: null,
        managementType: "Government",
        category: "Architecture",
        ranking: 1,
        specializations: ["Architectural Design", "Urban Planning", "Landscape Architecture", "Interior Design"]
      },
      {
        id: 30,
        state: "Maharashtra",
        district: "Mumbai",
        name: "Sir J.J. College of Architecture",
        location: "Mumbai",
        stream: "B.Arch",
        affiliation: "Mumbai University",
        established: 1913,
        fee: "₹25,000/year",
        feeAmount: 25000,
        seats: 60,
        marksRequired: null,
        managementType: "Government",
        category: "Architecture",
        ranking: 2,
        specializations: ["Architectural Design", "Conservation Architecture", "Urban Design", "Planning"]
      }
    ];

    return collegeData;
  }

  // Get all colleges
  getAllColleges() {
    return this.colleges;
  }

  // Search colleges by various criteria
  searchColleges(criteria = {}) {
    let filteredColleges = [...this.colleges];

    // Filter by state
    if (criteria.state) {
      filteredColleges = filteredColleges.filter(college => 
        college.state.toLowerCase().includes(criteria.state.toLowerCase())
      );
    }

    // Filter by stream/category
    if (criteria.stream) {
      filteredColleges = filteredColleges.filter(college => 
        college.stream.toLowerCase().includes(criteria.stream.toLowerCase()) ||
        college.category.toLowerCase().includes(criteria.stream.toLowerCase())
      );
    }

    // Filter by fee range
    if (criteria.maxFee) {
      filteredColleges = filteredColleges.filter(college => 
        college.feeAmount <= criteria.maxFee
      );
    }

    // Filter by management type
    if (criteria.managementType) {
      filteredColleges = filteredColleges.filter(college => 
        college.managementType.toLowerCase().includes(criteria.managementType.toLowerCase())
      );
    }

    // Filter by minimum seats
    if (criteria.minSeats) {
      filteredColleges = filteredColleges.filter(college => 
        college.seats >= criteria.minSeats
      );
    }

    // Sort by ranking or fee
    if (criteria.sortBy) {
      filteredColleges.sort((a, b) => {
        switch (criteria.sortBy) {
          case 'fee':
            return a.feeAmount - b.feeAmount;
          case 'ranking':
            return a.ranking - b.ranking;
          case 'seats':
            return b.seats - a.seats;
          case 'established':
            return b.established - a.established;
          default:
            return 0;
        }
      });
    }

    return filteredColleges;
  }

  // Get college recommendations based on user profile
  getRecommendations(userProfile = {}) {
    const { 
      preferredStates = [], 
      preferredStreams = [], 
      maxBudget = Infinity, 
      marks = 0,
      managementPreference = null 
    } = userProfile;

    let recommendations = this.searchColleges({
      maxFee: maxBudget,
      managementType: managementPreference,
      sortBy: 'ranking'
    });

    // Filter by preferred states
    if (preferredStates.length > 0) {
      recommendations = recommendations.filter(college => 
        preferredStates.some(state => 
          college.state.toLowerCase().includes(state.toLowerCase())
        )
      );
    }

    // Filter by preferred streams
    if (preferredStreams.length > 0) {
      recommendations = recommendations.filter(college => 
        preferredStreams.some(stream => 
          college.category.toLowerCase().includes(stream.toLowerCase()) ||
          college.stream.toLowerCase().includes(stream.toLowerCase())
        )
      );
    }

    // Filter by marks requirement (if available)
    if (marks > 0) {
      recommendations = recommendations.filter(college => 
        !college.marksRequired || college.marksRequired <= marks
      );
    }

    // Limit to top 10 recommendations
    return recommendations.slice(0, 10);
  }

  // Get college by ID
  getCollegeById(id) {
    return this.colleges.find(college => college.id === id);
  }

  // Get unique states
  getStates() {
    return [...new Set(this.colleges.map(college => college.state))].sort();
  }

  // Get unique streams/categories
  getStreams() {
    return [...new Set(this.colleges.map(college => college.category))].sort();
  }

  // Get fee range statistics
  getFeeStatistics() {
    const fees = this.colleges.map(college => college.feeAmount).filter(fee => fee > 0);
    return {
      min: Math.min(...fees),
      max: Math.max(...fees),
      average: Math.round(fees.reduce((sum, fee) => sum + fee, 0) / fees.length)
    };
  }
}

// Create singleton instance
const collegeDataService = new CollegeDataService();

export default collegeDataService;

// src/components/College/CollegeCard.jsx
import React, { useState } from 'react';
import CollegeModal from './CollegeModal';

const CollegeCard = ({ college }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="college-card" onClick={() => setIsModalOpen(true)}>
        <div className="college-header">
          <img src={college.logo} alt={college.name} className="college-logo" />
          <div className="college-info">
            <h3 className="college-name">{college.name}</h3>
            <p className="college-location">📍 {college.location}</p>
            <div className="college-tags">
              {college.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="college-stats">
          <div className="stat">
            <span className="stat-label">Ranking</span>
            <span className="stat-value">#{college.ranking}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Fees</span>
            <span className="stat-value">₹{college.fees}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Cutoff</span>
            <span className="stat-value">{college.cutoff}%</span>
          </div>
        </div>

        <div className="college-facilities">
          <h4>Key Facilities</h4>
          <div className="facilities-list">
            {college.facilities.slice(0, 3).map(facility => (
              <span key={facility} className="facility">✓ {facility}</span>
            ))}
            {college.facilities.length > 3 && (
              <span className="more">+{college.facilities.length - 3} more</span>
            )}
          </div>
        </div>

        <div className="college-actions">
          <button className="btn-secondary">
            📞 Contact
          </button>
          <button className="btn-primary">
            📝 Apply Now
          </button>
        </div>
      </div>

      <CollegeModal 
        college={college}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

// src/pages/CollegePage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CollegeCard from '../components/College/CollegeCard';
import CollegeFilter from '../components/College/CollegeFilter';
import MapView from '../components/College/MapView';
import { collegeService } from '../services/collegeService';

const CollegePage = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    stream: '',
    type: '',
    fees: { min: 0, max: 500000 },
    ranking: ''
  });
  const [viewMode, setViewMode] = useState('grid'); // grid, list, map
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      const data = await collegeService.getColleges();
      setColleges(data);
      setFilteredColleges(data);
    } catch (error) {
      console.error('Error loading colleges:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filtered = collegeService.filterColleges(colleges, newFilters);
    setFilteredColleges(filtered);
  };

  if (isLoading) {
    return <div className="loading">Loading colleges...</div>;
  }

  return (
    <div className="college-page">
      <div className="page-header">
        <h1>Government Colleges in Jammu & Kashmir</h1>
        <p>Find the perfect college for your career journey</p>
        
        <div className="view-controls">
          <button 
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            🔲 Grid
          </button>
          <button 
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            📋 List
          </button>
          <button 
            className={viewMode === 'map' ? 'active' : ''}
            onClick={() => setViewMode('map')}
          >
            🗺️ Map
          </button>
        </div>
      </div>

      <div className="college-content">
        <aside className="college-sidebar">
          <CollegeFilter 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <main className="college-main">
          <div className="results-header">
            <span className="results-count">
              {filteredColleges.length} colleges found
            </span>
          </div>

          {viewMode === 'map' ? (
            <MapView colleges={filteredColleges} />
          ) : (
            <div className={`colleges-${viewMode}`}>
              {filteredColleges.map(college => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CollegePage;