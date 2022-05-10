import { createAction, props } from '@ngrx/store'
import { ObjectiveModel } from 'src/app/models/objective.model';

export const addObjectiveInformation = createAction('[Objective] add', props<{ data: ObjectiveModel }>());
export const clearObjectiveInformation = createAction('[Objective] clear');