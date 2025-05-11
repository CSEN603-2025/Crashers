import { useState } from "react";

function PostInternshipButton() {
const [showSuccess, setShowSuccess] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [duration, setDuration] = useState("");
const [isPaid, setIsPaid] = useState("unpaid");
const [salary, setSalary] = useState("");
const [skills, setSkills] = useState("");
const [description, setDescription] = useState("");

const handleButtonClick = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = {
    duration,
    isPaid,
    salary: isPaid === "paid" ? salary : "N/A",
    skills,
    description,
  };

  console.log("Submitted Internship:", formData);

  // Clear form
  setDuration("");
  setIsPaid("unpaid");
  setSalary("");
  setSkills("");
  setDescription("");
  setShowSuccess(true);

  // Automatically close modal after 2 seconds
  setTimeout(() => {
    setShowSuccess(false);
    closeModal();
  }, 2000);};

return (
  <div>
    <button
      className="bg-blue-500 text-white font-bold font-poppins py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition-colors"
      onClick={handleButtonClick}
    >
      Post an Internship
    </button>

    {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto pt-10 px-4">
        <div className="bg-white p-8 rounded-md w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className=" text-1xl bg-blue-500 text-white font-bold font-poppins px-6 py-2 mb-4 rounded border border-blue-700">Post an Internship</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="e.g., 3 months"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Type</label>
              <select
                value={isPaid}
                onChange={(e) => setIsPaid(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>

            {isPaid === "paid" && (
              <div>
                <label className="block text-gray-700 font-semibold">Salary</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                  placeholder="e.g., 5000"
                  required={isPaid === "paid"}
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-semibold">Skills Required</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="e.g., React, Java, Communication"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Job Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
                rows="4"
                placeholder="Describe the internship role..."
                required
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 font-bold text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
          {showSuccess && (
  <div className="bg-green-100 text-green-800 font-semibold px-4 py-2 mb-4 rounded border border-green-300">
    Internship posted successfully!
  </div>
)}

        </div>
      </div>
    )}
  </div>
);
}

export default PostInternshipButton;