import { createReducer, on } from "@ngrx/store";
import { CertificationModel } from "src/app/models/certification.model";
import * as actions from "./certification.actions";


/**actions */
const onAddCertificationInformationList = (state: any, { data }) => {
    return data;
}

const onAddCertificationInformation = (state: any, { data }) => {
    const list = [...state];
    list.push(data);
    return list;
}

const onRemoveCertificationInformation = (state: any, { index }) => {
    const list = [...state];
    list.splice(index, 1);
    return list;
}

const INITIAL: CertificationModel[] = []

/*reducer*/
const _certificationReducer = createReducer(
    INITIAL,
    on(actions.addCertificationInformationList, onAddCertificationInformationList),
    on(actions.addCertificationInformation, onAddCertificationInformation),
    on(actions.removeCertificationInformation, onRemoveCertificationInformation),
);


export function certificationReducer(state, action) {
    return _certificationReducer(state, action)
}
