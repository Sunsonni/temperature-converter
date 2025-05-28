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
  private sliderValue = new Subject<number>();

  event$ = this.eventSource.asObservable();
  color$ = this.barColor.asObservable();
  text$ = this.feelsLikeText.asObservable();
  sliderValue$ = this.sliderValue.asObservable();


  buttonValues: Button[] = [
    { name: "Absolute Zero", default: '-459', barColor: '#3376ff'},
    { name: "Frozen", default: '30', barColor: '#33b3ff'},
    { name: "Nice", default: '72', barColor: '#33ffbd'},
    { name: "Hot", default: '90', barColor: '#e4ff33'},
    { name: "Boiling", default: '212', barColor: '#ffac33'},
    { name: "Random", default: "", barColor: ''},
  ]

  getButtons() {
    return this.buttonValues;
  }

  getSliderValue() {
    return this.sliderValue;
  }

  emitToService(item: Button) {
    if(item.name === 'Random') {
      const randomValue = this.boxMullerRandomNum().toString();
      const barColor = this.getBarColorFromValue(randomValue);

      const randomButton: Button = {
          name: item.name,
          default: randomValue,
          barColor: barColor
      }

      //Note for Sonnie: randomButton needed to set values in calculator
      this.eventSource.next(randomButton);
      this.barColor.next(barColor);
      this.feelsLike(randomValue);

    } else {
      this.eventSource.next(item);
      this.barColor.next(item.barColor);
      this.feelsLike(item.default);
    }

  }

  setFeelsLikeAndColor(value: string) {
    this.barColor.next(this.getBarColorFromValue(value));
    this.feelsLike(value);
  }

  private boxMullerRandomNum() {
    const u1 = Math.random();
    const u2 = Math.random();

    const r = Math.sqrt(-2.0 * Math.log(u1));
    const theta = 2.0 * Math.PI * u2;

    const z0 = r * Math.cos(theta);
    
    const mean = 75;
    const stdDev = 100;

    const rawValue = mean + stdDev * z0;
    const range = Math.max(-500, Math.min(300, rawValue));

    return range;
  }

  private getBarColorFromValue(value: string): string {
    const f  = parseFloat(value);
    this.feelsLike(value);
    //not possible
    if (f < -459.67) return 'rgb(0, 0, 255)'; 
    //absolute zero
    if (-459.67 <= f && f < 32) return '#3376ff';
    //Frozen
    if (32 <= f && f <= 50) return '#33b3ff';
    //Sweater Weather
    if (50 < f && f <= 72) return '#33ffe8';
    //Nice
    if (72 < f && f <= 90) return '#e4ff33';
    //Hot
    if (90 < f && f < 100) return '#ffe113';
    //A fever for adults
    if (100 <= f && f < 212) return '#ffe133';
    //Boiling
    if (f == 212) return '#ffac33';
    //The sun's revenge
    return '#ff3333';
  }

  public feelsLike(value: string) {
    let f = parseFloat(value);

    if (f < -459.67) this.feelsLikeText.next("Not even possible buddy");
    if (-459.67 <= f && f < 32) this.feelsLikeText.next("Absolute Zero");
    if (32 <= f && f <= 50) this.feelsLikeText.next("Frozen");
    if (50 < f && f <= 72) this.feelsLikeText.next("Sweater Weather");
    if (72 < f && f <= 90) this.feelsLikeText.next("Nice");
    if (90 < f && f < 100) this.feelsLikeText.next("Hot");
    if (100 <= f && f < 212) this.feelsLikeText.next("A fever for adults");
    if (f == 212) this.feelsLikeText.next("Boiling");
    if (f > 212) this.feelsLikeText.next("The sun's revenge");
  }
}
