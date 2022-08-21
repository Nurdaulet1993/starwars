import { getEntityId } from '@shared/utils';

export interface IFilm {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string[];
    url: string;
}

export interface IFilmProps extends IFilm{
  image: string;
}

export class Film {
  id!: number;
  properties!: IFilmProps;

  constructor(data: IFilm) {
    this.setProperties(data);
  }

  private setProperties(value: IFilm) {
    this.id = getEntityId(value.url);

    this.properties = {
      ...value,
      episode_id: +value.episode_id,
      image: `assets/img/films/${this.id}.png`
    }
  }
}
