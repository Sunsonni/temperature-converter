import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-color-changer',
  templateUrl: './color-changer.component.html',
  styleUrls: ['./color-changer.component.scss']
})

export class ColorChangerComponent implements OnInit {
  barColor: string = '';
  testerColor: number = 0;
  constructor(private sharedService: SharedService ) { }

  ngOnInit() {
    this.sharedService.color$.subscribe(color => {
      this.barColor = color;
    });

    this.sharedService.getSliderValue().subscribe(value => {
      this.testerColor = value;
    });
    
  }

  onSliderChange () {
    
  }

}
