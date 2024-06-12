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
  id: number;
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
  id: number;
  status: boolean;
  settings: SettingsAgenda | SettingsGoals;
  user_id: number;
  widget_id: number;
  widget: ObjectWidgetTableData;
}

// Structure of the property Settings of WidgetDetails
interface SettingsAgenda {
  title: string;
  description: string;
  start: Date;
  finish: Date;
  deadline: Date;
  priority: string;
}

interface SettingsGoals {
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

  const [formData, setFormData] = useState<Partial<SettingsAgenda>>({});

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
      ...details[2].settings,
      ...formData,
      start: formData.start ? new Date(formData.start).toString() : details[2].settings.start.toString(),
      finish: formData.finish ? new Date(formData.finish).toString() : details[2].settings.finish.toString(),
      deadline: formData.deadline ? new Date(formData.deadline).toString() : details[2].settings.deadline.toString(),
    };

    const body = {
      ...details[2],
      settings: JSON.stringify(updatedSettings),
    };

    console.log("PRIMA", details);

    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${details[2].widget_id}`, body, {
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

  console.log("DOPO", details);

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
          setFormData(parsedDetails[2].settings); // Initialize formData with the first widget's settings
        }
        console.log("parsedDetails", parsedDetails);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        navigate("/");
      });
  }, [navigate]);

  const settings = details.settings;

  return (
    <div>
      {details.map((detail) => (
        <div key={detail.id}>
          <h3>{detail.status ? "Active" : "Inactive"}</h3>
          {settings.forEach((setting: SettingsAgenda[]) => {
            <>
              <p>Title: {setting.title}</p>
              <p>Description: {setting.description}</p>
              <p>Start: {new Date(setting.start).toLocaleString()}</p>
              <p>Finish: {new Date(setting.finish).toLocaleString()}</p>
              <p>Deadline: {new Date(setting.deadline).toLocaleString()}</p>
              <p>Priority: {setting.priority}</p>
            </>;
          })}
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
            value={formData.position_x ?? details[2].settings.position_x}
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
            value={formData.position_y ?? details[2].settings.position_y}
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
            value={formData.title ?? details[2].settings.title}
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
            value={formData.description ?? details[2].settings.description}
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
                ? new Date(formData.start).toString().substring(0, 10)
                : new Date(details[2].settings.start).toString().substring(0, 10)
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
                ? new Date(formData.finish).toString().substring(0, 10)
                : new Date(details[2].settings.finish).toString().substring(0, 10)
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
                ? new Date(formData.deadline).toString().substring(0, 10)
                : new Date(details[2].settings.deadline).toString().substring(0, 10)
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
            value={formData.priority ?? details[2].settings.priority}
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
