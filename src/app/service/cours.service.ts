import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours } from '../model/cours';
import { Editcours } from '../model/editcours';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private url: string = "http://localhost:8080/api/cours"
  private user_id = window.sessionStorage.getItem("user_id")
  private token = window.sessionStorage.getItem("token") as string

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token

    }),
    responseType: 'text' as 'json',

  };



  constructor(private http: HttpClient) { }

  getCours(id_class: number): Observable<any> {
    return this.http.get(this.url + "/getCourses/" + id_class, this.httpOptions)
  }

  addcours(cours: Cours): Observable<any> {
    return this.http.post(this.url + "/addcours", cours, this.httpOptions)
  }


  uploadPdf(file: FormData): Observable<any> {
    return this.http.post(this.url + "/uploadPdfcours", file, this.httpOptions)
  }

  download(pdf: string): Observable<Blob> {

    return this.http.get("http://localhost:8080/api/cours/DownloadPDfcours/" + pdf, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: "blob"
    })


  }

  editcours(cours: Editcours): Observable<any> {
    return this.http.put(this.url + "/addcours", cours, this.httpOptions)
  }

  removecours(id_cours: number): Observable<any> {
    return this.http.delete(this.url + "/removeCours/" + id_cours, this.httpOptions)
  }
}
