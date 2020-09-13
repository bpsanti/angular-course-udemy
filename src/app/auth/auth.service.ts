import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import { User } from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_KEY = 'AIzaSyB7QxFCeN4Y40NBgLCS02JmjqexO2iIY1g';
  USER_DATA_KEY = 'USER_DATA';

  authenticatedUser = new BehaviorSubject<User>(null);
  tokenExpirationTimer;

  constructor(private http: HttpClient,
              private router: Router) {}

  autoLogin() {
    const localData: {
      id: string,
      email: string,
      _token: string,
      _tokenExpiration: string
    } = JSON.parse(localStorage.getItem(this.USER_DATA_KEY));

    if (!localData) {
      return;
    }

    const loadedUser = new User(localData.id,
                                localData.email,
                                localData._token,
                                new Date(localData._tokenExpiration));

    if (loadedUser.token) {
      const remainingExpiration = new Date(localData._tokenExpiration).getTime() - new Date().getTime();

      this.autoLogout(remainingExpiration);
      this.authenticatedUser.next(loadedUser);
    }
  }

  logIn(email: string, password: string) {
    const logInURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY;

    return this.http.post<AuthResponseData>(
      logInURL,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(this.handleAuthentication.bind(this))
    );
  }

  signUp(email: string, password: string) {
    const signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY;

    return this.http
      .post<AuthResponseData>(
        signUpURL,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  autoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationTime);
  }

  logOut() {
    this.authenticatedUser.next(null);
    this.router.navigate(['auth/']);

    localStorage.removeItem(this.USER_DATA_KEY);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error has ocurred!'

    switch (errorResponse.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The entered e-mail already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'E-mail or password is invalid.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'E-mail or password is invalid.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Try again later. Unusual activity.';
        break;
    }

    return throwError(errorMessage);
  }

  private handleAuthentication(userData: AuthResponseData) {
    const tokenExpirationDate = new Date(new Date().getTime() + +userData.expiresIn * 1000);
    const loggedUser = new User(userData.localId,
                                userData.email,
                                userData.idToken,
                                tokenExpirationDate);

    this.autoLogout(+userData.expiresIn * 1000);

    this.authenticatedUser.next(loggedUser);
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(loggedUser));
  }
}
