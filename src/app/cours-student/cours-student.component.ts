import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { Cours } from '../model/cours';
import { CoursService } from '../service/cours.service';

@Component({
  selector: 'app-cours-student',
  templateUrl: './cours-student.component.html',
  styleUrls: ['./cours-student.component.css']
})
export class CoursStudentComponent implements OnInit {

  public listofcours: Array<Cours> = new Array()
  public className!: string
  public classDate!: string
  public classDescription!: string
  public classbranch!: string
  public classId!: number
  public classImage!: number

  constructor(private coursservice: CoursService, private rout: ActivatedRoute) {
    this.rout.queryParams.subscribe(params => {
      this.classId = params["id"]
      this.className = params["name"]
      this.classDate = params["date"]
      this.classDescription = params["des"]
      this.classbranch = params["branch"]
      this.classImage = params["image"]
    });
  }

  ngOnInit(): void {
    setTimeout(
      () => this.getcours()
    )
  }

  getcours() {
    this.coursservice.getCours(this.classId).subscribe(
      res => this.getData(JSON.parse(res) as Array<Cours>)
    )
  }

  getData(res: Array<Cours>) {
    for (const element of res) {
      this.listofcours.push(element)
    }
  }

  download(pdf_name: string) {
    this.coursservice.download(pdf_name).subscribe(
      blob => {
        //saveAs(blob, pdf_name)
        var file = new Blob([blob], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    )
  }


}
