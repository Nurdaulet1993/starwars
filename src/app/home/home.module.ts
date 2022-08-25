import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HideAfterDirective } from './directives/hide-after.directive';


@NgModule({
  declarations: [
    HomeComponent,
    HideAfterDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ])
  ]
})
export class HomeModule { }
