import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { SearchModule } from '@shared/components/search/search.module';

import { HeaderComponent } from './header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SearchModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
