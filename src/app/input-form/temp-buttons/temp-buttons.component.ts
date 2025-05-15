import { Component, Input, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-temp-buttons',
  templateUrl: './temp-buttons.component.html',
  styleUrls: ['./temp-buttons.component.scss'],
  imports: [NgFor, CommonModule]
})
export class TempButtonsComponent implements OnInit {
  @Input() feelsLikeText?: string;
   buttonValues = [
    {type: "Not even possible buddy", action: 'apples'},
    {type: "Absolute Zero"},
    {type: "Frozen"},
    {type: "Sweater Weather"},
    {type: "Nice"},
    {type: "Hot"},
    {type: "A fever for adults"},
    {type: "Boiling"},
    {type: "The sun's revenge"},
  ]
  constructor() { }

  ngOnInit() {
  }

}
