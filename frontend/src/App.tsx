import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Schedule from "./components/Schedule";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Schedule />} />
      </Routes>
    </Router>
  );
}

export default App;
