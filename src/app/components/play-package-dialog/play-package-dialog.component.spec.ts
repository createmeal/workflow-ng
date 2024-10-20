import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPackageDialogComponent } from './play-package-dialog.component';

describe('PlayPackageDialogComponent', () => {
  let component: PlayPackageDialogComponent;
  let fixture: ComponentFixture<PlayPackageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayPackageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayPackageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
