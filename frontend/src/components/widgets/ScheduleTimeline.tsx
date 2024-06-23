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


  const todaysDate = new Date().toLocaleDateString();
  const todaysSchedule = schedule.settings?.filter((setting) => setting.date === todaysDate)
  console.log(todaysSchedule)

  

  return (
    <>
      {schedule.settings?.filter((setting) => setting.date === todaysDate).length > 0 && (
        <p></p>
      )}
    </>
  );
  
  

  


  
  
};

export default ScheduleTimeline;




/* return (
  <>
    {schedule.settings?.filter((setting) => setting.date === todaysDate).length > 0 && (
      <>
        {[...Array(15)].map((_, hourIndex) => {
          const hour = hourIndex + 6; // Adjusting hour range from 6 to 20

          return (
            <div key={`hour-${hour}`}>
              <p>{hour}:00</p>
              {schedule.settings
                .filter((setting) => setting.date === todaysDate && new Date(setting.start).getHours() === hour)
                .map((setting, index) => (
                  <p key={`${hour}-${index}`}>
                    {setting.title}
                  </p>
                ))}
            </div>
          );
        })}
      </>
    )}
  </>
); */
