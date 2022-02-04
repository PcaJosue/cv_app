import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService, AlertType } from 'src/app/services/alert.service';
import { selectButtons, selectLanguage, selectMessages } from 'src/app/state/manage_language/manage_language.selects';
import * as selects from 'src/app/state/language_information/language.selects'
import * as actions from 'src/app/state/language_information/language.actions'

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {


  public messages$ = this.store.select(selectMessages);
  private messages;
  public languageList$ = this.store.select(selects.selectLanguage);
  public labels$ = this.store.select(selectLanguage);
  public buttons$ = this.store.select(selectButtons);


  public languageForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    level: new FormControl(null, Validators.required),
  });

  constructor(private route: Router, private store: Store, private alertService: AlertService) { }

  ngOnInit(): void {
    this.messages$.subscribe(data => this.messages = data)
  }

  goTo(step) {
    if (step === 'next') this.route.navigate(['create', 'skill'])
    else this.route.navigate(['create', 'academic'])
  }


  addLanguageInformation() {

    if (this.languageForm.invalid) {
      this.alertService.open(this.messages.required, AlertType.Error);
      return;
    }

    this.store.dispatch(actions.addLanguageInformation({ data: { ...this.languageForm.value } }))
    this.languageForm.reset();
    this.languageForm.markAsUntouched();
  }

  remove(index) {
    this.store.dispatch(actions.removeLanguageInformation({ index: index }))
  }

  edit(data, index) {
    this.store.dispatch(actions.removeLanguageInformation({ index: index }))
    this.languageForm.patchValue({ ...data })
  }


}
