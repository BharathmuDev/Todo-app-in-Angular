import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Todo;
  todoService = inject(TodoService);
}
