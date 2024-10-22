import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../Services/book.services';
import { Book } from '../../../Models/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchComponent {
  title: string = '';
  author: string = '';
  @Output() searchResults = new EventEmitter<Book[]>();

  constructor(private bookService: BookService) {}

  searchByTitle() {
    this.bookService.getBookByTitle(this.title).subscribe((response) => {
      if (response.isSuccess) {
        this.searchResults.emit(response.result);
      }
    });
  }

  searchByAuthor() {
    this.bookService.getBookByAuthor(this.author).subscribe((response) => {
      if (response.isSuccess) {
        this.searchResults.emit(response.result);
      }
    });
  }
}