import { createStore, combineReducers } from "redux";

import { messageToInsert } from "./data-mocks/messages";

export type message = {
    id: number | string;
    text: string;
    canDelete: boolean;
    btcAmount?: number;
    messageType: string;
    messageContent: string | { source: string; amount: number }[];
    isService?: boolean;
    serviceAdded?: boolean;
};

const UPDATE_RATE = "UPDATE_RATE";

type UpdateRateAction = {
    type: typeof UPDATE_RATE;
    payload: string;
};

export const updateRateAction = (rate: string): UpdateRateAction => ({
    type: UPDATE_RATE,
    payload: rate,
});

const SET_MESSAGES = "SET_MESSAGES";

type SetMessagesAction = {
    type: typeof SET_MESSAGES;
    payload: message[];
};

export const setMessagesAction = (messages: message[]): SetMessagesAction => ({
    type: SET_MESSAGES,
    payload: messages,
});

const ADD_SERVICE_MESSAGE = "ADD_SERVICE_MESSAGE";

type AddServiceMessageAction = {
    type: typeof ADD_SERVICE_MESSAGE;
    payload: number | string;
};

export const addServiceMessageAction = (id: number | string): AddServiceMessageAction => ({
    type: ADD_SERVICE_MESSAGE,
    payload: id,
});

const DELETE_MESSAGE = "DELETE_MESSAGE";

type DeleteMessageAction = {
    type: typeof DELETE_MESSAGE;
    payload: number | string;
};

export const deleteMessageAction = (id: number | string): DeleteMessageAction => ({
    type: DELETE_MESSAGE,
    payload: id,
});

const rateReducer = (state = "0", action: UpdateRateAction): string => {
    switch (action.type) {
        case UPDATE_RATE:
            return action.payload;
        default:
            return state;
    }
};

type MessagesReducerAction = SetMessagesAction | AddServiceMessageAction | DeleteMessageAction;

const messagesReducer = (state: message[] = [], action: MessagesReducerAction): message[] => {
    switch (action.type) {
        case SET_MESSAGES:
            return action.payload;
        case ADD_SERVICE_MESSAGE:
            return state.reduce(
                (newState: message[], message) =>
                    message.id === action.payload
                        ? [
                              ...newState,
                              { ...message, serviceAdded: true },
                              {
                                  ...messageToInsert,
                                  id: `serviceFor${action.payload}`,
                                  isService: true,
                              },
                          ]
                        : [...newState, message],
                [],
            );
        case DELETE_MESSAGE:
            return state.reduce((newState: message[], message) => {
                if (action.payload === message.id) {
                    return newState;
                } else if (
                    typeof action.payload === "string" &&
                    message.id === +action.payload.replace("serviceFor", "")
                ) {
                    return [...newState, { ...message, serviceAdded: false }];
                } else if (
                    typeof action.payload === "number" &&
                    message.id === `serviceFor${action.payload}`
                ) {
                    return newState;
                } else {
                    return [...newState, message];
                }
            }, []);
        default:
            return state;
    }
};

const reducers = combineReducers({ rate: rateReducer, messages: messagesReducer });

type storeType = {
    rate: string;
    messages: message[];
};
export const store = createStore(reducers, {});

export const messagesSelector = (store: storeType): message[] => store.messages;
export const rateSelector = (store: storeType): string => store.rate;
