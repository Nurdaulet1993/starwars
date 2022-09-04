import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import { Character} from '@app/characters/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-card[character]',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterCardComponent implements OnInit {
  private _character!: Character;

  @HostBinding('class') classes = 'card h-100 pb-3';

  @Input() set character(value: Character) {
    this._character = value;
  }

  constructor(
    private router: Router,
    private hostRef: ElementRef
  ) {}

  ngOnInit(): void {}

  get character(): Character {
    return this._character;
  }

  @HostListener('mouseover') onHover() {
    this.classes = 'card h-100 pb-3 shadow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.classes = 'card h-100 pb-3';
  }

  @HostListener('click') onClick() {
    this.router.navigate(['characters', this.character.id, 'view']);
  }

}
