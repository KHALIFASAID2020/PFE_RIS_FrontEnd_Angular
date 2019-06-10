import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  private _pusher: any;

  constructor() {

    this._pusher = new Pusher('144b1383f3c610a0f830', {
      cluster: 'eu',
      encrypted: true
    });
  }
  // any time it is needed we simply call this method
  getPusher() {
    return this._pusher;
  }
}
