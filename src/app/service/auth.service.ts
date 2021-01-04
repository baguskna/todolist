import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthResponse } from '../models/auth.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpirationTimer: any;
  user = new BehaviorSubject<User>({} as User);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(formSignUp) {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.authAPIKey}`,
        {
          email: formSignUp.email,
          password: formSignUp.password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(
          res => {
            this.handleAuth(
              res.email,
              res.localId,
              res.idToken,
              +res.expiresIn
            )
          }
        )
      )
  }

  login(formLogin) {
    return this.http
    .post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.authAPIKey}`,
      {
        email: formLogin.email,
        password: formLogin.password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(
        res => {
          this.handleAuth(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          )
        }
      )
    )
  }

  logout() {
    this.user.next(null);
    this.router.navigateByUrl('/');
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'An error occurred!';
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found, lets sign up first';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is not correct';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User disabled';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationData = new Date(
      new Date().getTime() + +expiresIn * 1000
    );

    const user = new User(
      email,
      userId,
      token,
      expirationData
    );

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+expiresIn * 1000);
  }
}
