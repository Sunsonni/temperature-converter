import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Button } from '../interfaces/button';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private eventSource = new Subject<Button>();
  private barColor = new Subject<String>();
  event$ = this.eventSource.asObservable();
  color$ = this.eventSource.asObservable();

  sendMessage(item: Button) {
    this.eventSource.next(item);
  }

  emitToService(item: Button) {
    this.eventSource.next(item);
  }

  emitToParent(item: Button) {
    this.eventSource.next(item);
  }

  emitToColor(barColor: string) {
    this.barColor.next(barColor);
  }

}
