import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListSearchComponent } from './list-search/list-search.component';
import { UploadComponent } from './upload/upload.component';
import { AppRoutingModule } from './app-routing.module';
import { AppDragDropDirective } from './app-drag-drop.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from './date.pipe';
import { LimitPipe } from './limit.pipe';
import { BoldPipe } from './bold.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListSearchComponent,
    UploadComponent,
    AppDragDropDirective,
    DatePipe,
    LimitPipe,
    BoldPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
