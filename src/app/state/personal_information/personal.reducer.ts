import { createReducer, on } from "@ngrx/store";
import * as actions from "./personal.actions";

const INITIAL: any = {}

/**actions */
const onAddPersonalInformation = (state: any, { data }) => {
    return data;
}

const onClearPersonalInformation = (state: any) => {
    return INITIAL;
}


/*reducer*/
const _personalReducer = createReducer(
    INITIAL,
    on(actions.addPersonalInformation, onAddPersonalInformation),
    on(actions.clearPersonalInformation, onClearPersonalInformation),
);


export function personalReducer(state, action) {
    return _personalReducer(state, action)
}
