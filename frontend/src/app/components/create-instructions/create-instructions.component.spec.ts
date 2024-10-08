import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstructionsComponent } from './create-instructions.component';

describe('CreateInstructionsComponent', () => {
  let component: CreateInstructionsComponent;
  let fixture: ComponentFixture<CreateInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInstructionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
