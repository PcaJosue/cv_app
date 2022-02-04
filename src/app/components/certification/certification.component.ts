import { Component, OnInit } from '@angular/core';
import { selectButtons, selectCertification, selectMessages } from 'src/app/state/manage_language/manage_language.selects';
import * as selects from 'src/app/state/certification_information/certification.selects'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService, AlertType } from 'src/app/services/alert.service';
import * as actions from 'src/app/state/certification_information/certification.actions'


@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  public labels$ = this.store.select(selectCertification);
  public messages$ = this.store.select(selectMessages);
  private messages;
  public certificationList$ = this.store.select(selects.selectCertification);
  public buttons$ = this.store.select(selectButtons);



  public isCurrentlyStudying: FormControl = new FormControl(false);
  public certificationForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    school: new FormControl(null, Validators.required)
  });

  constructor(private route: Router, private store: Store, private alertService: AlertService) { }

  ngOnInit(): void {
    this.messages$.subscribe(data => this.messages = data)
  }


  goTo(step) {
    if (step === 'next') this.route.navigate(['create', 'interest'])
    else this.route.navigate(['create', 'achievement'])
  }


  addCertificationInformation() {

    if (this.certificationForm.invalid) {
      this.alertService.open(this.messages.required, AlertType.Error);
      return;
    }

    this.store.dispatch(actions.addCertificationInformation({ data: { ...this.certificationForm.value } }))
    this.certificationForm.reset();
    this.certificationForm.markAsUntouched();
  }

  remove(index) {
    this.store.dispatch(actions.removeCertificationInformation({ index: index }))
  }

  edit(data, index) {
    this.store.dispatch(actions.removeCertificationInformation({ index: index }))
    this.certificationForm.patchValue({ ...data })
  }



}
