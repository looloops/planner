import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../../typescript/interfaces";
import { Link } from "react-router-dom";
import { GeneralSettings } from "../../typescript/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { MEDIA_DETAILS } from "../../redux/actions/index";
import { State } from "../../redux/reducers/userReducer";

const Media: React.FC = () => {
  const user = useSelector((state: State) => state.user);
  const media = useSelector((state: State) => state.widgets.media);

  console.log("USER FROM REDUX", user);
  console.log("MEDIA FROM REDUX", media);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<ApiResponse>("/api/user/widgets/3")
      .then((res) => {
        console.log("res", res);
        const parsedDetails = {
          ...res.data.data[0],
          settings: JSON.parse(res.data.data[0].settings) as Partial<GeneralSettings>[], // Parse the JSON string to an object
          widget: {
            ...res.data.data[0].widget,
            field_list: JSON.parse(res.data.data[0].widget.field_list), // Parse the JSON string to an object
          },
        };

        console.log("parsedDetails", parsedDetails);

        // Dispatch the parsed details
        dispatch({
          type: MEDIA_DETAILS,
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
    <>
      <div>
        {media?.settings?.map((setting, index) => (
          <div key={index}>
            <img src={setting.img} style={{ width: "300px" }}></img>
            <p>Title: {setting.title}</p>
            <p>Description: {setting.description}</p>
            <p>Type: {setting.type}</p>
            <p>Status: {setting.status}</p>
            <Link to={`/media/edit/${index}`}>Edit</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Media;
