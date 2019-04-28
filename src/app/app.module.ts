import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SentcomplaintModule } from './layout/sentcomplaint/sentcomplaint.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {JwtInterceptor} from './login/jwt.interceptor';
import { ErrorInterceptor } from './login/error.interceptor';
export const createTranslateLoader = (http: HttpClient) => {
  /* for development
  return new TranslateHttpLoader(
      http,
      '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
      '.json'
  );*/
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    OverlayModule,
    BrowserAnimationsModule,
            HttpClientModule,

    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  }),

    SentcomplaintModule




  ],
  providers: [{provide : HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi :true},
    {provide : HTTP_INTERCEPTORS,useClass: ErrorInterceptor, multi :true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
