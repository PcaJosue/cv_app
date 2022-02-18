import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService, AlertType } from 'src/app/services/alert.service';
import { selectAcademic, selectButtons, selectMessages } from 'src/app/state/manage_language/manage_language.selects';
import * as selects from 'src/app/state/academic_information/academic.selects';
import * as actions from 'src/app/state/academic_information/academic.actions';


@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.scss']
})
export class AcademicComponent implements OnInit {


  public labels$ = this.store.select(selectAcademic);
  public messages$ = this.store.select(selectMessages);
  private messages;
  public academicList$ = this.store.select(selects.selectAcademic);
  public buttons$ = this.store.select(selectButtons);



  public isCurrentlyStudying: FormControl = new FormControl(false);
  public academicForm: FormGroup = new FormGroup({
    school: new FormControl(null, Validators.required),
    career: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null)
  });

  constructor(private route: Router, private store: Store, private alertService: AlertService) { }

  ngOnInit(): void {
    this.initSubscribers();
    this.messages$.subscribe(data => this.messages = data)
  }

  initSubscribers() {

    this.isCurrentlyStudying.valueChanges.subscribe(value => {
      this.verifyEndDate(value)
    })
  }

  verifyEndDate(isCurrentlyStudying): void {
    if (isCurrentlyStudying) {
      this.academicForm.get('endDate').setValue(null);
      this.academicForm.get('endDate').disable();
    } else {
      this.academicForm.get('endDate').enable();
    }
  }

  goTo(step) {
    if (step === 'next') this.route.navigate(['create', 'language'])
    else { this.route.navigate(['create', 'laboral']) }
  }


  addAcademicInformation() {

    if (this.academicForm.invalid) {
      this.alertService.open(this.messages.required, AlertType.Error);
      return;
    }

    this.store.dispatch(actions.addAcademicInformation({ data: { ...this.academicForm.value } }))
    this.academicForm.reset();
    this.academicForm.markAsUntouched();
  }

  remove(index) {
    this.store.dispatch(actions.removeAcademicInformation({ index: index }))
  }

  edit(data, index) {
    this.store.dispatch(actions.removeAcademicInformation({ index: index }))
    this.academicForm.patchValue({ ...data })
    this.verifyEndDate(!this.academicForm.get('endDate').value)
    this.isCurrentlyStudying.setValue(!this.academicForm.get('endDate').value)
  }



}
