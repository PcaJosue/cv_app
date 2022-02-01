import { createAction, props } from '@ngrx/store'
import { LaboralModel } from 'src/app/models/laboral.model';



export const addLaboralInformationList = createAction('[Laboral] addList', props<{ data: LaboralModel[] }>());
export const addLaboralInformation = createAction('[Laboral] add', props<{ data: LaboralModel }>());
export const removeLaboralInformation = createAction('[Laboral] remove', props<{ index: number }>());