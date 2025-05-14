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
      fahrenheit: new FormControl('0', { updateOn: 'blur' }),
      celsius: new FormControl('0', { updateOn: 'blur' }),
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
    let num = ((Number(fahrenheit) - 32) * 5/9).toFixed(1);
    this.form.controls.celsius.setValue(num);
    this.form.controls.fahrenheit.setValue(fahrenheit);
  } 

  public fromCtoF(celsius: string) {
    let num = Math.round((Number(celsius) * 9/5) + 32);
    this.form.controls.fahrenheit.setValue(num.toString());
    let cel = parseFloat(celsius).toFixed(1);
    this.form.controls.celsius.setValue(cel);
  }

  
}
