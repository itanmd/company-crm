import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';
import { Customer, FilePath } from '../shared/types';
import { EditDialogComponent } from './edit/edit.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;
  displayedColumns = [
    'id',
    'first_name',
    'last_name',
    'phone',
    'email',
    'actions',
  ];
  searchFieldValue!: string;
  searchTerm!: string;

  showForm = false;
  showNotification = false;

  customerForm = new FormGroup({
    first_name: new FormControl('', {
      validators: Validators.required,
    }),
    last_name: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', {
      validators: Validators.required,
    }),
  });

  onSumbit() {
    if (!this.customerForm.valid) {
      return;
    }

    if (
      !this.customerForm.value.first_name ||
      !this.customerForm.value.last_name ||
      !this.customerForm.value.email ||
      !this.customerForm.value.phone
    ) {
      throw Error('invalid body');
    }

    const customer = {
      first_name: this.customerForm.value.first_name,
      last_name: this.customerForm.value.last_name,
      email: this.customerForm.value.email,
      phone: this.customerForm.value.phone,
    };

    this.apiService.addCustomer(customer).subscribe({
      next: (data: Customer) => {
        this.getCustomers();
        this.showNotification = true;
      },
      error: (err) => console.error(err),
    });
  }

  deleteItem(customerId: number) {
    this.apiService.deleteCustomer(customerId).subscribe({
      next: (customer: Customer) => true,
      error: (err) => console.error(err),
    });
  }

  startEdit(customer: Customer) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        id: customer.id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        email: customer.email,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!this.customers) return;
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.customers.findIndex(
          (x) => x.id === customer.id
        );
      }
    });
  }

  notificationClosed(state: boolean) {
    this.showForm = false;
    this.customerForm.reset();
    this.showNotification = state;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.apiService.getCustomersList().subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
      },
      error: (err) => console.error(err),
      // complete: () => console.log(`complete`)
    });
  }

  clearSearch() {
    this.searchFieldValue = '';
    this.getCustomers();
  }
}
