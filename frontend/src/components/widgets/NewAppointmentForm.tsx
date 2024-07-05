import { State } from "../../redux/reducers/WidgetsReducer";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { GeneralSettings } from "../../typescript/interfaces";

interface FormProps {
  formData: {
    id: number;
    title: string;
    start: string;
    finish: string;
    priority: string;
    date: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      id: number;
      title: string;
      start: string;
      finish: string;
      priority: string;
      date: string;
    }>
  >;
  currentEditIndex: number | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const NewForm: React.FC<FormProps> = ({ currentEditIndex, formData, setFormData, handleInputChange, handleSubmit }) => {
  const schedule = useSelector((state: State) => state.widgets.schedule);

  let appointmentToEdit: Partial<GeneralSettings> | undefined;
  if (currentEditIndex !== null) {
    appointmentToEdit = schedule.settings.find((setting: Partial<GeneralSettings>) => setting.id === currentEditIndex);
    console.log("appointmentToEdit", appointmentToEdit);
  }

  useEffect(() => {
    if (appointmentToEdit) {
      setFormData({
        id: appointmentToEdit.id || formData.id,
        title: appointmentToEdit.title || formData.title,
        start: appointmentToEdit.start || formData.start,
        finish: appointmentToEdit.finish || formData.finish,
        priority: appointmentToEdit.priority || formData.priority,
        date: appointmentToEdit.date || formData.date,
      });
    }
  }, [appointmentToEdit, setFormData]);

  return (
    <form className="form-appointment" onSubmit={handleSubmit}>
      <div className="input-field">
        <input
          type="hidden"
          className="form-control"
          id="id"
          name="id"
          onChange={handleInputChange}
          value={formData.id}
          disabled // Disable editing of ID
        />

        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
      </div>
      <div className="input-field">
        <label htmlFor="start">Start Time:</label>
        <input type="text" id="start" name="start" value={formData.start} onChange={handleInputChange} required />
      </div>
      <div className="input-field">
        <label htmlFor="finish">End Time:</label>
        <input type="text" id="finish" name="finish" value={formData.finish} onChange={handleInputChange} required />
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
        {currentEditIndex ? "Update" : "Add"} Appointment
      </button>
    </form>
  );
};

export default NewForm;
