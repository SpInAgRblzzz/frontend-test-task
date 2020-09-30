import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getMessagesList } from "../fakeApi";
import { messagesSelector, setMessagesAction } from "../store";

import { ListItem } from "./ListItem";

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
        <div>
            {messages.map(
                ({
                    id,
                    btcAmount,
                    text,
                    messageType,
                    messageContent,
                    canDelete,
                    isService,
                    serviceAdded,
                }) => (
                    <ListItem
                        key={id}
                        btcAmount={btcAmount}
                        text={text}
                        messageType={messageType}
                        messageContent={messageContent}
                        canDelete={canDelete}
                        isService={isService}
                        id={id}
                        serviceAdded={serviceAdded}
                    />
                ),
            )}
        </div>
    );
};
