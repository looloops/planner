import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layouts, Layout, Responsive, WidthProvider } from "react-grid-layout";
import { State } from "../../redux/reducers/userReducer";
import { SAVE_ACTIVE_WIDGETS, SAVE_LAYOUT } from "../../redux/actions";
import axios from "axios";
import Schedule from "../widgets/Schedule";
import Media from "../widgets/Media";
import Todos from "../widgets/Todos";
import Calendar from "../widgets/Calendar";
import Weather from "../widgets/Weather";
import Appointments from "../widgets/Appointments";

const ResponsiveGridLayout = WidthProvider(Responsive);

const FinalGridCopy = (setSharedStatic) => {
  useMemo(() => ResponsiveGridLayout, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedWidget, setSelectedWidget] = useState("");
  const [widgetWidth, setWidgetWidth] = useState(4); // Default width
  const [widgetHeight, setWidgetHeight] = useState(4);

  const [staticOn, setStaticOn] = useState(true);
  console.log("Initial staticOn:", staticOn);

  const allWidgets = {
    1: "Schedule",
    2: "Goals",
    3: "Media",
    4: "Recipes",
    5: "Journal",
    6: "Todos",
    7: "Calendar",
    8: "Weather",
  };
  console.log("allWidgets", allWidgets);

  const activeWidgetsFromRedux = useSelector((state: State) => state.user.user?.active_widgets);
  const active_widgets = activeWidgetsFromRedux ? JSON.parse(activeWidgetsFromRedux) : [];
  console.log("active_widgets", active_widgets);

  const availableWidgets = Object.keys(allWidgets).filter((key) => !active_widgets.includes(parseInt(key)));
  console.log("availableWidgets", availableWidgets);

  const addWidget = () => {
    if (!selectedWidget) return;

    let width = widgetWidth;
    let height = widgetHeight;
    switch (selectedWidget) {
      case "6": //Todos
        width = 4;
        height = 4;
        break;
      case "7": //Calendar
        width = 2;
        height = 2;
        break;
      default:
        width = 2;
        height = 2;
        break;
    }

    const newWidget: Layout = {
      i: selectedWidget,
      x: 0,
      y: 0,
      w: width,
      h: height,
      resizeHandles: ["s", "w", "e", "n", "sw", "nw", "se", "ne"],
      static: staticOn,
    };

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

  const removeWidget = (widgetId: string) => {
    const updatedLayoutState = Object.entries(layoutState).reduce((acc, [breakpoint, layout]) => {
      acc[breakpoint] = (layout as Array<T>).filter((item) => item.i !== widgetId);
      return acc;
    }, {} as Layouts);

    setLayoutState(updatedLayoutState);

    const updatedActiveWidgets = active_widgets.filter((id: number) => id !== parseInt(widgetId));
    dispatch({
      type: SAVE_ACTIVE_WIDGETS,
      payload: JSON.stringify(updatedActiveWidgets),
    });

    // Update the backend
    const body = {
      widgets_layout: updatedLayoutState,
      active_widgets: updatedActiveWidgets,
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
  };

  const layoutsFromRedux = useSelector((state: State) => state.user.user?.widgets_layout);
  const layoutsParsed = layoutsFromRedux ? JSON.parse(layoutsFromRedux) : {};
  console.log("layoutsParsed:", layoutsParsed);

  const [layoutState, setLayoutState] = useState(layoutsParsed);
  console.log("stato layout iniziale", layoutState);

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    console.log("currentLayout:", currentLayout);
    console.log("allLayouts:", allLayouts);
    setLayoutState(allLayouts);
  };

  const handleStatic = () => {
    const updatedLayoutState = Object.entries(layoutState).reduce((acc, [breakpoint, layout]) => {
      console.log(`Breakpoint: ${breakpoint}`, layout);
      acc[breakpoint] = (layout as Array<T>).map((item) => ({
        ...item,
        static: !staticOn,
      }));
      return acc;
    }, {} as Layouts);

    setStaticOn(!staticOn);
    setLayoutState(updatedLayoutState);

    console.log("updatedLayoutState:", updatedLayoutState);
  };

  const handleLayoutSave = () => {
    const layoutStateWithStaticTrue = Object.entries(layoutState).reduce((acc, [breakpoint, layout]) => {
      acc[breakpoint] = (layout as Array<T>).map((item) => ({
        ...item,
        static: true,
      }));
      return acc;
    }, {} as Layouts);

    setLayoutState(layoutStateWithStaticTrue);

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

    handleStatic();
  };

  useEffect(() => {
    axios
      .get("/api/user/layout")
      .then((res) => {
        console.log("Res data layout", res);

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

          if (widgets_layout) {
            setLayoutState(JSON.parse(widgets_layout));
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [dispatch]);

  interface T {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    resizeHandles: ["s", "w", "e", "n", "sw", "nw", "se", "ne"];
    static: boolean;
  }

  const renderComponent = (key: number) => {
    switch (key) {
      case 1:
        return <Appointments />;
      case 2:
        return <Weather />;
      case 3:
        return <Media />;
      case 4:
        return <Schedule />;
      case 5:
        return <Schedule />;
      case 6:
        return <Todos />;
      case 7:
        return <Calendar />;
      case 8:
        return <Weather />;
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
          <div key={widget} data-grid-id={widget} className="widget-wrapper">
            {!staticOn && (
              <button className="remove-widget-button" onClick={() => removeWidget(widget as string)}>
                <p className="arrow1" aria-hidden="true">
                  Swipe to remove →
                </p>
              </button>
            )}
            <div style={{ height: "100%", overflow: "hidden" }}>{renderComponent(parseInt(widget as string))}</div>
          </div>
        ))}
      </ResponsiveGridLayout>
      <div className="editmode-container">
        {" "}
        {staticOn ? (
          <button onClick={handleStatic} className="editmode-btn">
            <span className="editmode-btn-content">Edit Layout</span>
          </button>
        ) : (
          <>
            <select
              value={selectedWidget}
              onChange={(e) => setSelectedWidget(e.target.value)}
              className="selectWidgets"
            >
              <option value="">Select a widget</option>
              {availableWidgets.map((key) => (
                <option key={key} value={key}>
                  {allWidgets[parseInt(key)]}
                </option>
              ))}
            </select>
            <button onClick={addWidget} className="editmode-btn">
              <span className="editmode-btn-content">Add Widget</span>
            </button>

            <button onClick={handleLayoutSave} className="editmode-btn">
              <span className="editmode-btn-content">Save Layout</span>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default FinalGridCopy;
