import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../../typescript/interfaces";
import { WidgetDetailsRaw } from "../../typescript/interfaces";
import { ObjectWidgetTableDataRaw } from "../../typescript/interfaces";
import { WidgetDetails } from "../../typescript/interfaces";
import { SettingsSchedule } from "../../typescript/interfaces";
import { ObjectWidgetTableData } from "../../typescript/interfaces";

const Schedule: React.FC = () => {
  const [details, setDetails] = useState<WidgetDetails[]>([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<SettingsSchedule>>({});

  // const updateInputValue = (ev: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = ev.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  //TODO UPDATE
  /*   const submitUpdatedData = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (details.length === 0) return;

    const updatedSettings = {
      ...details[0].settings,
      ...formData,
      start: formData.start ? new Date(formData.start).toString() : details[0].settings.start.toString(),
      finish: formData.finish ? new Date(formData.finish).toString() : details[0].settings.finish.toString(),
      deadline: formData.deadline ? new Date(formData.deadline).toString() : details[0].settings.deadline.toString(),
    };

    const body = {
      ...details[0],
      settings: JSON.stringify(updatedSettings),
    };

    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${details[0].widget_id}`, body, {
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
  }; */

  useEffect(() => {
    axios
      .get<ApiResponse>("/api/user/widgets/1")
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
        console.log("Details", details);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        navigate("/");
      });
  }, []);

  const settings = details.settings;

  return (
    <div>
      {details.map((detail) => (
        <div key={detail.id}>
          <h3>{detail.status ? "Active" : "Inactive"}</h3>
          {settings.forEach((setting: SettingsSchedule) => {
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

      {/* {details.length > 0 && (
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
            value={formData.description ?? details[0].settings[0].description}
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
                : new Date(details[0].settings.start).toString().substring(0, 10)
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
                : new Date(details[0].settings.finish).toString().substring(0, 10)
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
                : new Date(details[0].settings.deadline).toString().substring(0, 10)
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
      )} */}
    </div>
  );
};

export default Schedule;