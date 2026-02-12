import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
// import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // approach 3 -  providing the service using providers array in component decorator. This service only available for this component and its child components. 
  // providers:[TaskService]
})
export class TasksComponent {}
