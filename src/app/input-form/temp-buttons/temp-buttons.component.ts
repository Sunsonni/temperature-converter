import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';


interface Item {
  name: string,
  default: string
}

@Component({
  selector: 'app-temp-buttons',
  templateUrl: './temp-buttons.component.html',
  styleUrls: ['./temp-buttons.component.scss'],
  imports: [NgFor, CommonModule]
})

export class TempButtonsComponent implements OnInit {
  @Output() triggered = new EventEmitter<string>();
   buttonValues: Item[] = [
    { name: "Not even possible buddy", default: '-500'},
    { name: "Absolute Zero", default: '-459'},
    { name: "Frozen", default: '30'},
    { name: "Sweater Weather", default: '40'},
    { name: "Nice", default: '72'},
    { name: "Hot", default: '90'},
    { name: "A fever for adults", default: '100'},
    { name: "Boiling", default: '212'},
    { name: "The sun's revenge", default: '500'},
    { name: "Random", default: this.randomNumber()},
  ]
  constructor() { }

  ngOnInit() {
  }

  public onClick(button: Item) {
    if(button.name == "Random") {
      button.default = this.randomNumber();
    }
    this.triggered.emit(button.default);
  }

  private randomNumber() {
    let value = Math.floor((Math.random()) * 100).toFixed(1);
    console.log("random number is activated ", value);
    return value;
  }

}
