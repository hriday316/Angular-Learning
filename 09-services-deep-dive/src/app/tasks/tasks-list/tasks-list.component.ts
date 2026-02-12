import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  //approach 2 - injecting the service using the inject function
  private tasksService = inject(TaskService);
  selectedFilter = signal<string>('all');
  tasks =  computed(() => {
    switch (this.selectedFilter()) {
 
      case 'open':
        return this.tasksService.allTasks().filter(task => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService.allTasks().filter(task => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService.allTasks().filter(task => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
