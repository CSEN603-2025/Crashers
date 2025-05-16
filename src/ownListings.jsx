import { Pencil, Trash2 } from "lucide-react";
import NavBar from "./navBar";
import SlidingSidebar from "./slidingBar";
import { useState } from "react";
import PostInternshipButton from "./post";
import { useNavigate } from "react-router-dom";


const initialInternships = [
  {
    id: 1,
    title: "Frontend Developer Internship",
    duration: "3 Months",
    paid: true,
    salary: "$500/month",
    skills: ["React", "TailwindCSS", "JavaScript"],
    description:
      "Work on building dynamic UIs and responsive components for our platform. Collaborate with design and backend teams.",
    applications: 24,
  },
  {
    id: 2,
    title: "Backend Developer Internship",
    duration: "6 Months",
    paid: false,
    salary: "Unpaid",
    skills: ["Node.js", "MongoDB", "REST APIs"],
    description:
      "Help us scale our backend infrastructure and develop secure APIs to support our web and mobile apps.",
    applications: 18,
  },
  {
    id: 3,
    title: "Marketing Intern",
    duration: "2 Months",
    paid: true,
    salary: "$300/month",
    skills: ["SEO", "Social Media", "Content Writing"],
    description:
      "Support our marketing campaigns, analyze outreach data, and write promotional content for digital platforms.",
    applications: 11,
  },
];

const InternshipListings = () => {
  const [internships, setInternships] = useState(initialInternships);
  const [editId, setEditId] = useState(null);
  const [editedIntern, setEditedIntern] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
const [durationFilter, setDurationFilter] = useState("All");
const [salaryFilter, setSalaryFilter] = useState("All");
const [skillFilter, setSkillFilter] = useState("All");

  const [showProfile, setShowProfile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);
const [toastMessage, setToastMessage] = useState("");


  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  const handleDelete = (id) => {
  setInternships(internships.filter((intern) => intern.id !== id));
  setToastMessage("Deleted successfully!");

  setTimeout(() => {
    setToastMessage("");
  }, 3000);
};



  const handleEdit = (intern) => {
    setEditId(intern.id);
    setEditedIntern(intern);
  };

  const handleSave = () => {
    setInternships((prev) =>
      prev.map((i) => (i.id === editId ? editedIntern : i))
    );
    setEditId(null);
  };

  const handleChange = (field, value) => {
    setEditedIntern({ ...editedIntern, [field]: value });
  };

  const filteredInternships = internships.filter((intern) => {
  const matchesSearch = intern.title.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesPaid =
    filter === "All" ||
    (filter === "Paid" && intern.paid) ||
    (filter === "Unpaid" && !intern.paid);

  const matchesDuration =
    durationFilter === "All" || intern.duration === durationFilter;

  const salaryValue = parseInt(intern.salary.replace(/[^0-9]/g, ""));
  const matchesSalary =
    salaryFilter === "All" ||
    (salaryFilter === "<400" && salaryValue < 400) ||
    (salaryFilter === "400-600" && salaryValue >= 400 && salaryValue <= 600) ||
    (salaryFilter === ">600" && salaryValue > 600) ||
    (salaryFilter === "Unpaid" && intern.salary === "Unpaid");

  const matchesSkill =
    skillFilter === "All" ||
    intern.skills.some((skill) =>
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );

  return matchesSearch && matchesPaid && matchesDuration && matchesSalary && matchesSkill;
});
      const navigate = useNavigate();

  return (
    <div className="w-screen bg-gray-100 min-h-screen text-gray-800 font-sans">
      <NavBar />
      <div className="max-w-6xl mx-auto mt-24 mr-24 px-6 sm:px-8 py-16">

        <h1 className="font-poppins text-4xl font-bold text-green-800 text-center mb-10">
          My Internship Listings
        </h1>
<div className="flex justify-between items-center mb-6 mt-6">
        <PostInternshipButton/>
                    </div>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded-md w-1/3"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Paid/Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <select onChange={(e) => setDurationFilter(e.target.value)}>
  <option value="All">All Durations</option>
  <option value="2 Months">2 Months</option>
  <option value="3 Months">3 Months</option>
  <option value="6 Months">6 Months</option>
</select>

<select onChange={(e) => setSalaryFilter(e.target.value)}>
  <option value="All">All Salaries</option>
  <option value="Unpaid">Unpaid</option>
  <option value="<400">Less than $400</option>
  <option value="400-600">$400 - $600</option>
  <option value=">600">More than $600</option>
</select>

<select onChange={(e) => setSkillFilter(e.target.value)}>
  <option value="All">All Skills</option>
  <option value="React">React</option>
  <option value="MongoDB">MongoDB</option>
  <option value="TailwindCSS">TailwindCSS</option>
  <option value="Node.js">Node.js</option>
  <option value="SEO">SEO</option>
</select>

        </div>

        <div className="space-y-8">
          {filteredInternships.map((intern, index) => (
            <div
              key={intern.id}
              className="bg-white rounded-lg shadow-lg border-l-8 border-green-600 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-semibold text-green-700">
                    {index + 1}. {intern.title}
                  </h2>
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(intern)} className=" text-yellow-500 hover:text-yellow-600 hover:border-primary border-2">
                      <Pencil size={20} />
                    </button>
                    <button onClick={() => handleDelete(intern.id)} className="text-red-500 hover:text-red-600 hover:border-primary border-2">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {editId === intern.id ? (
                  <>
                  <div className="mb-2">
    <label className="block font-medium mb-1">Title:</label>
                    <input
                      value={editedIntern.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    </div>
                    <div className="mb-2">
                   <label className="block font-medium mb-1">Description:</label>
                    <textarea
                      value={editedIntern.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    </div>
                    <div className="mb-2">
    <label className="block font-medium mb-1">Paid:</label>
                    <textarea
                      value={editedIntern.paid}
                      onChange={(e) => handleChange("paid", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    </div>
                    <div className="mb-2">
    <label className="block font-medium mb-1">Duration:</label>
                     <textarea
                      value={editedIntern.duration}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    </div>
                    <div className="mb-2">
    <label className="block font-medium mb-1">Salary:</label>
                     <textarea
                      value={editedIntern.salary}
                      onChange={(e) => handleChange("salary", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    </div>
                    <div className="mb-2">
    <label className="block font-medium mb-1">Skills:</label>
                     <textarea
                      value={editedIntern.skills}
                      onChange={(e) => handleChange("skills", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    </div>
                    <button onClick={handleSave} className="bg-green-600 text-white px-4 py-1 rounded mt-2">
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <p>
                        <strong>Duration:</strong> {intern.duration}
                      </p>
                      <p>
                        <strong>Paid:</strong> {intern.paid ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Expected Salary:</strong> {intern.salary}
                      </p>
                      <p>
                        <strong>Skills Required:</strong> {intern.skills.join(", ")}
                      </p>
                    </div>
                    <div className="text-sm text-gray-700">
                      <strong>Job Description:</strong>
                      <p className="mt-1">{intern.description}</p>
                    </div>
                    <p className="text-sm text-green-600 font-semibold">
                      Applications: {intern.applications}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SlidingSidebar
        setShowProfile={setShowProfile}
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      {toastMessage && (
  <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
    {toastMessage}
  </div>
)}
    </div>
  );
};

export default InternshipListings;