import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairClientComponent } from './repair-client.component';

describe('RepairClientComponent', () => {
  let component: RepairClientComponent;
  let fixture: ComponentFixture<RepairClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
