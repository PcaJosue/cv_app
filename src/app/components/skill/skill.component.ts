import { cloneDeep } from 'lodash';
import { SkillModel } from 'src/app/models/skill.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService, AlertType } from 'src/app/services/alert.service';
import { selectButtons, selectMessages, selectSkill } from 'src/app/state/manage_language/manage_language.selects';
import * as selects from 'src/app/state/skill_information/skill.selects'
import * as actions from 'src/app/state/skill_information/skill.actions'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {


  public messages$ = this.store.select(selectMessages);
  private messages;
  public skillList$ = this.store.select(selects.selectSkill);
  public skills:SkillModel[];
  public labels$ = this.store.select(selectSkill);
  public buttons$ = this.store.select(selectButtons);


  public skillForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    level: new FormControl(null, Validators.required),
  });

  constructor(private route: Router, private store: Store, private alertService: AlertService) { }

  ngOnInit(): void {
    this.messages$.subscribe(data => this.messages = data);
    this.skillList$.subscribe(data => this.skills =data);
  }

  goTo(step) {
    if (step === 'next') this.route.navigate(['create', 'achievement']);
    else this.route.navigate(['create', 'language']);
  }


  addSkillInformation() {

    if (this.skillForm.invalid) {
      this.alertService.open(this.messages.required, AlertType.Error);
      return;
    }

    this.store.dispatch(actions.addSkillInformation({ data: { ...this.skillForm.value } }))
    this.skillForm.reset();
    this.skillForm.markAsUntouched();
  }

  remove(index) {
    this.store.dispatch(actions.removeSkillInformation({ index: index }))
  }

  edit(data, index) {
    this.store.dispatch(actions.removeSkillInformation({ index: index }))
    this.skillForm.patchValue({ ...data })
  }

  drop(event: CdkDragDrop<string[]>) {
    const skills = cloneDeep(this.skills);
    moveItemInArray(skills, event.previousIndex, event.currentIndex);
    this.store.dispatch(actions.addSkillInformationList({ data: skills }))
  }


}
