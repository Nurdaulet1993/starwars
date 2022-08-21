import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { charactersReducer } from '@app/characters/state/characters.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CharactersEffects } from '@app/characters/state/characters.effects';

import { CharactersRoutingModule } from '@app/characters/characters-routing.module';
import { CharacterCardComponent } from './components/character-card/character-card.component';


@NgModule({
  declarations: [
    CharactersRoutingModule.components,
    CharacterCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CharactersRoutingModule,
    StoreModule.forFeature('characters', charactersReducer),
    EffectsModule.forFeature([CharactersEffects])
  ]
})
export class CharactersModule { }
