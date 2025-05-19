import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Button } from '../interfaces/button';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private eventSource = new Subject<Button>();
  private barColor = new Subject<string>();
  private feelsLikeText = new Subject<string>();
  event$ = this.eventSource.asObservable();
  color$ = this.barColor.asObservable();
  text$ = this.feelsLikeText.asObservable();


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
    { name: "Random", default: this.randomNumber(), barColor: ''},
  ]

  getButtons() {
    return this.buttonValues;
  }

  sendMessage(item: Button) {
    this.eventSource.next(item);
  }

  emitToService(item: Button) {
    if(item.name === 'Random') {
      const randomValue = this.randomNumber();
      const barColor = this.getBarColorFromValue(randomValue);

      const randomButton: Button = {
        name: 'Random',
        default: randomValue,
        barColor: barColor
      };
      this.eventSource.next(randomButton);
      this.barColor.next(barColor);
      console.log('random is running');
    } else {
      this.eventSource.next(item);
      this.barColor.next(item.barColor);
      this.feelsLike(item.default);
    }

  }

  emitToColor(barColor: string) {
    this.barColor.next(barColor);
  }

  private randomNumber() {
    let value = Math.floor((Math.random()) * 100).toFixed(1);
    console.log("random number is activated ", value);
    return value;
  }

  private getBarColorFromValue(value: string): string {
    const f  = parseFloat(value);
    this.feelsLike(value);
    //Not even possible buddy
    if (f < -459) return '#3345ff'; 
    // Absolute Zero
    if (f < 32) return '#3376ff'; 
    // Frozen     
    if (f < 50) return '#33b3ff';
    // Sweater Weather      
    if (f < 72) return '#33ffe8';
    // Nice      
    if (f < 90) return '#33ffbd'; 
    // Hot     
    if (f < 100) return '#e4ff33';   
    // Boiling  
    if (f === 212) return '#ffac33';
    //The sun's revenge   
    return '#ff3333';  
  }


  public feelsLike(value: string) {
    let f = parseFloat(value);
    if (f < -459.67) {
      this.feelsLikeText.next("Not even possible buddy");
      
    } else if (-459.67 <= f && f < 32) {
      this.feelsLikeText.next("Absolute Zero");
    } else if (32 <= f && f <= 50) {
      this.feelsLikeText.next("Sweater Weather");
    } else if (50 < f && f <= 72) {
      this.feelsLikeText.next("Nice");
    } else if (72 < f && f <= 90) {
      this.feelsLikeText.next("Hot");
    } else if (90 < f && f < 100) {
      this.feelsLikeText.next("A fever for adults");
    } else if (f == 212) {
      this.feelsLikeText.next("Boiling");
    } else if (f > 212) {
      this.feelsLikeText.next("The sun's revenge");
    }
  }

  
}
