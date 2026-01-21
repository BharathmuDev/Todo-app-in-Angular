import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { StatsComponent } from './components/stats/stats.component';
import { TaskInputComponent } from './components/task-input/task-input.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    StatsComponent,
    TaskInputComponent,
    TaskListComponent,
    SidebarComponent
  ],
  templateUrl: './app.html'
})
export class AppComponent {
  title = 'todo-app';
}


