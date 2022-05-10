import { createReducer, on } from "@ngrx/store";
import { sortArray } from "src/app/common/helpers/helpers";
import { CertificationModel } from "src/app/models/certification.model";
import * as actions from "./certification.actions";

const INITIAL: CertificationModel[] = []

/**actions */
const onAddCertificationInformationList = (state: any, { data }) => {
    return sortArray([...data], 'date');
}

const onAddCertificationInformation = (state: any, { data }) => {
    const list = [...state];
    list.push(data);
    return sortArray(list, 'date');
}
const onClearCertificationInformation = (state: any) => {
    return INITIAL;
}

const onRemoveCertificationInformation = (state: any, { index }) => {
    const list = [...state];
    list.splice(index, 1);
    return sortArray(list, 'date');
}


/*reducer*/
const _certificationReducer = createReducer(
    INITIAL,
    on(actions.addCertificationInformationList, onAddCertificationInformationList),
    on(actions.addCertificationInformation, onAddCertificationInformation),
    on(actions.removeCertificationInformation, onRemoveCertificationInformation),
    on(actions.clearCertificationInformation, onClearCertificationInformation),
);


export function certificationReducer(state, action) {
    return _certificationReducer(state, action)
}
