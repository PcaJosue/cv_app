import { createAction, props } from '@ngrx/store'
import { LanguageModel } from 'src/app/models/language.model';



export const addLanguageInformationList = createAction('[Language] addList', props<{ data: LanguageModel[] }>());
export const addLanguageInformation = createAction('[Language] add', props<{ data: LanguageModel }>());
export const removeLanguageInformation = createAction('[Language] remove', props<{ index: number }>());
export const clearLanguageInformation = createAction('[Language] clear');