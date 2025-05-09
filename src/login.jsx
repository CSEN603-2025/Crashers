
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example navigation logic
    if (userType === "student") {
      navigate("/student-dashboard");
    } else {
      alert(`Logged in as ${userType} (email: ${email})`);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Internship Portal Login</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            style={styles.input}
          >
            <option value="student">Student</option>
            <option value="company">Company</option>
            <option value="scad">SCAD Office</option>
            <option value="faculty">Faculty Member</option>
          </select>

          <button type="submit" style={styles.button}>Log In</button>
        </form>
      </div>
    </div>
  );


  const handleApply = (internship) => {
    const existing = JSON.parse(localStorage.getItem("appliedInternships")) || [];
  
    // Avoid duplicate applications
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
  
}


const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "90%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  }
};

export default Login;