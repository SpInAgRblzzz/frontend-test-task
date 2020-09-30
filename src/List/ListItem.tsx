import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Big from "big.js";

import { addServiceMessageAction, rateSelector } from "../store";

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

    return (
        <div className={messageType}>
            <div>
                <h3>{text}</h3>
                {canDelete && <button>DELETE</button>}
            </div>

            <div>
                {btcAmount && <p>{Big(btcAmount).times(rate).toString()} USD</p>}
                {Array.isArray(messageContent) ? (
                    <ul>
                        {messageContent.map(({ source, amount }, index) => (
                            <li key={index}>
                                {source} {<p>{Big(amount).times(rate).toString()} USD</p>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    messageContent
                )}
            </div>
            {!isService && !serviceAdded && (
                <button onClick={handleAddServiceMessage}>Show secvice message</button>
            )}
        </div>
    );
};
