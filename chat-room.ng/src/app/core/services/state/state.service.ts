import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state = {};

  constructor() {}

  get<T = any>(key: number): T {
    return this.state[key];
  }

  set<T>(key: number, value: T) {
    this.state[key] = value;
  }

  clear() {
    this.state = {};
  }
}

export enum SessionKeys {
  User = 2
}
