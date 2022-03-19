import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TESTING_CONSTANTS } from '../constants/test-constants';
import { SharedModule } from '../shared.module';
import { BreadcrumbComponent } from './breadcrumb.component';

const {
  COUNTRY_NAME

} = TESTING_CONSTANTS

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      imports: [SharedModule, RouterTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    component.routes$ = of([COUNTRY_NAME])

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display countries breadcrumb', () => {

    const breadcrumbLink = fixture.debugElement.query(By.css('a[data-test="breadcrumb-link"]')).nativeElement
    expect(breadcrumbLink.innerText.trim()).toBe(COUNTRY_NAME)


  });
});
