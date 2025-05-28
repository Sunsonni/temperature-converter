import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Button } from '../interfaces/button';
import { tempToColor } from 'temp-color';

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

//TO DO: Fix button values from hex to rgb
  buttonValues: Button[] = [
    { name: "Absolute Zero", default: '-459'},
    { name: "Frozen", default: '30'},
    { name: "Nice", default: '72'},
    { name: "Hot", default: '90'},
    { name: "Boiling", default: '212'},
    { name: "Random", default: ""},
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
          default: randomValue
      }

      //Note for Sonnie: randomButton needed to set values in calculator
      this.eventSource.next(randomButton);
      this.barColor.next(barColor);
      this.feelsLike(randomValue);

    } else {
      this.eventSource.next(item);
      this.barColor.next(this.getBarColorFromValue(item.default));
      this.feelsLike(item.default);
    }

  }

  setFeelsLikeAndColor(value: string) {
    let temporary = this.getBarColorFromValue(value);
    this.barColor.next(temporary);
    console.log(temporary);
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
   const { r, g, b } = tempToColor(f, -500, 300);
   return `rgb(${r}, ${g}, ${b})`;
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
