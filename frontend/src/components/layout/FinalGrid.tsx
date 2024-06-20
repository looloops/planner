import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Layouts, Layout, Responsive, WidthProvider } from "react-grid-layout";
import { State } from "../../redux/reducers/userReducer";

const ResponsiveGridLayout = WidthProvider(Responsive);

const FinalGrid = () => {
  useMemo(() => ResponsiveGridLayout, []);

  // stato per uppare lo static
  const [staticOn, setStaticOn] = useState(true);
  console.log("static", staticOn);

  // {lg: layout1, md: layout2, ...}
  const layoutsFromRedux = useSelector((state: State) => state.user.user?.widgets_layout);

  // parsiamo il json e assegniamo i layouts come prop di responsivegridlayout
  const layoutsParsed = JSON.parse(layoutsFromRedux);

  // entriamo nell'array
  const layouts = layoutsParsed;
  console.log("parsed layouts", layouts);

  // settiamo lo stato con i valori iniziali
  const [layoutState, setLayoutState] = useState(layouts);
  console.log("stato layout", layoutState);

  // uppiamo lo stato al cambiamento di layout
  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    console.log("current", currentLayout);
    console.log("all layouts", allLayouts);
    setLayoutState(allLayouts);
  };

  // cambiamo lo static al click del bottone, aggiornando anche lo stato
  const handleStatic = () => {
    const updatedLayoutState = Object.fromEntries(
      Object.entries(layoutState).map(([breakpoint, layout]) => [
        breakpoint,
        layout.map((item) => ({
          ...item,
          static: !staticOn,
        })),
      ])
    );

    setStaticOn(!staticOn);
    setLayoutState(updatedLayoutState);
  };

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={layoutState}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
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
      <button onClick={handleStatic} className="btn btn-success m-4">
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
