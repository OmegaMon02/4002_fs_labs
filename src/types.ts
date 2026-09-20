export interface Employee {
  title?: string;
  firstName: string;
  lastName: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}