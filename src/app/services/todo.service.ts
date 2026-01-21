import { Injectable } from '@angular/core';
import { BehaviorSubject, map, combineLatest } from 'rxjs';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  createdAt: Date;
}


export type FilterType = 'all' | 'active' | 'completed';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private defaultCategories = ['Personal', 'Work', 'Shopping', 'Health'];
  
  categoryIcons: { [key: string]: string } = {
    'Personal': '👤',
    'Work': '💼',
    'Shopping': '🛒',
    'Health': '🏥',
    'All': '📁',
    'Other': '🔖'
  };

  private categoriesSubject = new BehaviorSubject<string[]>(this.loadCategories());

  categories$ = this.categoriesSubject.asObservable();

  private todosSubject = new BehaviorSubject<Todo[]>(this.loadFromStorage());
  todos$ = this.todosSubject.asObservable();

  private filterSubject = new BehaviorSubject<FilterType>('all');
  filter$ = this.filterSubject.asObservable();

  private selectedCategorySubject = new BehaviorSubject<string>('All');
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  filteredTodos$ = combineLatest([
    this.todos$,
    this.filter$,
    this.selectedCategory$
  ]).pipe(
    map(([todos, statusFilter, categoryFilter]) => {
      let filtered = todos as Todo[];
      
      if (categoryFilter !== 'All') {
        filtered = filtered.filter(t => t.category === categoryFilter);
      }
      
      if (statusFilter === 'active') filtered = filtered.filter(t => !t.completed);
      if (statusFilter === 'completed') filtered = filtered.filter(t => t.completed);
      
      return filtered;
    })
  );

  stats$ = this.filteredTodos$.pipe(
    map((todos: Todo[]) => ({
      total: todos.length,
      active: todos.filter(t => !t.completed).length,
      done: todos.filter(t => t.completed).length,
      progress: todos.length === 0 ? 0 : Math.round((todos.filter(t => t.completed).length / todos.length) * 100)
    }))
  );


  constructor() {
    this.todos$.subscribe(todos => this.saveToStorage(todos));
    this.categories$.subscribe(cats => this.saveCategories(cats));
  }

  addTodo(text: string, category: string) {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      category,
      createdAt: new Date()
    };
    this.todosSubject.next([...this.todosSubject.value, newTodo]);
  }

  toggleTodo(id: string) {
    const todos = this.todosSubject.value.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.todosSubject.next(todos);
  }

  deleteTodo(id: string) {
    this.todosSubject.next(this.todosSubject.value.filter(t => t.id !== id));
  }

  setFilter(filter: FilterType) {
    this.filterSubject.next(filter);
  }

  setSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category);
  }

  addCategory(name: string) {
    const cats = this.categoriesSubject.value;
    if (name.trim() && !cats.includes(name)) {
      this.categoriesSubject.next([...cats, name]);
    }
  }

  deleteCategory(name: string) {
    if (this.defaultCategories.includes(name)) return;
    this.categoriesSubject.next(this.categoriesSubject.value.filter(c => c !== name));
    if (this.selectedCategorySubject.value === name) {
      this.selectedCategorySubject.next('All');
    }
  }

  clearCompleted() {
    this.todosSubject.next(this.todosSubject.value.filter(t => !t.completed));
  }

  private saveToStorage(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  private loadFromStorage(): Todo[] {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  }

  private saveCategories(cats: string[]) {
    localStorage.setItem('todo-categories', JSON.stringify(cats));
  }

  private loadCategories(): string[] {
    const stored = localStorage.getItem('todo-categories');
    return stored ? JSON.parse(stored) : [...this.defaultCategories];
  }
}

