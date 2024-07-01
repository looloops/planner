import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LOGIN } from "./redux/actions";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Homepage from "./components/Homepage";
import "./assets/scss/appointmens.scss";
import "./assets/scss/calendar.scss";
import "./assets/scss/newappointment.scss";
import "./assets/scss/rightbar.scss";
import "./assets/scss/schedule_page.scss";
import "./assets/scss/sidebar.scss";
import "./assets/scss/style.scss";
import "./assets/scss/todos.scss";

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

  return loaded && <Router>{<Homepage />}</Router>;
};

export default App;
