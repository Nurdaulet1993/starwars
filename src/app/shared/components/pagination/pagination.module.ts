import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationComponent } from './pagination.component';
import { PageFirstDirective } from './directives/page-first.directive';
import { PageLastDirective } from './directives/page-last.directive';
import { PageDirective } from './directives/page.directive';
import { PageNextDirective } from './directives/page-next.directive';
import { PagePrevDirective } from './directives/page-prev.directive';

@NgModule({
  declarations: [
    PaginationComponent,
    PageFirstDirective,
    PageLastDirective,
    PageDirective,
    PageNextDirective,
    PagePrevDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
