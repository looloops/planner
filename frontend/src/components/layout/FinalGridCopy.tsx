import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layouts, Layout, Responsive, WidthProvider } from "react-grid-layout";
import { State } from "../../redux/reducers/userReducer";
import { SAVE_ACTIVE_WIDGETS, SAVE_LAYOUT } from "../../redux/actions";
import Schedule from "../widgets/Schedule";
import Media from "../widgets/Media";
import Weather from "../widgets/Weather";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Todos from "../widgets/Todos";
import Calendar from "../widgets/Calendar";

const ResponsiveGridLayout = WidthProvider(Responsive);

const FinalGridCopy = () => {
  useMemo(() => ResponsiveGridLayout, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedWidget, setSelectedWidget] = useState("");

  // Stato per togglare il "static"
  const [staticOn, setStaticOn] = useState(true);
  console.log("Initial staticOn:", staticOn);

  // GETTING ALL WIDGETS
  const allWidgets = {
    1: "Schedule",
    2: "Goals",
    3: "Media",
    4: "Recipes",
    5: "Journal",
    6: "Todos",
    7: "Calendar", // to be decided
    8: "Weather", // to be decided
  };
  console.log("allWidgets", allWidgets);

  // ACTIVE WIDGETS FROM REDUX
  const activeWidgetsFromRedux = useSelector((state: State) => state.user.user?.active_widgets);
  const active_widgets = activeWidgetsFromRedux ? JSON.parse(activeWidgetsFromRedux) : [];
  console.log("active_widgets", active_widgets);

  // GETTING AVAILABLE WIDGETS
  const availableWidgets = Object.keys(allWidgets).filter((key) => !active_widgets.includes(parseInt(key)));
  console.log("availableWidgets", availableWidgets);

  const addWidget = () => {
    if (!selectedWidget) return;

    const newWidget: Layout = { i: selectedWidget, x: 0, y: 0, w: 2, h: 2, minH: 2, maxH: 2, static: staticOn };

    const updatedLayoutState = Object.entries(layoutState).reduce((acc, [breakpoint, layout]) => {
      acc[breakpoint] = [...(layout as Array<T>), newWidget];
      return acc;
    }, {} as Layouts);

    setLayoutState(updatedLayoutState);
    setSelectedWidget("");

    const updatedActiveWidgets = [...active_widgets, parseInt(selectedWidget)];
    dispatch({
      type: SAVE_ACTIVE_WIDGETS,
      payload: JSON.stringify(updatedActiveWidgets),
    });
  };

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
  };

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

  const handleLayoutSave = () => {
    // Imposta static su true prima di salvare
    const layoutStateWithStaticTrue = Object.entries(layoutState).reduce((acc, [breakpoint, layout]) => {
      acc[breakpoint] = (layout as Array<T>).map((item) => ({
        ...item,
        static: true,
      }));
      return acc;
    }, {} as Layouts);

    // Aggiorna lo stato
    setLayoutState(layoutStateWithStaticTrue);

    // Salva layout e active widgets
    const body = {
      widgets_layout: layoutStateWithStaticTrue,
      active_widgets: active_widgets,
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

    // Cambia lo stato staticOn
    handleStatic();
  };

  useEffect(() => {
    axios
      .get("/api/user/layout")
      .then((res) => {
        console.log("Res data layout", res);

        // Verifica che res.data e res.data.data siano definiti
        if (res.data && res.data.data) {
          const widgets_layout = res.data.data.widgets_layout;
          const active_widgets = res.data.data.active_widgets;

          dispatch({
            type: SAVE_LAYOUT,
            payload: JSON.stringify(widgets_layout),
          });

          dispatch({
            type: SAVE_ACTIVE_WIDGETS,
            payload: JSON.stringify(active_widgets),
          });

          // Imposta lo stato dei layout solo se widgets_layout è definito
          if (widgets_layout) {
            setLayoutState(JSON.parse(widgets_layout));
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        // Gestisci l'errore, ad esempio naviga altrove
        // navigate("/");
      });
  }, [dispatch]);

  interface T {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static: boolean;
  }

  const renderComponent = (key: number) => {
    switch (key) {
      case 1:
        return <Schedule />; // schedule
      case 2:
        return <Weather />; //goals
      case 3:
        return <Media />; // media
      case 4:
        return <Schedule />; // recipes
      case 5:
        return <Schedule />; // journal
      case 6:
        return <Todos />; // todos
      case 7:
        return <Calendar />; // to be decided
      case 8:
        return <Weather />; // to be decided

      default:
        return null;
    }
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
        {active_widgets.map((widget: number | string) => (
          <div key={widget}>
            <div style={{ height: "95%", overflowY: "scroll" }}>{renderComponent(parseInt(widget as string))}</div>
          </div>
        ))}
      </ResponsiveGridLayout>

      {/* Bottone per editare o salvare il layout */}
      {staticOn ? (
        <button onClick={handleStatic} className="btn btn-success m-4">
          Edit Layout
        </button>
      ) : (
        <>
          <button onClick={handleLayoutSave} className="btn btn-success m-4">
            Save Layout
          </button>

          {/* Select menu for choosing a new widget to add */}
          <select value={selectedWidget} onChange={(e) => setSelectedWidget(e.target.value)}>
            <option value="">Select</option>
            {availableWidgets.map((key) => (
              <option key={key} value={key}>
                {allWidgets[key]}
              </option>
            ))}
          </select>

          <button onClick={addWidget} className="btn btn-primary m-4">
            Aggiungi Widget
          </button>
        </>
      )}
    </>
  );
};

export default FinalGridCopy;
