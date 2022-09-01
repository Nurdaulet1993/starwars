import { getEntityId } from '@shared/utils';
import { IProperties, Properties } from '@core/models/properties.model';
import { Model } from '@core/models/Model';

export interface ICharacter {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created: string;
  edited: string;
  name: string;
  homeworld: string;
  films: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  url: string
}

export class Character extends Model<ICharacter> {

  static buildCharacter(props: ICharacter) {
    return new Character(new Properties<ICharacter>(props))
  }

  constructor(props: IProperties<ICharacter>) {
    super(props);
    this.set(props.getAll(), this.setProperties);
  }

  private setProperties(value: ICharacter): ICharacter {
    return  {
      ...value,
      species: value.species.map(item => getEntityId(item).toString()),
      films: value.films.map(item => getEntityId(item).toString()),
      vehicles: value.vehicles.map(item => getEntityId(item).toString()),
      starships: value.starships.map(item => getEntityId(item).toString())
    };
  }

  get id(): number {
    return +getEntityId(this.get('url'));
  }

  get filmIds(): number[] {
    return this.get('films').map(item => +item);
  }

  get vehicleIds(): number[] {
    return this.get('vehicles').map(item => +item);
  }

  get starshipIds(): number[] {
    return this.get('starships').map(item => +item);
  }

  get specieIds(): number[] {
    return this.get('species').map(item => +item);
  }
}
