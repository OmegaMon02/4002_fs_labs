export interface Employee {
  title?: string;
  firstName: string;
  lastName: string;
}

export interface Role {
  firstName: string;
  lastName: string;
  role: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}