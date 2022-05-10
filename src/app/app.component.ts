import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { changeLanguage } from './state/manage_language/manage_language.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public code: string = 'en';
  constructor(private store: Store, private router: Router) {
  }


  modifyLanguage(code) {
    this.code = code.value;
    this.store.dispatch(changeLanguage({ code: code.value }))
  }

  home() {
    this.router.navigate(['/'])
  }
}
