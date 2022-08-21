import * as AppState from '@app/state/app.state';
import { CharactersState } from './characters-state.model';
import { createSelector } from '@ngrx/store';

export interface State extends AppState.State {
  characters: CharactersState
}

export const selectCharactersState = (state: State) => state.characters;

export const selectCharacters = createSelector(
  selectCharactersState,
  state => state.characters
)

export const selectPagination = createSelector(
  selectCharactersState,
  state => state.pagination
)

export const selectLoading = createSelector(
  selectCharactersState,
  state => state.loading
)

export const selectSearch = createSelector(
  selectCharactersState,
  state => state.search
)
