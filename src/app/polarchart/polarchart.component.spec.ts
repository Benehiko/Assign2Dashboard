import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarchartComponent } from './polarchart.component';

describe('PolarchartComponent', () => {
  let component: PolarchartComponent;
  let fixture: ComponentFixture<PolarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
