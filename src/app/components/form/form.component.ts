import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthResponse } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formAuth = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  loginMode: boolean = true;
  isFormValid: boolean = false;
  authType: string = '';
  error: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formAuth.statusChanges.subscribe(
      form => {
        this.isFormValid = form != 'INVALID';
      }
    )

    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.loginMode = (this.authType === 'login') ? true : false;
    })
  }

  onSubmit(): void {
    console.log(this.formAuth.value)
    if (!this.formAuth.valid) {
      return;
    }

    let authObs: Observable<AuthResponse>;

    if (this.loginMode) {
      authObs = this.authService.login(this.formAuth.value);
    } else {
      authObs = this.authService.signup(this.formAuth.value);
    }

    authObs.subscribe(
      res => {
        console.log(res)
      },
      err => {
        this.error = err;
      }
    );
  }

  onClose() {
    this.error = null;
  }
}
