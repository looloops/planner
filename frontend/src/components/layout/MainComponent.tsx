import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Schedule from "../widgets/Schedule";
import Media from "../widgets/Media";
import { useSelector } from "react-redux";
import { State, UserState } from "../../redux/reducers/userReducer";
import { WidgetsLayout } from "../../redux/reducers/userReducer";
import axios from "axios";
import Weather from "../widgets/Weather";
import { forEach } from "lodash";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const MainComponent = () => {
  const [staticOn, setStaticOn] = useState(true);
  const userLayout: any = useSelector((state: State) => state.user.user?.widgets_layout);

  //TAKES LAYOUTS FROM REDUX USER "WIDGETS_LAYOUT"
  function getInitialLayouts(staticState: boolean): Record<string, Layout[]> {
    const parsedLayouts: Record<string, Layout[]> = JSON.parse(userLayout);

    console.log("Layout parsed", parsedLayouts);
    return parsedLayouts;
  }
  const [layouts, setLayouts] = useState<Record<string, Layout[]>>(getInitialLayouts(staticOn));

  // Parse the userLayout from Redux
  interface Layout {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static: boolean;
  }

  // Function to get initial layouts based on staticOn state and user layout from Redux

  useEffect(() => {
    // No need to reset layouts on staticOn change, just update the static property

    const body = {
      widgets_layout: layouts,
    };

    console.log("body", body);

    axios
      .put(`http://localhost:8000/api/user/layout/edit`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  }, [staticOn]);

  //onLayoutChange: (currentLayout: Layout, allLayouts: {[key: $Keys<breakpoints>]: Layout}) => void,

  // const handleLayoutChange = (currentLayout: Layout[], allLayouts: Record<string, Layout[]>) => {
  //   setLayouts(allLayouts);
  //   console.log("allLayoputs", all);
  // };

  const handleLayoutChange = (layout, layouts) => {
    setLayouts(JSON.stringify(layouts));
  };
  const Grid = () => {
    const handleLayoutChange = (layout, layouts) => {
      localStorage.setItem("grid-layout", JSON.stringify(layouts));
    };
    //https://isamatov.com/react-grid-layout-tutorial/

    const renderComponent = (key: number) => {
      switch (key) {
        case 1:
          return <Schedule />;

        case 2:
          return <Media />;

        case 3:
          return <Schedule />;

        case 4:
          return <Weather />;

        default:
          return null;
      }
    };

    // const activeWidgets = parsedLayout.xxs.map(layout => parseInt(layout.i));
    const activeWidgets = [1, 2, 3, 4];

    return (
      <>
        <ResponsiveReactGridLayout
          className="layout"
          layouts={layouts}
          onLayoutChange={handleLayoutChange}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {activeWidgets.map((widget: number) => (
            <div
              key={widget}
              style={{
                backgroundColor: "#dddddd",
                overflowY: "scroll",
              }}
            >
              {renderComponent(widget)}
            </div>
          ))}
        </ResponsiveReactGridLayout>

        <button onClick={() => setStaticOn(!staticOn)} className="btn btn-success m-4">
          {staticOn ? "Edit layout" : "Save Layout"}
        </button>
      </>
    );
  };
};

export default MainComponent;
