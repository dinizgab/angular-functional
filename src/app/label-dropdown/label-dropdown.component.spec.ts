import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelDropdownComponent } from './label-dropdown.component';

describe('LabelDropdownComponent', () => {
  let component: LabelDropdownComponent;
  let fixture: ComponentFixture<LabelDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
