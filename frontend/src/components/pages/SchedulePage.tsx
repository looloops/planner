import Appointments from "../widgets/Appointments";
import Calendar from "../widgets/Calendar";

const SchedulePage: React.FC = () => {
  return (
    <div className="schedule-template-grid">
      <div>
        <Calendar />
      </div>
      <div><Appointments /></div>
      <div>todos</div>
      <div>timeline</div>
      <div>schedule form</div>
    </div>
  );
};

export default SchedulePage;
