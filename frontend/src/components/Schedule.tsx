import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
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

// Structure of the parsed data from WidgetDetails
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

const Schedule: React.FC = () => {
  const [details, setDetails] = useState<WidgetDetails[]>([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<Settings>>({});

  const updateInputValue = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitUpdatedData = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (details.length === 0) return;

    const updatedSettings = {
      ...details[0].settings,
      ...formData,
      start: formData.start ? new Date(formData.start).toISOString() : details[0].settings.start.toISOString(),
      finish: formData.finish ? new Date(formData.finish).toISOString() : details[0].settings.finish.toISOString(),
      deadline: formData.deadline
        ? new Date(formData.deadline).toISOString()
        : details[0].settings.deadline.toISOString(),
    };

    const body = {
      ...details[0],
      settings: JSON.stringify(updatedSettings),
    };

    axios
      .post(`http://localhost:8000/api/widgets/${details[0].widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

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
        if (parsedDetails.length > 0) {
          setFormData(parsedDetails[0].settings); // Initialize formData with the first widget's settings
        }
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

      {details.length > 0 && (
        <form onSubmit={submitUpdatedData} noValidate>
          <label htmlFor="position_x" className="form-label">
            Position X
          </label>
          <input
            type="number"
            className="form-control"
            id="position_x"
            name="position_x"
            onChange={updateInputValue}
            value={formData.position_x ?? details[0].settings.position_x}
          />

          <label htmlFor="position_y" className="form-label">
            Position Y
          </label>
          <input
            type="number"
            className="form-control"
            id="position_y"
            name="position_y"
            onChange={updateInputValue}
            value={formData.position_y ?? details[0].settings.position_y}
          />

          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={updateInputValue}
            value={formData.title ?? details[0].settings.title}
          />

          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={updateInputValue}
            value={formData.description ?? details[0].settings.description}
          />

          <label htmlFor="start" className="form-label">
            Start
          </label>
          <input
            className="form-control"
            type="date"
            id="start"
            name="start"
            onChange={updateInputValue}
            value={
              formData.start
                ? new Date(formData.start).toISOString().substring(0, 10)
                : new Date(details[0].settings.start).toISOString().substring(0, 10)
            }
          />

          <label htmlFor="finish" className="form-label">
            Finish
          </label>
          <input
            type="date"
            className="form-control"
            id="finish"
            name="finish"
            onChange={updateInputValue}
            value={
              formData.finish
                ? new Date(formData.finish).toISOString().substring(0, 10)
                : new Date(details[0].settings.finish).toISOString().substring(0, 10)
            }
          />

          <label htmlFor="deadline" className="form-label">
            Deadline
          </label>
          <input
            type="date"
            className="form-control"
            id="deadline"
            name="deadline"
            onChange={updateInputValue}
            value={
              formData.deadline
                ? new Date(formData.deadline).toISOString().substring(0, 10)
                : new Date(details[0].settings.deadline).toISOString().substring(0, 10)
            }
          />

          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <input
            type="text"
            className="form-control"
            id="priority"
            name="priority"
            onChange={updateInputValue}
            value={formData.priority ?? details[0].settings.priority}
          />

          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </form>
      )}
    </div>
  );
};

export default Schedule;
