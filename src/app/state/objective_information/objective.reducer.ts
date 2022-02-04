import { createReducer, on } from "@ngrx/store";
import { ObjectiveModel } from "src/app/models/objective.model";
import * as actions from "./objective.actions";


/**actions */

const onAddObjectiveInformation = (state: any, { data }) => {
    return data;
}

const INITIAL: ObjectiveModel = null;

/*reducer*/
const _objectiveReducer = createReducer(
    INITIAL,
    on(actions.addObjectiveInformation, onAddObjectiveInformation),
);


export function objectiveReducer(state, action) {
    return _objectiveReducer(state, action)
}
