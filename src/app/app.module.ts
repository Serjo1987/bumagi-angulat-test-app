import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import * as Shared from './shared/_index';

import { ComponentsModule } from './components/components.module';
import * as Components from './components/_index';

@NgModule({
  declarations: [
    AppComponent,
    Components.AuthComponent,
    Components.ListComponent,
    Components.ListModalComponent,
    Components.PageNotFoundComponent
  ],
  entryComponents: [
    Components.ListModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    SharedModule,
    ComponentsModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatDialogModule,
    SharedModule,
    ComponentsModule
  ],
  providers: [
    Shared.ApiService,
    Shared.CookieService,
    Shared.AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
