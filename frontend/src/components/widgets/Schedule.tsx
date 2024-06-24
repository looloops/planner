import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../../typescript/interfaces";
import { Link } from "react-router-dom";
import { GeneralSettings } from "../../typescript/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { SCHEDULE_DETAILS } from "../../redux/actions/index";
import { State } from "../../redux/reducers/userReducer";

const Schedule: React.FC = () => {
  // const [details, setDetails] = useState<WidgetDetails[]>([]);

  // const user = useSelector((state: State) => state.user);
  const schedule = useSelector((state: State) => state.widgets.schedule);

  // console.log("USER FROM REDUX", user);
  // console.log("SCHEDULE FROM REDUX", schedule);
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
      <div>
        <Link to={`/schedule/add`}>
          <h3 className="my-5">ADD A NEW APPOINTMENT</h3>
        </Link>
        {schedule?.settings?.map((setting) => (
          <div key={setting.id}>
            <p>Title: {setting.title}</p>
            <p>{setting.description}</p>
            <p>Date: {setting.date}</p>
            <p>Start: {setting.start}</p>
            <p>Finish: {setting.finish}</p>
            <p>Deadline: {setting.deadline}</p>
            <p>Priority: {setting.priority}</p>
            <Link to={`/schedule/edit/${setting.id}`}>Edit</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Schedule;
