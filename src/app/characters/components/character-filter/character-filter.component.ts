import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersFilterService } from '@app/characters/services/characters-filter.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrls: ['./character-filter.component.scss']
})
export class CharacterFilterComponent implements OnInit, OnDestroy {
  componentActive = true;
  search = new FormControl<string>('');


  constructor(
    private charactersFilterService: CharactersFilterService
  ) { }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(1000),
      )
      .subscribe(value => {
        if (value === null) return;
        this.charactersFilterService.search(value);
      })
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
