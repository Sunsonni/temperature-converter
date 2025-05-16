import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Button } from '../interfaces/button';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private eventSource = new Subject<Button>();

  event$ = this.eventSource.asObservable();

  sendMessage(item: Button) {
    this.eventSource.next(item);
  }

}
