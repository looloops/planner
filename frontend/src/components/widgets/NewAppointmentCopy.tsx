import React, { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/scss/newappointment.scss";
import NewForm from "./NewAppointmentForm"; // Importa il nuovo componente NewForm
import { SCHEDULE_DETAILS } from "../../redux/actions";
import { GeneralSettings } from "../../typescript/interfaces";

interface NewAppointmentsProps {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  currentEditIndex: number | null;
  setCurrentEditIndex: (index: number | null) => void;
}

const NewAppointmentCopy: React.FC<NewAppointmentsProps> = ({
  editMode,
  setEditMode,
  currentEditIndex,
  setCurrentEditIndex,
}) => {
  const schedule = useSelector((state: State) => state.widgets.schedule);
  const dateFromCalendar = useSelector((state: State) => state.widgets.active_date);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date();
  const startingDay = String(today.getDate()).padStart(2, "0");
  const startingMonth = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns 0-11
  const startingYear = today.getFullYear();
  const startingDate = `${startingYear}-${startingMonth}-${startingDay}`;

  // GETTING HIGHEST ID IN THE SCHEDULE SETTINGS ARRAY
  const arrId: number[] = schedule.settings?.map((element) => element.id) || [];
  const maxId = arrId.length > 0 ? Math.max(...arrId) : 0;

  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: maxId + 1,
    title: "",
    start: "",
    finish: "",
    priority: "",
    date: dateFromCalendar,
  });

  useEffect(() => {
    setFormData({
      id: maxId + 1,
      title: "",
      start: "",
      finish: "",
      priority: "",
      date: dateFromCalendar,
    });
  }, [dateFromCalendar]);

  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleHourClick = (hour: string) => {
    setSelectedHour(selectedHour === hour ? null : hour);
    setFormData((prevFormData) => ({ ...prevFormData, start: hour }));
  };

  const submitNewData = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!schedule || !schedule.settings) return;

    let updatedSettingsArray: Partial<GeneralSettings>[] = [];

    if (editMode && currentEditIndex !== null) {
      updatedSettingsArray = schedule.settings.map((setting: Partial<GeneralSettings>, index: number) =>
        index === currentEditIndex ? { ...formData } : setting
      );
    } else {
      updatedSettingsArray = [...schedule.settings, { ...formData }];
    }

    const body = {
      ...schedule,
      settings: updatedSettingsArray,
    };

    try {
      const response = await axios.put(`http://localhost:8000/api/user/widgets/edit/${schedule.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Data added successfully:", response.data);
      setEditMode(false);
      setCurrentEditIndex(null);
      dispatch({
        type: SCHEDULE_DETAILS,
        payload: body,
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const appointmentsForDay = schedule.settings?.filter((appointment) => appointment.date === dateFromCalendar);

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
          <h6>
            {editMode ? (
              <span style={{ color: "#8D8D8D" }}>Edit appointment: {dateFromCalendar}</span>
            ) : (
              <span style={{ color: "#8D8D8D" }}>Schedule a new appointment: {dateFromCalendar}</span>
            )}
          </h6>

          {/* SELECTED HOUR */}
          {selectedHour && (
            <div>
              <NewForm
                formData={formData}
                currentEditIndex={currentEditIndex}
                handleInputChange={handleInputChange}
                handleSubmit={submitNewData}
              />
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

          {/* FORM FOR NEW APPOINTMENT */}
          {!selectedHour && (
            <div className="appointments-list">
              <NewForm
                currentEditIndex={currentEditIndex}
                setFormData={setFormData}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={submitNewData}
              />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default NewAppointmentCopy;
