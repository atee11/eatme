import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IDBService } from '../../services/idbservice.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;

  constructor(private translate: TranslateService,
    private toastr: ToastrService,
    private idbService: IDBService,
    private router: Router,
    private authService: AuthService) { }

  async onLogin(form: NgForm) {
    if (form.valid) {
      const value = form.value;
      const encryptedPassword = CryptoJS.AES.encrypt(value.password, 'secret key').toString();
      const user = await this.idbService.get('users', value.username);
      if (user) {
        const bytes = CryptoJS.AES.decrypt(user.password, 'secret key');
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword === value.password) {
          this.toastr.success(this.translate.instant('Login successful'));
          this.authService.setUser(user);
          this.router.navigate(['/']);
        } else {
          this.toastr.error(this.translate.instant('Incorrect password'));
        }
      } else {
        this.toastr.error(this.translate.instant('User does not exist'));
      }
    } else {
      this.toastr.warning(this.translate.instant('The form is invalid'));
    }
  }
}
