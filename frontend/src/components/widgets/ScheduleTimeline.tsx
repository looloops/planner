import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../../typescript/interfaces";
import { Link } from "react-router-dom";
import { GeneralSettings } from "../../typescript/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { SCHEDULE_DETAILS } from "../../redux/actions/index";
import { State } from "../../redux/reducers/userReducer";

const ScheduleTimeline: React.FC = () => {
  const schedule = useSelector((state: State) => state.widgets.schedule);
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
          type: SCHEDULE_DETAILS,
          payload: parsedDetails,
        });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        navigate("/");
      });
  }, [dispatch, navigate]);

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

  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  const month = String(todaysDate.getMonth() + 1).padStart(2, "0");
  const day = String(todaysDate.getDate()).padStart(2, "0");
  const formattedTodaysDate = `${year}-${month}-${day}`;

  const todaysSchedule = schedule.settings?.filter((setting) => setting.date === formattedTodaysDate);
  console.log("todaysSchedule", todaysSchedule);

  const renderScheduleForHour = (hour: number) => {
    const startHour = String(hour).padStart(2, "0");
    const endHour = String(hour + 1).padStart(2, "0");
    const meridian = hour < 12 ? "am" : "pm";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    return (
      <>
        {/* Div container for single item */}
        <div className="glass-item" key={hour}>
          {/* Div container for top of the item  */}
          <div className="glass-item-top">
            <span className="timeline-hour">
              {displayHour}:00 {meridian}
            </span>

            <button className="timelineButton addButton" id="singleAdd">
              <div className="timelineIcons">+</div>
            </button>
          </div>

          {/* Div container for appointments */}
          <div className="item-content">
            {todaysSchedule
              ?.filter(
                (appointment) =>
                  appointment.start.substring(0, 2) >= startHour && appointment.start.substring(0, 2) < endHour
              )
              .map((appointment) => (
                <React.Fragment key={appointment.id}>
                  <span className="timeline-title">{appointment.title}</span>
                  <div className="buttons-container">
                    <button
                      className="timelineButton editButton"
                      onClick={() => navigate(`/schedule/edit/${appointment.id}`)}
                    >
                      <div className="timelineIcons">
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
                    <button className="timelineButton deleteButton" onClick={() => deleteItem(appointment.id)}>
                      <div className="timelineIcons">-</div>
                    </button>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "10px", paddingTop: "2px", gap: "5px" }}>
        {/* <button className="addBigButton"
  <span className="addBigButton-content">Add</span>
</button> */}

        <select className="selectMenu">
          <option value="option1">Select</option>
          <option value="option2">Appointments</option>
          <option value="option3">Urgent</option>
          <option value="option3">Not urgent</option>
        </select>

        <button className="timelineButton addButton">
          <div className="timelineIcons">+</div>
        </button>
      </div>
      {Array.from({ length: 24 }, (_, index) => renderScheduleForHour(index))}
    </>
  );
};

export default ScheduleTimeline;
