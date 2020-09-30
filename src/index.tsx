import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { App } from "./App";
import { store } from "./redux/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);
