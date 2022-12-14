import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit
} from '@angular/core';
import { PeopleApiService } from '@core/services/people-api.service';
import { FilmsApiService } from '@core/services/films-api.service';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  forkJoin,
  map,
  mergeMap,
  filter,
  BehaviorSubject, takeWhile, of, observeOn, asyncScheduler
} from 'rxjs';
import { ISearchItem, SearchItem } from './search-item.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  componentActive = true;
  search = new FormControl<string>('', { nonNullable: true });

  private resultsAction = new BehaviorSubject<SearchItem[] | null>(null);
  results$ = this.resultsAction.asObservable();

  constructor(
    private peopleApiService: PeopleApiService,
    private filmsApiService: FilmsApiService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        takeWhile(() => this.componentActive),
        debounceTime(1000),
        filter(Boolean),
        mergeMap((value) => {
          return forkJoin([
            this.filmsApiService.getFilms(value),
            this.peopleApiService.search(value)
          ])
        }),
        map(([films, characters]) => {
          return [
            ...films.map(film => ({ id: film.id, name: film.get('title'), type: 'films' })),
            ...characters.map(character => ({ id: character.id, name: character.get('name'), type: 'characters'}))
          ];
        }),
      )
      .subscribe((value: ISearchItem[]) => {
        const collection = SearchItem.buildCollection();
        collection.fetch(value);
        this.resultsAction.next(collection.data({ sort: true }));
      })

    this.search.valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(value => {
        if (!value) {
          this.resultsAction.next(null);
        }
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;

    requestAnimationFrame(() => console.log('first animation frame'));

    of(12).pipe(observeOn(asyncScheduler))
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const isClickedInside = this.el.nativeElement.contains(event.target);
    if (!isClickedInside) {
      this.search.setValue('');
    }
  }

}
