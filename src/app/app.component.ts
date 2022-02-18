import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addAcademicInformationList } from './state/academic_information/academic.actions';
import { addAchievementInformationList } from './state/achievement_information/achievement.actions';
import { addCertificationInformationList } from './state/certification_information/certification.actions';
import { addInterestInformationList } from './state/interest_information/interest.actions';
import { addLaboralInformationList } from './state/laboral_information/laboral.actions';
import { addLanguageInformationList } from './state/language_information/language.actions';
import { changeLanguage } from './state/manage_language/manage_language.actions';
import { addObjectiveInformation } from './state/objective_information/objective.actions';
import { addPersonalInformation } from './state/personal_information/personal.actions';
import { addSkillInformationList } from './state/skill_information/skill.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public code: string = 'en';
  constructor(private store: Store) {
    this.store.subscribe(state => {
      console.log('state', state)
    })

    if (localStorage.getItem('data')) {
      const data = JSON.parse(localStorage.getItem('data'))
      this.store.dispatch(changeLanguage({ code: data.languageCode }));
      this.store.dispatch(addPersonalInformation({ data: data.personal }))
      this.store.dispatch(addLaboralInformationList({ data: data.laboral }))
      this.store.dispatch(addAcademicInformationList({ data: data.academic }))
      this.store.dispatch(addLanguageInformationList({ data: data.language }))
      this.store.dispatch(addSkillInformationList({ data: data.skill }))
      this.store.dispatch(addAchievementInformationList({ data: data.achievement }))
      this.store.dispatch(addCertificationInformationList({ data: data.certification }))
      this.store.dispatch(addInterestInformationList({ data: data.interest }))
      this.store.dispatch(addObjectiveInformation({ data: data.objective }))

    }
  }

  modifyLanguage(code) {
    this.code = code.value;
    this.store.dispatch(changeLanguage({ code: code.value }))
  }
}
