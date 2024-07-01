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
    <form className="form-appointment" onSubmit={handleSubmit}>
      <div className="input-field">
        <label htmlFor="title">Title:</label>
        <input
          placeholder="title"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="input-field">
        <label htmlFor="start">Start Time:</label>
        <input type="text" id="start" name="start" value={formData.start} onChange={handleInputChange} required />
      </div>
      <div className="input-field">
        <label htmlFor="end">End Time:</label>
        <input type="text" id="end" name="end" value={formData.end} onChange={handleInputChange} required />
      </div>
      <div className="select-field">
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          className="select-newappointment"
          onChange={handleInputChange}
          required
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button className="select-newappointment" type="submit">
        {formData.id ? "Update" : "Add"} Appointment
      </button>
    </form>
  );
};

export default NewForm;
