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

  //listar todos
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

  //esse metodo filtra os servidores por ativo ou inativo
  filter$ = (status:  Status, response: CustomResponse) => <Observable<CustomResponse>>
  new Observable<CustomResponse>(
    suscriber  => {
      console.log(response);
      suscriber.next(
        status ===  Status.ALL ? {...response, message: ` Fiulter servers by ${status} status`} :
        {
          ...response,
           message: response.data.servers.
           filter(server  => server.status === status).length > 0 ? `servers filtred  by
           ${status == Status.SERVER_UP ? 'SERVER_UP':  'SERVER_DOWN'} status` : `no servers of ${status} found`,
           data:{servers: response.data.servers.filter(server  => server.status === status) }
        }
      );
      suscriber.complete();
    }
  )
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );


  //metodo para deletar um servidor
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
