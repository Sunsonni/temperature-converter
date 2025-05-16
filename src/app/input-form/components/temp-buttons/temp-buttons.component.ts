import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
import { Button } from '../../../interfaces/button';

@Component({
  selector: 'app-temp-buttons',
  templateUrl: './temp-buttons.component.html',
  styleUrls: ['./temp-buttons.component.scss'],
  imports: [NgFor, CommonModule]
})

export class TempButtonsComponent implements OnInit {
  @Output() triggered = new EventEmitter<string>();

   buttonValues: Button[] = [
    { name: "Not even possible buddy", default: '-500', barColor: '#3345ff'},
    { name: "Absolute Zero", default: '-459', barColor: '#3376ff'},
    { name: "Frozen", default: '30', barColor: '#33b3ff'},
    { name: "Sweater Weather", default: '40', barColor: '#33ffe8'},
    { name: "Nice", default: '72', barColor: '#33ffbd'},
    { name: "Hot", default: '90', barColor: '#e4ff33'},
    { name: "A fever for adults", default: '100', barColor: '#ffe133'},
    { name: "Boiling", default: '212', barColor: '#ffac33'},
    { name: "The sun's revenge", default: '500', barColor: '#ff3333'},
    { name: "Random", default: this.randomNumber(), barColor: 'random'},
  ]
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
  }

  public onClick(button: Button) {
    if(button.name == "Random") {
      button.default = this.randomNumber();
    }
    //TODO: change emit to subscribe for service
    this.triggered.emit(button.default);
    this.notifySibling(button);
  }

  private randomNumber() {
    let value = Math.floor((Math.random()) * 100).toFixed(1);
    console.log("random number is activated ", value);
    return value;
  }

  private notifySibling(item: Button) {
    this.sharedService.sendMessage(item);
  }

}
