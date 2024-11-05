import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsPageComponent } from './steps-page.component';
import { appConfig } from '@app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';

describe('StepsPageComponent', () => {
  let component: StepsPageComponent;
  let fixture: ComponentFixture<StepsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsPageComponent],
      providers: [...appConfig.providers,[provideRouter(routes)]]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
