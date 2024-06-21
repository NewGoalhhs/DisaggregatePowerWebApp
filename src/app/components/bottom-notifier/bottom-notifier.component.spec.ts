import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNotifierComponent } from './bottom-notifier.component';

describe('BottomNotifierComponent', () => {
  let component: BottomNotifierComponent;
  let fixture: ComponentFixture<BottomNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNotifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
