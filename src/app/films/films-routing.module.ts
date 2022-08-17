import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmListComponent } from '@app/films/pages/film-list/film-list.component';
import { FilmDetailComponent } from '@app/films/pages/film-detail/film-detail.component';

const routes: Routes = [
  {
    path: '',
    component: FilmListComponent
  },
  {
    path: ':id/details',
    component: FilmDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule {
  static components = [FilmListComponent]
}
