import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const suggestedCompanies = [
    { name: "Google", industry: "Tech", basedOn: "Web Dev Interest" },
    { name: "Unilever", industry: "FMCG", basedOn: "Past Intern Recs" },
    { name: "Valeo", industry: "Automotive", basedOn: "AI Projects" }
  ];

  const availableInternships = [
    { company: "Google", title: "Web Developer Intern", duration: "3 months" },
    { company: "Unilever", title: "Marketing Intern", duration: "6 months" },
    { company: "Valeo", title: "AI Research Intern", duration: "4 months" },
    { company: "Microsoft", title: "Software Engineering Intern", duration: "3 months" }
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const goToProfile = () => {
    navigate("/studentprofile");
  };

  const handleApply = (internship) => {
    const existing = JSON.parse(localStorage.getItem("appliedInternships")) || [];

    const alreadyApplied = existing.some(
      (i) => i.company === internship.company && i.title === internship.title
    );

    if (!alreadyApplied) {
      const updated = [...existing, internship];
      localStorage.setItem("appliedInternships", JSON.stringify(updated));
      alert(`Applied to ${internship.title} at ${internship.company}`);
    } else {
      alert("You already applied to this internship.");
    }
  };

  const filteredInternships = availableInternships.filter((internship) => {
    return (
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div style={styles.page}>
      <div style={styles.profileIconContainer}>
        <button onClick={goToProfile} style={styles.profileIcon} title="My Profile">
          👤
        </button>
      </div>

      <div style={styles.container}>
        <h1 style={styles.title}>Suggested Companies for You</h1>
        <div style={styles.grid}>
          {suggestedCompanies.map((company, idx) => (
            <div key={idx} style={styles.card}>
              <h2 style={styles.company}>{company.name}</h2>
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><em>Based on: {company.basedOn}</em></p>
            </div>
          ))}
        </div>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by Job Title or Company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.input}
          />
        </div>

        <h1 style={styles.title}>Available Internships at SCAD</h1>
        <p style={styles.subtitle}>
          View a list of all available internships, including company name, job title, and duration.
        </p>
        <div style={styles.grid}>
          {filteredInternships.map((internship, idx) => (
            <div key={idx} style={styles.card}>
              <h2 style={styles.company}>{internship.company}</h2>
              <p><strong>Job Title:</strong> {internship.title}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <button onClick={() => handleApply(internship)} style={styles.applyButton}>
                Apply
              </button>
            </div>
          ))}
          {filteredInternships.length === 0 && (
            <p>No internships found for the given search criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f4f7fa",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative"
  },
  profileIconContainer: {
    position: "absolute",
    top: "1rem",
    right: "1rem"
  },
  profileIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto"
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#333"
  },
  subtitle: {
    textAlign: "center",
    fontSize: "1rem",
    marginBottom: "1.5rem",
    color: "#555"
  },
  grid: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
  },
  card: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)"
  },
  company: {
    fontSize: "1.25rem",
    color: "#007bff",
    marginBottom: "0.5rem"
  },
  applyButton: {
    padding: "0.5rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "1rem"
  },
  searchContainer: {
    marginBottom: "2rem",
    textAlign: "center",
    marginTop: "2rem"
  },
  input: {
    width: "80%",
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc"
  }
};

export default StudentDashboard;
