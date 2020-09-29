import React from "react";

import { message } from "../store";

type ListItemProps = {
    message: message;
};

export const ListItem = ({ message }: ListItemProps) => <div>{message.text}</div>;
