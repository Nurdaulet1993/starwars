import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { PaginationModule } from '@shared/components/pagination/pagination.module';
import { HighlightDirective } from '@shared/directives/highlight.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    FilterComponent,
    HighlightDirective,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    // Components:
    FilterComponent,
    // Directives
    HighlightDirective
  ]
})
export class SharedModule { }
