import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Schedule from "../widgets/Schedule";
import Media from "../widgets/Media";
import { useSelector } from "react-redux";
import { State, UserState } from "../../redux/reducers/userReducer";
import { WidgetsLayout } from "../../redux/reducers/userReducer";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const MainComponent = () => {
  const [staticOn, setStaticOn] = useState(true);
  const [layouts, setLayouts] = useState<Record<string, Layout[]>>(getInitialLayouts(true));
  const userLayout = useSelector((state: State) => state.user.user?.widgets_layout);
  const parsedLayout = JSON.parse(userLayout) as Partial<WidgetsLayout>[];
  const element = parsedLayout[0].lg[0].i;
  console.log("parsedLayout", parsedLayout);
  console.log("element", element);

  interface Layout {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static: boolean;
    status: boolean;
  }

  // Function to get initial layouts based on staticOn state
  function getInitialLayouts(staticState: boolean): Record<string, Layout[]> {
    return {
      lg: [
        { i: "1", x: 0, y: 0, w: 2, h: 2, static: staticState, status: true },
        { i: "2", x: 2, y: 0, w: 2, h: 2, static: staticState, status: true },
        { i: "3", x: 4, y: 0, w: 2, h: 2, static: staticState, status: false },
      ],
      md: [
        { i: "1", x: 0, y: 0, w: 2, h: 2, static: staticState, status: true },
        { i: "2", x: 2, y: 0, w: 2, h: 2, static: staticState, status: true },
        { i: "3", x: 4, y: 0, w: 2, h: 2, static: staticState, status: false },
      ],
      sm: [
        { i: "1", x: 0, y: 0, w: 2, h: 2, static: staticState, status: true },
        { i: "2", x: 2, y: 0, w: 2, h: 2, static: staticState, status: true },
        { i: "3", x: 4, y: 0, w: 2, h: 2, static: staticState, status: false },
      ],
      xs: [
        { i: "1", x: 0, y: 0, w: 2, h: 2, static: staticState, status: true },
        { i: "2", x: 2, y: 0, w: 2, h: 2, static: staticState, status: true },
        { i: "3", x: 4, y: 0, w: 2, h: 2, static: staticState, status: false },
      ],
      xxs: [
        { i: "1", x: 0, y: 0, w: 2, h: 2, static: staticState, status: true },
        { i: "2", x: 2, y: 0, w: 2, h: 2, static: staticState, status: true },
        { i: "3", x: 4, y: 0, w: 2, h: 2, static: staticState, status: false },
      ],
      // Add more breakpoints as needed
    };
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

      default:
        return null;
    }
  };

  const widgetsAttivi = [1, 2];

  return (
    <>
      <ResponsiveReactGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        {widgetsAttivi.map((widget) => (
          <div
            key={widget}
            style={{
              //backgroundColor: layout.i === "1" ? "red" : layout.i === "2" ? "blue" : "green",
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
