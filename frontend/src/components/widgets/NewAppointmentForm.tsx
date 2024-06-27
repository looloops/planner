// NewForm.tsx

import React from "react";

interface Props {
  formData: {
    id: number | null;
    title: string;
    start: string;
    end: string;
    priority: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const NewForm: React.FC<Props> = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="start">Start Time:</label>
        <input type="text" id="start" name="start" value={formData.start} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="end">End Time:</label>
        <input type="text" id="end" name="end" value={formData.end} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="priority">Priority:</label>
        <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange} required>
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button type="submit">{formData.id ? "Update" : "Add"} Appointment</button>
    </form>
  );
};

export default NewForm;
