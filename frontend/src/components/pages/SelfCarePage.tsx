import Appointments from "../widgets/Appointments";
import Todos from "../widgets/Todos";
import NewAppointmentCopy from "../widgets/NewAppointmentCopy";
import HabitTracker from "../widgets/HabitTracker";
import Journal from "../widgets/Journal";

const SelfCarePage: React.FC = () => {
  return (
    <div className="selfcare-template-grid">
      <div>
        <Journal />
      </div>
      <div>
        <HabitTracker />{/*  future moods */}
      </div>
      <div>
        <HabitTracker/>
      </div>
    </div>
  );
};

export default SelfCarePage;
