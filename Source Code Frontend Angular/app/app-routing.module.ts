import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { ListSearchComponent } from './list-search/list-search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'search/:value/:page/:method',
    component: ListSearchComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
