import "../../assets/scss/todos.scss";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { GeneralSettings } from "../../typescript/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/reducers/userReducer";
import { JOURNAL_DETAILS } from "../../redux/actions/index";
import { ApiResponse } from "../../typescript/interfaces";

const Journal: React.FC = () => {
  interface Journal {
    date: string;
    title: string;
    content: string;
    category: string;
    originalIndex?: number;
  }

  const [editMode, setEditMode] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [filteredEntries, setFilteredEntries] = useState<Journal[] | null>(null);
  const [chosenCategory, setChosenCategory] = useState(null);

  const journal = useSelector((state: State) => state.widgets.journal);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get<ApiResponse>("/api/user/widgets/5")
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
          type: JOURNAL_DETAILS,
          payload: parsedDetails,
        });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const initialState: Partial<GeneralSettings> = {
    date: "",
    title: "",
    content: "",
    category: "General",
  };

  const [formData, setFormData] = useState<Partial<GeneralSettings>>(initialState);

  const createInputValue = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = ev.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const updateLocalState = (updatedSettingsArray: Partial<GeneralSettings>[]) => {
    if (filteredEntries !== null) {
      const filteredJournal = updatedSettingsArray
        .map((setting: Journal, index: number) => ({ ...setting, originalIndex: index }))
        .filter((setting: Journal) => setting.category === filteredEntries[0].category);
      setFilteredEntries(filteredJournal);
    }
  };

  const submitNewData = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!journal || !journal.settings) return;

    let updatedSettingsArray: Partial<GeneralSettings>[];

    if (editMode && currentEditIndex !== null) {
      updatedSettingsArray = journal.settings.map((setting: object, index: number) =>
        index === currentEditIndex ? { ...formData } : setting
      );
    } else {
      updatedSettingsArray = [...journal.settings, { ...formData }];
    }

    const body = {
      ...journal,
      settings: updatedSettingsArray,
    };

    try {
      const response = await axios.put(`http://localhost:8000/api/user/widgets/edit/${journal.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Data added successfully:", response.data);
      setFormData(initialState);
      setEditMode(false);
      setCurrentEditIndex(null);
      updateLocalState(updatedSettingsArray);
      dispatch({
        type: JOURNAL_DETAILS,
        payload: body,
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const deleteItem = (index: number) => {
    if (!journal || !journal.settings) return;

    const entry = displayedEntries[index];
    if (entry.originalIndex === undefined) return;

    setFormData(initialState);
    setEditMode(false);

    const updatedSettingsArray = [
      ...journal.settings.slice(0, entry.originalIndex),
      ...journal.settings.slice(entry.originalIndex + 1),
    ];

    const body = {
      ...journal,
      settings: updatedSettingsArray,
    };

    axios
      .put(`http://localhost:8000/api/user/widgets/edit/${journal.widget_id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Item deleted successfully:", response.data);
        updateLocalState(updatedSettingsArray);
        dispatch({
          type: JOURNAL_DETAILS,
          payload: body,
        });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleEditClick = (index: number) => {
    const entry = displayedEntries[index];
    if (entry.originalIndex === undefined) return;

    setEditMode(true);
    setCurrentEditIndex(entry.originalIndex);
    setFormData(journal.settings[entry.originalIndex]);
  };

  const filterEntries = (category: string) => {
    if (!journal || !journal.settings) return;

    // Update formData.category to reflect the selected category
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: category === "All" ? "General" : category,
    }));

    if (category === "All") {
      setFilteredEntries(null); // Reset filtered entries to show all
      setChosenCategory(null);
    } else {
      const filteredJournal = journal.settings
        .map((setting: Journal, index: number) => ({ ...setting, originalIndex: index }))
        .filter((setting: Journal) => setting.category === category);
      setFilteredEntries(filteredJournal);
      setChosenCategory(category);
    }
  };

  const displayedEntries = (filteredEntries || journal.settings || []).map((entry: Journal, index: number) => ({
    ...entry,
    originalIndex: entry.originalIndex !== undefined ? entry.originalIndex : index,
  }));

  return (
    <div className="todos-glass-background">
      <p className="todos-big-title">Add New Entry</p>
      <form onSubmit={submitNewData} noValidate>
        <div className="todosSelectContainer">
          <select
            value={formData.category || ""}
            onChange={createInputValue}
            id="category"
            name="category"
            className="selectTodos"
          >
            <option value="General">General</option>
            <option value="Notes">Notes</option>
            <option value="Reminders">Reminders</option>
            <option value="Thoughts">Thoughts</option>
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

        <textarea
          className="form-control todos-input"
          rows={6}
          placeholder="Content"
          id="content"
          name="content"
          style={{ height: "auto" }}
          onChange={createInputValue}
          value={formData.content || ""}
        />

        <div className="todos-submit-btn-container">
          <button type="submit" className={editMode ? "todos-submit-btn update-btn" : "todos-submit-btn"}>
            <p className="todos-submit-btn-content">{editMode ? "Update" : "Add"}</p>
          </button>
        </div>
      </form>

      <p className="todos-section-title">Your past entries</p>

      <select
        value={chosenCategory || "All"}
        onChange={(e) => filterEntries(e.target.value)}
        id="category"
        name="category"
        className="selectTodos"
      >
        <option value="All">All</option>
        <option value="General">General</option>
        <option value="Notes">Notes</option>
        <option value="Reminders">Reminders</option>
        <option value="Thoughts">Thoughts</option>
      </select>

      <div className="journal-all-entries-container">
        {displayedEntries.map((entry: Journal, index: number) => (
          <div className="journal-entries-container" key={index}>
            <div className="todos-item">
              <div className="todos-title-buttons">
                <div className="todos-title">{entry.title}</div>

                <div className="appointment-buttons-container">
                  <button className="appointmentButtons editButton" onClick={() => handleEditClick(index)}>
                    <div className="appointment-timelineIcons">
                      <svg width="8px" height="6px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <div className="todos-description">{entry.content}</div>
              <div className="journal-category-container">
                <button className="journal-category" onClick={() => filterEntries(entry.category)}>
                  {entry.category}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
