//bookform.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../Models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './bookForm.component.html',
  styleUrls: ['./bookForm.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BookFormComponent {
  @Input() editBook: Book | null = null;
  @Output() onSubmit = new EventEmitter<Book>();
  @Output() onCancel = new EventEmitter<void>();

  book: Book = {  bookID: '', title: '', author: '', genre: '', bookDescription: '', publicationYear: '', isInStock: false };

  ngOnChanges() {
    if (this.editBook) {
      this.book = { ...this.editBook };
    } else {
      this.resetForm();
    }
  }

  submitForm() {
    this.onSubmit.emit(this.book);
    this.resetForm();
  }

  resetForm() {
    this.book = { bookID: '', title: '', author: '', genre: '', bookDescription: '', publicationYear: '', isInStock: false };
  }
}
