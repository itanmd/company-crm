import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { EditCustomer, Customer } from '../../shared/types';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'edit.dialog',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: EditCustomer,
    public apiService: ApiService
  ) {}

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.apiService.editCustomer(this.customer).subscribe({
      next: (data: Customer) => data,
      error: (err) => console.error(err),
    });
  }
}
