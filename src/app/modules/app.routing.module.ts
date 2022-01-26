import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { CreateCVComponent } from '../components/create-cv/create-cv.component';
import { InitComponent } from '../components/init/init.component';
import { LaboralComponent } from '../components/laboral/laboral.component';
import { PersonalComponent } from '../components/personal/personal.component';

const routes: Routes = [
    { path: '', component: InitComponent },
    {
        path: 'create', component: CreateCVComponent,
        children: [
            { path: 'personal', component: PersonalComponent },
            { path: 'laboral', component: LaboralComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }