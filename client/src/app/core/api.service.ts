import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Login,
  RegisterUser,
  User,
  FilePath,
  Customer,
  EditCustomer,
  DeleteCustomer,
} from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token = localStorage.getItem('token') || '';

  setToken(value: string) {
    this.token = value;
  }

  constructor(private http: HttpClient) {}

  getCustomersList(): Observable<Array<Customer>> {
    // return this.http.get<Array<Customer>>(`${environment.serverUrl}/customers`);
    return this.GET<Array<Customer>>(`customers`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.POST<Customer>(`customers`, customer);
  }

  editCustomer(customer: EditCustomer): Observable<Customer> {
    return this.PUT<Customer>(`customers/${customer.id}`, customer);
  }

  deleteCustomer(id: number) {
    return this.DELETE<Customer>(`customers/${id}`);
  }

  login(details: Login): Observable<User> {
    return this.POST<User>(`login`, details);
  }

  register(user: RegisterUser): Observable<User> {
    return this.POST<User>(`register`, user);
  }

  GET<T>(url: string): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}/${url}`, {
      headers: { 'x-auth-token': this.token },
    });
  }

  PUT<T>(url: string, data: EditCustomer): Observable<T> {
    return this.http.put<T>(`${environment.serverUrl}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      },
    });
  }

  POST<T>(url: string, data: object): Observable<T> {
    return this.http.post<T>(`${environment.serverUrl}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      },
    });
  }

  DELETE<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${environment.serverUrl}/${url}`, {
      headers: {
        'x-auth-token': this.token,
      },
    });
  }
}
