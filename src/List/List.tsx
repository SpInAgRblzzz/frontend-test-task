import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getMessagesList } from "../fakeApi";
import { messagesSelector, setMessagesAction } from "../store";

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
        <ul>
            {messages.map((message) => (
                <li key={message.id}> {message.text}</li>
            ))}
        </ul>
    );
};
