import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CharactersService, LayoutType } from '@app/characters/services/characters.service';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-character-toolbar',
  templateUrl: './character-toolbar.component.html',
  styleUrls: ['./character-toolbar.component.scss']
})
export class CharacterToolbarComponent implements OnInit, OnDestroy {
  componentActive = true;
  layout = new FormControl('grid' as LayoutType);

  constructor(
    private chrarctersService: CharactersService
  ) { }

  ngOnInit(): void {
    this.layout.valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((value) => {
        if (!value) return;
        this.chrarctersService.setLayout(value)
      })
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
