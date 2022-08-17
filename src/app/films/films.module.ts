import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FilmsRoutingModule } from '@app/films/films-routing.module';


import { StoreModule } from '@ngrx/store';
import { filmsReducer } from '@app/films/state/films.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FilmsEffects } from '@app/films/state/films.effects';

import { FilmCardComponent } from './components/film-card/film-card.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';


@NgModule({
  declarations: [
    FilmsRoutingModule.components,
    FilmCardComponent,
    FilmDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FilmsRoutingModule,
    StoreModule.forFeature('films', filmsReducer),
    EffectsModule.forFeature([FilmsEffects])
  ]
})
export class FilmsModule { }
