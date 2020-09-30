import { createSelector } from "reselect";

import { message } from "../Types";
import { StoreType } from "./reducers";

export const messagesSelector = createSelector(
    (store: StoreType): message[] => store.messages,
    (messages) => messages,
);
export const rateSelector = createSelector(
    (store: StoreType): string => store.rate,
    (rate) => rate,
);
