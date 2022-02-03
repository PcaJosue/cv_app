import { createReducer, on } from "@ngrx/store";
import { LanguageModel } from "src/app/models/language.model";
import * as actions from "./language.actions";


/**actions */
const onAddLanguageInformationList = (state: any, { data }) => {
    return data;
}

const onAddLanguageInformation = (state: any, { data }) => {
    const list = [...state];
    list.push(data);
    return list;
}

const onRemoveLanguageInformation = (state: any, { index }) => {
    const list = [...state];
    list.splice(index, 1);
    return list;
}

const INITIAL: LanguageModel[] = []

/*reducer*/
const _languageReducer = createReducer(
    INITIAL,
    on(actions.addLanguageInformationList, onAddLanguageInformationList),
    on(actions.addLanguageInformation, onAddLanguageInformation),
    on(actions.removeLanguageInformation, onRemoveLanguageInformation),
);


export function languageReducer(state, action) {
    return _languageReducer(state, action)
}
