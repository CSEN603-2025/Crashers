// CompanyProfile.jsx
import React from "react";

function CompanyProfile({ onBack }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Company Logo"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold mb-1">TechNova Inc.</h2>
        <p className="text-gray-600 text-sm mb-4">Technology & Innovation</p>
        <p className="text-gray-700 mb-2">Email: contact@technova.com</p>
        <p className="text-gray-700 mb-6">Company Size: 200-500 Employees</p>

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          View Internship Listings
        </button>

        <button
          onClick={onBack}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default CompanyProfile;
