import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDBService } from '../../services/idbservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email, this.emailValidator]),
    confirmPassword: new FormControl('')
  });

  constructor(private idbService: IDBService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService) {
    this.idbService.db().then(db => {
      console.log('Adatbázis sikeresen létrehozva:', db);
    }).catch(error => {
      console.error('Hiba az adatbázis létrehozásakor:', error);
    });
  }

  emailValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const result = emailPattern.test(value);
    if (!result) {
      return { 'invalidEmail': { value: control.value } };
    }
    const atIndex = value.indexOf('@');
    const dotIndex = value.lastIndexOf('.');
    if (dotIndex < atIndex) {
      return { 'invalidEmail': { value: control.value } };
    }
    return null;
  }

  onRegister(form: FormGroup) {
    if (form.valid && form.value.password === form.value.confirmPassword) {
      const value = form.value;
      const encryptedPassword = CryptoJS.AES.encrypt(value.password, 'secret key').toString();
      const encryptedEmail = CryptoJS.AES.encrypt(value.email, 'secret key').toString();
      const user = { username: value.username, password: encryptedPassword, email: encryptedEmail };
      this.idbService.get('users', user.username).then(existingUser => {
        if (existingUser) {
          this.toastr.error(this.translate.instant('Username already exists'));
        } else {
          this.idbService.get('emails', user.email).then(existingEmail => {
            if (existingEmail) {
              this.toastr.error(this.translate.instant('Email already exists'));
            } else {
              this.idbService.add('users', user, user.username).then(() => {
                this.idbService.add('emails', user.email, user.email).then(() => {
                  this.toastr.success(this.translate.instant('Registration was successful!'));
                  this.router.navigate(['/login']);
                });
              }).catch(error => {
                this.toastr.error(this.translate.instant('Error during registration'));
                console.error('Hiba a regisztráció során:', error);
              });
            }
          });
        }
      });
    } else {
      if (form.value.password !== form.value.confirmPassword) {
        this.toastr.warning(this.translate.instant('The passwords do not match'));
      } else {
        this.toastr.warning(this.translate.instant('The form is invalid'));
      }
      console.log('A form érvénytelen');
    }
  }
}
