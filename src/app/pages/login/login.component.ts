import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // TODO (bagus): will get this data from router not harcoded
  page: string = 'login';

  constructor() { }

  ngOnInit(): void {
  }

}
