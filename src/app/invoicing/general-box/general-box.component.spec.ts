import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBoxComponent } from './general-box.component';

describe('GeneralBoxComponent', () => {
  let component: GeneralBoxComponent;
  let fixture: ComponentFixture<GeneralBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
