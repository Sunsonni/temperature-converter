import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  imports: [ReactiveFormsModule]
})
export class InputFormComponent implements OnInit {
  f = new FormGroup({
    fahrenheit: new FormControl<number|null>(null),
  })

  c = new FormGroup({
    celsius: new FormControl<number | null>(null),
  })

  
    
  constructor() { }

  ngOnInit() {}

  public fromFtoC(fahrenheit: number) {
    let num = ((fahrenheit - 32) * 5/9).toFixed(1);
    this.c.controls.celsius.setValue(Number(num));
  } 

  public fromCtoF(celsius: number) {
    let num = Math.round((celsius * 9/5) + 32);
    this.f.controls.fahrenheit.setValue(num);
  } 

}
