import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Widget schedule type definition
interface WidgetDetails {
  status: boolean;
  settings: Settings;
  user_id: number;
  widget_id: number;
}
// Settings types after parsing
interface Settings {
  position_x: number;
  position_y: number;
  title: string;
  description: string;
  start: Date;
  finish: Date;
  deadline: Date;
  priority: string;
}

// Defines type of API response
interface ApiResponse {
  success: boolean;
  data: WidgetDetailsRaw[];
}
//res.data.data raw type definition
interface WidgetDetailsRaw {
  status: boolean;
  settings: string; // JSON string that needs parsing
  user_id: number;
  widget_id: number;
}

const Schedule = () => {
  const [details, setDetails] = useState<WidgetDetails[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<ApiResponse>("/api/widgets")
      .then((res) => {
        const parsedDetails = res.data.data.map((detailRaw) => ({
          ...detailRaw,
          settings: JSON.parse(detailRaw.settings), // Parse the JSON string to an object
        }));
        setDetails(parsedDetails);
        console.log(parsedDetails);
      })
      .catch((err) => {
        navigate("/");
        console.error("Error fetching data:", err);
      });
  }, [navigate]);

  return (
    <div>
      {/* Widget fields rendering */}
      {details.map((detail) => (
        <div key={detail.widget_id}>
          <h3>{detail.status ? "Active" : "Inactive"}</h3>
          <p>Position X: {detail.settings.position_x}</p>
          <p>Position Y: {detail.settings.position_y}</p>
          <p>Title: {detail.settings.title}</p>
          <p>Description: {detail.settings.description}</p>
          <p>Start: {new Date(detail.settings.start).toLocaleString()}</p>
          <p>Finish: {new Date(detail.settings.finish).toLocaleString()}</p>
          <p>Deadline: {new Date(detail.settings.deadline).toLocaleString()}</p>
          <p>Priority: {detail.settings.priority}</p>
        </div>
      ))}
    </div>
  );
};

export default Schedule;