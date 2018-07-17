import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEnumerateComponent } from './ngx-enumerate.component';

describe('NgxEnumerateComponent', () => {
  let component: NgxEnumerateComponent;
  let fixture: ComponentFixture<NgxEnumerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxEnumerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEnumerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
