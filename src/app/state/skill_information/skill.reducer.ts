import { createReducer, on } from "@ngrx/store";
import { SkillModel } from "src/app/models/skill.model";
import * as actions from "./skill.actions";

const INITIAL: SkillModel[] = []

/**actions */
const onAddSkillInformationList = (state: any, { data }) => {
    return data;
}

const onAddSkillInformation = (state: any, { data }) => {
    const list = [...state];
    list.push(data);
    return list;
}
const onClearSkillInformation = (state: any) => {
    return INITIAL;
}

const onRemoveSkillInformation = (state: any, { index }) => {
    const list = [...state];
    list.splice(index, 1);
    return list;
}


/*reducer*/
const _skillReducer = createReducer(
    INITIAL,
    on(actions.addSkillInformationList, onAddSkillInformationList),
    on(actions.addSkillInformation, onAddSkillInformation),
    on(actions.removeSkillInformation, onRemoveSkillInformation),
    on(actions.clearSkillInformation, onClearSkillInformation),
);


export function skillReducer(state, action) {
    return _skillReducer(state, action)
}
