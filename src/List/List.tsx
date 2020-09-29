import React from "react";
import { useSelector } from "react-redux";

export const List = () => {
    const rate = useSelector((state: { rate: string }) => state);

    return <div>{rate} TODO: implement ME</div>;
};
