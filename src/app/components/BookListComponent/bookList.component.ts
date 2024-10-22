import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../Models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './bookList.component.html',
  styleUrls: ['./bookList.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BookListComponent {
  @Input() books: Book[] = [];
  @Input() editBook: Book | null = null;
  @Output() onEdit = new EventEmitter<Book>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onToggleStock = new EventEmitter<Book>();
  @Output() onSave = new EventEmitter<Book>();
  @Output() onCancel = new EventEmitter<void>();

  editBookDetails(book: Book) {
    this.onEdit.emit(book);
  }

  deleteBook(bookID: string) {
    this.onDelete.emit(bookID);
  }

  toggleStock(book: Book) {
    this.onToggleStock.emit(book);
  }

  saveBook(book: Book) {
    this.onSave.emit(book);
  }

  cancelEdit() {
    this.onCancel.emit();
  }
}