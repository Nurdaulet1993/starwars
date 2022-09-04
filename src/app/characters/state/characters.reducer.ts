import { CharactersState } from '@app/characters/state/characters-state.model';
import { Pagination } from '@core/models/pagination.model';
import { createReducer, on } from '@ngrx/store';
import { CharactersActions, CharactersApiActions } from './actions';

export const initialState: CharactersState = {
  characters: [],
  loading: false,
  pagination: Pagination.buildPagination(),
  search: ''
}

export const charactersReducer = createReducer(
  initialState,
  on(CharactersActions.getCharacters, state => ({ ...state, loading: true })),
  on(CharactersApiActions.getCharactersSuccess, (state, { payload, page }) => ({
    ...state,
    characters: payload.results,
    pagination: { ...new Pagination(payload), page },
    loading: false
  })),
  on(CharactersActions.setPage, (state, { page }) => ({...state, pagination: { ...state.pagination, page }, loading: true })),
  on(CharactersActions.setSearch, (state, { search }) => ({
    ...state, search,
    loading: true,
    pagination: Pagination.buildPagination()
  })),
  on(CharactersActions.setDefault, (state) => ({
    ...state,
    characters: [],
    pagination: Pagination.buildPagination(),
    search: '',
    loading: false
  }))
)
