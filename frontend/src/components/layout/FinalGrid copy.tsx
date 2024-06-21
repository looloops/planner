import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layouts, Layout, Responsive, WidthProvider } from "react-grid-layout";
import { State } from "../../redux/reducers/userReducer";
import { SAVE_LAYOUT } from "../../redux/actions";

const ResponsiveGridLayout = WidthProvider(Responsive);

const FinalGrid = () => {
  useMemo(() => ResponsiveGridLayout, []);
  const dispatch = useDispatch();

  // Stato per togglare il "static"
  const [staticOn, setStaticOn] = useState(true);
  console.log("staticOn:", staticOn);

  // {lg: layout1, md: layout2, ...}
  const layoutsFromRedux = useSelector((state: State) => state.user.user?.widgets_layout);

  // Parsiamo il JSON e assegniamo i layouts come prop di ResponsiveGridLayout
  const layoutsParsed = layoutsFromRedux ? JSON.parse(layoutsFromRedux) : {};
  console.log("layoutsParsed:", layoutsParsed);

  // Settiamo lo stato con i valori iniziali
  const [layoutState, setLayoutState] = useState(layoutsParsed);
  console.log("stato layout iniziale", layoutState);

  // Upiamo lo stato al cambiamento di layout
  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    console.log("currentLayout:", currentLayout);
    console.log("allLayouts:", allLayouts);
    setLayoutState(allLayouts);
    dispatch({
      type: SAVE_LAYOUT,
      payload: JSON.stringify(allLayouts),
    });
  };

  interface T {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static: boolean;
  }

  // Cambiamo lo static al click del bottone, aggiornando anche lo stato
  const handleStatic = () => {
    const updatedLayoutState = Object.entries(layoutState).reduce((acc, [breakpoint, layout]) => {
      console.log(`Breakpoint: ${breakpoint}`, layout); // Log del layout corrente
      acc[breakpoint] = (layout as Array<T>).map((item) => ({
        ...item,
        static: !staticOn,
      }));
      return acc;
    }, {} as Layouts);

    setStaticOn(!staticOn);
    setLayoutState(updatedLayoutState);

    console.log("updatedLayoutState:", updatedLayoutState); // Log del nuovo stato del layout
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
