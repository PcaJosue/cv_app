import { Component, OnInit } from '@angular/core';
import { selectAchievement, selectMessages } from 'src/app/state/manage_language/manage_language.selects';
import * as selects from 'src/app/state/achievement_information/achievement.selects'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService, AlertType } from 'src/app/services/alert.service';
import * as actions from 'src/app/state/achievement_information/achievement.actions'

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss']
})
export class AchievementComponent implements OnInit {

  public labels$ = this.store.select(selectAchievement);
  public messages$ = this.store.select(selectMessages);
  private messages;
  public achievementList$ = this.store.select(selects.selectAchievement);



  public isCurrentlyStudying: FormControl = new FormControl(false);
  public achievementForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    description: new FormControl(null)
  });

  constructor(private route: Router, private store: Store, private alertService: AlertService) { }

  ngOnInit(): void {
    this.messages$.subscribe(data => this.messages = data)
  }


  goTo(step) {
    if (step === 'next') this.route.navigate(['create', 'certification'])
    else this.route.navigate(['create', 'skill'])
  }


  addAchievementInformation() {

    if (this.achievementForm.invalid) {
      this.alertService.open(this.messages.required, AlertType.Error);
      return;
    }

    this.store.dispatch(actions.addAchievementInformation({ data: { ...this.achievementForm.value } }))
    this.achievementForm.reset();
    this.achievementForm.markAsUntouched();
  }

  remove(index) {
    this.store.dispatch(actions.removeAchievementInformation({ index: index }))
  }

  edit(data, index) {
    this.store.dispatch(actions.removeAchievementInformation({ index: index }))
    this.achievementForm.patchValue({ ...data })
  }



}
