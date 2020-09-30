import { StoreType, message } from "../Types";

export const messagesSelector = (store: StoreType): message[] => store.messages;
export const rateSelector = (store: StoreType): string => store.rate;
