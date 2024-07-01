import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { LOGIN } from "./redux/actions";

import Homepage from "./components/Homepage";
import "./assets/scss/appointmens.scss";
import "./assets/scss/calendar.scss";
import "./assets/scss/newappointment.scss";
import "./assets/scss/rightbar.scss";
import "./assets/scss/schedule_page.scss";
import "./assets/scss/sidebar.scss";
import "./assets/scss/style.scss";
import "./assets/scss/todos.scss";
import "./assets/scss/weather.scss";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const App: React.FC = () => {
  // Use RootState to type the state parameter
  const user = useSelector((state: RootState) => state._persist);
  console.log("user", user);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    axios("/api/user")
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
      });
  }, [dispatch]);

  return (
    loaded && (
      <Router>
        {/* <MyNav /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/schedule/add" element={<ScheduleCreate />} />
          <Route path="/schedule/edit/:settingIndex" element={<ScheduleEdit />} />
          <Route path="/media" element={<Media />} />
          <Route path="/media/edit/:settingIndex" element={<MediaEdit />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/Timeline" element={<ScheduleTimeline />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/schedule-page" element={<SchedulePage />} />
          <Route path="/navbar" element={<MyNav />} />
          <Route path="/newappointment" element={<NewAppointmentCopy />} />
        </Routes>
      </Router>
    )
  );
};

export default App;
