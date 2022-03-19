import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared.module';

import { ErrorStateComponent } from './error-state.component';

const ERROR_MSG = 'Error message'

describe('ErrorStateComponent', () => {
  let component: ErrorStateComponent;
  let fixture: ComponentFixture<ErrorStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [ErrorStateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorStateComponent);
    component = fixture.componentInstance;
    component.msg = ERROR_MSG
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display error message', () => {
    const errorMessage = fixture.debugElement.query(By.css('p[data-test="error-message"]')).nativeElement
    expect(errorMessage.innerText).toBe(ERROR_MSG)
  });

});
