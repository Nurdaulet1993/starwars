import { getEntityId } from '@shared/utils';

export interface ICharacter {
  "height": string;
  "mass": string;
  "hair_color": string;
  "skin_color": string;
  "eye_color": string;
  "birth_year": string;
  "gender": string;
  "created": string;
  "edited": string;
  "name": string;
  "homeworld": string;
  "url": string
}

export class Character {
  id!: number;
  properties!: ICharacter;

  constructor(data: ICharacter) {
    this.setProperties(data);
  }

  private setProperties(value: ICharacter): void {
    this.id = getEntityId(value.url)
    this.properties = value;
  }
}
