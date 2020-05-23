import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
        if (this.loginService.currentUserValue) { 
          this.router.navigate(['/']);
        }
      }
    
      loginForm: FormGroup;
      matcher = new MyErrorStateMatcher();
      error='';
    
      ngOnInit() {
        this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
      }
    
      usernameFormControl = new FormControl('', [Validators.required]);
      passwordFormControl = new FormControl('', [Validators.required]);
    
      loadSpinner: boolean;
    
      public login() {
    
        let username = this.usernameFormControl.value;
        let password = this.passwordFormControl.value;
    
        if (username.length != 0 && password.length != 0){
    
          this.loadSpinner = true;
          this.loginService.login(username, password).pipe(first()).subscribe(
            data => {
              //this.loadSpinner = this.loginService.currentLoadingValue;
              this.router.navigate(['/']);
            },
            err => {
              this.error = err;
              this.loadSpinner = false;
            });
        }
        
      }

}
