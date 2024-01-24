import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartService, CartItem } from 'src/app/services/cart-services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  lang: string = '';
  items: CartItem[] = [];

  constructor(private translateService: TranslateService, private cartService: CartService) { }

  ngOnInit(): void {
    this.lang = this.translateService.currentLang || 'en';
    this.cartService.items$.subscribe(items => this.items = items);
  }

  ChangeLang(lang: any) {
    const selectedLanguage = lang.target.value;
    this.translateService.use(selectedLanguage);
  }

}
