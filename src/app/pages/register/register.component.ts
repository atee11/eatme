import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IDBService } from '../../services/idbservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username!: string;
  password!: string;

  constructor(private idbService: IDBService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService)
  {
    this.idbService.db().then(db => {
      console.log('Adatbázis sikeresen létrehozva:', db);
    }).catch(error => {
      console.error('Hiba az adatbázis létrehozásakor:', error);
    });
  }

  onRegister(form: NgForm) {
    if (form.valid) {
      const value = form.value;
      const user = { username: value.username, password: value.password };
      this.idbService.get('users', user.username).then(existingUser => {
        if (existingUser) {
          // A felhasználónév már létezik, tehát hibaüzenetet jelenítünk meg
          this.toastr.error(this.translate.instant('Username already exists'));
        } else {
          // A felhasználónév nem létezik, tehát hozzáadhatjuk az új felhasználót
          this.idbService.add('users', user).then(() => {
            this.toastr.success(this.translate.instant('Registration was successful!'));
            this.router.navigate(['/login']);
          }).catch(error => {
            this.toastr.error(this.translate.instant('Error during registration'));
            console.error('Hiba a regisztráció során:', error);
          });
        }
      });
    } else {
      this.toastr.warning(this.translate.instant('The form is invalid'));
      console.log('A form érvénytelen');
    }
  }
}
