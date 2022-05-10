import { createAction, props } from '@ngrx/store'
import { SkillModel } from 'src/app/models/skill.model';



export const addSkillInformationList = createAction('[Skill] addList', props<{ data: SkillModel[] }>());
export const addSkillInformation = createAction('[Skill] add', props<{ data: SkillModel }>());
export const removeSkillInformation = createAction('[Academic] remove', props<{ index: number }>());
export const clearSkillInformation = createAction('[Academic] clear');