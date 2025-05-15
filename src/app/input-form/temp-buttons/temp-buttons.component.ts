import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-temp-buttons',
  templateUrl: './temp-buttons.component.html',
  styleUrls: ['./temp-buttons.component.scss'],
  imports: [NgFor, CommonModule]
})
export class TempButtonsComponent implements OnInit {
  @Output() triggered = new EventEmitter<string>();
   buttonValues = [
    { name: "Not even possible buddy", default: '-500'},
    { name: "Absolute Zero", default: '-459'},
    { name: "Frozen", default: '32'},
    { name: "Sweater Weather", default: '50'},
    { name: "Nice", default: '72'},
    { name: "Hot", default: '90'},
    { name: "A fever for adults", default: '100'},
    { name: "Boiling", default: '212'},
    { name: "The sun's revenge", default: '500'},
  ]
  constructor() { }

  ngOnInit() {
  }

  public onClick(value: string) {
    this.triggered.emit(value);
  }

}
