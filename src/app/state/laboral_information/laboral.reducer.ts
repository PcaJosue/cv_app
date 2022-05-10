import { createReducer, on } from "@ngrx/store";
import { sortArray } from "src/app/common/helpers/helpers";
import { LaboralModel } from "src/app/models/laboral.model";
import * as actions from "./laboral.actions";


const INITIAL: LaboralModel[] = []

/**actions */
const onAddLaboralInformationList = (state: any, { data }) => {
    return sortArray([...data], 'startDate');;
}

const onClearLaboralInformationList = (state: any) => {
    return INITIAL;
}

const onAddLaboralInformation = (state: any, { data }) => {
    const list = [...state];
    list.push(data);
    return sortArray(list, 'startDate');
}

const onRemoveLaboralInformation = (state: any, { index }) => {
    const list = [...state];
    list.splice(index, 1);
    return sortArray(list, 'startDate');;
}


/*reducer*/
const _laboralReducer = createReducer(
    INITIAL,
    on(actions.addLaboralInformationList, onAddLaboralInformationList),
    on(actions.addLaboralInformation, onAddLaboralInformation),
    on(actions.removeLaboralInformation, onRemoveLaboralInformation),
    on(actions.clearLaboralInformation, onClearLaboralInformationList),
);


export function laboralReducer(state, action) {
    return _laboralReducer(state, action)
}
