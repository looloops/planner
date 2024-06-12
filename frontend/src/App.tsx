import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Schedule from "./components/widgets/Schedule";
import "./App.css";
import Login from "./components/Login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LOGIN } from "./redux/actions";
import { RootState } from "./redux/store"; // Import the RootState type
import MyNav from "./components/MyNav";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const App: React.FC = () => {
  // Use RootState to type the state parameter
  const user = useSelector((state: RootState) => state.user);
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
        <MyNav />
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    )
  );
};

export default App;
