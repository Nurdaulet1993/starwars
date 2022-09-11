import { Component, OnInit } from '@angular/core';
import {animationFrames, map, of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  users = [
    { id: 0, name: 'John', age: 22 },
    { id: 1, name: 'Helen', age: 15 },
    { id: 2, name: 'John', age: 98 },
    { id: 3, name: 'John', age: 2, get data(): string { return  `Name: ${this.name}, age: ${this.age}` } },
  ]

  ngOnInit(): void {
    // console.log(this.users.find(item => item.age === 15));
    // console.log(this.users.filter(item => item.age > 15));
    // console.log(['B', 'D', 'A', 'C'].sort());
    // console.log([8, 22, 1].sort(this.compareNum));
    // console.log(this.users.sort(this.compareUsers));

    // for (let item of this.users) {
    //   console.log(item.name)
    // }
    //
    // console.log(this.users.reduce((acc, item, index, arr) => acc + item.age, 0));

    console.log('London is the capitol capitol'.replace(/capitol/g, 'hello'));


    console.log(/london/i.test('London is the capitol capito'));
    console.log(/[a-z]/i.exec('London is the capitol capito'));
    console.log(/[0-9]/gm.exec('London is the capitol capito 5454'));
  }

  compareNum(a: number, b: number): number {
    if (a > b) return 1;
    if (a == b) return 0;
    return  a - b;
  }

  compareUsers(a: { age: number }, b: { age: number }): number {
    return  a.age - b.age;
  }
}
