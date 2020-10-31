import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  private url: string = "http://localhost:44444/api/values/";

  get(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.url);
  }

  put(id: number, msg: string): Observable<Message> {
    return this.httpClient.put<Message>(this.url + id, {msg:msg});
  }

  post(msg: string): Observable<Message> {
    return this.httpClient.post<Message>(this.url, {msg:msg});
  }

  delete(id: number): Observable<{}> {
    return this.httpClient.delete(this.url + id);
  }
}
