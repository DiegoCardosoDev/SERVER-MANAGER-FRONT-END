import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Status } from '../enum/status.enum';
import { CustomResponse } from '../interface/custom-response';
import { Server } from '../interface/server';

@Injectable({ providedIn: 'root'})
export class ServerService {


  private readonly apiUrl = 'any';

  constructor(private http: HttpClient) { }

  //listar
  servers$ =  <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)

  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  //salvar um servidos
  save$ = (server:  Server) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)

  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  //pingar
  ping$ = (ipAndress:  string) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAndress}`)

  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );


  delete$ = (serverId:  number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)

  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );



 private handleError(error: HttpErrorResponse): Observable<never> {
   console.log(error);
    return throwError(`ocorreu um erro - code: ${error.status}`);
  }






}
