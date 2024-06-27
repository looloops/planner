import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_ACTIVE_DATE } from "../../redux/actions/index";
import { State } from "../../redux/reducers/userReducer";

const Calendar: React.FC = () => {
  const schedule = useSelector((state: State) => state.widgets.schedule);
  const appointments = schedule.settings || [];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [days, setDays] = useState<JSX.Element[]>([]);
  const [events, setEvents] = useState<{ [key: string]: boolean }>({});

  // SETTING REDUX
  const startingDay = String(currentDate.getDate()).padStart(2, "0");
  const startingMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns 0-11
  const startingYear = currentDate.getFullYear();
  const startingDate = `${startingYear}-${startingMonth}-${startingDay}`;
  const [selectedDate, setSelectedDate] = useState(startingDate);

  const dispatch = useDispatch();
  // END OF SETTING REDUX

  useEffect(() => {
    renderCalendar();
    // DISPATCH FOR REDUX STATE
    dispatch({
      type: SAVE_ACTIVE_DATE,
      payload: selectedDate,
    });
  }, [startingDate, selectedDate, currentMonth, currentYear, appointments]);

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;

    const today = new Date();
    const daysArray: JSX.Element[] = [];
    let rowsArray: JSX.Element[] = [];
    let cellsArray: JSX.Element[] = [];

    for (let x = firstDay.getDay(); x > 0; x--) {
      cellsArray.push(
        <td className="day prev" key={`prev-${x}`}>
          {prevLastDayDate - x + 1}
        </td>
      );
    }

    for (let i = 1; i <= lastDayDate; i++) {
      const isToday = i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      const eventKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const isEvent = appointments.some((appointment) => appointment.date === eventKey);
      const classNames = ["day", "current"];
      if (isToday) classNames.push("today");
      if (isEvent) classNames.push("event");

      cellsArray.push(
        <td className={classNames.join(" ")} key={`current-${i}`} onClick={() => handleDateClick(eventKey)}>
          {i}
        </td>
      );

      if (cellsArray.length === 7) {
        rowsArray.push(<tr key={`row-${rowsArray.length}`}>{cellsArray}</tr>);
        cellsArray = [];
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      cellsArray.push(
        <td className="day next" key={`next-${j}`}>
          {j}
        </td>
      );

      if (cellsArray.length === 7) {
        rowsArray.push(<tr key={`row-${rowsArray.length}`}>{cellsArray}</tr>);
        cellsArray = [];
      }
    }

    if (cellsArray.length > 0) {
      rowsArray.push(<tr key={`row-${rowsArray.length}`}>{cellsArray}</tr>);
    }

    setDays(rowsArray);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear(currentYear - 1);
        return 11;
      } else {
        return prev - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear(currentYear + 1);
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setCurrentDate(today);
  };

  const handleDateClick = (dateKey: string) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: !prevEvents[dateKey],
    }));

    // SETTING SELECTED DATE FOR REDUX
    const [year, month, day] = dateKey.split("-");
    const fullDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    console.log("date from calendar", fullDate);
    console.log("selecteddate before if", selectedDate);

    if (selectedDate === fullDate) {
      setSelectedDate(startingDate);
      dispatch({
        type: SAVE_ACTIVE_DATE,
        payload: startingDate,
      });
    } else {
      setSelectedDate(fullDate);
      dispatch({
        type: SAVE_ACTIVE_DATE,
        payload: fullDate,
      });
    }

    console.log("selecteddate after if", selectedDate);
  };

  const hideTodayBtn = () => {
    return currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "none" : "flex";
  };

  return (
    <>
      <div className="container calendar_body">
        <div className="calendar">
          <header>
            <h2>
              {months[currentMonth]} {currentYear}
            </h2>
            <div className="btn today" onClick={handleToday} style={{ display: hideTodayBtn() }}>
              <i className="fas fa-calendar-day"></i>
            </div>
            <a className="btn-prev fontawesome-angle-left" onClick={handlePrevMonth} href="#"></a>
            <a className="btn-next fontawesome-angle-right" onClick={handleNextMonth} href="#"></a>
          </header>

          <table>
            <thead>
              <tr>
                {daysOfWeek.map((day) => (
                  <td className="day" key={day}>
                    {day}
                  </td>
                ))}
              </tr>
            </thead>

            <tbody>{days}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Calendar;
