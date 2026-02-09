# Employee Management System

A modern Angular web application for managing employee records with full CRUD operations, routing, and reusable components.

## Features

### Core Functionality
- **CRUD Operations**: Create, Read, Update, and Delete employee records
- **Routing**: Navigate between list, detail, and form views
- **Search & Filter**: Real-time search across employee data
- **Responsive Design**: Works on desktop and mobile devices

### Technical Implementation

#### 1. Component Architecture
- **Reusable Components**: 
  - `EmployeeCardComponent` - Displays employee summary
  - `EmployeeListComponent` - Shows all employees with search
  - `EmployeeDetailComponent` - Full employee information
  - `EmployeeFormComponent` - Add/Edit employee (template-driven)

#### 2. Parent-Child Communication
- **@Input**: Pass employee data from list to card component
- **@Output**: Emit delete events from card to list component
- **EventEmitter**: Handle user actions across components

#### 3. Services & Business Logic
- **EmployeeService**: Centralized data management
- **HttpClient Integration**: Ready for REST API calls
- **Observable Pattern**: Async data handling with RxJS

#### 4. Template-Driven Forms
- **Two-way Data Binding**: Using ngModel
- **Form Validation**: Required fields, email validation
- **Error Messages**: User-friendly validation feedback
- **Dynamic Forms**: Add and edit modes in single component

#### 5. Routing
- `/` - Employee list (home)
- `/employee/:id` - Employee details
- `/add-employee` - Add new employee
- `/edit-employee/:id` - Edit existing employee

## Mock API Approach

**Yes, it's perfectly fine to create endpoints without a backend for portfolio projects!**

### Current Implementation
The app uses **in-memory data** with Observable patterns that mimic real API calls:

```typescript
// Service returns Observables just like HttpClient
getEmployees(): Observable<Employee[]> {
  return of(this.employees);
}
```

### Why This Works for Portfolio
1. **Demonstrates Frontend Skills**: Shows you understand HTTP, async operations, and state management
2. **Easy to Upgrade**: Replace `of()` with actual `http.get()` calls later
3. **No Backend Required**: Runs anywhere without server setup
4. **Interview Ready**: Explains your understanding of API integration

### Migration Path to Real Backend
When ready to add a real backend, just update the service:

```typescript
// Change from:
return of(this.employees);

// To:
return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
```

### Alternative Mock API Options
1. **JSON Server**: Quick mock REST API
2. **JSONPlaceholder**: Free online REST API
3. **Firebase**: Real backend with no server code
4. **Local Storage**: Persist data in browser

## Getting Started

### Prerequisites
- Node.js (v18+)
- Angular CLI (v19+)

### Installation
```bash
cd employee-management-app
npm install
```

### Run Development Server
```bash
ng serve
```
Navigate to `http://localhost:4200/`

### Build for Production
```bash
ng build
```

## Project Structure
```
src/app/
├── components/
│   ├── employee-list/      # Main list view with search
│   ├── employee-card/      # Reusable card component
│   ├── employee-detail/    # Detail view
│   └── employee-form/      # Add/Edit form
├── services/
│   └── employee.service.ts # Business logic & data
├── models/
│   └── employee.model.ts   # TypeScript interface
└── app.routes.ts           # Route configuration
```

## Key Concepts Demonstrated

### 1. Component Communication
```typescript
// Parent passes data
<app-employee-card [employee]="employee"></app-employee-card>

// Child emits events
@Output() deleteEmployee = new EventEmitter<number>();
```

### 2. Service Injection
```typescript
constructor(private employeeService: EmployeeService) {}
```

### 3. Template-Driven Forms
```typescript
<form #employeeForm="ngForm" (ngSubmit)="onSubmit()">
  <input [(ngModel)]="employee.name" required />
</form>
```

### 4. Routing with Parameters
```typescript
{ path: 'employee/:id', component: EmployeeDetailComponent }
```

## Portfolio Tips

When presenting this project:
1. **Explain the Architecture**: Mention component-based design and separation of concerns
2. **Highlight Reusability**: Show how EmployeeCard is reused
3. **Discuss Scalability**: Explain how easy it is to add real API
4. **Mention Best Practices**: Services for logic, components for UI
5. **Show Understanding**: Explain @Input/@Output and why they matter

## Future Enhancements
- Add authentication/authorization
- Implement pagination
- Add sorting functionality
- Connect to real REST API
- Add unit tests
- Implement state management (NgRx)
- Add loading indicators
- Export to CSV/PDF

## License
MIT - Free to use for portfolio and learning
