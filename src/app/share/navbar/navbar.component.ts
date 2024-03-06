import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartService, CartItem } from 'src/app/services/cart-services';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  lang: string = '';
  items: CartItem[] = [];

  constructor(private translateService: TranslateService,
    private cartService: CartService,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.lang = this.translateService.currentLang || 'en';
    this.cartService.items$.subscribe(items => this.items = items);
  }

  ChangeLang(lang: any) {
    const selectedLanguage = lang.target.value;
    this.translateService.use(selectedLanguage);
  }

  handleSelect(event: any) {
    if (event.target.value === 'logout') {
      this.authService.setUser(null);
      this.router.navigate(['/login']);
    }
  }
}
