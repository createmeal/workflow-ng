import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPackageDialogComponent } from './play-package-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('PlayPackageDialogComponent', () => {
  let component: PlayPackageDialogComponent;
  let fixture: ComponentFixture<PlayPackageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayPackageDialogComponent],
      providers:[
        {
          provide: MatDialogRef,
          useValue: {}
        }, { provide: MAT_DIALOG_DATA, useValue: {} }]
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
