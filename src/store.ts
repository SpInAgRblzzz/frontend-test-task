import { createStore, combineReducers } from "redux";

const UPDATE_RATE = "UPDATE_RATE";
const SET_MESSAGES = "SET_MESSAGES";

type UpdateRateAction = {
    type: typeof UPDATE_RATE;
    payload: string;
};

type SetMessagesAction = {
    type: typeof SET_MESSAGES;
    payload: message[];
};

export type message = {
    id: number;
    text: string;
    canDelete: boolean;
    btcAmount?: number;
    messageType: string;
    messageContent: string | { source: string; amount: number }[];
};

export const updateRateAction = (rate: string): UpdateRateAction => ({
    type: UPDATE_RATE,
    payload: rate,
});

export const setMessagesAction = (messages: message[]): SetMessagesAction => ({
    type: SET_MESSAGES,
    payload: messages,
});

const rateReducer = (state = "0", action: UpdateRateAction) => {
    switch (action.type) {
        case UPDATE_RATE:
            return action.payload;
        default:
            return state;
    }
};

const messagesReducer = (state = [], action: SetMessagesAction) => {
    switch (action.type) {
        case SET_MESSAGES:
            return action.payload;
        default:
            return state;
    }
};

const reducers = combineReducers({ rate: rateReducer, messages: messagesReducer });

type storeType = {
    rate: string;
    messages: [];
};
export const store = createStore(reducers, {});

export const messagesSelector = (store: storeType): message[] => store.messages;
