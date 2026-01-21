import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, FiltersComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  todoService = inject(TodoService);
}
