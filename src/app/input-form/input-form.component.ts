import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged} from 'rxjs';
import { ConversionFunctions } from '../conversion-functions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TempButtonsComponent } from "./components/temp-buttons/temp-buttons.component";
import { CommonModule } from '@angular/common';
import { ColorChangerComponent } from './components/color-changer/color-changer.component';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  imports: [
    ReactiveFormsModule, 
    TempButtonsComponent, 
    ColorChangerComponent, 
    CommonModule
  ]
})

export class InputFormComponent implements OnInit {
  form;
  conversion = new ConversionFunctions;
  rawFahrenheit = '';
  hasRun = false;
  destroyRef = inject(DestroyRef);
  feelsLikeText = '';

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService) {
    this.form = this.formBuilder.group({
      fahrenheit: new FormControl('32', { updateOn: 'blur' }),
      celsius: new FormControl('0.0', { updateOn: 'blur' }),
      kelvin: new FormControl('273.15', { updateOn: 'blur' }),
    });
  }

  ngOnInit() {
  //Fahrenheit Subscribe
    this.form.controls.fahrenheit.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(x => {
          this.runConversion('f', this.fahrenheit?.value ?? '0');
      })

  //   //Celsius Subscribe
    this.form.controls.celsius.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef) 
      )
      .subscribe(x => {
        this.runConversion('c', this.celsius?.value ?? '0.0');
    })

  //   // //Kelvin Subscribe
    this.form.controls.kelvin.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(x => {
        this.runConversion('k', this.kelvin?.value ?? '0.00');
    })

    this.sharedService.event$.subscribe(x => {
      this.runConversion('f', x.default);
      // this.sharedService.emitToColor(this.feelsLikeText);
    })

    this.sharedService.text$.subscribe(x => {
      console.log("text subscribe is working " + x);
      this.feelsLikeText = x;
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
    this.form.controls.fahrenheit.patchValue((Number.isFinite(roundedF) ? roundedF.toFixed(0) : '0'), {emitEvent: false, onlySelf: true});
  }
 
  public setCelsius(value: string) {
    const cel = parseFloat(value);
    let item = (Number.isFinite(cel) ? cel.toFixed(1) : '0.0');
    this.form.controls.celsius.patchValue(item, {emitEvent: false, onlySelf: true});
  }

  public setKelvin(value: string) {
    const kel = parseFloat(value);
    this.form.controls.kelvin.patchValue((Number.isFinite(kel) ? kel.toFixed(2) : '0.00'), {emitEvent: false, onlySelf: true});
  }

  private fixedPlacement(value: string, fixedPlace: number) : string{
    return Number.isFinite(Number(value)) ? Number(value).toFixed(fixedPlace): (Number("0").toFixed(fixedPlace));
  }

  public setRawFahrenheitConversion(type: string, value: string) {
    switch (type) {
      case 'f':
        this.rawFahrenheit = this.fixedPlacement(value, 0);
        break;
      case 'c':
        this.rawFahrenheit = this.fixedPlacement(this.conversion.convertfromCtoF(value), 1);
        break;
      case 'k':
        this.rawFahrenheit = this.fixedPlacement(this.conversion.convertfromKtoF(value), 2);
        break;
      default:
        console.error("Unexpected type in setRawFahrenheitConversion", type);
        break;
    }
  }

  public runConversion(type: string, value: string) {
    this.hasRun = true;
    this.setRawFahrenheitConversion(type, value)
    this.sharedService.feelsLike(this.rawFahrenheit);
    // console.log(this.rawFahrenheit);
    let kel;
    let cel;
    switch(type) {
      case 'f':
        kel = this.conversion.convertfromFtoK(this.rawFahrenheit);
        this.setKelvin(kel);
        cel = this.conversion.convertfromFtoC(this.rawFahrenheit);
        this.setCelsius(cel);
        this.setFahrenheit(value)
        break;
      case 'c':
        kel = this.conversion.convertfromFtoK(this.rawFahrenheit);
        this.setKelvin(kel);
        this.setFahrenheit(this.rawFahrenheit);
        this.setCelsius(value);
        break;
      case 'k':
        cel = this.conversion.convertfromFtoC(this.rawFahrenheit);
        this.setCelsius(cel);
        this.setFahrenheit(this.rawFahrenheit);
        this.setKelvin(value);
        break;
      default:
        console.error("Unexpected type in runConversion", type);
    }
  }
}
