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
  // Getting schedule from state
  const schedule = useSelector((state: State) => state.widgets.schedule);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting widget details from API and parsing its data
  // It makes sure data stay updated at every re-rendering
  useEffect(() => {
    axios
      .get<ApiResponse>("/api/user/widgets/1")
      .then((res) => {
        const parsedDetails = {
          ...res.data.data[0],
          settings: JSON.parse(res.data.data[0].settings) as Partial<GeneralSettings>[], // Parse the JSON string to an object
          widget: {
            ...res.data.data[0].widget,
            field_list: JSON.parse(res.data.data[0].widget.field_list), // Parse the JSON string to an object
          },
        };

        // Updating the redux state
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

  // Function to delete an item
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

  // Getting today's date
  const todaysDate = new Date();

  // Ottieni l'anno
  const year = todaysDate.getFullYear();

  // Ottieni il mese e aggiungi 1 perché i mesi in JavaScript sono indicizzati da 0 (gennaio è 0)
  const month = String(todaysDate.getMonth() + 1).padStart(2, "0");

  // Ottieni il giorno del mese
  const day = String(todaysDate.getDate()).padStart(2, "0");

  // Combina le parti in formato yyyy-mm-dd
  const formattedTodaysDate = `${year}-${month}-${day}`;

  console.log(formattedTodaysDate); // Stampa la data nel formato yyyy-mm-dd

  // Getting schedule for today
  const todaysSchedule = schedule.settings?.filter((setting) => setting.date === formattedTodaysDate);
  console.log("todaysSchedule", todaysSchedule);

  return (
    <>
      <div>
        6:00 am
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "06" && appointment.start.substring(0, 2) < "07";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>{" "}
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        7:00 am
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "07" && appointment.start.substring(0, 2) < "08";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        8:00 am
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "08" && appointment.start.substring(0, 2) < "09";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        9:00 am
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "09" && appointment.start.substring(0, 2) < "10";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        10:00 am
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "10" && appointment.start.substring(0, 2) < "11";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        11:00 am
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "11" && appointment.start.substring(0, 2) < "12";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        12:00 pm
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "12" && appointment.start.substring(0, 2) < "13";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        1:00 pm
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "13" && appointment.start.substring(0, 2) < "14";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        2:00 pm
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "14" && appointment.start.substring(0, 2) < "15";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        3:00 pm
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "15" && appointment.start.substring(0, 2) < "16";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        4:00 pm
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "16" && appointment.start.substring(0, 2) < "17";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        5:00 pm
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "17" && appointment.start.substring(0, 2) < "18";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        6:00 pm
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "18" && appointment.start.substring(0, 2) < "19";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        7:00 pm
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "19" && appointment.start.substring(0, 2) < "20";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        8:00 pm
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "20" && appointment.start.substring(0, 2) < "21";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        9:00 pm
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "21" && appointment.start.substring(0, 2) < "22";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>

      <div>
        10:00 pm
        {todaysSchedule
          ?.filter((appointment) => {
            return appointment.start.substring(0, 2) >= "22" && appointment.start.substring(0, 2) < "23";
          })
          .map((appointment) => (
            <React.Fragment key={appointment.id}>
              <span> {appointment.title}</span>
              <Link to={`/schedule/edit/${appointment.id}`}>✎</Link>
              <span onClick={() => deleteItem(appointment.id)} style={{ color: "red" }}>
                XXX
              </span>
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

export default ScheduleTimeline;
