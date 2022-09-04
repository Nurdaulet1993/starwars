import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { ReactiveFormsModule} from '@angular/forms';
import { SearchItemComponent } from './components/search-item/search-item.component';



@NgModule({
  declarations: [
    SearchComponent,
    SearchItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
