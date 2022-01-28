import { createReducer, on } from "@ngrx/store";
import { LaboralModel } from "src/app/models/laboral.model";
import * as actions from "./laboral.actions";


/**actions */
const onAddLaboralInformation = (state: any, { data }) => {
    return data;
}

const INITIAL: LaboralModel[] = []

/*reducer*/
const _laboralReducer = createReducer(
    INITIAL,
    on(actions.addLaboralInformation, onAddLaboralInformation),
);


export function laboralReducer(state, action) {
    return _laboralReducer(state, action)
}
