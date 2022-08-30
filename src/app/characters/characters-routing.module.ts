import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterResolver } from '@app/characters/services/character.resolver';

import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterViewComponent } from '@app/characters/pages/character-view/character-view.component';
import {CharactersResolver} from '@app/characters/services/characters.resolver';


const routes: Routes = [
  {
    path: '',
    component: CharacterListComponent,
    // resolve: { characters: CharactersResolver }
  },
  {
    path: ':id/view',
    component: CharacterViewComponent,
    resolve: { character: CharacterResolver }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule {
  static components = [CharacterListComponent, CharacterViewComponent]
}
