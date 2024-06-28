import "../../assets/scss/appointmens.scss";

import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../../typescript/interfaces";
import { GeneralSettings } from "../../typescript/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { DAILY_SCHEDULE_DETAILS } from "../../redux/actions/index";
import { State } from "../../redux/reducers/WidgetsReducer";

const DailySchedule: React.FC = () => {
  interface Appointment {
    id: number;
    title: string;
    description: string;
    start: string;
    finish: string;
    priority: string;
  }

  // Getting schedule and selected date from calendar from redux
  const dailySchedule = useSelector((state: State) => state.widgets.daily_schedule);
  const dateFromCalendar = useSelector((state: State) => state.widgets.active_date);
  console.log("dailySchedule", dailySchedule);
  console.log("dateFromCalendar", dateFromCalendar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<ApiResponse>("/api/user/widgets/1")
      .then((res) => {
        const parsedDetails = {
          ...res.data.data[0],
          settings: JSON.parse(res.data.data[0].settings) as Partial<GeneralSettings>[],
          widget: {
            ...res.data.data[0].widget,
            field_list: JSON.parse(res.data.data[0].widget.field_list),
          },
        };

        dispatch({
          type: DAILY_SCHEDULE_DETAILS,
          payload: parsedDetails,
        });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        navigate("/");
      });
  }, [dispatch, navigate]);

  const deleteItem = (appointmentId: number) => {
    if (!dailySchedule || !dailySchedule.settings) return;

    const updatedSettingsArray = dailySchedule.settings.filter(
      (setting: GeneralSettings) => setting.id !== appointmentId
    );

    const body = {
      ...dailySchedule,
      settings: updatedSettingsArray,
    };

    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${dailySchedule.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Item deleted successfully:", response.data);
        dispatch({
          type: DAILY_SCHEDULE_DETAILS,
          payload: body,
        });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const todaysSchedule = dailySchedule.settings?.filter(
    (setting: GeneralSettings) => setting.date === dateFromCalendar
  );
  console.log("todaysSchedule", todaysSchedule);

  const renderScheduleForHour = (hour: number) => {
    const startHour = String(hour).padStart(2, "0");
    const endHour = String(hour + 1).padStart(2, "0");
    const meridian = hour < 12 ? "am" : "pm";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    // Filter and sort appointments for the current hour
    const sortedAppointments = todaysSchedule
      ?.filter(
        (appointment: Appointment) =>
          appointment.start.substring(0, 2) >= startHour && appointment.start.substring(0, 2) < endHour
      )
      .sort((a: Appointment, b: Appointment) => a.start.localeCompare(b.start));

    console.log("sortedAppointments", sortedAppointments);

    return (
      <div key={hour}>
        <div className="appointment-single-row">
          <div className="appointment-hour">
            {displayHour}:00 {meridian}
          </div>
          <input></input>
          {/*<div className="appointment-container">
            {sortedAppointments?.map((appointment: Appointment) => (
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
                    <button
                      className="appointmentButtons editButton"
                      onClick={() => navigate(`/schedule/edit/${appointment.id}`)}
                    >
                      <div className="appointment-timelineIcons">
                        <svg
                          width="8px"
                          height="6px"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.8536 0.146447C10.6583 -0.0488155 10.3417 -0.0488155 10.1464 0.146447L0 10.2929V14.5C0 14.7761 0.223858 15 0.5 15H4.70711L14.8536 4.85355C15.0488 4.65829 15.0488 4.34171 14.8536 4.14645L10.8536 0.146447Z"
                            fill="#ffffff"
                          />
                        </svg>
                      </div>
                    </button>
                    <button className="appointmentButtons deleteButton" onClick={() => deleteItem(appointment.id)}>
                      <div className="appointment-timelineIcons">-</div>
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>*/}
        </div>
      </div>
    );
  };

  return (
    <div className="appointment-glass-background">
      <h6 style={{ color: "#7A7A7A", marginBottom: "15px" }}>
        {dateFromCalendar as string} <span style={{ color: "#8D8D8D" }}>Scheduled Appointments</span>
      </h6>
      {Array.from({ length: 14 }, (_, index) => renderScheduleForHour(index))}
    </div>
  );
};

export default DailySchedule;
