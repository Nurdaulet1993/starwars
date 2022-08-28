import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterViewComponent } from '@app/characters/pages/character-view/character-view.component';
import {CharacterResolver} from '@app/characters/services/character.resolver';

const routes: Routes = [
  {
    path: '',
    component: CharacterListComponent
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
