import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  todoService = inject(TodoService);
  newCategoryName = '';

  isDefault(cat: string): boolean {
    return ['Personal', 'Work', 'Shopping', 'Health'].includes(cat);
  }

  addCategory() {
    if (this.newCategoryName.trim()) {
      this.todoService.addCategory(this.newCategoryName);
      this.newCategoryName = '';
    }
  }
}
