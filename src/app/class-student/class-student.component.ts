import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Class } from '../model/class';
import { Responce } from '../model/responce';
import { ClassService } from '../service/class.service';
import { TosterComponent } from '../toster/toster.component';

@Component({
  selector: 'app-class-student',
  templateUrl: './class-student.component.html',
  styleUrls: ['./class-student.component.css']
})
export class ClassStudentComponent implements OnInit {

  hide = true;
  showFiller = false;
  invalid_code = false;
  class_aleardy_added = false;
  listofclass!: Array<Class>

  form_class = new FormGroup({
    code: new FormControl()
  })

  @ViewChild('closebutton') closebutton: any;


  constructor(private classService: ClassService,
    private rout: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    setTimeout(
      () => this.getClass()
    )
  }

  getClass() {
    this.classService.getClassesByStudent().subscribe(
      res => this.getData(JSON.parse(res.toString()) as Array<Class>)
    )
  }

  getData(res: Array<Class>) {
    this.listofclass = new Array()
    for (const element of res) {
      this.listofclass.push(element)
    }
  }


  addClass() {
    this.classService.addClassformStudent(this.form_class.value.code).subscribe(
      res => this.check(JSON.parse(res) as Responce)
    )
  }

  check(res: Responce) {
    if (res.status == 200) {
      this.rout.navigate(["ClassStudent"])
      this.invalid_code = false
      this.closebutton.nativeElement.click();
      this.getClass()
      this._snackBar.openFromComponent(TosterComponent, {
        duration: 1000,
      });
    }
    else if (res.status == 500) {
      this.class_aleardy_added = true
    }
    else {
      this.invalid_code = true
    }
  }


  removeClasses(id_class: number) {
    this.classService.removeClassByStudent(id_class).subscribe(
      res => {
        this.getClass()
      }
    )

  }

  goTocours(classe: Class) {
    this.rout.navigate(["cours_student"], { queryParams: { id: classe.id, image: classe.image, name: classe.name, date: classe.date_created, des: classe.description, branch: classe.branch } })

  }

  dismissErrpr() {
    this.invalid_code = false
    this.class_aleardy_added = false
  }



}
