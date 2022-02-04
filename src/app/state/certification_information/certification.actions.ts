import { createAction, props } from '@ngrx/store'
import { CertificationModel } from 'src/app/models/certification.model';


export const addCertificationInformationList = createAction('[Certification] addList', props<{ data: CertificationModel[] }>());
export const addCertificationInformation = createAction('[Certification] add', props<{ data: CertificationModel }>());
export const removeCertificationInformation = createAction('[Certification] remove', props<{ index: number }>());