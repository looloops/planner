import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// The following interfaces and types define the API response
interface ApiResponse {
  success: boolean;
  data: WidgetDetailsRaw[];
}

// Raw type definition for API response data
interface WidgetDetailsRaw {
  status: boolean;
  settings: string; // JSON string that needs parsing
  user_id: number;
  widget_id: number;
  widget: ObjectWidgetTableDataRaw;
}

type ObjectWidgetTableDataRaw = {
  description: string;
  name: string;
  field_list: string; // JSON string that needs parsing
};

// PARSING of the data just received with AXIOS
// The new parced data need new interfaces that specify the type of data they've become
// The following interfaces specify exactly that:

// Structure of the parced data from WidgetDetails
interface WidgetDetails {
  status: boolean;
  settings: Settings;
  user_id: number;
  widget_id: number;
  widget: ObjectWidgetTableData;
}

// Structure of the property Settings of WidgetDetails
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

type ObjectWidgetTableData = {
  description: string;
  name: string;
  field_list: Array<FieldListParsed>;
};

type FieldListParsed = [
  positionX: string,
  positionY: string,
  title: string,
  description: string,
  start: string,
  finish: string,
  deadline: string,
  priority: string
];

const Schedule = () => {
  const [details, setDetails] = useState<WidgetDetails[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<ApiResponse>("/api/widgets")
      .then((res) => {
        console.log("res", res);
        const parsedDetails = res.data.data.map((detailRaw) => ({
          ...detailRaw,
          settings: JSON.parse(detailRaw.settings), // Parse the JSON string to an object
          widget: {
            ...detailRaw.widget,
            field_list: JSON.parse(detailRaw.widget.field_list), // Parse the JSON string to an object
          },
        }));
        setDetails(parsedDetails);
        console.log("parsedDetails", parsedDetails);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        navigate("/");
      });
  }, [navigate]);

  return (
    <div>
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
          <p>Widget Details Desc: {detail.widget.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
