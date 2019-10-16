import { Component } from '@angular/core';

@Component({
  selector: 'new-group',
  templateUrl: 'new-group.html'
})
export class NewGroupPage {

  text: string;

  constructor() {
    console.log('Hello NewGroupComponent Component');
    this.text = 'Hello World';
  }

}
