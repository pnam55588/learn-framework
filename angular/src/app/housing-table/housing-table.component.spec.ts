import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingTableComponent } from './housing-table.component';

describe('HousingTableComponent', () => {
  let component: HousingTableComponent;
  let fixture: ComponentFixture<HousingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
