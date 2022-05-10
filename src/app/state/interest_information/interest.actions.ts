import { createAction, props } from '@ngrx/store'
import { InterestModel } from 'src/app/models/interest.model';

export const addInterestInformationList = createAction('[Interest] addList', props<{ data: InterestModel[] }>());
export const addInterestInformation = createAction('[Interest] add', props<{ data: InterestModel }>());
export const removeInterestInformation = createAction('[Interest] remove', props<{ index: number }>());
export const clearInterestInformation = createAction('[Interest] clear');