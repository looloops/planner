import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import React, { useState, useEffect, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridVerde = () => {
  useMemo(() => ResponsiveGridLayout, []);
  const [staticOn, setStaticOn] = useState(true);
  console.log(staticOn);

  // Layout iniziale
  const initialLayout = [
    { i: "widget1", x: 0, y: 0, w: 2, h: 4, static: staticOn },
    // Altri widget...
  ];

  const [layout, setLayout] = useState(initialLayout);

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
      i: `widget${layout.length + 1}`,
      x: 0, //Possiamo sostituire 0 con la somma delle larghezze dei widget se lo vogliamo in verticale
      y: Infinity,
      w: 2,
      h: 4,
      static: staticOn, // Usa il valore corrente di staticOn
    };
    setLayout([...layout, newWidget]);
  };

  // Breakpoints and column configurations
  const breakpoints = { lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  return (
    <>
      <ResponsiveGridLayout
        className="responsive-grid"
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={30}
        layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {layout.map((item) => (
          <div key={item.i} style={{ background: "#009688" }}>
            {`Widget ${item.i}`}
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

export default GridVerde;
