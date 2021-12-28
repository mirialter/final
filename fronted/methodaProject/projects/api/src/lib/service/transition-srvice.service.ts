import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransitionSrviceService {

  constructor(private http: HttpClient) { }
  options={
    headers:new HttpHeaders({'content-Type':'application/json'})
  };
  url = 'http://localhost:5800'

  dalateAllDataStatus():Observable<any[]>{
    return this.http.get<any>(`${this.url}/api/transition/dalateAllDataStatus`)
  }
  
  getAlltransition():Observable<any[]>{
    return this.http.get<any>(`${this.url}/api/transition/getAllDatatransition`)
  }
  addTarnsition(query:object):Observable<any[]>{
    return this.http.post<any>(`${this.url}/api/transition/addtransition`,query,this.options)
  }
  // deletaOneTransition(query:object):Observable<any[]>{
  //   return this.http.post<any>(`${this.url}/api/transition/deleteOneStatus`,query,this.options)
  // }
  deleteOneStatus(query:object):Observable<any[]>{
    return this.http.post<any>(`${this.url}/api/transition/deleteOneStatus`,query,this.options)
  }
  

}
