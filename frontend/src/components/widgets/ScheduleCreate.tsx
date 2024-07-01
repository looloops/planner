import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { GeneralSettings } from "../../typescript/interfaces";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducers/userReducer";

const ScheduleCreate: React.FC = () => {
  // GETTING SCHEDULE DATA FROM REDUX
  const schedule = useSelector((state: State) => state.widgets.schedule);
  console.log("schedule", schedule);

  // GETTING TODAYS DATE TO USE AS DEFAULT VALUE
  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  const month = String(todaysDate.getMonth() + 1).padStart(2, "0");
  const day = String(todaysDate.getDate()).padStart(2, "0");
  const formattedTodaysDate = `${year}-${month}-${day}`;

  // GETTING CURRENT TIME TO USE AS DEFAULT VALUE
  const hours = todaysDate.getHours().toString().padStart(2, "0");
  const minutes = todaysDate.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  // GETTING HIGHEST ID IN THE SCHEDULE SETTINGS ARRAY
  const arrId: number[] = schedule.settings?.map((element) => element.id) || [];
  const maxId = arrId.length > 0 ? Math.max(...arrId) : 0;

  // Initial state with defined default values
  const initialState: Partial<GeneralSettings> = {
    id: maxId + 1, // Initialize ID with the next available ID
    title: "",
    description: "",
    date: formattedTodaysDate,
    start: timeString,
    finish: timeString,
    deadline: formattedTodaysDate,
    priority: "None",
  };

  // CREATING A LOCAL STATE FOR DATA COMING FROM THE FORM WITH DEFAULT VALUES
  const [formData, setFormData] = useState<Partial<GeneralSettings>>(initialState);

  // UPDATING THE LOCAL STATE
  const createInputValue = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    const newSetting: Partial<GeneralSettings> = {
      ...formData,
      // Assicurati che la data sia formattata correttamente
      date: formData.date,
      // Assicurati che la deadline sia formattata correttamente
      deadline: formData.deadline,
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
        setFormData(initialState);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <div>
      <h1>Add New Schedule</h1>
      {schedule && (
        <form onSubmit={submitNewData} noValidate>
          <input
            type="hidden"
            className="form-control"
            id="id"
            name="id"
            onChange={createInputValue}
            value={formData.id}
            disabled // Disable editing of ID
          />

          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={createInputValue}
            value={formData.title || ""}
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
            onChange={createInputValue}
            value={formData.description || ""}
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
            value={formData.date || ""}
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
            value={formData.start || ""}
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
            value={formData.finish || ""}
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
            value={formData.deadline || ""}
          />

          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            value={formData.priority ?? ""}
            onChange={(ev) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                priority: ev.target.value,
              }))
            }
            id="priority"
            name="priority"
            className="form-control"
          >
            <option value="None">None</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button type="submit" className="btn btn-primary">
            Add Schedule
          </button>
        </form>
      )}
    </div>
  );
};

export default ScheduleCreate;
