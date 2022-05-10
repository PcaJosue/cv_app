import { createReducer, on } from "@ngrx/store";
import { InterestModel } from "src/app/models/interest.model";
import * as actions from "./interest.actions";

const INITIAL: InterestModel[] = []

/**actions */
const onAddInterestInformationList = (state: any, { data }) => {
    return data;
}

const onAddInterestInformation = (state: any, { data }) => {
    const list = [...state];
    list.push(data);
    return list;
}
const onClearInterestInformation = (state: any) => {
    return INITIAL;
}

const onRemoveInterestInformation = (state: any, { index }) => {
    const list = [...state];
    list.splice(index, 1);
    return list;
}


/*reducer*/
const _interestReducer = createReducer(
    INITIAL,
    on(actions.addInterestInformationList, onAddInterestInformationList),
    on(actions.addInterestInformation, onAddInterestInformation),
    on(actions.removeInterestInformation, onRemoveInterestInformation),
    on(actions.clearInterestInformation, onClearInterestInformation),
);


export function interestReducer(state, action) {
    return _interestReducer(state, action)
}
