import React from "react";

import { useDispatch } from "react-redux";

import { useRate } from "./useRate";
import { List } from "./List/List";

export const App = () => {
    const dispatch = useDispatch();
    const isReadyToRender = useRate(dispatch);

    return isReadyToRender ? <List /> : <p>We loading rate for u. Wait a bit</p>;
};
