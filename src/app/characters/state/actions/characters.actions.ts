import { createAction, props } from '@ngrx/store';

export enum CharactersActionsType {
  GET_CHARACTERS = '[CHARACTERS] Get all characters',
  GET_CHARACTER = '[FILMS] Get character',
  SET_PAGE = '[FILMS] Set page',
  SET_SEARCH = '[FILMS] Set search'
}

export const getCharacters = createAction(
  CharactersActionsType.GET_CHARACTERS
)

export const getCharacter = createAction(
  CharactersActionsType.GET_CHARACTER,
  props<{ id: number }>()
)

export const setPage = createAction(
  CharactersActionsType.SET_PAGE,
  props<{ page: number }>()
)

export const setSearch = createAction(
  CharactersActionsType.SET_SEARCH,
  props<{ search: string }>()
)


