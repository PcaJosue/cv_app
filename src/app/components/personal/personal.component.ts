import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService, AlertType } from 'src/app/services/alert.service';
import * as actions from 'src/app/state/personal_information/personal.actions'
import * as selects from 'src/app/state/personal_information/personal.selects'

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {


  personalForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    ocupation: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    networks: new FormGroup({
      github: new FormControl(null),
      facebook: new FormControl(null),
      twitter: new FormControl(null),
      instagram: new FormControl(null),
      other: new FormControl(null),
      linkedin: new FormControl(null)
    })

  });


  constructor(
    private alertService: AlertService,
    private store: Store,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.store.select(selects.selectPersonal).subscribe(data => {
      this.personalForm.patchValue({ ...data })
    })
  }

  complete() {

    if (!this.formIsValid()) return;
    this.store.dispatch(actions.addPersonalInformation({ data: this.personalForm.value }));
    this.route.navigate(['create', 'laboral'])

  }

  formIsValid(): boolean {
    console.log(this.personalForm);
    if (this.personalForm.invalid)
      this.alertService.open('Please, fill all the required values', AlertType.Error);
    return this.personalForm.valid;
  }

}
