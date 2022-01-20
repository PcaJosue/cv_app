import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { CreateCVComponent } from '../components/create-cv/create-cv.component';
import { InitComponent } from '../components/init/init.component';
import { PersonalComponent } from '../components/personal/personal.component';

const routes: Routes = [
    { path: '', component: InitComponent },
    {
        path: 'create', component: CreateCVComponent,
        children: [
            { path: 'personal', component: PersonalComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }