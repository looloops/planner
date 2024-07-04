import Appointments from "../widgets/Appointments";
import Calendar from "../widgets/Calendar";
import Todos from "../widgets/Todos";
import NewAppointmentCopy from "../widgets/NewAppointmentCopy";
import { useState } from "react";

const SchedulePage: React.FC = () => {

  const [editMode, setEditMode] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  console.log("editMode", editMode)
  console.log("current edit index", currentEditIndex)


  return (
    <div className="schedule-template-grid">
      <div>
        <Calendar />
      </div>
      <div>
        <Appointments setEditMode={setEditMode} setCurrentEditIndex={setCurrentEditIndex}/>
      </div>
      <div>
        <Todos />
      </div>

      <div>
        <NewAppointmentCopy editMode={editMode} currentEditIndex={currentEditIndex} setEditMode={setEditMode} setCurrentEditIndex={setCurrentEditIndex}/>
      </div>
    </div>
  );
};

export default SchedulePage;
