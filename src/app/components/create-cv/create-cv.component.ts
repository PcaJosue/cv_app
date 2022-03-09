import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '../../state/manage_language/manage_language.selects'

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.scss']
})
export class CreateCVComponent implements OnInit {

  public labels$ = this.store.select(selectors.selectMenu);

  constructor(private store: Store) { }

  ngOnInit(): void { }

}
