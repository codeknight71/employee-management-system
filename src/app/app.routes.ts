import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail';
import { EmployeeFormComponent } from './components/employee-form/employee-form';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'employee/:id', component: EmployeeDetailComponent },
  { path: 'add-employee', component: EmployeeFormComponent },
  { path: 'edit-employee/:id', component: EmployeeFormComponent },
  { path: '**', redirectTo: '' }
];
