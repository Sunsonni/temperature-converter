import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private eventSource = new Subject<string>();

  event$ = this.eventSource.asObservable();

  sendMessage(name: string) {
    this.eventSource.next(name);
  }

}
