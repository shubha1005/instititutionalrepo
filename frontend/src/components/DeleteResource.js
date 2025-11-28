// src/components/DeleteResource.jsx
import React from "react";
import axios from "axios";

export default function DeleteResource({ resourceId, onDeleted }) {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    try {
      await axios.delete(`/api/admin-resources/${resourceId}`);
      onDeleted(resourceId);
    } catch (err) {
      console.error("❌ Error deleting resource:", err);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 bg-red-500 text-white rounded"
    >
      Delete
    </button>
  );
}
