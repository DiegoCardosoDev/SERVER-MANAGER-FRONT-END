import { catchError } from 'rxjs/operators';
import { DataState } from './enum/data-state.enum';
import {  map, Observable, of, startWith } from 'rxjs';
import { AppState } from './interface/app-state';
import { Component, OnInit } from '@angular/core';
import { ServerService } from './service/server.service';
import { CustomResponse } from './interface/custom-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  appState$: Observable<AppState<CustomResponse>>;
  constructor(private serverService: ServerService){}

  ngOnInit(): void {

    this.appState$ = this.serverService.servers$

    .pipe(
      map( response =>{

        return { dataState: DataState.LOADED_STATE, appState: response}
      }),
      startWith({dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        return of({dataState: DataState.ERROR_STATE, error: error})
      })
    )
  }

}
