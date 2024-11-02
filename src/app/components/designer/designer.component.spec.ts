import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerComponent } from './designer.component';
import { appConfig } from '../../app.config';

describe('DesignerComponent', () => {
  let component: DesignerComponent;
  let fixture: ComponentFixture<DesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignerComponent],
      providers: appConfig.providers
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
