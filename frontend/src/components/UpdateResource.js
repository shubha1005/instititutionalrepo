// src/components/UpdateResource.jsx
import React, { useState } from "react";
import axios from "axios";

export default function UpdateResource({ resource, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...resource });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/api/admin-resources/${resource._id}`, formData);
      onUpdated(res.data.resource);
      setIsEditing(false);
    } catch (err) {
      console.error("❌ Error updating resource:", err);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsEditing(true)}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Update
      </button>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Resource</h2>

            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border rounded mb-2"
            />

            <input
              type="text"
              name="year"
              value={formData.year || ""}
              onChange={handleChange}
              placeholder="Year"
              className="w-full p-2 border rounded mb-2"
            />

            {/* add more fields based on type */}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
