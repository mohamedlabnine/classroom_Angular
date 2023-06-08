import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Class } from '../model/class';
import { ResponceLogin } from '../model/responce-login';
import { ClassService } from '../service/class.service';
import { TosterComponent } from '../toster/toster.component';

@Component({
  selector: 'app-class-teacher',
  templateUrl: './class-teacher.component.html',
  styleUrls: ['./class-teacher.component.css']
})
export class ClassTeacherComponent implements OnInit {
  public image = ["img1.png", "img2.png", "img3.png", "img4.png",
    "img5.png", "img6.png", "img7.jpeg", "img8.jpeg",
    "img9.jpeg", "img10.jpeg"]

  public listofclass: Array<Class> | undefined

  public valid_form = true

  //form of add class
  form = new FormGroup({
    name: new FormControl(),
    branch: new FormControl(),
    description: new FormControl()
  })

  @ViewChild('closebutton') closebutton: any;


  constructor(private classService: ClassService,
    private rout: Router,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    setTimeout(
      () => {
        this.getClasses()
      }
    )
  }

  addClass() {
    var name = this.form.value.name
    var image = this.image[Math.floor(Math.random() * 10)]
    var branch = this.form.value.branch
    var des = this.form.value.description
    if (name != null && image != null && branch != null && des != null) {
      var classe = new Class(this.form.value.name, image, this.form.value.branch, this.form.value.description)
      this.classService.addClassformTeacher(classe as Class).subscribe(
        res => {
          this.getClasses()
          this.closebutton.nativeElement.click()
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


  getClasses() {
    this.listofclass = new Array()
    this.classService.getClassesByTeacher().subscribe(
      res => this.getData(JSON.parse(res.toString()) as Array<Class>)
    )
  }

  getData(res: Array<Class>) {
    for (const element of res) {
      this.listofclass?.push(element)
    }
    console.log(res)
  }

  removeClasses(id_class: number) {
    this.classService.removeClassByTeacher(id_class).subscribe(
      res => this.getClasses()
    )

  }

  gotTocourses(id: number) {
    this.rout.navigate(["cours_teacher"], { queryParams: { id_class: id } })
  }


}
