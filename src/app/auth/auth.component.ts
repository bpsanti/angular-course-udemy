import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

import {AuthResponseData, AuthService} from "./auth.service";
import {AlertComponent} from "../alert/alert/alert.component";
import {PlaceholderDirective} from "../placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoading: boolean = false;
  isLoginMode: boolean = true;
  errorMessage: string;

  @ViewChild(PlaceholderDirective)
  alertHost: PlaceholderDirective;

  private closeEventSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactory: ComponentFactoryResolver) {}

  ngOnDestroy(): void {
    this.closeEventSubscription.unsubscribe();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }

    this.isLoading = true;

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.authService.logIn(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      success => {
        console.log(success);
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.errorMessage = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    authForm.reset();
  }

  showErrorAlert(message: string): void {
    const alertComponent = this.componentFactory.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();
    const alertComponentRef = hostViewContainerRef.createComponent(alertComponent);

    alertComponentRef.instance.message = message;
    this.closeEventSubscription = alertComponentRef.instance.closeEvent.subscribe(() => {
      hostViewContainerRef.clear();
    });
  }
}
