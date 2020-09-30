import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Big from "big.js";

import { addServiceMessageAction, deleteMessageAction, rateSelector } from "../store";

type ListItemProps = {
    btcAmount?: number;
    text: string;
    messageType: string;
    messageContent: string | { source: string; amount: number }[];
    canDelete: boolean;
    isService?: boolean;
    id: number | string;
    serviceAdded?: boolean;
};
export const ListItem = ({
    btcAmount,
    text,
    messageType,
    messageContent,
    canDelete,
    isService,
    id,
    serviceAdded,
}: ListItemProps) => {
    const dispatch = useDispatch();

    const rate = useSelector(rateSelector);

    const handleAddServiceMessage = useCallback(() => {
        dispatch(addServiceMessageAction(id));
    }, [dispatch, id]);

    const handleDelete = useCallback(() => {
        dispatch(deleteMessageAction(id));
    }, [dispatch, id]);

    return (
        <div className={`message ${messageType}`}>
            <div className="message-header">
                <h3>{text}</h3>
                {canDelete && <button onClick={handleDelete}>DELETE</button>}
            </div>

            <div className="message-content">
                {btcAmount && (
                    <p className="usd-rate">{Big(btcAmount).times(rate).toString()} USD</p>
                )}
                {Array.isArray(messageContent) ? (
                    <ul>
                        {messageContent.map(({ source, amount }, index) => (
                            <li key={index} className="source-item">
                                {source} {<p>{Big(amount).times(rate).toString()} USD</p>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    messageContent
                )}
            </div>
            {!isService && (
                <button disabled={serviceAdded} onClick={handleAddServiceMessage}>
                    Show secvice message
                </button>
            )}
        </div>
    );
};
