import { createAction, props } from '@ngrx/store'
import { LaboralModel } from 'src/app/models/laboral.model';



export const addLaboralInformation = createAction('[Laboral] add', props<{ data: LaboralModel[] }>());