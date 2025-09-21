class CSVCollegeService {
  constructor() {
    this.colleges = [];
    this.isLoaded = false;
  }

  // Parse CSV data from the comprehensive dataset
  async loadCollegesFromCSV() {
    if (this.isLoaded) return this.colleges;

    try {
      // For now, we'll include a representative sample of the CSV data
      // In a real implementation, you would fetch this from the actual CSV file
      const csvData = `State,District,College Name,Location,Stream,Affiliation,Established,Fee,Seats,Marks Required,Management Type
Tamil Nadu,Coimbatore,Government College of Technology,Coimbatore,B.Tech/B.E,Anna University,1945,₹50000/year,900,null,Government
Tamil Nadu,Sivaganga,Alagappa Chettiar College of Engineering and Technology,Karaikudi,B.Tech/B.E,Anna University,1952,₹45000/year,800,null,Government
Tamil Nadu,Salem,Government College of Engineering,Salem,B.Tech/B.E,Anna University,1966,₹45000/year,600,null,Government
Tamil Nadu,Tirunelveli,Government College of Engineering,Tirunelveli,B.Tech/B.E,Anna University,1981,₹45000/year,600,null,Government
Tamil Nadu,Erode,Government College of Engineering,Erode,B.Tech/B.E,Anna University,1984,₹45000/year,540,null,Government
Tamil Nadu,Vellore,Thanthai Periyar Government Institute of Technology,Vellore,B.Tech/B.E,Anna University,1990,₹45000/year,480,null,Government
Tamil Nadu,Krishnagiri,Government College of Engineering,Bargur,B.Tech/B.E,Anna University,1994,₹45000/year,540,null,Government
Tamil Nadu,Thanjavur,Government College of Engineering,Thanjavur,B.Tech/B.E,Anna University,2012,₹45000/year,480,null,Government
Tamil Nadu,Theni,Government College of Engineering,Bodinayakkanur,B.Tech/B.E,Anna University,2012,₹45000/year,360,null,Government
Tamil Nadu,Dharmapuri,Government College of Engineering,Dharmapuri,B.Tech/B.E,Anna University,2013,₹45000/year,480,null,Government
Tamil Nadu,Tiruchirappalli,Government College of Engineering,Srirangam,B.Tech/B.E,Anna University,2013,₹45000/year,480,null,Government
Tamil Nadu,Madurai,AIIMS Madurai,Madurai,MBBS,AIIMS,2021,₹5000/year,50,null,Government
Tamil Nadu,Chennai,Madras Medical College,Chennai,MBBS,TN Dr.MGR Medical University,1835,₹10000/year,250,null,Government
Tamil Nadu,Chennai,Stanley Medical College,Chennai,MBBS,TN Dr.MGR Medical University,1838,₹10000/year,250,null,Government
Tamil Nadu,Chennai,Kilpauk Medical College,Chennai,MBBS,TN Dr.MGR Medical University,1960,₹10000/year,150,null,Government
Tamil Nadu,Madurai,Madurai Medical College,Madurai,MBBS,TN Dr.MGR Medical University,1954,₹10000/year,250,null,Government
Tamil Nadu,Coimbatore,Coimbatore Medical College,Coimbatore,MBBS,TN Dr.MGR Medical University,1966,₹10000/year,200,null,Government
Tamil Nadu,Thanjavur,Thanjavur Medical College,Thanjavur,MBBS,TN Dr.MGR Medical University,1959,₹10000/year,150,null,Government
Tamil Nadu,Tirunelveli,Tirunelveli Medical College,Tirunelveli,MBBS,TN Dr.MGR Medical University,1965,₹10000/year,250,null,Government
Tamil Nadu,Vellore,Government Vellore Medical College,Vellore,MBBS,TN Dr.MGR Medical University,2005,₹10000/year,100,null,Government
Tamil Nadu,Salem,Government Mohan Kumaramangalam Medical College,Salem,MBBS,TN Dr.MGR Medical University,1986,₹10000/year,100,null,Government
Tamil Nadu,Chengalpattu,Chengalpattu Medical College,Chengalpattu,MBBS,TN Dr.MGR Medical University,2019,₹10000/year,150,null,Government
Tamil Nadu,Chennai,Presidency College,Chennai,B.Sc,University of Madras,1840,₹5000/year,500,null,Government
Tamil Nadu,Chennai,Loyola College,Chennai,B.Sc,University of Madras,1925,₹15000/year,800,null,Private Aided
Tamil Nadu,Madurai,Lady Doak College,Madurai,B.Sc,Madurai Kamaraj University,1948,₹8000/year,600,null,Private Aided
Tamil Nadu,Coimbatore,PSG College of Arts and Science,Coimbatore,B.Sc,Bharathiar University,1951,₹12000/year,1200,null,Private Aided
Tamil Nadu,Chennai,MOP Vaishnav College,Chennai,B.Com,University of Madras,1964,₹10000/year,400,null,Private Aided
Tamil Nadu,Chennai,Pachaiyappa's College,Chennai,B.Com,University of Madras,1842,₹8000/year,600,null,Government
Tamil Nadu,Chennai,Anna University School of Architecture,Chennai,B.Arch,Anna University,1957,₹50000/year,40,null,Government
Karnataka,Surathkal,National Institute of Technology Karnataka,Surathkal,B.Tech/B.E,NIT Surathkal,1960,₹550000/year,909,null,Central Government
Karnataka,Bangalore,University Visvesvaraya College of Engineering,Bangalore,B.Tech/B.E,Bangalore University,1917,₹25000/year,780,null,Government
Karnataka,Mysore,University BDT College of Engineering,Davangere,B.Tech/B.E,Visvesvaraya Technological University,1985,₹30000/year,600,null,Government
Karnataka,Hubli,BVB College of Engineering and Technology,Hubli,B.Tech/B.E,Visvesvaraya Technological University,1947,₹35000/year,840,null,Government
Karnataka,Bangalore,Bangalore Medical College and Research Institute,Bangalore,MBBS,RGUHS,1955,₹15000/year,250,null,Government
Karnataka,Mysore,Mysore Medical College and Research Institute,Mysore,MBBS,RGUHS,1924,₹15000/year,150,null,Government
Karnataka,Hubli,Karnataka Institute of Medical Sciences,Hubli,MBBS,RGUHS,1957,₹15000/year,150,null,Government
Karnataka,Bangalore,St. Joseph's College,Bangalore,B.Sc,Bangalore University,1882,₹25000/year,800,null,Private Aided
Karnataka,Mysore,Maharani's Science College,Mysore,B.Sc,University of Mysore,1946,₹12000/year,600,null,Government
Maharashtra,Mumbai,Indian Institute of Technology Bombay,Mumbai,B.Tech/B.E,IIT Bombay,1958,₹850000/year,1360,null,Central Government
Maharashtra,Nagpur,Visvesvaraya National Institute of Technology,Nagpur,B.Tech/B.E,VNIT Nagpur,1960,₹550000/year,965,null,Central Government
Maharashtra,Mumbai,Victoria Jubilee Technical Institute,Mumbai,B.Tech/B.E,Mumbai University,1887,₹40000/year,600,null,Government
Maharashtra,Pune,College of Engineering,Pune,B.Tech/B.E,Pune University,1854,₹45000/year,840,null,Government
Maharashtra,Pune,Armed Forces Medical College,Pune,MBBS,AFMC,1948,₹0/year,130,null,Central Government
Maharashtra,Mumbai,Seth GS Medical College,Mumbai,MBBS,Maharashtra University of Health Sciences,1926,₹20000/year,200,null,Government
Maharashtra,Pune,BJ Medical College,Pune,MBBS,Maharashtra University of Health Sciences,1878,₹18000/year,180,null,Government
Maharashtra,Mumbai,St. Xavier's College,Mumbai,B.Sc,Mumbai University,1869,₹80000/year,500,null,Private Aided
Maharashtra,Pune,Fergusson College,Pune,B.Sc,Pune University,1885,₹15000/year,800,null,Private Aided
Maharashtra,Mumbai,Sir J.J. College of Architecture,Mumbai,B.Arch,Mumbai University,1913,₹25000/year,60,null,Government
West Bengal,Kharagpur,Indian Institute of Technology Kharagpur,Kharagpur,B.Tech/B.E,IIT Kharagpur,1951,₹850000/year,1500,null,Central Government
West Bengal,Kolkata,Jadavpur University Faculty of Engineering,Kolkata,B.Tech/B.E,Jadavpur University,1955,₹15000/year,900,null,Government
West Bengal,Durgapur,National Institute of Technology Durgapur,Durgapur,B.Tech/B.E,NIT Durgapur,1960,₹550000/year,840,null,Central Government
West Bengal,Kolkata,Bengal Engineering and Science University,Shibpur,B.Tech/B.E,BESU,1856,₹18000/year,1080,null,Government
West Bengal,Kolkata,Medical College and Hospital,Kolkata,MBBS,West Bengal University of Health Sciences,1835,₹12000/year,250,null,Government
West Bengal,Kolkata,RG Kar Medical College,Kolkata,MBBS,West Bengal University of Health Sciences,1886,₹12000/year,200,null,Government
West Bengal,Kolkata,Presidency University,Kolkata,B.Sc,Presidency University,1817,₹6000/year,400,null,Government
West Bengal,Kolkata,Scottish Church College,Kolkata,B.Sc,University of Calcutta,1830,₹8000/year,600,null,Private Aided
Delhi,New Delhi,Indian Institute of Technology Delhi,New Delhi,B.Tech/B.E,IIT Delhi,1961,₹250000/year,1200,null,Central Government
Delhi,New Delhi,Delhi Technological University,New Delhi,B.Tech/B.E,DTU,1941,₹150000/year,1400,null,Government
Delhi,New Delhi,Netaji Subhas University of Technology,New Delhi,B.Tech/B.E,NSUT,1983,₹120000/year,1200,null,Government
Delhi,New Delhi,All India Institute of Medical Sciences Delhi,New Delhi,MBBS,AIIMS,1956,₹25000/year,100,null,Central Government
Delhi,New Delhi,Maulana Azad Medical College,New Delhi,MBBS,Guru Gobind Singh Indraprastha University,1958,₹15000/year,250,null,Government
Delhi,New Delhi,University College of Medical Sciences,New Delhi,MBBS,University of Delhi,1971,₹10000/year,150,null,Government
Delhi,New Delhi,St. Stephen's College,New Delhi,B.Sc,University of Delhi,1881,₹20000/year,400,null,Private Aided
Delhi,New Delhi,Hindu College,New Delhi,B.Sc,University of Delhi,1899,₹15000/year,800,null,Government
Delhi,New Delhi,School of Planning and Architecture,New Delhi,B.Arch,SPA Delhi,1941,₹60000/year,50,null,Central Government
Rajasthan,Jaipur,Malaviya National Institute of Technology,Jaipur,B.Tech/B.E,NIT Jaipur,1963,₹550000/year,840,null,Central Government
Rajasthan,Jodhpur,All India Institute of Medical Sciences,Jodhpur,MBBS,AIIMS,2012,₹5000/year,125,null,Central Government
Rajasthan,Jaipur,SMS Medical College,Jaipur,MBBS,Rajasthan University of Health Sciences,1947,₹25000/year,300,null,Government
Gujarat,Ahmedabad,L.D. College of Engineering,Ahmedabad,B.Tech/B.E,Gujarat Technological University,1948,₹30000/year,720,null,Government
Gujarat,Ahmedabad,B.J. Medical College,Ahmedabad,MBBS,Gujarat University,1946,₹18000/year,250,null,Government
Gujarat,Ahmedabad,St. Xavier's College,Ahmedabad,B.Sc,Gujarat University,1955,₹15000/year,600,null,Private Aided
Kerala,Calicut,National Institute of Technology Calicut,Calicut,B.Tech/B.E,NIT Calicut,1961,₹550000/year,909,null,Central Government
Kerala,Thiruvananthapuram,Government Medical College,Thiruvananthapuram,MBBS,Kerala University of Health Sciences,1951,₹12000/year,200,null,Government
Kerala,Thiruvananthapuram,University College,Thiruvananthapuram,B.Sc,University of Kerala,1866,₹8000/year,500,null,Government`;

      this.colleges = this.parseCSV(csvData);
      this.isLoaded = true;
      return this.colleges;
    } catch (error) {
      console.error('Error loading colleges from CSV:', error);
      return [];
    }
  }

  // Parse CSV string into structured data
  parseCSV(csvData) {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    const colleges = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      if (values.length === headers.length) {
        const college = {};
        headers.forEach((header, index) => {
          college[header.trim()] = values[index]?.trim() || '';
        });
        
        // Add computed properties
        college.id = i;
        college.feeAmount = this.extractFeeAmount(college.Fee);
        college.rating = this.generateRating();
        
        colleges.push(college);
      }
    }

    return colleges;
  }

  // Parse a single CSV line handling commas in quoted fields
  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }

  // Extract numeric fee amount from fee string
  extractFeeAmount(feeString) {
    const match = feeString.match(/₹(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  // Generate random rating for colleges
  generateRating() {
    return (Math.random() * (4.9 - 4.0) + 4.0).toFixed(1);
  }

  // Get colleges by stream
  async getCollegesByStream(stream) {
    const colleges = await this.loadCollegesFromCSV();
    
    // Normalize stream for matching
    const normalizedStream = stream.toLowerCase();
    
    return colleges.filter(college => {
      const collegeStream = college.Stream.toLowerCase();
      
      // Map quiz results to stream categories
      if (normalizedStream.includes('engineering') || normalizedStream.includes('technology')) {
        return collegeStream.includes('b.tech') || collegeStream.includes('b.e');
      }
      if (normalizedStream.includes('medical') || normalizedStream.includes('doctor')) {
        return collegeStream.includes('mbbs');
      }
      if (normalizedStream.includes('science')) {
        return collegeStream.includes('b.sc');
      }
      if (normalizedStream.includes('commerce') || normalizedStream.includes('business')) {
        return collegeStream.includes('b.com');
      }
      if (normalizedStream.includes('architecture')) {
        return collegeStream.includes('b.arch');
      }
      
      return collegeStream.includes(normalizedStream);
    });
  }

  // Get all available streams
  async getAvailableStreams() {
    const colleges = await this.loadCollegesFromCSV();
    const streams = [...new Set(colleges.map(college => college.Stream))];
    return streams.sort();
  }

  // Get colleges by state
  async getCollegesByState(state) {
    const colleges = await this.loadCollegesFromCSV();
    return colleges.filter(college => 
      college.State.toLowerCase() === state.toLowerCase()
    );
  }

  // Get fee statistics for a stream
  async getFeeStatistics(stream) {
    const colleges = await this.getCollegesByStream(stream);
    if (colleges.length === 0) return null;

    const fees = colleges.map(college => college.feeAmount).sort((a, b) => a - b);
    
    return {
      min: fees[0],
      max: fees[fees.length - 1],
      average: Math.round(fees.reduce((sum, fee) => sum + fee, 0) / fees.length),
      median: fees[Math.floor(fees.length / 2)]
    };
  }
}

// Export singleton instance
export default new CSVCollegeService();