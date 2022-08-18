import { createAction, props } from '@ngrx/store';
import { Film } from '@app/films/film.model';

export enum FilmsApiActionsType {

  GET_FILMS_SUCCESS = '[FILMS API] Get all films success',
  GET_FILMS_FAIL = '[FILMS API] Get all films failed',
  GET_FILM = '[FILMS API] Get film by ID',
  GET_FILM_SUCCESS = '[FILMS API] Get film by ID success',
  GET_FILM_FAIL = '[FILMS API] Get film by ID failed',
}



export const getFilmsSuccess = createAction(
  FilmsApiActionsType.GET_FILMS_SUCCESS,
  props<{ films: Film[] }>()
)

export const getFilmsFail = createAction(
  FilmsApiActionsType.GET_FILMS_FAIL,
  props<{ error: string }>()
)

export const getFilmSuccess = createAction(
  FilmsApiActionsType.GET_FILM_SUCCESS,
  props<{ film: Film }>()
)
