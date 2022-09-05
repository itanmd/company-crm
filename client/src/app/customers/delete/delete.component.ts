import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { DeleteCustomer, Customer } from '../../shared/types';

@Component({
  selector: 'delete.dialog',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: { id: number },
    public apiService: ApiService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log('id', this.id);

    this.apiService.deleteCustomer(this.id.id).subscribe({
      next: (customer: Customer) => true,
      error: (err) => console.error(err),
    });
  }
}
