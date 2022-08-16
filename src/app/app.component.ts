import { Component, OnInit } from '@angular/core';
import { PeopleApiService } from '@core/services/people-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private peopleApiService: PeopleApiService
  ) {}

  ngOnInit(): void {
    this.peopleApiService.getPeople(1)
      .subscribe(
        value => console.log(value.count)
      );

    this.peopleApiService.getCharacter(1)
      .subscribe(
        value => console.log(value.name)
      )
  }
}
