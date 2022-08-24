export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  country_id: number;
  country_name: string;
  country_code: string;
}

export interface AddCustomer {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  country_id?: number | null;
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
