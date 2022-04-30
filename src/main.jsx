import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import { REDUX_STORE } from "@/Hooks/useRedux.js";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={REDUX_STORE}>
    <App />
  </Provider>
);
