import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Media from "../widgets/Media";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];

const GridResponsive = (props: any) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [compactType, setCompactType] = useState("vertical");
  const [resizeHandles, setResizeHandles] = useState(["se"]);
  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState({ lg: generateLayout(["se"]) });
  const [allStatic, setAllStatic] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateDOM = () => {
    return _.map(layouts.lg, (l, i) => {
      return (
        <div key={i} className={l.static ? "static" : ""} style={{ background: "#009688" }}>
          {l.static ? (
            <span className="text" title="This item is static and cannot be removed or resized.">
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  };

  const onBreakpointChange = (breakpoint: any) => {
    setCurrentBreakpoint(breakpoint);
  };

  const onCompactTypeChange = () => {
    setCompactType((oldCompactType) => {
      return oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    });
  };

  const onResizeTypeChange = () => {
    setResizeHandles((oldResizeHandles) => {
      return oldResizeHandles === availableHandles ? ["se"] : availableHandles;
    });
  };

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
    props.onLayoutChange(layout, layouts);
  };

  const onNewLayout = () => {
    setLayouts({ lg: generateLayout(resizeHandles) });
  };

  const onDrop = (layout, item, e) => {
    alert(`Element parameters: ${JSON.stringify(item)}`);
  };

  const addNewItem = () => {
    setLayouts((prevLayouts) => {
      const newItem = {
        x: 0,
        y: Infinity, // Put it at the bottom
        w: 2,
        h: Math.ceil(Math.random() * 4) + 1,
        i: new Date().getTime().toString(),
        resizeHandles,
      };
      const newLayouts = { ...prevLayouts, lg: [...prevLayouts.lg, newItem] };
      return newLayouts;
    });
  };

  const toggleStatic = () => {
    setAllStatic((prevStatic) => !prevStatic);
    setLayouts((prevLayouts) => {
      const newLayouts = {
        ...prevLayouts,
        lg: prevLayouts.lg.map((item) => ({
          ...item,
          static: !allStatic,
        })),
      };
      return newLayouts;
    });
  };

  return (
    <div>
      <div>
        Current Breakpoint: {currentBreakpoint} ({props.cols[currentBreakpoint]} columns)
      </div>
      <div>Compaction type: {_.capitalize(compactType) || "No Compaction"}</div>
      <button onClick={onNewLayout}>Generate New Layout</button>
      <button onClick={onCompactTypeChange}>Change Compaction Type</button>
      <button onClick={onResizeTypeChange}>
        Resize {resizeHandles === availableHandles ? "One Corner" : "All Corners"}
      </button>
      <button onClick={addNewItem}>Add New Item</button>
      <button onClick={toggleStatic}>
        {allStatic ? "Remove Static from All Items" : "Make All Items Static"}
      </button>
      <ResponsiveReactGridLayout
        {...props}
        layouts={layouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
      >
     {generateDOM()} 
     

      </ResponsiveReactGridLayout>
    </div>
  );
};

GridResponsive.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: function () {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
};

function generateLayout(resizeHandles) {
  return _.map(_.range(0, 25), (item, i) => {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05,
      resizeHandles,
    };
  });
}

export default GridResponsive;
