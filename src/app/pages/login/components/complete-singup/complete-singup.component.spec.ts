import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteSingupComponent } from './complete-singup.component';

describe('CompleteSingupComponent', () => {
  let component: CompleteSingupComponent;
  let fixture: ComponentFixture<CompleteSingupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteSingupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
