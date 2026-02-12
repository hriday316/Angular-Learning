import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
// import { TaskService } from './app/tasks/task.service';

// approach 2 providing server using providers arrary in bootstrapApplication
// bootstrapApplication(AppComponent,{
//     providers: [TaskService]
// }).catch((err) => console.error(err));


bootstrapApplication(AppComponent).catch((err) => console.error(err));
