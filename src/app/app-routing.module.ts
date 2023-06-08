import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ClassStudentComponent } from './class-student/class-student.component';
import { ClassTeacherComponent } from './class-teacher/class-teacher.component';
import { CoursStudentComponent } from './cours-student/cours-student.component';
import { CoursTeacherComponent } from './cours-teacher/cours-teacher.component';
import { HomeComponent } from './home/home.component';
import { AuthduardGuard } from './security/authduard.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "Auth", component: AuthComponent },
  { path: "ClassStudent", component: ClassStudentComponent, canActivate: [AuthduardGuard] },
  { path: "ClassTecher", component: ClassTeacherComponent, canActivate: [AuthduardGuard] },
  { path: "cours_student", component: CoursStudentComponent, canActivate: [AuthduardGuard] },
  { path: "cours_teacher", component: CoursTeacherComponent, canActivate: [AuthduardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
