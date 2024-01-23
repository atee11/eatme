import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  lang: string = '';

  constructor(private translateService: TranslateService) {

  }

  ngOnInit(): void {
    this.lang = this.translateService.currentLang || 'en';
  }

  ChangeLang(lang: any) {
    const selectedLanguage = lang.target.value;
    this.translateService.use(selectedLanguage);
  }

}
