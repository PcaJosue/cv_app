import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laboral',
  templateUrl: './laboral.component.html',
  styleUrls: ['./laboral.component.scss']
})
export class LaboralComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  back() {
    this.route.navigate(['create', 'personal'])
  }
  next() { }

}
