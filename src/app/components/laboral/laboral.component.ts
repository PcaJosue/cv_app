import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLaboral, selectMessages, selectPersonal } from 'src/app/state/manage_language/manage_language.selects';
import { ENTER } from '@angular/cdk/keycodes';
import { LaboralModel } from 'src/app/models/laboral.model';
import { AlertService, AlertType } from 'src/app/services/alert.service';
import * as actions from 'src/app/state/laboral_information/laboral.actions'
import * as selects from 'src/app/state/laboral_information/laboral.selects'

@Component({
  selector: 'app-laboral',
  templateUrl: './laboral.component.html',
  styleUrls: ['./laboral.component.scss']
})
export class LaboralComponent implements OnInit {

  public labels$ = this.store.select(selectLaboral);
  public messages$ = this.store.select(selectMessages);
  readonly separatorKeysCodes = [ENTER] as const;
  laboralList: LaboralModel[] = [];
  private messages;



  public isCurrentlyWorking: FormControl = new FormControl(false);
  public laboralForm: FormGroup = new FormGroup({
    job: new FormControl(null, Validators.required),
    employer: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null),
    // isCurrentlyWorking: new FormControl(false),
    functions: new FormControl(null)
  });


  constructor(private route: Router, private store: Store, private alertService: AlertService) { }

  ngOnInit(): void {

    this.initSubscribers();
    this.store.select(selects.selectLaboral).subscribe(data => {
      this.laboralList = [...data];
    })

    this.messages$.subscribe(data => this.messages = data)

  }

  complete() {
    this.store.dispatch(actions.addLaboralInformation({ data: this.laboralList }))
    this.route.navigate(['create', 'academic'])
  }

  isValidStep(): boolean {
    return this.laboralList.length > 0
  }

  initSubscribers() {

    this.isCurrentlyWorking.valueChanges.subscribe(value => {
      this.verifyEndDate(value)
    })
  }


  verifyEndDate(isCurrentlyWorking): void {
    if (isCurrentlyWorking) {
      this.laboralForm.get('endDate').setValue(null);
      this.laboralForm.get('endDate').disable();
    } else {
      this.laboralForm.get('endDate').enable();
    }
  }


  addLaboralInformation() {

    if (this.laboralForm.invalid) {
      this.alertService.open(this.messages.required, AlertType.Error);
      return;
    }

    this.laboralList.push({ ...this.laboralForm.value })
    this.laboralForm.reset();
  }

  remove(index) {
    this.laboralList.splice(index, 1);
  }

  edit(index) {
    this.laboralForm.patchValue({ ...this.laboralList[index] })
    this.laboralList.splice(index, 1);
    this.verifyEndDate(!this.laboralForm.get('endDate').value)
    this.isCurrentlyWorking.setValue(!this.laboralForm.get('endDate').value)
  }



}
