import { Component, OnInit } from '@angular/core';
import { selectButtons, selectMessages, selectObjective } from 'src/app/state/manage_language/manage_language.selects';
import * as selects from 'src/app/state/objective_information/objective.selects'
import * as actions from 'src/app/state/objective_information/objective.actions'
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/services/alert.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss']
})
export class ObjectiveComponent implements OnInit {

  public labels$ = this.store.select(selectObjective);
  public messages$ = this.store.select(selectMessages);
  public interestList$ = this.store.select(selects.selectObjective);
  public buttons$ = this.store.select(selectButtons);

  public objective = new FormControl(null)

  constructor(private route: Router, private store: Store, private alertService: AlertService) { }

  ngOnInit(): void {
    this.objective.valueChanges.pipe(
      debounceTime(500)).subscribe(() => {
        this.addObjectiveInformation();
      })
  }

  goTo(step) {
    if (step === 'next') this.route.navigate(['create', 'resume'])
    else this.route.navigate(['create', 'interest'])
  }


  addObjectiveInformation() {

    this.store.dispatch(actions.addObjectiveInformation({ data: this.objective.value }))

  }



}
