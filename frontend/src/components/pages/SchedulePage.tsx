import Appointments from "../widgets/Appointments";
import Calendar from "../widgets/Calendar";
import Todos from "../widgets/Todos";

const SchedulePage: React.FC = () => {
  return (
    <div className="schedule-template-grid">
      <div>
        <Calendar />
      </div>
      <div>
        <Appointments />
      </div>
      <div>
        <Todos />
      </div>
      <div>timeline</div>
      <div>schedule form</div>
    </div>
  );
};

export default SchedulePage;
