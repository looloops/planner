import { useParams } from "react-router-dom";
import { State } from "../../redux/reducers/userReducer";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { GeneralSettings } from "../../typescript/interfaces";
import { useSelector } from "react-redux";

type Params = {
  settingIndex: string;
};

const ScheduleEdit: React.FC = () => {
  const { settingIndex } = useParams<Params>();
  // const indexInt: number = settingIndex !== undefined ? parseInt(settingIndex, 10) : 0;

  // GETTING SCHEDULE DATA FROM REDUX
  const schedule = useSelector((state: State) => state.widgets.schedule);
  const [formData, setFormData] = useState<Partial<GeneralSettings>>({});

  // Fetch specific schedule item on component mount
  useEffect(() => {
    if (schedule.settings && settingIndex) {
      const settingId = parseInt(settingIndex, 10);
      const foundSetting = schedule.settings.find((setting) => setting.id === settingId);
      if (foundSetting) {
        setFormData(foundSetting);
      }
    }
  }, [schedule.settings, settingIndex]);

  const updateInputValue = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitUpdatedData = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!schedule || !schedule.settings || !formData.id) return;

    const updatedSettings = {
      ...formData,
      // Assicurati che la data sia formattata correttamente
      date: formData.date,
      // Assicurati che la deadline sia formattata correttamente
      deadline: formData.deadline,
    };

    const updatedSettingsArray = schedule.settings.map((setting) =>
      setting.id === formData.id ? updatedSettings : setting
    );

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

  const deleteItem = () => {
    if (!schedule || !schedule.settings || !formData.id) return;

    const updatedSettingsArray = schedule.settings.filter((setting) => setting.id !== formData.id);

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
        {schedule && schedule.settings && formData && (
          <form onSubmit={submitUpdatedData} noValidate>
            <label htmlFor="id" className="form-label">
              ID
            </label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              onChange={updateInputValue}
              value={formData.id ?? ""}
              readOnly
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
              value={formData.title ?? ""}
              required
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

            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              onChange={updateInputValue}
              value={formData.date ?? ""}
            />

            <label htmlFor="start" className="form-label">
              Start
            </label>
            <input
              type="time"
              className="form-control"
              id="start"
              name="start"
              onChange={updateInputValue}
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
              onChange={updateInputValue}
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
              onChange={updateInputValue}
              value={formData.deadline ?? ""}
            />

            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              value={formData.priority ?? ""}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  priority: e.target.value,
                }))
              }
              id="priority"
              name="priority"
              className="form-control"
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
            <button type="button" className="btn btn-danger" onClick={deleteItem}>
              Delete
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ScheduleEdit;
