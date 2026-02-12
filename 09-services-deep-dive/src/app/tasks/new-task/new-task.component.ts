import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  //approach 1 - injecting the service using the constructor
  constructor(private tasksService: TaskService) {}

  onAddTask(title: string, description: string) {
    this.tasksService.addTask({title,description});
    this.formEl()?.nativeElement.reset();
  }
}
