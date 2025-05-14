import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  imports: [ReactiveFormsModule]
})
export class InputFormComponent implements OnInit {
  form;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      fahrenheit: new FormControl('32'),
      celsius: new FormControl('0'),
    });
  }

  ngOnInit() {
    this.form.controls.fahrenheit.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      console.log("f", this.fahrenheit?.value);
      this.fromFtoC(this.fahrenheit?.value ?? '0');
    })

    this.form.controls.celsius.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      console.log('c', this.celsius?.value);
      this.fromCtoF(this.celsius?.value ?? '0');
    })
  }

  get fahrenheit() {
    return this.form.get('fahrenheit');
  }

  get celsius() {
    return this.form.get('celsius');
  }

  public fromFtoC(fahrenheit: string) {
    let num = ((Number(fahrenheit) - 32) * 5/9);
    this.form.controls.celsius.setValue(num.toFixed(1));
    const roundedF = Math.round(Number(fahrenheit));
    this.form.controls.fahrenheit.setValue(Number.isFinite(roundedF) ? roundedF.toFixed(0) : '0');
  } 

  public fromCtoF(celsius: string) {
    let num = Math.round((Number(celsius) * 9/5) + 32);
    this.form.controls.fahrenheit.setValue(num.toString());

    const cel = parseFloat(celsius);
    this.form.controls.celsius.setValue(Number.isFinite(cel) ? cel.toFixed(1) : '0.0');
  }

  
}
