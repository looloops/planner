import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import Schedule from "../widgets/Schedule";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const MainComponent = () => {
  const [staticOn, setStaticOn] = useState(true);
  const [layouts, setLayouts] = useState<Record<string, Layout[]>>(getInitialLayouts(true));

  // Function to get initial layouts based on staticOn state
  function getInitialLayouts(staticState: boolean): Record<string, Layout[]> {
    return {
      lg: [
        { i: "1", x: 0, y: 0, w: 2, h: 2, static: staticState },
        { i: "2", x: 2, y: 0, w: 2, h: 2, static: staticState },
        { i: "3", x: 4, y: 0, w: 2, h: 2, static: staticState },
      ],
      md: [
        { i: "1", x: 0, y: 0, w: 2, h: 2, static: staticState },
        { i: "2", x: 2, y: 0, w: 2, h: 2, static: staticState },
        { i: "3", x: 4, y: 0, w: 2, h: 2, static: staticState },
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

  return (
    <>
      <ResponsiveReactGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        <div key="1" style={{ backgroundColor: "red", overflowY: "scroll" }}>
          <Schedule />
        </div>
        <div key="2" style={{ backgroundColor: "blue", overflowY: "scroll" }}>
          <Schedule />
        </div>
        <div key="3" style={{ backgroundColor: "green", overflowY: "scroll" }}>
          <Schedule />
        </div>
      </ResponsiveReactGridLayout>

      <button onClick={() => setStaticOn(!staticOn)} className="btn btn-success m-4">
        {staticOn ? "Edit layout" : "Save Layout"}
      </button>
    </>
  );
};

export default MainComponent;
