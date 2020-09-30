import { combineReducers } from "redux";

import { messageToInsert } from "../data-mocks/messages";

import {
    UpdateRateAction,
    UPDATE_RATE,
    SetMessagesAction,
    AddServiceMessageAction,
    DeleteMessageAction,
    SET_MESSAGES,
    ADD_SERVICE_MESSAGE,
    DELETE_MESSAGE,
} from "./actionCreators";

import { message } from "../Types";

export const rateReducer = (state = "0", action: UpdateRateAction): string => {
    switch (action.type) {
        case UPDATE_RATE:
            return action.payload;
        default:
            return state;
    }
};

type MessagesReducerAction = SetMessagesAction | AddServiceMessageAction | DeleteMessageAction;

export const messagesReducer = (
    state: message[] = [],
    action: MessagesReducerAction,
): message[] => {
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

export type StoreType = {
    rate: string;
    messages: message[];
};

export const reducers = combineReducers({ rate: rateReducer, messages: messagesReducer });
