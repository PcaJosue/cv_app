import { createAction, props } from '@ngrx/store'



export const addPersonalInformation = createAction('[Personal] add', props<{ data: any }>());