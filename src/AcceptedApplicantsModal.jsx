import React from "react";

const AcceptedApplicantsModal = ({ applicants, onClose, onStatusUpdate }) => {
  const accepted = applicants.filter((a) => a.status === "Accepted");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-3 right-3 hover:border-primary text-red-600 font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-green-700 mb-4">Accepted Applicants</h2>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {accepted.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold mr-4">
              {app.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </div>
                <div>
                  <p className="font-medium">{app.name}</p>
                  <p className="text-xs text-gray-500">
                    Start: {app.startDate} | End: {app.endDate}
                  </p>
                </div>
              </div>
             <div>
  <select
    onChange={(e) => onStatusUpdate(app.id, e.target.value)}
    defaultValue=""
    className="text-sm px-2 py-1 border rounded bg-white shadow-sm"
  >
    <option value="" disabled>
      Update Status
    </option>
    <option value="current intern">Current Intern</option>
    <option value="internship complete">Internship Complete</option>
  </select>
</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcceptedApplicantsModal;
