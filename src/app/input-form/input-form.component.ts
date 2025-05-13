import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  imports: [ReactiveFormsModule]
})
export class InputFormComponent implements OnInit {
  form = new FormGroup({
    fahrenheit: new FormControl<string | null>(null),
    celsius: new FormControl<string | null>(null)
  })

  
    
  constructor() { }

  ngOnInit() {}

  public fromFtoC(fahrenheit: string) {
    let num = ((Number(fahrenheit) - 32) * 5/9).toFixed(1);
    this.form.controls.celsius.setValue(num);
    console.log(this.form.controls.celsius.value);
    this.form.controls.fahrenheit.setValue(fahrenheit);
  } 

  public fromCtoF(celsius: string) {

    let num = Math.round((Number(celsius) * 9/5) + 32);
    this.form.controls.fahrenheit.setValue(num.toString());
    let cel = parseFloat(celsius).toFixed(1);
    this.form.controls.celsius.setValue(cel);
  }

}
