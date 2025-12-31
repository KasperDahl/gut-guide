// confirm-dialog.component.ts
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Delete Recipe</h2>
    <mat-dialog-content>
      <p>
        Are you sure you want to delete this recipe? This action cannot be
        undone.
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">
        Delete
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        padding: 20px 0;
      }
    `,
  ],
})
export class DeleteRecipeDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteRecipeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
