

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../Models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './bookList.component.html',
  styleUrls: ['./bookList.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BookListComponent {
  @Input() books: Book[] = [];
  @Output() onEdit = new EventEmitter<Book>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onToggleStock = new EventEmitter<Book>();

  populateForm(book: Book) {
    this.onEdit.emit(book);
  }

  deleteBook(bookID: string) {
    this.onDelete.emit(bookID);
  }

  toggleStock(book: Book) {
    this.onToggleStock.emit(book);
  }
}