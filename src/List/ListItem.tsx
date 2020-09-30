import React from "react";
import { useSelector } from "react-redux";
import Big from "big.js";

import { rateSelector } from "../store";

type ListItemProps = {
    btcAmount?: number;
    text: string;
    messageType: string;
    messageContent: string | { source: string; amount: number }[];
    canDelete: boolean;
};
export const ListItem = ({
    btcAmount,
    text,
    messageType,
    messageContent,
    canDelete,
}: ListItemProps) => {
    const rate = useSelector(rateSelector);

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
            <button>Show secvice message</button>
        </div>
    );
};
