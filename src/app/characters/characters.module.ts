import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CharactersService } from '@app/characters/characters.service';

import { StoreModule } from '@ngrx/store';
import { charactersReducer } from '@app/characters/state/characters.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CharactersEffects } from '@app/characters/state/characters.effects';

import { CharactersRoutingModule } from '@app/characters/characters-routing.module';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterFilterComponent } from './components/character-filter/character-filter.component';



@NgModule({
  declarations: [
    CharactersRoutingModule.components,
    CharacterCardComponent,
    CharacterFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CharactersRoutingModule,
    StoreModule.forFeature('characters', charactersReducer),
    EffectsModule.forFeature([CharactersEffects])
  ],
  providers: [CharactersService]
})
export class CharactersModule { }
