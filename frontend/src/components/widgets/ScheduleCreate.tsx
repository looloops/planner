import { State } from "../../redux/reducers/userReducer";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { GeneralSettings } from "../../typescript/interfaces";
import { useSelector } from "react-redux";

const ScheduleCreate: () => JSX.Element = () => {
  // GETTING SCHEDULE DATA FROM REDUX
  const schedule = useSelector((state: State) => state.widgets.schedule);

  // CREATING A LOCAL STATE FOR DATA COMING FROM THE FORM
  const [formData, setFormData] = useState<Partial<GeneralSettings>>({});

  // UPDATING THE LOCAL STATE
  const createInputValue = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // SUBMITTING THE NEW DATA INTO THE DATABASE
  const submitNewData = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!schedule || !schedule.settings) return;

    // Taking the new settings from the local state
    const newSetting = {
      ...formData,
      deadline: formData.deadline ? new Date(formData.deadline) : undefined,
    };

    // Adding the new settings into the array
    const updatedSettingsArray = [...schedule.settings, newSetting];

    // Defining the body of the request
    const body = {
      ...schedule,
      settings: updatedSettingsArray,
    };

    // Sending the axios request
    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${schedule.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data added successfully:", response.data);
        // Reset form after successful submission
        setFormData({});
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <>
      <div>
        <h1>Add New Schedule</h1>
        {schedule && (
          <form onSubmit={submitNewData} noValidate>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={createInputValue}
              value={formData.title ?? ""}
            />

            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={createInputValue}
              value={formData.description ?? ""}
            />

            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              className="form-control"
              type="date"
              id="date"
              name="date"
              onChange={createInputValue}
              value={formData.date ?? ""}
            />

            <label htmlFor="start" className="form-label">
              Start
            </label>
            <input
              className="form-control"
              type="time"
              id="start"
              name="start"
              onChange={createInputValue}
              value={formData.start ?? ""}
            />

            <label htmlFor="finish" className="form-label">
              Finish
            </label>
            <input
              type="time"
              className="form-control"
              id="finish"
              name="finish"
              onChange={createInputValue}
              value={formData.finish ?? ""}
            />

            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <input
              type="date"
              className="form-control"
              id="deadline"
              name="deadline"
              onChange={createInputValue}
              value={formData.deadline ?? ""}
            />

            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <input
              type="text"
              className="form-control"
              id="priority"
              name="priority"
              onChange={createInputValue}
              value={formData.priority ?? ""}
            />

            <button type="submit" className="btn btn-primary">
              Add Schedule
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ScheduleCreate;
