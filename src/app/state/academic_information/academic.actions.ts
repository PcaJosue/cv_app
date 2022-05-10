import { createAction, props } from '@ngrx/store'
import { AcademicModel } from 'src/app/models/academic.model';



export const addAcademicInformationList = createAction('[Academic] addList', props<{ data: AcademicModel[] }>());
export const addAcademicInformation = createAction('[Academic] add', props<{ data: AcademicModel }>());
export const removeAcademicInformation = createAction('[Academic] remove', props<{ index: number }>());
export const clearAcademicInformation = createAction('[Academic] clear');