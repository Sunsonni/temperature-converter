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
  tempValue = '';
  buttonValues: Button[] = [];
  
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.buttonValues = this.sharedService.getButtons() as Button[];
  }

  public onClick(button: Button) {
    this.sharedService.emitToService(button);
  }
}
