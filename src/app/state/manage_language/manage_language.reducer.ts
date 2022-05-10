import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { LANGUAGE_EN } from "../../common/languages/language.en";
import { LANGUAGE_ES } from "../../common/languages/language.es";
import * as actions from './manage_language.actions'
/**initial state */

const INITIAL_STATE = {
    language: 'en',
    labels: LANGUAGE_EN
}

/**actions */
const onChangeLanguage = (state: any, { code }) => {
    return {
        language: code,
        labels: code === 'en' ? LANGUAGE_EN : LANGUAGE_ES
    }
}


/*reducer*/
const _manageLanguageReducer = createReducer(
    INITIAL_STATE,
    on(actions.changeLanguage, onChangeLanguage)
);



export function manageLanguageReducer(state, action) {
    return _manageLanguageReducer(state, action)
}