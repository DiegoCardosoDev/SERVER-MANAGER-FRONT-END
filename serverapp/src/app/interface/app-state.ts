import { Data } from "@angular/router";

export interface AppState<T> {

  dataState: Data;
  appData?: T;
  error?: string;
}
