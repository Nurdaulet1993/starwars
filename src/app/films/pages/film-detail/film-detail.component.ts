import {Component, OnDestroy, OnInit} from '@angular/core';
import { FilmsApiService } from '@core/services/films-api.service';
import {BehaviorSubject, switchMap, takeWhile} from 'rxjs';
import { Film } from '@app/films/film.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit, OnDestroy {
  componentActive = true;
  film$ = new BehaviorSubject<Film | null>({} as Film);

  constructor(
    private filmsApiService: FilmsApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeWhile(() => this.componentActive),
        switchMap((params) => this.filmsApiService.getFilm(params['id']))
      )
      .subscribe(this.film$)

  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
