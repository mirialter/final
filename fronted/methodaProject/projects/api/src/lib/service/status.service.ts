import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }
  options={
    headers:new HttpHeaders({'content-Type':'application/json'})
  };
  url = 'http://localhost:5800'

  getAllStatus():Observable<any[]>{
    return this.http.get<any>(`${this.url}/api/status/getAllDataStatus`)
  }

  addStatus(query:object):Observable<any[]>{
    return this.http.post<any[]>(`${this.url}/api/status/addStatus`,query,this.options)
  }
  deleteAllStatus():Observable<any[]>{
    return this.http.get<any>(`${this.url}/api/status/dalateAllDataStatus`)
  }
  updateStatus(query:object):Observable<any[]>{
    return this.http.post<any>(`${this.url}/api/status/updateStatus`,query,this.options)
  }
  deleteOneStatus(query:object):Observable<any[]>{
    return this.http.post<any>(`${this.url}/api/status/deleteOneStatus`,query,this.options)
  }

}
