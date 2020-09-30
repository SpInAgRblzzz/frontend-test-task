import React from "react";
import { CircularProgress } from "@material-ui/core";

import { useRate } from "./useRate";
import { List } from "./List/List";

export const App = () => {
    const isReadyToRender = useRate();

    return isReadyToRender ? (
        <List />
    ) : (
        <CircularProgress
            style={{ position: "absolute", top: "50%", left: "50%", margin: "-22px 0 0 -22px" }}
        />
    );
};
