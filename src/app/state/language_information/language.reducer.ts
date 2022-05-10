import { createReducer, on } from "@ngrx/store";
import { LanguageModel } from "src/app/models/language.model";
import * as actions from "./language.actions";

const INITIAL: LanguageModel[] = []

/**actions */
const onAddLanguageInformationList = (state: any, { data }) => {
    return data;
}

const onClearLanguageInformation = (state: any) => {
    return INITIAL;
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


/*reducer*/
const _languageReducer = createReducer(
    INITIAL,
    on(actions.addLanguageInformationList, onAddLanguageInformationList),
    on(actions.addLanguageInformation, onAddLanguageInformation),
    on(actions.removeLanguageInformation, onRemoveLanguageInformation),
    on(actions.clearLanguageInformation, onClearLanguageInformation),
);


export function languageReducer(state, action) {
    return _languageReducer(state, action)
}
