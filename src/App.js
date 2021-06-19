import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./styles/styles.scss";

import { firebase } from "./firebase/firebase";

//internal imports
import AppRouter, { history } from "./routers/AppRouter";
import store from "./store/configureStore";
import { login, logout } from "./actions/auth";

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const loadingJsx = <div className="loader" />;

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("root"));
    hasRendered = true;
  }
};

ReactDOM.render(loadingJsx, document.getElementById("root"));

firebase.auth().onAuthStateChanged((user) => {
  console.log("user details", user);
  if (user) {
    store.dispatch(login(user));
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/home");
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
