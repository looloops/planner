import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Schedule from "./components/widgets/Schedule";
import "./App.css";
import Login from "./components/pages/Login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LOGIN } from "./redux/actions";
import { RootState } from "./redux/store"; // Import the RootState type
import MyNav from "./components/MyNav";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/pages/Register";
import ScheduleEdit from "./components/widgets/ScheduleEdit";
import Media from "./components/widgets/Media";
import MediaEdit from "./components/widgets/MediaEdit";
import ScheduleCreate from "./components/widgets/ScheduleCreate";
import Weather from "./components/widgets/Weather";
import Homepage from "./components/Homepage";
import GridProva from "./components/layout/GridProva";
import GridFunzionante from "./components/layout/GridFunzionante";
import GridVerde from "./components/layout/GridVerde";
import FinalGrid from "./components/layout/FinalGrid";
import FinalGridCopy from "./components/layout/FinalGridCopy";

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
        <MyNav />
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
          <Route path="/grid" element={<Homepage />} />
          <Route path="/grid2" element={<GridProva />} />
          <Route path="/grid3" element={<GridFunzionante />} />
          <Route path="/grid4" element={<GridVerde />} />
          <Route path="/grid5" element={<FinalGrid />} />
          <Route path="/grid6" element={<FinalGridCopy />} />
        </Routes>
      </Router>
    )
  );
};

export default App;
