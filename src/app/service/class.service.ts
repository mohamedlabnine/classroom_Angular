import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from '../model/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private url: string = "http://localhost:8080/api/class"
  private user_id = window.sessionStorage.getItem("user_id")
  private token = window.sessionStorage.getItem("token") as string

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
    }),
    responseType: 'text' as 'json'
  };


  constructor(private http: HttpClient) { }

  addClassformTeacher(classe: Class): Observable<Object> {
    classe.id_Teacher = this.user_id as unknown as number;
    return this.http.post(this.url + "/addclassfromTeacher", classe, this.httpOptions)
  }

  getClassesByTeacher(): Observable<Object> {
    return this.http.get(this.url + "/getClassesForTeacher/" + this.user_id, this.httpOptions)
  }

  removeClassByTeacher(id_class: number): Observable<Object> {
    return this.http.delete(this.url + "/removeClassbyTeacher/" + id_class, this.httpOptions)
  }

  addClassformStudent(code: string): Observable<any> {
    return this.http.post(this.url + "/addclassfromStudent", { id_Student: this.user_id, code: code }, this.httpOptions)

  }

  getClassesByStudent(): Observable<Object> {
    return this.http.get(this.url + "/getClassesStudent/" + this.user_id, this.httpOptions)
  }

  removeClassByStudent(id_class: number): Observable<Object> {
    return this.http.post(this.url + "/removeClassfromStudent", { id_Student: this.user_id, id_classe: id_class }, this.httpOptions)
  }



}
