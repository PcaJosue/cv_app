import { createAction, props } from '@ngrx/store'
import { AchievementModel } from 'src/app/models/achievement.model';



export const addAchievementInformationList = createAction('[Achievement] addList', props<{ data: AchievementModel[] }>());
export const addAchievementInformation = createAction('[Achievement] add', props<{ data: AchievementModel }>());
export const removeAchievementInformation = createAction('[Achievement] remove', props<{ index: number }>());