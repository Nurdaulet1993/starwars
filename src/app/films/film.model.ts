import { getEntityId } from '@shared/utils';
import { Model } from '@core/models/Model';
import { IProperties, Properties } from '@core/models/properties.model';

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
    image?: string;
}

export interface IFilmProps extends IFilm {
  image: string;
}

export class Film extends Model<IFilm>{
  static buildFilm(data: IFilm) {
    return new Film(new Properties<IFilm>(data));
  }

  constructor(data: IProperties<IFilm>) {
    super(data);
    this.set(data.getAll(), this.setProperties)
  }

  get id(): number {
    return +getEntityId(this.get('url'));
  }

  setProperties = (value: IFilm): IFilm  => {
    return  {
      ...value,
      episode_id: +value.episode_id,
      image: `assets/img/films/${this.id}.png`
    }
  }
}
