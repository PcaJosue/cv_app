import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCVComponent } from './create-cv.component';

describe('CreateCVComponent', () => {
  let component: CreateCVComponent;
  let fixture: ComponentFixture<CreateCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
