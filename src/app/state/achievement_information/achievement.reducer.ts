import { createReducer, on } from "@ngrx/store";
import { sortArray } from "src/app/common/helpers/helpers";
import { AchievementModel } from "src/app/models/achievement.model";
import * as actions from "./achievement.actions";


/**actions */
const onAddAchievementInformationList = (state: any, { data }) => {
    return sortArray([...data], 'date');
}

const onAddAchievementInformation = (state: any, { data }) => {
    const list = [...state];
    list.push(data);
    return sortArray(list, 'date');
}

const onRemoveAchievementInformation = (state: any, { index }) => {
    const list = [...state];
    list.splice(index, 1);
    return sortArray(list, 'date');;
}

const INITIAL: AchievementModel[] = []

/*reducer*/
const _achievementReducer = createReducer(
    INITIAL,
    on(actions.addAchievementInformationList, onAddAchievementInformationList),
    on(actions.addAchievementInformation, onAddAchievementInformation),
    on(actions.removeAchievementInformation, onRemoveAchievementInformation),
);


export function achievementReducer(state, action) {
    return _achievementReducer(state, action)
}
