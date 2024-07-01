import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SAVE_ACTIVE_DATE } from "../redux/actions";
import MyNav from "./MyNav";
import FinalGridCopy from "./layout/FinalGridCopy";
import RightBar from "./layout/RightBar";
import SideBar from "./layout/SideBar";
import Schedule from "./widgets/Schedule";
import ScheduleCreate from "./widgets/ScheduleCreate";
import ScheduleEdit from "./widgets/ScheduleEdit";
import Media from "./widgets/Media";
import MediaEdit from "./widgets/MediaEdit";
import Weather from "./widgets/Weather";
import ScheduleTimeline from "./widgets/ScheduleTimeline";
import NewAppointmentCopy from "./widgets/NewAppointmentCopy";
import SchedulePage from "./pages/SchedulePage";
import { Routes, Route } from "react-router-dom";
import DailySchedule from "./widgets/DailySchedule";
import { LOGIN } from "./redux/actions";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HabitTracker from "./widgets/HabitTracker";
import SelfCarePage from "./pages/SelfCarePage";

const Homepage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    const startingDay = String(today.getDate()).padStart(2, "0");
    const startingMonth = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns 0-11
    const startingYear = today.getFullYear();
    const startingDate = `${startingYear}-${startingMonth}-${startingDay}`;

    dispatch({
      type: SAVE_ACTIVE_DATE,
      payload: startingDate,
    });
  }, [dispatch]);

  return (
    <div className="homepage-template-grid">
      <div>
        <SideBar />
      </div>
      <div>
        <MyNav />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<FinalGridCopy />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/schedule/add" element={<ScheduleCreate />} />
          <Route path="/schedule/edit/:settingIndex" element={<ScheduleEdit />} />
          <Route path="/media" element={<Media />} />
          <Route path="/media/edit/:settingIndex" element={<MediaEdit />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/timeline" element={<ScheduleTimeline />} />
          <Route path="/newappointment" element={<NewAppointmentCopy />} />
          <Route path="/daily-schedule" element={<DailySchedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/habit-tracker" element={<HabitTracker />} />
          <Route path="/self-care" element={<SelfCarePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Homepage;
