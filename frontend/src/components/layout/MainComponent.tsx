import { useState, useEffect, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Schedule from "../widgets/Schedule";
import Media from "../widgets/Media";
import { useSelector } from "react-redux";
import { State, UserState } from "../../redux/reducers/userReducer";
import { WidgetsLayout } from "../../redux/reducers/userReducer";
import axios from "axios";
import Weather from "../widgets/Weather";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const MainComponent = () => {
  useMemo(() => ResponsiveReactGridLayout, []);

  // state to change static boolean
  const [staticOn, setStaticOn] = useState(true);

  // {lg: layout1, md: layout2, ...}
  // const layouts = getLayoutsFromSomewhere();
  const layoutsFromRedux = useSelector((state: State) => state.user.user?.widgets_layout);

  // parsiamo il json e assegniamo i layouts come prop di responsivegridlayout
  const layoutsParsed = JSON.parse(layoutsFromRedux);

  //entriamo nell'array
  const layouts = layoutsParsed[0];
  console.log("parsed layouts", layouts);

  // settiamo uno stato locale per verificare l'onchange del layout = saranno i layout con cui parte l'applicazione
  const [layoutsState, setLayoutsState] = useState(layouts);

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    console.log("current", currentLayout);
    console.log("all layouts", allLayouts);
    setLayoutsState(allLayouts);
    //localStorage.setItem("grid-layout", JSON.stringify(layouts));
  };

  console.log("layoutsState", layoutsState);

  // const activeWidgets = parsedLayout.xxs.map(layout => parseInt(layout.i));
  const activeWidgets = [1, 2, 3, 4];

  interface Layout {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static: boolean;
  }

  useEffect(() => {
    // No need to reset layouts on staticOn change, just update the static property
    setLayoutsState((layoutsState) => {
      const updatedLayouts: Record<string, Layout[]> = {};
      Object.keys(layoutsState).forEach((breakpoint) => {
        updatedLayouts[breakpoint] = layoutsState[breakpoint].map((layout) => ({
          ...layout,
          static: staticOn, // Update the static property based on staticOn state
        }));
      });
      return updatedLayouts;
    });

    const body = {
      widgets_layout: layoutsState,
    };

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
  }, []);

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

  return (
    <>
      <ResponsiveReactGridLayout
        className="layout"
        layouts={layouts}
        // onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        {activeWidgets.map((widget: any) => (
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

export default MainComponent;
