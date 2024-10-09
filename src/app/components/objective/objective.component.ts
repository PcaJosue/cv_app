import { Component, OnDestroy, OnInit } from '@angular/core';
import { selectButtons, selectMessages, selectObjective } from 'src/app/state/manage_language/manage_language.selects';
import * as selects from 'src/app/state/objective_information/objective.selects'
import * as actions from 'src/app/state/objective_information/objective.actions'
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, first } from 'rxjs/operators';
import { combineLatest, merge } from 'rxjs';


@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss']
})
export class ObjectiveComponent implements OnInit, OnDestroy {

  public labels$ = this.store.select(selectObjective);
  public messages$ = this.store.select(selectMessages);
  public objective$ = this.store.select(selects.selectObjective);
  public buttons$ = this.store.select(selectButtons);

  public objective = new FormControl(null)
  public fit = new FormControl(null)

  constructor(private route: Router, private store: Store) { }

  ngOnDestroy(): void {
    this.addObjectiveInformation();
  }

  ngOnInit(): void {


    this.objective$.pipe(
      first()
    ).subscribe(data => {
      if(typeof data == 'string') this.objective.setValue(data)
      else {
        this.objective.setValue(data.objective)
        this.fit.setValue(data.fit)
      }
    });

  }

  goTo(step) {
    if (step === 'next') this.route.navigate(['create', 'review']);
    else this.route.navigate(['create', 'interest']);
  }


  addObjectiveInformation() {
    this.store.dispatch(actions.addObjectiveInformation({ data:  { objective : this.objective.value, fit: this.fit.value }}))

  }



}
