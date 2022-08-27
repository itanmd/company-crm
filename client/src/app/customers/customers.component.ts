import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';
import { Customer, FilePath } from '../shared/types';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;

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

    this.apiService.addCustomer(this.customerForm.value).subscribe({
      next: (data: Customer) => {
        this.getCustomers();
        this.showNotification = true;
      },
      error: (err) => console.error(err),
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

  constructor(private apiService: ApiService) {}

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
