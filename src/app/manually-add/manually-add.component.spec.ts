import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuallyAddComponent } from './manually-add.component';

describe('ManuallyAddComponent', () => {
  let component: ManuallyAddComponent;
  let fixture: ComponentFixture<ManuallyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuallyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuallyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
