import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewAppointment: React.FC = () => {
  const schedule = useSelector((state: State) => state.widgets.schedule);
  const dateFromCalendar = useSelector((state: State) => state.widgets.active_date);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    start: "",
    end: "",
    priority: "",
    date: dateFromCalendar,
  });

  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleHourClick = (hour: string) => {
    setSelectedHour(hour);
    setFormData((prevFormData) => ({ ...prevFormData, start: hour }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedule || !schedule.settings) return;

    const newAppointment = { ...formData };
    let updatedSettingsArray;

    if (formData.id) {
      updatedSettingsArray = schedule.settings.map((setting) =>
        setting.id === formData.id ? newAppointment : setting
      );
    } else {
      newAppointment.id = Math.max(schedule.settings.map((s) => s.id)) + 1;
      updatedSettingsArray = [...schedule.settings, newAppointment];
    }

    const body = {
      ...schedule,
      settings: updatedSettingsArray,
    };

    try {
      await axios.put(`http://localhost:8000/api/user/widgets/edit/${schedule.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Appointment saved successfully");
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  const handleEdit = (appointment: any) => {
    setSelectedHour(appointment.start);
    setFormData(appointment);
  };

  const deleteItem = (appointmentId: number) => {
    if (!schedule || !schedule.settings) return;

    const updatedSettingsArray = schedule.settings.filter((setting) => setting.id !== appointmentId);

    const body = {
      ...schedule,
      settings: updatedSettingsArray,
    };

    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${schedule.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Item deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <div>
      <div className="hours-pills-container">
        {hours.map((hour) => (
          <div
            key={hour}
            className={`hour-pill ${selectedHour === hour ? "selected" : ""}`}
            onClick={() => handleHourClick(hour)}
          >
            {hour}
          </div>
        ))}
      </div>
      <div className="appointment-glass-background">
        <h6 style={{ color: "#7A7A7A", marginBottom: "15px" }}>
          {dateFromCalendar} <span style={{ color: "#8D8D8D" }}>Scheduled Appointments</span>
        </h6>
        {selectedHour && (
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
        )}
        {Array.from({ length: 24 }, (_, index) => {
          const hour = index.toString().padStart(2, "0") + ":00";
          const appointmentsForHour = schedule.settings?.filter(
            (appointment) => appointment.date === dateFromCalendar && appointment.start.startsWith(hour)
          );

          return (
            <div key={index}>
              <div className="appointment-single-row">
                <div className="appointment-hour">{hour}</div>
                <div className="appointment-container">
                  {appointmentsForHour?.map((appointment) => (
                    <React.Fragment key={appointment.id}>
                      <div
                        className={
                          appointment.priority === "High"
                            ? "single-appointment high"
                            : appointment.priority === "Medium"
                            ? "single-appointment medium"
                            : appointment.priority === "Low"
                            ? "single-appointment low"
                            : "single-appointment"
                        }
                      >
                        <span className="appointment-title">{appointment.title}</span>
                        <div className="appointment-buttons-container">
                          <button className="appointmentButtons editButton" onClick={() => handleEdit(appointment)}>
                            Edit
                          </button>
                          <button
                            className="appointmentButtons deleteButton"
                            onClick={() => deleteItem(appointment.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewAppointment;
