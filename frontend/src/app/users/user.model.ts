export interface UserInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  full_name?: string
  is_admin: boolean;
}

export interface User {
    email: string,
    password: string
}
