import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.css'
})
export class EmployeeCardComponent {
  @Input() employee!: Employee;
  @Output() deleteEmployee = new EventEmitter<number>();

  onDelete(): void {
    if (confirm(`Are you sure you want to delete ${this.employee.name}?`)) {
      this.deleteEmployee.emit(this.employee.id);
    }
  }
}
