import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesignerPageComponent } from './designer-page.component';
import { appConfig } from '../../app.config';

describe('DesignerPageComponent', () => {
  let component: DesignerPageComponent;
  let fixture: ComponentFixture<DesignerPageComponent>;

  beforeEach(async () => {        
    await TestBed.configureTestingModule({
      imports: [DesignerPageComponent],
      providers: appConfig.providers
    }).compileComponents();

    fixture = TestBed.createComponent(DesignerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
