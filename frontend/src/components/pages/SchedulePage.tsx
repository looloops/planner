import Appointments from "../widgets/Appointments";
import Calendar from "../widgets/Calendar";
import Todos from "../widgets/Todos";
import NewAppointmentCopy from "../widgets/NewAppointmentCopy";

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
      <div>
        <NewAppointmentCopy />
      </div>
    </div>
  );
};

export default SchedulePage;
