import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.css'
})
export class TaskInputComponent {
  taskText = '';
  selectedCategory = 'Personal';
  todoService = inject(TodoService);

  addTodo() {
    if (this.taskText.trim()) {
      this.todoService.addTodo(this.taskText, this.selectedCategory);
      this.taskText = '';
    }
  }
}
