import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { CharactersService, LayoutType } from '@app/characters/services/characters.service';
import {takeWhile} from 'rxjs';

@Directive({
  selector: '[appCharacterLayout]'
})
export class CharacterLayoutDirective implements OnInit, OnDestroy {
  directiveActive = true;
  @HostBinding('class') classes = 'col-sm-6 col-md-4 col-lg-3';

  constructor(
    private el: ElementRef,
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.charactersService.layoutAction$
      .pipe(takeWhile(() => this.directiveActive))
      .subscribe(value => {
        this.classes = value === 'list' ? 'col-12' : 'col-sm-6 col-md-4 col-lg-3'
      })
  }

  ngOnDestroy(): void {
    this.directiveActive = false;
  }

}
