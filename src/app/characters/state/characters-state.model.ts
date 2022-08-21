import { Character } from '@app/characters/character.model';
import { IPagination } from '@core/models/pagination.model';

export interface CharactersState {
  characters: Character[];
  loading: boolean;
  search: string;
  pagination: IPagination;
}
