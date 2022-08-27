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
  AddCustomer,
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

  addCustomer(customer: AddCustomer): Observable<Customer> {
    return this.POST<Customer>(`customers`, customer);
  }

  // editCustomer(customer: AddCustomer, id: number): Observable<Customer> {
  //   return this.PUT<Customer>(`customers/${id}`, customer);
  // }

  // deleteCustomer(id: number) {
  //   return this.DELETE<Customer>(`customers/${id}`);
  // }

  login(details: Login): Observable<User> {
    return this.POST<User>(`login`, details);
  }

  register(user: RegisterUser): Observable<User> {
    return this.POST<User>(`register`, user);
  }

  // deleteCustomer(id: number): Observable<Customer> {
  //   return this.http.delete<Customer>(
  //     ${environment.serverUrl}/customers?id=${id},
  //     {
  //       headers: { 'x-auth-token': this.token },
  //     }
  //   );
  // }

  // updateCustomer(customer: Customer): Observable<Customer> {
  //   return this.http.put<Customer>(
  //     ${environment.serverUrl}/customers,
  //     customer,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-auth-token': this.token,
  //       },
  //     }
  //   );
  // }

  GET<T>(url: string): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}/${url}`, {
      headers: { 'x-auth-token': this.token },
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
}
