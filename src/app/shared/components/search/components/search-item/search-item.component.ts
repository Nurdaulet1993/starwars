import { Component, Input, OnInit } from '@angular/core';
import { ISearchItem } from '@shared/components/search/search.component';

@Component({
  selector: 'app-search-item[item]',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {
  @Input() item!: ISearchItem;

  constructor() { }

  ngOnInit(): void {}

  get icon(): string {
    switch (this.item.type) {
      case 'films':
        return 'bi-film'
      default: return 'bi-person-fill'
    }
  }

  get iconBg(): string {
    switch (this.item.type) {
      case 'films':
        return 'bg-success'
      default: return 'bg-warning'
    }
  }

}
