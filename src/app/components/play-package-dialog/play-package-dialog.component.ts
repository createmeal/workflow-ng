import { Component, inject, model} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-play-package-dialog',
  standalone: true,
  imports: [SharedModule,MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './play-package-dialog.component.html',
  styleUrl: './play-package-dialog.component.scss'
})
export class PlayPackageDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<PlayPackageDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly id = model(this.data.id);

  onNoClick(): void {
    this.dialogRef.close({id: this.id, answer: false});
  }
  onYesClick(): void {
    this.dialogRef.close({id: this.id, answer: true});
  }
}
