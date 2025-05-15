import React, { useState } from "react";
import SCADSidebar from "./scadSide";
import NavBar from "./navBar";

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

const CareerWorkshops = () => {
  const [workshops, setWorkshops] = useState([
    {
      id: generateId(),
      name: "Cracking Tech Interviews",
      description: "Strategies to succeed in technical interviews.",
      speaker: "Nour ElDin - Senior Engineer at Google",
      agenda: "Resume tips → Whiteboard coding → Q&A",
      start: "2025-05-18T14:00",
      end: "2025-05-18T16:00",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    speaker: "",
    agenda: "",
    start: "",
    end: "",
  });

  const openModal = (workshop = null) => {
    setEditingWorkshop(workshop);
    setForm(
      workshop || {
        name: "",
        description: "",
        speaker: "",
        agenda: "",
        start: "",
        end: "",
      }
    );
    setIsModalOpen(true);
  };
 const [sidebarWidth, setSidebarWidth] = useState("6rem");
   const [isHovered, setIsHovered] = useState(false);
 
   const handleMouseEnter = () => {
     setSidebarWidth("16rem");
     setIsHovered(true);
   };
 
   const handleMouseLeave = () => {
     setSidebarWidth("6rem");
     setIsHovered(false);
   };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingWorkshop(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingWorkshop) {
      setWorkshops((prev) =>
        prev.map((w) => (w.id === editingWorkshop.id ? { ...form, id: w.id } : w))
      );
    } else {
      setWorkshops((prev) => [...prev, { ...form, id: generateId() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setWorkshops((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="flex">
             <NavBar/> 

      <SCADSidebar
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    <div className="w-screen min-h-screen pt-32 bg-gray-100 px-6 py-12 text-gray-800 font-poppins"
     >
      <h1 className="text-4xl font-poppins text-green-800 text-center mb-10">
        Online Career Workshops
      </h1>

      {/* Create Button */}
      <div className="text-center mb-10">
        <button
          onClick={() => openModal()}
          className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-800 transition"
        >
          + Create Workshop
        </button>
      </div>

      {/* Workshop Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
        {workshops.map((w) => (
          <div
            key={w.id}
            className="bg-white p-6 rounded-lg shadow border-l-8 border-green-600 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-green-700">{w.name}</h2>
            <p className="text-sm text-gray-500">{w.speaker}</p>
            <p className="mt-2 text-sm text-gray-700">{w.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              <strong>Starts:</strong> {new Date(w.start).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              <strong>Ends:</strong> {new Date(w.end).toLocaleString()}
            </p>
            <p className="text-sm mt-2">
              <strong>Agenda:</strong><br /> {w.agenda}
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => openModal(w)}
                className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(w.id)}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4 text-green-800">
              {editingWorkshop ? "Edit Workshop" : "Create New Workshop"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Workshop Name"
                required
                className="p-2 border border-gray-300 rounded"
              />
              <input
                name="speaker"
                value={form.speaker}
                onChange={handleChange}
                placeholder="Speaker Bio"
                required
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="datetime-local"
                name="start"
                value={form.start}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="datetime-local"
                name="end"
                value={form.end}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Short Description"
                required
                className="p-2 border border-gray-300 rounded"
              />
              <textarea
                name="agenda"
                value={form.agenda}
                onChange={handleChange}
                placeholder="Workshop Agenda"
                required
                className="p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                >
                  {editingWorkshop ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
        </div>

  );
};

export default CareerWorkshops;
