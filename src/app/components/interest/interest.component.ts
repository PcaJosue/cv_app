import { Component, OnInit } from '@angular/core';
import { selectButtons, selectInterest, selectMessages } from 'src/app/state/manage_language/manage_language.selects';
import * as selects from 'src/app/state/interest_information/interest.selects'
import * as actions from 'src/app/state/interest_information/interest.actions'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService, AlertType } from 'src/app/services/alert.service';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {

  public labels$ = this.store.select(selectInterest);
  public messages$ = this.store.select(selectMessages);
  private messages;
  public interestList$ = this.store.select(selects.selectInterest);
  public buttons$ = this.store.select(selectButtons);



  public isCurrentlyStudying: FormControl = new FormControl(false);
  public interestForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  constructor(private route: Router, private store: Store, private alertService: AlertService) { }

  ngOnInit(): void {
    this.messages$.subscribe(data => this.messages = data)
  }


  goTo(step) {
    if (step === 'next') this.route.navigate(['create', 'objetive'])
    else this.route.navigate(['create', 'certification'])
  }


  addInterestInformation() {

    if (this.interestForm.invalid) {
      this.alertService.open(this.messages.required, AlertType.Error);
      return;
    }

    this.store.dispatch(actions.addInterestInformation({ data: { ...this.interestForm.value } }))
    this.interestForm.reset();
    this.interestForm.markAsUntouched();
  }

  remove(index) {
    this.store.dispatch(actions.removeInterestInformation({ index: index }))
  }

  edit(data, index) {
    this.store.dispatch(actions.removeInterestInformation({ index: index }))
    this.interestForm.patchValue({ ...data })
  }


}
