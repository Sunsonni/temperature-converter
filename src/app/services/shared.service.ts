import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private eventSource = new Subject<string>();

  event$ = this.eventSource.asObservable();

  sendMessage(message: string) {
    this.eventSource.next(message);
  }

}
