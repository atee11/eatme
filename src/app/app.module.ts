import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { FooterComponent } from './share/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MenupageComponent } from './pages/menupage/menupage.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CartComponent } from './pages/cart/cart/cart.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { IDBService } from './services/idbservice.service';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    AboutComponent,
    ContactComponent,
    MenupageComponent,
    CartComponent,
    SearchComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    ToastNoAnimation,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [IDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
