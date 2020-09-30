import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getMessagesList } from "../fakeApi";
import { setMessagesAction } from "../redux/actionCreators";
import { messagesSelector } from "../redux/selectors";

import { ListItem } from "./ListItem";

import "./ListStyles.scss";

export const List = () => {
    const dispatch = useDispatch();

    const messages = useSelector(messagesSelector);

    useEffect(() => {
        const messagesSubscribe = getMessagesList().subscribe((value) => {
            dispatch(setMessagesAction(value));
        });
        return () => {
            messagesSubscribe.unsubscribe();
        };
    }, [dispatch]);
    return (
        <div className="messages-container">
            {messages.map((message) => (
                <ListItem key={message.id} message={message} />
            ))}
        </div>
    );
};
