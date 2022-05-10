import { createReducer, on } from "@ngrx/store";
import { ObjectiveModel } from "src/app/models/objective.model";
import * as actions from "./objective.actions";


const INITIAL: ObjectiveModel = null;
/**actions */

const onAddObjectiveInformation = (state: any, { data }) => {
    return data;
}
const onClearObjectiveInformation = (state: any) => {
    return INITIAL;
}


/*reducer*/
const _objectiveReducer = createReducer(
    INITIAL,
    on(actions.addObjectiveInformation, onAddObjectiveInformation),
    on(actions.clearObjectiveInformation, onClearObjectiveInformation),
);


export function objectiveReducer(state, action) {
    return _objectiveReducer(state, action)
}
