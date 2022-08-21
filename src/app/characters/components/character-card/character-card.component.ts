import { Component, Input, OnInit } from '@angular/core';
import { Character } from '@app/characters/character.model';

@Component({
  selector: 'app-character-card[character]',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input() character!: Character;

  constructor() {}

  ngOnInit(): void {
  }

}
