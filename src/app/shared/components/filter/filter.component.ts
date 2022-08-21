import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output('search') onSearch = new EventEmitter();
  componentActive = true;
  search = new FormControl<string>('');

  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value => this.onSearch.emit(value))
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
