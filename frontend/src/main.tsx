import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/scss/style.scss";
import "./assets/scss/rightbar.scss";
import "./assets/scss/schedule_page.scss";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
