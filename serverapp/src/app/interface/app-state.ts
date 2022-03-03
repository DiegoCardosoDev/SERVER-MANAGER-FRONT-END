import { DataState } from './../enum/data-state.enum';
import { Data } from "@angular/router";

export interface AppState<T> {

  dataState: DataState;
  appData?: T;
  error?: string;
}
