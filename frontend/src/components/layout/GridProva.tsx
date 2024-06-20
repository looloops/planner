import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Layouts, Layout, Responsive, WidthProvider } from "react-grid-layout";
import { State } from "../../redux/reducers/userReducer";
import Schedule from "../widgets/Schedule";

const ResponsiveGridLayout = WidthProvider(Responsive);
const GridProva = () => {
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


    // Layout iniziale
    const initialLayout = [
      { i: "1", x: 0, y: 0, w: 2, h: 4, static: staticOn },
      { i: "2", x: 0, y: 0, w: 2, h: 4, static: staticOn },
      // Altri widget...
    ];

  // settiamo uno stato locale per verificare l'onchange del layout
  const [layout, setLayout] = useState(initialLayout);
  console.log("stato layout", layout);

  // Effetto che si attiva quando staticOn cambia
  useEffect(() => {
    // Crea un nuovo layout aggiornato con il nuovo valore di staticOn
    const updatedLayout = layout.map((item) => ({
      ...item,
      static: staticOn,
    }));
    setLayout(updatedLayout);
  }, [staticOn]);

  // Funzione per aggiungere un nuovo widget
  const addWidget = () => {
    const newWidget = {
      i: `${layout.length + 1}`,
      x: 0, //Possiamo sostituire 0 con la somma delle larghezze dei widget se lo vogliamo in verticale
      y: Infinity,
      w: 2,
      h: 4,
      static: staticOn, // Usa il valore corrente di staticOn
    };
    setLayout([...layout, newWidget]);
  };



  const handleLayoutChange = (currentLayout: Layout, allLayouts: {[key: $Keys<breakpoints>]: Layouts}) => {
    console.log("current", currentLayout);
    console.log("all layouts", allLayouts);
    setLayoutsState(allLayouts);
  }

const activeWidgets = [1, 2, 3, 4];


  return (
    <>
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layouts, md: layouts, sm: layouts, xs: layouts, xxs: layouts }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      // onLayoutChange={(currentLayout: Layout, allLayouts: {[key: $Keys<breakpoints>]: Layout})}
      // onLayoutChange={handleLayoutChange}
      onLayoutChange={(newLayout) => setLayout(newLayout)}
    >
       {activeWidgets.map((item) => (
          <div key={item} style={{ background: "#009688" }}>
            {`Widget ${item}`}
          </div>
        ))}
      </ResponsiveGridLayout>

      {/* Bottone per editare o salvare il layout */}
      <button onClick={() => setStaticOn(!staticOn)} className="btn btn-success m-4">
        {staticOn ? "Edit layout" : "Save Layout"}
      </button>

      {/* Bottone per aggiungere un nuovo widget */}
      {!staticOn && (
        <button onClick={addWidget} className="btn btn-primary m-4">
          Aggiungi Widget
        </button>
      )}
    </>
  );
};

export default GridProva;
