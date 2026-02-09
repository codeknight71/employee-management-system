import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Mock API endpoint - you can replace with real backend later
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  
  // Local storage for demo purposes
  private employees: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      salary: 85000,
      joinDate: '2022-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      salary: 75000,
      joinDate: '2021-06-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      department: 'HR',
      position: 'HR Specialist',
      salary: 60000,
      joinDate: '2023-03-10'
    }
  ];

  constructor(private http: HttpClient) {}

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  // Get employee by ID
  getEmployeeById(id: number): Observable<Employee | undefined> {
    const employee = this.employees.find(emp => emp.id === id);
    return of(employee);
  }

  // Add new employee
  addEmployee(employee: Employee): Observable<Employee> {
    employee.id = this.employees.length > 0 
      ? Math.max(...this.employees.map(e => e.id)) + 1 
      : 1;
    this.employees.push(employee);
    return of(employee);
  }

  // Update employee
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = { ...employee, id };
    }
    return of(employee);
  }

  // Delete employee
  deleteEmployee(id: number): Observable<boolean> {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
