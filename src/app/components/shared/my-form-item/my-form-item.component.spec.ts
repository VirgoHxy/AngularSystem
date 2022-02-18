import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormItemComponent } from './my-form-item.component';

describe('MyFormItemComponent', () => {
  let component: MyFormItemComponent;
  let fixture: ComponentFixture<MyFormItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFormItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
