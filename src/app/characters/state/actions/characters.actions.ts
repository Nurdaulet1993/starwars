import { createAction, props } from '@ngrx/store';
import {CharactersActions} from '@app/characters/state/actions/index';

export enum CharactersActionsType {
  GET_CHARACTERS = '[CHARACTERS] Get all characters',
  GET_CHARACTER = '[CHARACTERS] Get character',
  SET_PAGE = '[CHARACTERS] Set page',
  SET_SEARCH = '[CHARACTERS] Set search',
  SET_DEFAULT = '[CHARACTERS] Set default parameters'
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

export const setDefault = createAction(
  CharactersActionsType.SET_DEFAULT
)


