import "../../assets/scss/habit_tracker.scss";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { GeneralSettings } from "../../typescript/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/reducers/userReducer";
import { HABITS_DETAILS } from "../../redux/actions/index";
import { ApiResponse } from "../../typescript/interfaces";

const HabitTracker: React.FC = () => {
  // SETTING INTERFACE FOR HABITS OBJECT
  interface Habits {
    title: string;
    description: string;
    type: string;
    status: boolean;
  }

  // SETTING INTERFACE FOR INITIAL STATE
  const initialState: Partial<GeneralSettings> = {
    title: "",
    description: "",
    type: "Gain",
    status: false,
  };

  // SETTING LOCAL STATE FOR FORM DATA
  const [formData, setFormData] = useState<Partial<GeneralSettings>>(initialState);

  // SETTING LOCAL STARE FOR EDIT MODE
  const [editMode, setEditMode] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);

  // GETTING HABITS FROM REDUX
  const habits = useSelector((state: State) => state.widgets.habits);
  console.log("habits", habits.settings);
  const dispatch = useDispatch();

  // FETCHING DATA FROM REDUX
  useEffect(() => {
    axios
      .get<ApiResponse>("/api/user/widgets/8")
      .then((res) => {
        const parsedDetails = {
          ...res.data.data[0],
          settings: JSON.parse(res.data.data[0].settings) as Partial<GeneralSettings>[],
          widget: {
            ...res.data.data[0].widget,
            field_list: JSON.parse(res.data.data[0].widget.field_list),
          },
        };

        dispatch({
          type: HABITS_DETAILS,
          payload: parsedDetails,
        });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  // FUNCTION TO UPDATE THE LOCAL FORMDATA STATE WITH NEW VALUES
  const createInputValue = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = ev.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "status" ? (ev.target as HTMLInputElement).checked : value,
    }));
  };

  // FUNCTION TO SUBMIT THE NEW DATA INTO REDUX AND DATABASE
  const submitNewData = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!habits || !habits.settings) return;

    let updatedSettingsArray: Partial<GeneralSettings>[];

    if (editMode && currentEditIndex !== null) {
      updatedSettingsArray = habits.settings.map((setting: object, index: number) =>
        index === currentEditIndex ? { ...formData } : setting
      );
    } else {
      updatedSettingsArray = [...habits.settings, { ...formData }];
    }

    const body = {
      ...habits,
      settings: updatedSettingsArray,
    };

    try {
      const response = await axios.put(`http://localhost:8000/api/user/widgets/edit/${habits.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Data added successfully:", response.data);

      // Resetting the form
      setFormData(initialState);

      // Closing edit mode
      setEditMode(false);
      setCurrentEditIndex(null);

      // Updating Redux
      dispatch({
        type: HABITS_DETAILS,
        payload: body,
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  // FUNCTION TO ENABLE EDIT MODE AND FILLING THE FORM WITH THE SPECIFIC ITEM DATA
  const handleEditClick = (index: number) => {
    setEditMode(true);
    setCurrentEditIndex(index);
    {
      habits.settings && setFormData(habits.settings[index]);
    }
  };

  // FUNCTION TO DELETE AN ITEM
  const deleteItem = (index: number) => {
    if (!habits || !habits.settings) return;

    setFormData(initialState);
    setEditMode(false);

    const updatedSettingsArray = [...habits.settings.slice(0, index), ...habits.settings.slice(index + 1)];

    const body = {
      ...habits,
      settings: updatedSettingsArray,
    };

    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${habits.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Item deleted successfully:", response.data);
        dispatch({
          type: HABITS_DETAILS,
          payload: body,
        });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <div className="habits-glass-background">
      <p className="habits-big-title">Add New habits</p>
      <form onSubmit={submitNewData} noValidate>
        <input
          type="text"
          className="form-control habits-input"
          placeholder="Title"
          id="title"
          name="title"
          onChange={createInputValue}
          value={formData.title || ""}
          required
        />

        <input
          type="text"
          className="form-control habits-input"
          placeholder="Description"
          id="description"
          name="description"
          onChange={createInputValue}
          value={formData.description || ""}
        />

        <label>
          <input type="checkbox" id="status" name="status" checked={formData.status} onChange={createInputValue} />
          Check me!
        </label>

        <select value={formData.type || ""} onChange={createInputValue} id="type" name="type" className="selecthabits">
          <option value="Gain">Gain</option>
          <option value="Lose">Lose</option>
        </select>

        <div className="habits-submit-btn-container">
          <button type="submit" className={editMode ? "habits-submit-btn update-btn" : "habits-submit-btn"}>
            <p className="habits-submit-btn-content">{editMode ? "Update" : "Add"}</p>
          </button>
        </div>
      </form>

      <div className="habits-container">
        <p className="habits-section-title">To-do list</p>
        {habits.settings?.map(
          (habit: Habits, index: number) =>
            habit.type === "Gain" && (
              <div key={index} className="habits-item">
                <div className="habits-title-buttons">
                  <div className="habits-title">{habit.title}</div>

                  <div className="appointment-buttons-container">
                    <button className="appointmentButtons editButton" onClick={() => handleEditClick(index)}>
                      <div className="appointment-timelineIcons">
                        <svg
                          width="8px"
                          height="6px"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.8536 0.146447C10.6583 -0.0488155 10.3417 -0.0488155 10.1464 0.146447L0 10.2929V14.5C0 14.7761 0.223858 15 0.5 15H4.70711L14.8536 4.85355C15.0488 4.65829 15.0488 4.34171 14.8536 4.14645L10.8536 0.146447Z"
                            fill="#ffffff"
                          />
                        </svg>
                      </div>
                    </button>
                    <button className="appointmentButtons deleteButton" onClick={() => deleteItem(index)}>
                      <div className="appointment-timelineIcons">-</div>
                    </button>
                  </div>
                </div>
                <div className="habits-description">{habit.description}</div>
              </div>
            )
        )}
      </div>
      <div className="habits-container">
        <p className="habits-section-title">To-do list</p>
        {habits.settings?.map(
          (habit: Habits, index: number) =>
            habit.type === "Lose" && (
              <div key={index} className="habits-item">
                <div className="habits-title-buttons">
                  <div className="habits-title">{habit.title}</div>

                  <div className="appointment-buttons-container">
                    <button className="appointmentButtons editButton" onClick={() => handleEditClick(index)}>
                      <div className="appointment-timelineIcons">
                        <svg
                          width="8px"
                          height="6px"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.8536 0.146447C10.6583 -0.0488155 10.3417 -0.0488155 10.1464 0.146447L0 10.2929V14.5C0 14.7761 0.223858 15 0.5 15H4.70711L14.8536 4.85355C15.0488 4.65829 15.0488 4.34171 14.8536 4.14645L10.8536 0.146447Z"
                            fill="#ffffff"
                          />
                        </svg>
                      </div>
                    </button>
                    <button className="appointmentButtons deleteButton" onClick={() => deleteItem(index)}>
                      <div className="appointment-timelineIcons">-</div>
                    </button>
                  </div>
                </div>
                <div className="habits-description">{habit.description}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default HabitTracker;
