import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() page: string;

  constructor() { }

  ngOnInit(): void {
  }
  // TODO (bagus): will change data using toWeb
  ctaCopy(page: string) {
    const copy = page === 'login' ? page : 'join now';
    return copy;
  }

}
