import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AcademicComponent } from '../components/academic/academic.component';
import { AchievementComponent } from '../components/achievement/achievement.component';
import { CertificationComponent } from '../components/certification/certification.component';
import { CreateCVComponent } from '../components/create-cv/create-cv.component';
import { InitComponent } from '../components/init/init.component';
import { InterestComponent } from '../components/interest/interest.component';
import { LaboralComponent } from '../components/laboral/laboral.component';
import { LanguageComponent } from '../components/language/language.component';
import { PersonalComponent } from '../components/personal/personal.component';
import { SkillComponent } from '../components/skill/skill.component';

const routes: Routes = [
    { path: '', component: InitComponent },
    {
        path: 'create', component: CreateCVComponent,
        children: [
            { path: 'personal', component: PersonalComponent },
            { path: 'laboral', component: LaboralComponent },
            { path: 'academic', component: AcademicComponent },
            { path: 'language', component: LanguageComponent },
            { path: 'skill', component: SkillComponent },
            { path: 'achievement', component: AchievementComponent },
            { path: 'certification', component: CertificationComponent },
            { path: 'interest', component: InterestComponent },
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }