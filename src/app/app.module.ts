import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ANT_MODULE_IMPORTS } from './ant.imports';
import { FormSceneOfCrimeComponent } from './views/form-scene-of-crime/form-scene-of-crime.component';
import { FormSearchNSeizureComponent } from './views/form-search-n-seizure/form-search-n-seizure.component';
import { FormWitnessStatementComponent } from './views/form-witness-statement/form-witness-statement.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/envs/environment';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    FormSceneOfCrimeComponent,
    FormSearchNSeizureComponent,
    FormWitnessStatementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ANT_MODULE_IMPORTS,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
