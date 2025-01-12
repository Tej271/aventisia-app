import React, { useState } from "react";

export const CreateModelModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    llm: "Neural (recommended)",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Create new model</h2>
          <button className="text-3xl text-gray-500 hover:text-gray-800" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Model Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter Model Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Model Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            >
              <option value="">Select</option>
              <option value="Extraction">Extraction</option>
              <option value="Classification">Classification</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">LLM</label>
            <select
              name="llm"
              value={formData.llm}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            >
              <option>Neural (recommended)</option>
              <option>Statistical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Model Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter Model Description"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="bg-[#e7e6fa] text-[#4f46e5] px-14 py-2 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="bg-[#4f46e5] text-white px-14 py-2 rounded" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};
