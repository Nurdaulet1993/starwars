import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CharactersRoutingModule } from '@app/characters/characters-routing.module';
import { CharactersService } from '@app/characters/services/characters.service';
import { CharactersFilterService } from '@app/characters/services/characters-filter.service';

import { StoreModule } from '@ngrx/store';
import { charactersReducer } from '@app/characters/state/characters.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CharactersEffects } from '@app/characters/state/characters.effects';


import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterFilterComponent } from './components/character-filter/character-filter.component';
import { CharacterToolbarComponent } from './components/character-toolbar/character-toolbar.component';
import { CharacterLayoutDirective } from './directives/character-layout.directive';



@NgModule({
  declarations: [
    CharactersRoutingModule.components,
    CharacterCardComponent,
    CharacterFilterComponent,
    CharacterToolbarComponent,
    CharacterLayoutDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    CharactersRoutingModule,
    StoreModule.forFeature('characters', charactersReducer),
    EffectsModule.forFeature([CharactersEffects])
  ],
  providers: [CharactersService, CharactersFilterService]
})
export class CharactersModule {}
