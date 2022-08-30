export interface Customer {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface EditCustomer {
  id: number;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
}

export interface FilePath {
  name: string;
}

export interface Login {
  email?: string | null;
  password?: string | null;
}

export interface User {
  token?: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface RegisterUser {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface NavItem {
  title: string;
  icon: string;
  link?: string;
}
