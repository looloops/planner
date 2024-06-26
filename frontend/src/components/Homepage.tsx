import MyNav from "./MyNav";
import FinalGridCopy from "./layout/FinalGridCopy";
import RightBar from "./layout/RightBar";
import SideBar from "./layout/SideBar";

//import TopBar from "./layout/TopBar";

function Homepage() {
  return (
    <div className="homepage-template-grid">
      <div>
        <SideBar />
      </div>
      <div>
        <MyNav />
      </div>
      <div>
        <FinalGridCopy />
      </div>
      <div>
        <RightBar />
      </div>
    </div>
  );
}

export default Homepage;
