import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Layouts, Layout, Responsive, WidthProvider } from "react-grid-layout";
import { State } from "../../redux/reducers/userReducer";

const ResponsiveGridLayout = WidthProvider(Responsive);

const FinalGrid = () => {
  useMemo(() => ResponsiveGridLayout, []);

  // stato per uppare lo static
  const [staticOn, setStaticOn] = useState(true);

  // {lg: layout1, md: layout2, ...}
  // const layouts = getLayoutsFromSomewhere();
  const layoutsFromRedux = useSelector((state: State) => state.user.user?.widgets_layout);

  // parsiamo il json e assegniamo i layouts come prop di responsivegridlayout
  const layoutsParsed = JSON.parse(layoutsFromRedux);

  //entriamo nell'array
  const layouts = layoutsParsed;
  console.log("parsed layouts", layouts);

  //settiamo lo stato
  const [layoutState, setLayoutState] = useState(layouts);
  console.log("stato layout", layoutState);

  const handleLayoutChange = (currentLayout: Layout, allLayouts: { [key: $Keys<breakpoints>]: Layouts }) => {
    console.log("current", currentLayout);
    console.log("all layouts", allLayouts);
    setLayoutState(allLayouts);
  };

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        // onLayoutChange={(currentLayout: Layout, allLayouts: {[key: $Keys<breakpoints>]: Layout})}
        onLayoutChange={handleLayoutChange}
      >
        <div key="1" style={{ backgroundColor: "#dddddd" }}>
          1
        </div>
        <div key="2" style={{ backgroundColor: "#dddddd" }}>
          2
        </div>
        <div key="3" style={{ backgroundColor: "#dddddd" }}>
          3
        </div>
      </ResponsiveGridLayout>

      {/* Bottone per editare o salvare il layout */}
      <button onClick={() => setStaticOn(!staticOn)} className="btn btn-success m-4">
        {staticOn ? "Edit layout" : "Save Layout"}
      </button>

      {/* Bottone per aggiungere un nuovo widget */}
      {/* {!staticOn && (
        <button onClick={addWidget} className="btn btn-primary m-4">
          Aggiungi Widget
        </button>
        )} */}
    </>
  );
};

export default FinalGrid;
