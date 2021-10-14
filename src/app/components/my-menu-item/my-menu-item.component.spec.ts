/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMenuItemComponent } from './my-menu-item.component';

describe('MyMenuItemComponent', () => {
  let component: MyMenuItemComponent;
  let fixture: ComponentFixture<MyMenuItemComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ MyMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
