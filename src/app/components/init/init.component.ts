import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as selectors from '../../state/manage_language/manage_language.selects'

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {


  public labels$ = this.store.select(selectors.selectMain);

  constructor(public router: Router,
    private store: Store) { }

  ngOnInit(): void {
  }

}
