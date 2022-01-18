import { createAction, props } from '@ngrx/store'



export const changeLanguage = createAction('[Language] change', props<{ code: string }>())