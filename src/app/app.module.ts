import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state/reducers'
import { AppRoutingModule } from './modules/app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './modules/material.module'
import { CreateCVComponent } from './components/create-cv/create-cv.component';
import { InitComponent } from './components/init/init.component';
import { PersonalComponent } from './components/personal/personal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { LaboralComponent } from './components/laboral/laboral.component';
import { AcademicComponent } from './components/academic/academic.component';
import { LanguageComponent } from './components/language/language.component';
import { SkillComponent } from './components/skill/skill.component';
import { AchievementComponent } from './components/achievement/achievement.component';
import { CertificationComponent } from './components/certification/certification.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateCVComponent,
    InitComponent,
    PersonalComponent,
    LaboralComponent,
    AcademicComponent,
    LanguageComponent,
    SkillComponent,
    AchievementComponent,
    CertificationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
