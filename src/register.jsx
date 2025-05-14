import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    size: "",
    logo: null,
    email: "",
  });
  const navigate = useNavigate(); 

const handleSubmit = () => {
    navigate("/company"); 
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  

  return (

    <div className="w-screen min-h-screen  w-screen bg-gray-100 flex items-center justify-center px-4">



      <div className="mt-12 mb-12 bg-white p-8 rounded-lg shadow-md w-full max-w-xl">


        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Register Your Company</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Company Size</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="">Select size</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Company Logo</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded bg-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Official Company Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
        <div>
  <label className="block mb-1 font-medium">
    Proof of Legitimacy (e.g., Tax/Registration Documents)
  </label>
  <input
    type="file"
    name="documents"
    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
    onChange={handleChange}
    className="w-full border border-gray-300 p-2 rounded bg-white"
    required
  />
</div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 transition"
          >
            Register Company
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCompany;
