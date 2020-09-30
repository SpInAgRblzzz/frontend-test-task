import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Big from "big.js";

import { getMessagesList } from "../fakeApi";
import { messagesSelector, rateSelector, setMessagesAction } from "../store";

import { ListItem } from "./ListItem";

export const List = () => {
    const dispatch = useDispatch();

    const messages = useSelector(messagesSelector);
    const rate = useSelector(rateSelector);

    useEffect(() => {
        const messagesSubscribe = getMessagesList().subscribe((value) => {
            dispatch(setMessagesAction(value));
        });
        return () => {
            messagesSubscribe.unsubscribe();
        };
    }, [dispatch]);
    return (
        <div>
            {messages.map(({ id, btcAmount, text }) => (
                <ListItem
                    key={id}
                    usdAmount={btcAmount ? Big(btcAmount).times(rate).toString() : null}
                    text={text}
                />
            ))}
        </div>
    );
};
