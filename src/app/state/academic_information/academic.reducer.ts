import { createReducer, on } from "@ngrx/store";
import { sortArray } from "src/app/common/helpers/helpers";
import { AcademicModel } from "src/app/models/academic.model";
import * as actions from "./academic.actions";

const INITIAL: AcademicModel[] = []

/**actions */
const onAddAcademicInformationList = (state: any, { data }) => {
    return sortArray([...data], 'startDate');
}

const onClearAcademicInformationList = (state: any) => {
    return INITIAL;
}

const onAddAcademicInformation = (state: any, { data }) => {
    const list = [...state];
    list.push(data);
    return sortArray(list, 'startDate');
}

const onRemoveAcademicInformation = (state: any, { index }) => {
    const list = [...state];
    list.splice(index, 1);
    return sortArray(list, 'startDate');;
}


/*reducer*/
const _academicReducer = createReducer(
    INITIAL,
    on(actions.addAcademicInformationList, onAddAcademicInformationList),
    on(actions.addAcademicInformation, onAddAcademicInformation),
    on(actions.removeAcademicInformation, onRemoveAcademicInformation),
    on(actions.clearAcademicInformation, onClearAcademicInformationList),
);


export function academicReducer(state, action) {
    return _academicReducer(state, action)
}
