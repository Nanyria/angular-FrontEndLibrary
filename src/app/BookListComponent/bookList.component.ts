//book.list.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../Models/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './bookList.component.html',
  styleUrls: ['./bookList.component.css'],
  imports: [CommonModule]
})
export class BookListComponent {
  @Input() books: Book[] = [];
  @Output() onEdit = new EventEmitter<Book>();
  @Output() onDelete = new EventEmitter<string>();  // Change this from number to string
  @Output() onToggleStock = new EventEmitter<Book>();

  deleteBook(book: Book) {
    this.onDelete.emit(book.bookID);  // Emit the bookID as a string
  }

  editBook(book: Book) {
    this.onEdit.emit(book);
  }

  toggleStock(book: Book) {
    this.onToggleStock.emit(book);
  }

  filterBooks(searchTerm: string) {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  sortBooks(criteria: 'title' | 'author') {
    this.books.sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
  }

  noBooksAvailable(): boolean {
    return this.books.length === 0;
  }

  handleBookClick(book: Book) {
    // Perform some action when a book is clicked
  }

  // Other methods...
}