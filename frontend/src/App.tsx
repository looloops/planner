import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LOGIN } from "./redux/actions";
import { RootState } from "./redux/store";
import MyNav from "./components/MyNav";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import SchedulePage from "./components/pages/SchedulePage";
import Homepage from "./components/Homepage";
import NewAppointmentCopy from "./components/widgets/NewAppointmentCopy";
import FinalGridCopy from "./components/layout/FinalGridCopy";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const App: React.FC = () => {
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
        {<Homepage />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/schedule-page" element={<SchedulePage />} /> */}
          {/* <Route path="/navbar" element={<MyNav />} /> */}
        </Routes>
      </Router>
    )
  );
};

export default App;
