import { useParams } from "react-router-dom";
import { State } from "../../redux/reducers/userReducer";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { GeneralSettings } from "../../typescript/interfaces";
import { useSelector } from "react-redux";

type Params = {
  settingIndex: string;
};

const ScheduleEdit: () => JSX.Element = () => {
  const { settingIndex } = useParams<Params>();
  const indexInt: number = settingIndex !== undefined ? parseInt(settingIndex, 10) : 0;

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

  const submitUpdatedData = (ev: FormEvent<HTMLFormElement>, index: number) => {
    ev.preventDefault();
    if (!schedule || !schedule.settings) return;

    const updatedSettings = {
      ...schedule.settings[index],
      ...formData,
      start: formData.start ? new Date(formData.start) : schedule.settings[index].start,
      finish: formData.finish ? new Date(formData.finish) : schedule.settings[index].finish,
      deadline: formData.deadline ? new Date(formData.deadline) : schedule.settings[index].deadline,
    };

    const updatedSettingsArray = [
      ...schedule.settings.slice(0, index),
      updatedSettings,
      ...schedule.settings.slice(index + 1),
    ];

    const body = {
      ...schedule,
      settings: updatedSettingsArray,
    };

    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${schedule.widget_id}`, body, {
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

  // MANAGING THE DELETE OF A SINGLE ITEM WITHIN THE SETTINGS ARRAY
  const deleteItem = (index: number) => {
    if (!schedule || !schedule.settings) return;

    const updatedSettingsArray = [...schedule.settings.slice(0, index), ...schedule.settings.slice(index + 1)];

    const body = {
      ...schedule,
      settings: updatedSettingsArray,
    };

    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${schedule.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Item deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <>
      <div>
        <h1>Edit Schedule</h1>
        {schedule && schedule.settings && schedule.settings.length > 0 && (
          <form onSubmit={(ev) => submitUpdatedData(ev, indexInt)} noValidate>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={updateInputValue}
              value={formData.title ?? schedule?.settings?.[indexInt]?.title ?? ""}
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
              value={formData.description ?? schedule?.settings?.[indexInt]?.description ?? ""}
            />

<label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="date"
              className="form-control"
              id="description"
              name="description"
              onChange={updateInputValue}
              value={formData.date ?? schedule?.settings?.[indexInt]?.date ?? ""}
            />

           <label htmlFor="start" className="form-label">
              Start
            </label>
            <input
              className="form-control"
              type="time"
              id="start"
              name="start"
              onChange={updateInputValue}
              value={
                formData.start ? formData.start : ""
    
              }
            />

            <label htmlFor="finish" className="form-label">
              Finish
            </label>
            <input
              type="time"
              className="form-control"
              id="finish"
              name="finish"
              onChange={updateInputValue}
              value={
                formData.finish ? formData.finish : ""
    
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
                  : new Date(schedule?.settings?.[indexInt]?.deadline ?? "").toISOString().substring(0, 10)
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
              value={formData.priority ?? schedule?.settings?.[indexInt]?.priority ?? ""}
            />

            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
            <button type="button" className="btn btn-danger" onClick={() => deleteItem(indexInt)}>
              Delete
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ScheduleEdit;
