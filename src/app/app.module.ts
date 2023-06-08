import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassTeacherComponent } from './class-teacher/class-teacher.component';
import { ClassStudentComponent } from './class-student/class-student.component';
import { CoursStudentComponent } from './cours-student/cours-student.component';
import { CoursTeacherComponent } from './cours-teacher/cours-teacher.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomHttpInterceptor } from './service/custom-http-interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TosterComponent } from './toster/toster.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    ClassTeacherComponent,
    ClassStudentComponent,
    CoursStudentComponent,
    CoursTeacherComponent,
    TosterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ClipboardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
