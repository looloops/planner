import "../../assets/scss/habit_tracker.scss";
import { useEffect } from "react";
import axios from "axios";
import { GeneralSettings } from "../../typescript/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/reducers/userReducer";
import { HABITS_DETAILS } from "../../redux/actions/index";
import { ApiResponse } from "../../typescript/interfaces";

const HabitTrackerTopBar: React.FC = () => {
  // SETTING INTERFACE FOR HABITS OBJECT
  interface Habits {
    title: string;
    description: string;
    type: string;
    status: boolean[];
    startDate: string;
  }

  // SETTING INTERFACE FOR INITIAL STATE
  const initialState: Partial<GeneralSettings> = {
    title: "",
    description: "",
    type: "Gain",
    status: [false, false, false, false, false, false, false],
    startDate: new Date().toISOString().split("T")[0], // Set startDate to today's date
  };

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
  }, [dispatch]);

  const toggleStatus = (habitIndex: number, dayIndex: number) => {
    const updatedSettingsArray = habits.settings.map((habit: Habits, index: number) => {
      if (index === habitIndex) {
        const updatedDailyStatus = habit.status.map((checked: boolean, i: number) =>
          i === dayIndex ? !checked : checked
        );
        return { ...habit, status: updatedDailyStatus };
      }
      return habit;
    });

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
        console.log("Daily check updated successfully:", response.data);
        dispatch({
          type: HABITS_DETAILS,
          payload: body,
        });
      })
      .catch((error) => {
        console.error("Error updating daily check:", error);
      });
  };

  // Calculate active checkbox based on startDate
  const calculateActiveCheckbox = (startDate: string) => {
    const start = new Date(startDate).getTime();
    const today = new Date().getTime();
    const differenceInDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return Math.min(differenceInDays + 1, 7); // Ensure it doesn't exceed 7
  };

  return (
    <div className="habits-container-topbar">
      <div className="habits-title-btn-container">
        <p className="habits-section-title-topbar">Your habit-tracker</p>
        <button className="todos-submit-btn">
          <p className="todos-submit-btn-content">+</p>
        </button>
      </div>
      <div className="habits-content-container">
        {habits.settings?.map((habit: Habits, index: number) => (
          <>
            <div key={index} className="habits-item-topbar">
              <div className="habits-title-topbar">{habit.title}</div>

              <div className="daily-checks-topbar">
                {habit.status.map((checked, dayIndex) => (
                  <label key={dayIndex}>
                    <input
                      type="checkbox"
                      name="checkbox"
                      checked={checked}
                      // disabled={currentEditIndex !== index && activeCheckbox !== dayIndex + 1}
                      disabled={calculateActiveCheckbox(habit.startDate) !== dayIndex + 1}
                      onChange={() => toggleStatus(index, dayIndex)}
                    />
                  </label>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default HabitTrackerTopBar;
