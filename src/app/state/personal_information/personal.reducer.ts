import { createReducer, on } from "@ngrx/store";
import { addPersonalInformation } from "./personal.actions";

/**actions */
const onAddPersonalInformation = (state) => {
    console.log('reducer');
}


/*reducer*/
const _personalReducer = createReducer(null,
    on(addPersonalInformation, onAddPersonalInformation),
);


export function personalReducer(state, action) {
    return _personalReducer(state, action)
}
