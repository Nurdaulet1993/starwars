import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PeopleApiService } from '@core/services/people-api.service';
import { ActivatedRoute, Data } from '@angular/router';
import { BehaviorSubject, forkJoin, map, switchMap, takeWhile } from 'rxjs';
import { Character } from '@app/characters/character.model';
import { FilmsApiService } from '@core/services/films-api.service';
import { Film } from '@app/films/film.model';
import { IStarship } from '@app/starships/starship.model';
import { StarshipsApiService } from '@core/services/starships-api.service';
import { IVehicle } from '@app/vehicles/vehicle.model';
import { VehiclesApiService } from '@core/services/vehicles-api.service';
import { ISpecie } from '@app/species/specie.model';
import { SpeciesApiService } from '@core/services/species-api.service';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterViewComponent implements OnInit, OnDestroy {
  componentActive = true;
  character$ = new BehaviorSubject<Character>({ } as Character);
  films$ = new BehaviorSubject<Film[]>([]);
  starships$ = new BehaviorSubject<IStarship[]>([]);
  vehicles$ = new BehaviorSubject<IVehicle[]>([]);
  species$ = new BehaviorSubject<ISpecie[]>([])

  constructor(
    private peopleApiService: PeopleApiService,
    private route: ActivatedRoute,
    private filmsApiService: FilmsApiService,
    private starshipsApiService: StarshipsApiService,
    private vehiclesApiService: VehiclesApiService,
    private speciesApiService: SpeciesApiService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data: Data) => data['character'])
      )
      .subscribe(this.character$)

    this.character$
      .pipe(
        takeWhile(() => this.componentActive),
        map(character => character.filmIds),
        switchMap(films => forkJoin(
          ...films.map(filmId => this.filmsApiService.getFilm(filmId))
        ))
      )
      .subscribe(this.films$);

    this.character$
      .pipe(
        takeWhile(() => this.componentActive),
        map(character => character.starshipIds),
        switchMap(films => forkJoin(
          ...films.map(filmId => this.starshipsApiService.getStarship(filmId))
        ))
      )
      .subscribe(this.starships$);

    this.character$
      .pipe(
        takeWhile(() => this.componentActive),
        map(character => character.vehicleIds),
        switchMap(films => forkJoin(
          ...films.map(filmId => this.vehiclesApiService.getVehicle(filmId))
        ))
      )
      .subscribe(this.vehicles$)

    this.character$
      .pipe(
        takeWhile(() => this.componentActive),
        map(character => character.starshipIds),
        switchMap(films => forkJoin(
          ...films.map(filmId => this.speciesApiService.getSpecie(filmId))
        ))
      )
      .subscribe(this.species$)

  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
