import { clearInterestInformation } from './../../state/interest_information/interest.actions';
import { clearCertificationInformation } from './../../state/certification_information/certification.actions';
import { clearAchievementInformation } from './../../state/achievement_information/achievement.actions';
import { clearSkillInformation } from './../../state/skill_information/skill.actions';
import { clearLanguageInformation } from './../../state/language_information/language.actions';
import { clearLaboralInformation } from './../../state/laboral_information/laboral.actions';
import { clearPersonalInformation } from './../../state/personal_information/personal.actions';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addAcademicInformationList, clearAcademicInformation } from 'src/app/state/academic_information/academic.actions';
import { addAchievementInformationList } from 'src/app/state/achievement_information/achievement.actions';
import { addCertificationInformationList } from 'src/app/state/certification_information/certification.actions';
import { addInterestInformationList } from 'src/app/state/interest_information/interest.actions';
import { addLaboralInformationList } from 'src/app/state/laboral_information/laboral.actions';
import { addLanguageInformationList } from 'src/app/state/language_information/language.actions';
import { changeLanguage } from 'src/app/state/manage_language/manage_language.actions';
import { addObjectiveInformation, clearObjectiveInformation } from 'src/app/state/objective_information/objective.actions';
import { addPersonalInformation } from 'src/app/state/personal_information/personal.actions';
import { addSkillInformationList } from 'src/app/state/skill_information/skill.actions';
import * as selectors from '../../state/manage_language/manage_language.selects'

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {


  public labels$ = this.store.select(selectors.selectMain);

  constructor(
    public router: Router,
    private store: Store) { }

  ngOnInit(): void {
  }

  onUploadFileChanged(event) {
    if (event.target.files && event.target.files[0]) {

      const fr = new FileReader();
      fr.onloadend = () => {
        localStorage.setItem('data', fr.result.toString())
        const data = JSON.parse(fr.result.toString())
        this.loadData(data);
      }
      fr.readAsText(event.target.files[0])
    }
  }

  createCV() {

    this.store.dispatch(clearPersonalInformation());
    this.store.dispatch(clearLaboralInformation());
    this.store.dispatch(clearAcademicInformation());
    this.store.dispatch(clearLanguageInformation());
    this.store.dispatch(clearSkillInformation());
    this.store.dispatch(clearAchievementInformation());
    this.store.dispatch(clearCertificationInformation());
    this.store.dispatch(clearInterestInformation());
    this.store.dispatch(clearObjectiveInformation());
    this.router.navigate(["create", "personal"])
  }

  private loadData(data: any) {
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
    this.router.navigate(['create', 'personal'])

  }
}
