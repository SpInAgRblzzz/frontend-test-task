import React from "react";
import { CircularProgress } from "@material-ui/core";

import { useRate } from "./useRate";
import { List } from "./List/List";

export const App = () => {
    const isReadyToRender = useRate();

    return isReadyToRender ? <List /> : <CircularProgress />;
};
