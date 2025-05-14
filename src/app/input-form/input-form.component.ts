import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { ConversionFunctions } from '../conversion-functions';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  imports: [ReactiveFormsModule]
})
export class InputFormComponent implements OnInit {
  form;
  conversion = new ConversionFunctions;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      fahrenheit: new FormControl('32', { updateOn: 'blur' }),
      celsius: new FormControl('0.0', { updateOn: 'blur' }),
      kelvin: new FormControl('273.15', { updateOn: 'blur' })
    });
  }

  ngOnInit() {
    //Fahrenheit Subscribe
    this.form.controls.fahrenheit.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      this.fromF(this.fahrenheit?.value ?? '0');
    })
    //Celsius Subscribe
    this.form.controls.celsius.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      this.fromC(this.celsius?.value ?? '0.0');
    })
    //Kelvin Subscribe
    this.form.controls.kelvin.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      this.fromK(this.kelvin?.value ?? '0.00');
    })
  }

  //Getters
  get fahrenheit() {
    return this.form.get('fahrenheit');
  }

  get celsius() {
    return this.form.get('celsius');
  }

  get kelvin() {
    return this.form.get('kelvin');
  }

  //Set functions
  public setFahrenheit(value: string) {
    const roundedF = Math.round(Number(value));
    this.form.controls.fahrenheit.setValue(Number.isFinite(roundedF) ? roundedF.toFixed(0) : '0');
  }
 
  public setCelsius(value: string) {
    const cel = parseFloat(value);
    this.form.controls.celsius.setValue(Number.isFinite(cel) ? cel.toFixed(1) : '0.0');
  }

  public setKelvin(value: string) {
    const kel = parseFloat(value);
    this.form.controls.kelvin.setValue(Number.isFinite(kel) ? kel.toFixed(2) : '0.00');
  }

  public fromF(fahrenheit: string) {
    let cel = this.conversion.convertfromFtoC(fahrenheit);
    this.setCelsius(cel);
    let kel = this.conversion.convertfromCtoK(cel)
    this.setKelvin(kel);
  } 

  public fromC(celsius: string) {
    let fah = this.conversion.convertfromCtoF(celsius);
    this.setFahrenheit(fah);
    let kel = this.conversion.convertfromCtoK(celsius)
    this.setKelvin(kel);
  }

  public fromK(kelvin: string) {
    let cel = this.conversion.convertfromKtoC(kelvin);
    this.setCelsius(cel);
    let fah = this.conversion.convertfromCtoF(cel);
    this.setFahrenheit(fah);
  }

}
