import { createAction, props } from '@ngrx/store';
import { IApiResponse } from '@core/models/api-response.model';
import { Character } from '@app/characters/character.model';

export enum CharactersApiActionsType {
  GET_CHARACTERS_SUCCESS = '[CHARACTERS] Get all characters success',
  GET_CHARACTERS_FAIL = '[CHARACTERS] Get all characters failed',
  GET_CHARACTER_SUCCESS = '[FILMS] Get character success',
  GET_CHARACTER_FAIL = '[FILMS] Get character failed',
}

export const getCharactersSuccess = createAction(
  CharactersApiActionsType.GET_CHARACTERS_SUCCESS,
  props<{ payload: IApiResponse<Character[]>, page: number }>()
)

export const getCharacterSuccess = createAction(
  CharactersApiActionsType.GET_CHARACTER_SUCCESS,
  props<{ character: Character }>()
)

export const getCharactersFail = createAction(
  CharactersApiActionsType.GET_CHARACTERS_FAIL
)
