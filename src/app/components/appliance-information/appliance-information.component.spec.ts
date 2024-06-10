import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceInformationComponent } from './appliance-information.component';

describe('ApplianceInformationComponent', () => {
  let component: ApplianceInformationComponent;
  let fixture: ComponentFixture<ApplianceInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplianceInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplianceInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
