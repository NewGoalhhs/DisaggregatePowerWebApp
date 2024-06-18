import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedTrainingComponent } from './advanced-training.component';

describe('AdvancedTrainingComponent', () => {
  let component: AdvancedTrainingComponent;
  let fixture: ComponentFixture<AdvancedTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedTrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
