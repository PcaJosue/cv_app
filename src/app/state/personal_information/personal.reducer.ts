import { createReducer, on } from "@ngrx/store";
import * as actions from "./personal.actions";

/**actions */
const onAddPersonalInformation = (state: any, { data }) => {
    console.log('state', state);
    return data;
}

const INITIAL: any = {}

/*reducer*/
const _personalReducer = createReducer(
    INITIAL,
    on(actions.addPersonalInformation, onAddPersonalInformation),
);


export function personalReducer(state, action) {
    return _personalReducer(state, action)
}
