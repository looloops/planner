import "../../assets/scss/todos.scss";
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


        // Dispatch the parsed details
        dispatch({
          type: TODOS_DETAILS,
          payload: parsedDetails,
        });

      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  // Initial state with defined default values
  const initialState: Partial<GeneralSettings> = {
    title: "",
    description: "",
    priority: "No priority",
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
      dispatch({
        type: TODOS_DETAILS,
        payload: body,
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  // MANAGING THE DELETE OF A SINGLE ITEM WITHIN THE SETTINGS ARRAY
  const deleteItem = (index: number) => {
    if (!todos || !todos.settings) return;

    const updatedSettingsArray = [...todos.settings.slice(0, index), ...todos.settings.slice(index + 1)];

    const body = {
      ...todos,
      settings: updatedSettingsArray,
    };

    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${todos.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Item deleted successfully:", response.data);
        // Update the Redux store with the new state
        dispatch({
          type: TODOS_DETAILS,
          payload: body,
        });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <div className="todos-glass-background">
      <p className="todos-big-title">Add New todos</p>
      <form onSubmit={submitNewData} noValidate>
        <div className="todosSelectContainer">
          <select
            value={formData.priority ?? ""}
            onChange={createInputValue}
            id="priority"
            name="priority"
            className="selectTodos"
          >
            <option value="No priority">No priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={formData.status || ""}
            onChange={createInputValue}
            id="status"
            name="status"
            className="selectTodos"
          >
            <option value="To-do">To-do</option>
            <option value="On-going">On-going</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <input
          type="text"
          className="form-control todos-input"
          placeholder="Title"
          id="title"
          name="title"
          onChange={createInputValue}
          value={formData.title || ""}
          required
        />

        <input
          type="text"
          className="form-control todos-input"
          placeholder="Description"
          id="description"
          name="description"
          onChange={createInputValue}
          value={formData.description || ""}
        />

        <div className="todos-submit-btn-container">
          <button type="submit" className="todos-submit-btn">
            <p className="todos-submit-btn-content">Add</p>
          </button>
        </div>
      </form>

      <div className="todos-container">
        <p className="todos-section-title">To-do list</p>
        {todos.settings
          ?.filter((todo, index) => todo.status === "To-do")
          .map((todo, index) => (
            <div>
              <p className="todos-title">
                <span
                  className={
                    todo.priority === "High"
                      ? "todos-dot high-priority"
                      : todo.priority === "Medium"
                      ? "todos-dot medium-priority"
                      : todo.priority === "Low"
                      ? "todos-dot low-priority"
                      : "todos-dot"
                  }
                ></span>
                {todo.title}
              </p>
              <p>{todo.description}</p>
              <button type="button" className="btn btn-danger" onClick={() => deleteItem(index)}>
                Delete
              </button>
            </div>
          ))}
      </div>

      <div className="todos-container">
        <p className="todos-section-title">Doing list</p>
        {todos.settings
          ?.filter((todo) => todo.status === "On-going")
          .map((doing) => (
            <div>
              <p className="todos-title">
                {" "}
                <span
                  className={
                    doing.priority === "High"
                      ? "todos-dot high-priority"
                      : doing.priority === "Medium"
                      ? "todos-dot medium-priority"
                      : doing.priority === "Low"
                      ? "todos-dot low-priority"
                      : "todos-dot"
                  }
                ></span>
                {doing.title}
              </p>
              <p>{doing.description}</p>
              <button type="button" className="btn btn-danger" onClick={() => deleteItem(index)}>
                Delete
              </button>
            </div>
          ))}
      </div>

      <div className="todos-container">
        <p className="todos-section-title">Done list</p>
        {todos.settings
          ?.filter((todo) => todo.status === "Done")
          .map((done) => (
            <div>
              <p className="todos-title">
                {" "}
                <span
                  className={
                    done.priority === "High"
                      ? "todos-dot high-priority"
                      : done.priority === "Medium"
                      ? "todos-dot medium-priority"
                      : done.priority === "Low"
                      ? "todos-dot low-priority"
                      : "todos-dot"
                  }
                ></span>
                {done.title}
              </p>
              <p>{done.description}</p>
              <button type="button" className="btn btn-danger" onClick={() => deleteItem(index)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todos;
