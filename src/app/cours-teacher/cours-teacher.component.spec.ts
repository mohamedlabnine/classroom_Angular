import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursTeacherComponent } from './cours-teacher.component';

describe('CoursTeacherComponent', () => {
  let component: CoursTeacherComponent;
  let fixture: ComponentFixture<CoursTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
