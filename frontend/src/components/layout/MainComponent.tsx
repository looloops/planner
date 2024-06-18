import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Schedule from "../widgets/Schedule";
import Media from "../widgets/Media";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const MainComponent = () => {
  const [staticOn, setStaticOn] = useState(true);
  const [layouts, setLayouts] = useState<Record<string, Layout[]>>(getInitialLayouts(true));

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
      // xs: [
      //   { i: "1", x: 0, y: 0, w: 2, h: 2, static: staticState, status: true },
      //   { i: "2", x: 2, y: 0, w: 2, h: 2, static: staticState, status: true },
      //   { i: "3", x: 4, y: 0, w: 2, h: 2, static: staticState, status: false },
      // ],
      // xxs: [
      //   { i: "1", x: 0, y: 0, w: 2, h: 2, static: staticState, status: true },
      //   { i: "2", x: 2, y: 0, w: 2, h: 2, static: staticState, status: true },
      //   { i: "3", x: 4, y: 0, w: 2, h: 2, static: staticState, status: false },
      // ],
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

  const renderComponent = (key: string) => {
    switch (key) {
      case "1":
        return <Schedule />;

      case "2":
        return <Media />;

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
        {Object.keys(layouts).map((breakpoint) =>
          layouts[breakpoint]
            .filter((layout) => layout.status === true)
            .map((layout) => (
              <div
                key={layout.i}
                style={{
                  //backgroundColor: layout.i === "1" ? "red" : layout.i === "2" ? "blue" : "green",
                  overflowY: "scroll",
                }}
              >
                {renderComponent(layout.i)}
              </div>
            ))
        )}
      </ResponsiveReactGridLayout>

      <button onClick={() => setStaticOn(!staticOn)} className="btn btn-success m-4">
        {staticOn ? "Edit layout" : "Save Layout"}
      </button>
    </>
  );
};

export default MainComponent;
