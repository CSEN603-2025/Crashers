import { useState, useEffect } from "react";

function StudentProfile() {
  const [jobInterest, setJobInterest] = useState("Web Development");
  const [internships, setInternships] = useState([
    { company: "Google", role: "Intern", duration: "3 months", responsibilities: "Worked on web apps" },
  ]);
  const [activities, setActivities] = useState(["Robotics Club", "Tech Conference Volunteer"]);
  const [major, setMajor] = useState("");
  const [semester, setSemester] = useState("");
  const [appliedInternships, setAppliedInternships] = useState([]);

  // List of Majors and Semester Options
  const majors = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Business Administration"];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const savedAppliedInternships = JSON.parse(localStorage.getItem("appliedInternships")) || [];
    setAppliedInternships(savedAppliedInternships);
  }, []);

  const handleJobInterestChange = (e) => setJobInterest(e.target.value);

  const handleInternshipChange = (idx, e) => {
    const updatedInternships = [...internships];
    updatedInternships[idx][e.target.name] = e.target.value;
    setInternships(updatedInternships);
  };

  const handleAddInternship = () => {
    setInternships([...internships, { company: "", role: "", duration: "", responsibilities: "" }]);
  };

  const handleActivityChange = (e, idx) => {
    const updatedActivities = [...activities];
    updatedActivities[idx] = e.target.value;
    setActivities(updatedActivities);
  };

  const handleAddActivity = () => {
    setActivities([...activities, ""]);
  };

  return (
    <div style={styles.container}>
      <h1>Student Profile</h1>

      {/* Job Interest Section */}
      <div style={styles.section}>
        <h2>Job Interest</h2>
        <input
          type="text"
          value={jobInterest}
          onChange={handleJobInterestChange}
          style={styles.input}
          placeholder="Enter your job interest"
        />
      </div>

      {/* Major & Semester Section */}
      <div style={styles.section}>
        <h2>Major & Semester</h2>
        <select
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Major</option>
          {majors.map((majorOption, idx) => (
            <option key={idx} value={majorOption}>
              {majorOption}
            </option>
          ))}
        </select>

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Semester</option>
          {semesters.map((semesterOption, idx) => (
            <option key={idx} value={semesterOption}>
              Semester {semesterOption}
            </option>
          ))}
        </select>
      </div>

      {/* College Activities Section */}
      <div style={styles.section}>
        <h2>College Activities</h2>
        {activities.map((activity, idx) => (
          <div key={idx} style={styles.card}>
            <input
              type="text"
              value={activity}
              onChange={(e) => handleActivityChange(e, idx)}
              placeholder="Activity Name"
              style={styles.input}
            />
          </div>
        ))}
        <button onClick={handleAddActivity} style={styles.button}>Add Activity</button>
      </div>

      {/* Applied Internships Section */}
      <div style={styles.section}>
        <h2>Applied Internships</h2>
        {appliedInternships.length === 0 ? (
          <p>You have not applied to any internships yet.</p>
        ) : (
          appliedInternships.map((internship, idx) => (
            <div key={idx} style={styles.card}>
              <h3>{internship.company}</h3>
              <p><strong>Role:</strong> {internship.title}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "2rem auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  section: {
    marginBottom: "2rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  card: {
    marginBottom: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default StudentProfile;
