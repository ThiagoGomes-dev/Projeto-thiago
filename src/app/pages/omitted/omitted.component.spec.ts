import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmittedComponent } from './omitted.component';

describe('OmittedComponent', () => {
  let component: OmittedComponent;
  let fixture: ComponentFixture<OmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmittedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
