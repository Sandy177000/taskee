import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StateProvider } from "./Context/context.jsx";
import { initialState, reducer } from "./Context/reducer.js";
import { store } from "./ReduxStore/store.js";
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);


/*
<StateProvider initialState={initialState} reducer={reducer}>
<App />
</StateProvider>
*/