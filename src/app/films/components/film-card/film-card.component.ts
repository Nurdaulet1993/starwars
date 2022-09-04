import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Film } from '@app/films/film.model';

@Component({
  selector: 'app-film-card[film]',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {
  @Input() film!: Film;
  @Output() select = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {}
}
