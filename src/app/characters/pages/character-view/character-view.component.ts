import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PeopleApiService } from '@core/services/people-api.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap, takeWhile } from 'rxjs';
import { Character } from '@app/characters/character.model';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterViewComponent implements OnInit, OnDestroy {
  componentActive = true;
  character$ = new BehaviorSubject<Character>({ properties: { name: '' } } as Character);

  constructor(
    private peopleApiService: PeopleApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeWhile(() => this.componentActive),
        switchMap(params => this.peopleApiService.getCharacter(params['id']))
      )
      .subscribe(this.character$)
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
