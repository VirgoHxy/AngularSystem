/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBodyComponent } from './my-body.component';

describe('MyBodyComponent', () => {
  let component: MyBodyComponent;
  let fixture: ComponentFixture<MyBodyComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ MyBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});