import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Schedule from "../widgets/Schedule";
import Media from "../widgets/Media";
import { useSelector } from "react-redux";
import { State, UserState } from "../../redux/reducers/userReducer";
import { WidgetsLayout } from "../../redux/reducers/userReducer";
import axios from "axios";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const MainComponent = () => {
  const [staticOn, setStaticOn] = useState(true);
  const userLayout = useSelector((state: State) => state.user.user?.widgets_layout);

  // Parse the userLayout from Redux
  const parsedLayout = JSON.parse(userLayout) as WidgetsLayout;

  // Function to get initial layouts based on staticOn state and user layout from Redux
  function getInitialLayouts(staticState: boolean, defaultLayout: WidgetsLayout): Record<string, Layout[]> {
    const layoutWithStatic: Record<string, Layout[]> = {};
    for (const breakpoint in defaultLayout) {
      layoutWithStatic[breakpoint] = defaultLayout[breakpoint].map((layout) => ({
        ...layout,
        static: staticState,
      }));
    }
    return layoutWithStatic;
  }

  // Initialize the layouts state using the user layout from Redux
  const [layouts, setLayouts] = useState<Record<string, Layout[]>>(getInitialLayouts(staticOn, parsedLayout));

  // const activeWidgets = parsedLayout.xxs.map(layout => parseInt(layout.i));
  const activeWidgets = [1, 2, 3];

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
    setLayouts((prevLayouts) => {
      const updatedLayouts: Record<string, Layout[]> = {};
      Object.keys(prevLayouts).forEach((breakpoint) => {
        updatedLayouts[breakpoint] = prevLayouts[breakpoint].map((layout) => ({
          ...layout,
          static: staticOn, // Update the static property based on staticOn state
        }));
      });
      return updatedLayouts;
    });

    const body = {
      widgets_layout: layouts,
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
  }, [staticOn]);

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Record<string, Layout[]>) => {
    setLayouts(allLayouts);
  };

  const renderComponent = (key: number) => {
    switch (key) {
      case 1:
        return <Schedule />;

      case 2:
        return <Media />;

      case 3:
        return <Schedule />;

      default:
        return null;
    }
  };

  return (
    <>
      <ResponsiveReactGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
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
