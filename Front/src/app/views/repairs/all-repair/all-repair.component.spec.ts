import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRepairComponent } from './all-repair.component';

describe('AllRepairComponent', () => {
  let component: AllRepairComponent;
  let fixture: ComponentFixture<AllRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
