import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Cours } from '../model/cours';
import { CoursService } from '../service/cours.service';
import { TosterComponent } from '../toster/toster.component';

@Component({
  selector: 'app-cours-teacher',
  templateUrl: './cours-teacher.component.html',
  styleUrls: ['./cours-teacher.component.css']
})

export class CoursTeacherComponent implements OnInit {

  public listOfCours: Array<Cours> | undefined
  public id_class !: number
  private file !: File
  public valid_form = true
  public validPdf = true


  form_cours = new FormGroup({
    name: new FormControl(),
    pdf: new FormControl(),
    description: new FormControl()
  })

  @ViewChild('closebutton') closebutton: any;


  constructor(private rout: ActivatedRoute,
    private coursservice: CoursService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    setTimeout(
      () => {
        this.getIdClassByRout()
      }
    )
  }

  getIdClassByRout() {
    this.rout.queryParams.subscribe(
      params => {
        this.id_class = params["id_class"]
        this.getCourses(this.id_class)
      }
    )
  }

  getCourses(id: number) {
    this.coursservice.getCours(id).subscribe(
      res => this.getData(JSON.parse(res) as Array<Cours>)
    )
  }

  getData(courses: Array<Cours>) {
    this.listOfCours = new Array<Cours>
    for (const cours of courses) {
      this.listOfCours.push(cours)
    }
  }



  addcours() {
    if (this.validPdf) {
      var name = this.form_cours.value.name
      var des = this.form_cours.value.description
      var pdf = this.form_cours.value.pdf
      if (name != null && des != null && pdf != null) {
        var cours = new Cours(this.id_class, name, this.file.name, des)
        this.coursservice.addcours(cours).subscribe(
          res => {
            this.uploadpdf()
            this.getIdClassByRout()
            this.closebutton.nativeElement.click();
            this._snackBar.openFromComponent(TosterComponent, {
              duration: 1000,
            });
          }
        )

      }
      else {
        this.valid_form = false
      }

    }
    else {
      this.valid_form = false
    }

  }

  uploadpdf() {
    var data = new FormData()
    data.append("file", this.file)
    this.coursservice.uploadPdf(data).subscribe(
      res => console.log(res)
    )
  }

  getPdfFile(event: any) {
    if (event.target.files && event.target.files.length) {
      let name: string = event.target.files[0].name
      let extention: string = name.split(".")[name.split(".").length - 1]
      if (extention == "pdf") {
        this.file = event.target.files[0]
        this.validPdf = true
      }
      else {
        this.validPdf = false
      }

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

  removecours(id_cours: number) {
    if (confirm("Are you sure you want to delete this cours")) {
      this.coursservice.removecours(id_cours).subscribe(
        res => {
          this.getIdClassByRout()
        }
      )
    }
  }
  dismissError() {
    this.valid_form = true
  }

}




