import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileClientComponent } from './mobile-client.component';

describe('MobileClientComponent', () => {
  let component: MobileClientComponent;
  let fixture: ComponentFixture<MobileClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
