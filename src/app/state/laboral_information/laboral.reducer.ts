import { createReducer, on } from "@ngrx/store";
import { LaboralModel } from "src/app/models/laboral.model";
import * as actions from "./laboral.actions";


/**actions */
const onAddLaboralInformationList = (state: any, { data }) => {
    return data;
}

const onAddLaboralInformation = (state: any, { data }) => {
    const list = [...state];
    list.push(data);
    return list;
}

const onRemoveLaboralInformation = (state: any, { index }) => {
    const list = [...state];
    list.splice(index, 1);
    return list;
}

const INITIAL: LaboralModel[] = []

/*reducer*/
const _laboralReducer = createReducer(
    INITIAL,
    on(actions.addLaboralInformationList, onAddLaboralInformationList),
    on(actions.addLaboralInformation, onAddLaboralInformation),
    on(actions.removeLaboralInformation, onRemoveLaboralInformation),
);


export function laboralReducer(state, action) {
    return _laboralReducer(state, action)
}
