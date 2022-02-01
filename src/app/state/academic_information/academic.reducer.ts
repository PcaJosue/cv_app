import { createReducer, on } from "@ngrx/store";
import { AcademicModel } from "src/app/models/academic.model";
import * as actions from "./academic.actions";


/**actions */
const onAddAcademicInformationList = (state: any, { data }) => {
    return data;
}

const onAddAcademicInformation = (state: any, { data }) => {
    const list = [...state];
    list.push(data);
    return list;
}

const onRemoveAcademicInformation = (state: any, { index }) => {
    const list = [...state];
    list.splice(index, 1);
    return list;
}

const INITIAL: AcademicModel[] = []

/*reducer*/
const _academicReducer = createReducer(
    INITIAL,
    on(actions.addAcademicInformationList, onAddAcademicInformationList),
    on(actions.addAcademicInformation, onAddAcademicInformation),
    on(actions.removeAcademicInformation, onRemoveAcademicInformation),
);


export function academicReducer(state, action) {
    return _academicReducer(state, action)
}
