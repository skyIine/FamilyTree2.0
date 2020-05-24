import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from '../login/login.component';
import { LoginService } from '../login-service.service';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder, private router: Router) {}

  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  error='';

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      email: ['', Validators.email],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  nicknameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required]);
  firstnameFormControl = new FormControl('', [Validators.required]);
  lastnameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  loadSpinner: boolean;

  public register() {

    this.loadSpinner = true;

    let nickname = this.nicknameFormControl.value;
    let email = this.emailFormControl.value;
    let firstname = this.firstnameFormControl.value;
    let lastname = this.lastnameFormControl.value;
    let password = this.passwordFormControl.value;

    if (nickname.length != 0 && password.length != 0){

      this.registerService.registration(nickname, email, firstname,lastname,password).pipe(first()).subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        err => {
          this.error = err;
          this.loadSpinner = false;
        });
    }
    
  }
}
