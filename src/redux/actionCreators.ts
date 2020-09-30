import { message } from "../Types";

export const UPDATE_RATE = "UPDATE_RATE";

export type UpdateRateAction = {
    type: typeof UPDATE_RATE;
    payload: string;
};

export const updateRateAction = (rate: string): UpdateRateAction => ({
    type: UPDATE_RATE,
    payload: rate,
});

export const SET_MESSAGES = "SET_MESSAGES";

export type SetMessagesAction = {
    type: typeof SET_MESSAGES;
    payload: message[];
};

export const setMessagesAction = (messages: message[]): SetMessagesAction => ({
    type: SET_MESSAGES,
    payload: messages,
});

export const ADD_SERVICE_MESSAGE = "ADD_SERVICE_MESSAGE";

export type AddServiceMessageAction = {
    type: typeof ADD_SERVICE_MESSAGE;
    payload: number | string;
};

export const addServiceMessageAction = (id: number | string): AddServiceMessageAction => ({
    type: ADD_SERVICE_MESSAGE,
    payload: id,
});

export const DELETE_MESSAGE = "DELETE_MESSAGE";

export type DeleteMessageAction = {
    type: typeof DELETE_MESSAGE;
    payload: number | string;
};

export const deleteMessageAction = (id: number | string): DeleteMessageAction => ({
    type: DELETE_MESSAGE,
    payload: id,
});
