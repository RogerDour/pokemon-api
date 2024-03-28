import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';

const appRouting: Routes = [
  {path: "", pathMatch: 'full', redirectTo: "home"},
  {path: "home", component: HomeComponent},
  {path: "form", component: FormComponent},

  ]
  
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRouting),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
