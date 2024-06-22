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
  // const [details, setDetails] = useState<WidgetDetails[]>([]);

  // const user = useSelector((state: State) => state.user);
  const schedule = useSelector((state: State) => state.widgets.schedule);

  // console.log("USER FROM REDUX", user);
  console.log("SCHEDULE FROM REDUX", schedule);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<ApiResponse>("/api/user/widgets/1")
      .then((res) => {
        // console.log("res", res);
        const parsedDetails = {
          ...res.data.data[0],
          settings: JSON.parse(res.data.data[0].settings) as Partial<GeneralSettings>[], // Parse the JSON string to an object
          widget: {
            ...res.data.data[0].widget,
            field_list: JSON.parse(res.data.data[0].widget.field_list), // Parse the JSON string to an object
          },
        };

        // console.log("parsedDetails", parsedDetails);

        // Dispatch the parsed details
        dispatch({
          type: SCHEDULE_DETAILS,
          payload: parsedDetails,
        });

        // Optionally, set form data with the settings if needed
        // setFormData(parsedDetails.settings); // Uncomment and define setFormData if needed
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        navigate("/");
      });
  }, []);

  return (
    /* VIEWING DATA IN DATA IN PAGE
    
      {schedule?.settings?.map((setting: Partial<GeneralSettings>, index) => {
        return <p key={index}>{setting.title}</p>;
      })}

         */
    <>
      {/* <div>
        <Link to={`/schedule/add`}>
          <h3 className="my-5">ADD A NEW APPOINTMENT</h3>
        </Link>
        {schedule?.settings?.map((setting, index) => (
          <div key={index}>
            <p>Title: {setting.title}</p>
            <p>{setting.description}</p>
            <p>Start: {setting.start ? new Date(setting.start).toLocaleString() : "N/A"}</p>
            <p>Finish: {setting.finish ? new Date(setting.finish).toLocaleString() : "N/A"}</p>
            <p>Deadline: {setting.deadline ? new Date(setting.deadline).toLocaleString() : ""}</p>
            <p>Priority: {setting.priority}</p>
            <Link to={`/schedule/edit/${index}`}>Edit</Link>
          </div>
        ))}
      </div> */}

      <div>
        {schedule?.settings
          ?.filter((setting) => {
        const todaysDate = new Date().toLocaleDateString();
            const hour: number = 7
            const dateOfAppointment = new Date(setting.date).toLocaleString;
            const hourOfAppointment = new Date(setting.start).toLocaleString;
            return ( dateOfAppointment === todaysDate && 
            (hourOfAppointment  >= hour && hourOfAppointment  <= hour + 1));
          })
          .map((setting, index) => (
            <div key={index}>
              <p>{hour} {setting.start} {setting.title}</p>
            </div>
          ))}
        <p>7:00</p>
        <p>8:00</p>
        <p>9:00</p>
        <p>10:00</p>
        <p>11:00</p>
        <p>12:00</p>
        <p>1:00</p>
        <p>2:00</p>
        <p>3:00</p>
        <p>4:00</p>
        <p>5:00</p>
        <p>6:00</p>
        <p>7:00</p>
        <p>8:00</p>
        <p>9:00</p>
        <p>10:00</p>
      </div>
    </>
  );
};

export default ScheduleTimeline;
