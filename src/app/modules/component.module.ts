import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { CreateCVComponent } from '../components/create-cv/create-cv.component';
import { InitComponent } from '../components/init/init.component'
import { PersonalComponent } from '../components/personal/personal.component'


import { AppRoutingModule } from './app.routing.module';

@NgModule({
    declarations: [
        CreateCVComponent,
        InitComponent,
        PersonalComponent
    ],
    imports: [
        AppRoutingModule,
        MaterialModule,
    ],
    providers: [],
})
export class ComponentModule { }