import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IDBService } from '../../services/idbservice.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service'; // Új import

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
    private authService: AuthService) { } // AuthService hozzáadva a konstruktorhoz

  async onLogin(form: NgForm) {
    if (form.valid) {
      const value = form.value;
      const user = await this.idbService.get('users', value.username);
      if (user) {
        // A felhasználó létezik, itt ellenőrizheti a jelszót
        if (user.password === value.password) {
          // A jelszó helyes, tehát bejelentkeztetheti a felhasználót
          this.toastr.success(this.translate.instant('Login successful'));
          this.authService.setUser(user); // Frissíti a bejelentkezett felhasználót
          // Átirányítja a felhasználót a főoldalra
          this.router.navigate(['/']);
        } else {
          // A jelszó helytelen, tehát megjelenítünk egy toastr üzenetet
          this.toastr.error(this.translate.instant('Incorrect password'));
        }
      } else {
        // A felhasználó nem létezik, tehát megjelenítünk egy toastr üzenetet
        this.toastr.error(this.translate.instant('User does not exist'));
      }
    } else {
      this.toastr.warning(this.translate.instant('The form is invalid'));
    }
  }
}
