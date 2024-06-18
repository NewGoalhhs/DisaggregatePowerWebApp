import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedPredictingComponent } from './advanced-predicting.component';

describe('AdvancedPredictingComponent', () => {
  let component: AdvancedPredictingComponent;
  let fixture: ComponentFixture<AdvancedPredictingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedPredictingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedPredictingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
