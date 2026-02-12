import { Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";

// approach 1 - providing service using providedIn property in Injectable decorator. this is the recommended way
@Injectable({
    providedIn: 'root'
})
export class TaskService{
   private tasks = signal<Task[]>([]);

   allTasks =  this.tasks.asReadonly();

    addTask(taskData: {title: string, description: string}){
        const newTask: Task = {
            id: Math.random().toString(),
            status: 'OPEN',
            ...taskData
        }
        this.tasks.update((oldTasks) => [...oldTasks, newTask])
    }

    updateTaskStatus(taskId: string , taskStatus: TaskStatus){
         this.tasks.update(oldTasks =>  oldTasks.map(task => task.id === taskId ? {...task, status: taskStatus} : task) )
    }

}