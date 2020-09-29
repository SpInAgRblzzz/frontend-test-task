import { createStore, combineReducers } from "redux";

const UPDATE_RATE = "UPDATE_RATE";

type UpdateRateAction = {
    type: typeof UPDATE_RATE;
    payload: string;
};

export const updateRateAction = (rate: string): UpdateRateAction => ({
    type: UPDATE_RATE,
    payload: rate,
});

const rateReducer = (state = "0", action: UpdateRateAction) => {
    switch (action.type) {
        case UPDATE_RATE:
            return action.payload;
        default:
            return state;
    }
};

const reducers = combineReducers({ rate: rateReducer });

export const store = createStore(reducers, {});
