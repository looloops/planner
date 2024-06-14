import { State } from "../../redux/reducers/userReducer";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { GeneralSettings } from "../../typescript/interfaces";
import { useSelector } from "react-redux";

const ScheduleCreate: () => JSX.Element = () => {
  // GETTING SCHEDULE DATA FROM REDUX
  const schedule = useSelector((state: State) => state.widgets.schedule);

  // CREATING AND MANAGING A LOCAL STATE FOR FUTURE UPDATED DATA
  const [formData, setFormData] = useState<Partial<GeneralSettings>>({});

  const updateInputValue = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitUpdatedData = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!schedule || !schedule.settings) return;

    const newSetting = {
      ...formData,
      start: formData.start ? new Date(formData.start) : undefined,
      finish: formData.finish ? new Date(formData.finish) : undefined,
      deadline: formData.deadline ? new Date(formData.deadline) : undefined,
    };

    const updatedSettingsArray = [...schedule.settings, newSetting];

    const body = {
      ...schedule,
      settings: updatedSettingsArray,
    };

    axios
      .post(`http://localhost:8000/api/user/widgets/add/${schedule.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <>
      <div>
        <h1>Create Schedule</h1>
        {schedule && (
          <form onSubmit={submitUpdatedData} noValidate>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={updateInputValue}
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
              onChange={updateInputValue}
              value={formData.description ?? ""}
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
              value={formData.start ? new Date(formData.start).toISOString().substring(0, 10) : ""}
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
              value={formData.finish ? new Date(formData.finish).toISOString().substring(0, 10) : ""}
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
              value={formData.deadline ? new Date(formData.deadline).toISOString().substring(0, 10) : ""}
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
              value={formData.priority ?? ""}
            />

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ScheduleCreate;
