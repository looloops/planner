// NewAppointment.tsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/scss/newappointment.scss";
import NewForm from "./NewAppointmentForm"; // Importa il nuovo componente NewForm
import { SCHEDULE_DETAILS } from "../../redux/actions";

const NewAppointmentCopy: React.FC = () => {
  const schedule = useSelector((state: State) => state.widgets.schedule);

  const today = new Date();
  const startingDay = String(today.getDate()).padStart(2, "0");
  const startingMonth = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns 0-11
  const startingYear = today.getFullYear();
  const startingDate = `${startingYear}-${startingMonth}-${startingDay}`;

  const dateFromCalendar = useSelector((state: State) => state.widgets.active_date);
  console.log("datefromcalendar", dateFromCalendar);

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

  useEffect(() => {
    setFormData({
      id: null,
      title: "",
      start: "",
      end: "",
      priority: "",
      date: dateFromCalendar,
    });
  }, [dateFromCalendar, dispatch]);

  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleHourClick = (hour: string) => {
    selectedHour === hour ? setSelectedHour(null) : setSelectedHour(hour);
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
      dispatch({
        type: SCHEDULE_DETAILS,
        payload: body,
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

  const appointmentsForDay = schedule.settings?.filter((appointment) => appointment.date === dateFromCalendar);
  console.log("selectedHour", selectedHour);

  return (
    dateFromCalendar && (
      <div>
        {/* CONTAINER HOURS PILLS */}
        <div className="hours-pills-container">
          {hours.map((hour) => (
            <div
              key={hour}
              className={`hour-pill  ${selectedHour === hour ? "selected" : ""}`}
              onClick={() => handleHourClick(hour)}
            >
              {hour}
            </div>
          ))}
        </div>

        {/* SELECTED DATE */}
        <div className="appointment-glass-background">
          <h6 style={{ color: "#7A7A7A", marginBottom: "15px" }}>
            <span style={{ color: "#8D8D8D" }}>Schedule a new appointment: </span> {dateFromCalendar}
          </h6>
          {/* SELECTED HOUR */}

          {selectedHour && (
            <div>
              <NewForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
              <h6>Appointments for {selectedHour}:</h6>
              {appointmentsForDay

                ?.filter((appointment) => appointment.start.startsWith(selectedHour.substring(0, 2)))
                .map((appointment) => (
                  <div key={appointment.id} className="appointment-summary">
                    <span>
                      {appointment.title} - {appointment.start}
                    </span>
                  </div>
                ))}
            </div>
          )}
          {!selectedHour && (
            <div className="appointments-list">
              {/* <h6>All Appointments for the Day:</h6>
            {appointmentsForDay?.map((appointment) => (
              <div key={appointment.id} className="appointment-summary">
                <span>
                  {appointment.title} - {appointment.start}
                </span>
              </div>
            ))} */}

              <NewForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default NewAppointmentCopy;
