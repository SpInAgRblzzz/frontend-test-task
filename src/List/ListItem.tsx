import React from "react";

type ListItemProps = {
    usdAmount: string | null;
    text: string;
};
export const ListItem = ({ usdAmount, text }: ListItemProps) => (
    <div>
        {text} {usdAmount && <p>{usdAmount} USD</p>}
    </div>
);
