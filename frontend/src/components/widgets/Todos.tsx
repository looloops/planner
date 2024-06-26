import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { GeneralSettings } from "../../typescript/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/reducers/userReducer";
import { TODOS_DETAILS } from "../../redux/actions/index";
import { ApiResponse } from "../../typescript/interfaces";

const Todos: React.FC = () => {
  // GETTING Todos DATA FROM REDUX
  const todos = useSelector((state: State) => state.widgets.todos);
  console.log("todos", todos);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get<ApiResponse>("/api/user/widgets/6")
      .then((res) => {
        // console.log("res", res);
        const parsedDetails = {
          ...res.data.data[0],
          settings: JSON.parse(res.data.data[0].settings) as Partial<GeneralSettings>[], // Parse the JSON string to an object
          widget: {
            ...res.data.data[0].widget,
            field_list: JSON.parse(res.data.data[0].widget.field_list), // Parse the JSON string to an object
          },
        };

        // console.log("parsedDetails", parsedDetails);

        // Dispatch the parsed details
        dispatch({
          type: TODOS_DETAILS,
          payload: parsedDetails,
        });

        // Optionally, set form data with the settings if needed
        // setFormData(parsedDetails.settings); // Uncomment and define setFormData if needed
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  // Initial state with defined default values
  const initialState: Partial<GeneralSettings> = {
    title: "",
    description: "",
    priority: "None",
    status: "To-do",
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
  const submitNewData = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!todos || !todos.settings) return;

    // Taking the new settings from the local state
    const newSetting: Partial<GeneralSettings> = {
      ...formData,
    };

    // Adding the new settings into the array
    const updatedSettingsArray = [...todos.settings, newSetting];

    // Defining the body of the request
    const body = {
      ...todos,
      settings: updatedSettingsArray,
    };

    try {
      // Sending the axios request
      const response = await axios.put(`http://localhost:8000/api/user/widgets/edit/${todos.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Data added successfully:", response.data);
      // Reset form after successful submission
      setFormData(initialState);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <div>
      <h1>Add New todos</h1>
      {todos && (
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

          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            value={formData.priority ?? ""}
            onChange={createInputValue}
            id="priority"
            name="priority"
            className="form-control"
          >
            <option value="None">None</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            value={formData.status ?? ""}
            onChange={createInputValue}
            id="status"
            name="status"
            className="form-control"
          >
            <option value="To-do">To-do</option>
            <option value="On-going">On-going</option>
            <option value="Done">Done</option>
          </select>

          <button type="submit" className="btn btn-primary">
            Add todos
          </button>
        </form>
      )}
    </div>
  );
};

export default Todos;
