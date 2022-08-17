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
    created: string[];
    edited: string[];
    url: string;
}

export class Film {
  id!: number;
  properties!: IFilm;

  constructor(data: IFilm) {
    this.setProperties(data);
  }

  private setProperties(value: IFilm) {
    const arr = value.url.split('/');
    this.id = +arr[arr.length - 2];

    this.properties = {
      ...value,
      episode_id: +value.episode_id
    }
  }
}
