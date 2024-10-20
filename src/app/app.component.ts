//app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from './Services/book.services';
import { Book } from './Models/book';
import { BookListComponent } from './components/BookListComponent/bookList.component';
import { BookFormComponent } from './components/BookFormComponent/bookForm.component';
import { LibraryComponent } from './components/library/library.component';
import { HeaderComponent } from './components/library/header/header.component';
import { SearchComponent } from './components/library/search/search.component';
import { BuilderPage } from './components/builder-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html', // Split into a separate HTML file
  styleUrls: ['./app.component.css'],  // Split into a separate CSS file
  imports: [
    CommonModule,
    RouterModule,
    BuilderPage,
    LandingPageComponent,
    BookListComponent,
    BookFormComponent,
    LibraryComponent,
    HeaderComponent,
    SearchComponent
  ]})
export class AppComponent {
  title = 'angular-FrontEndLibrary';
  books: Book[] = [];  // Use an object to store books
  editBook: Book | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe(
      (response: { isSuccess: boolean; result: Book[] }) => {  // Expecting result to be an array
        if (response.isSuccess && Array.isArray(response.result)) {
          this.books = response.result;  // Directly assign the array of books
        } else {
          this.books = [];
        }
      },
      (error) => {
        console.error("Error fetching books", error);
        this.books = [];
      }
    );
  }

  handleFormSubmit(book: Book) {
    if (this.editBook) {
      this.bookService.updateBook(this.editBook.bookID, book).subscribe(() => {
        this.getAllBooks();
        this.resetForm();
      });
    } else {
      this.bookService.addBook(book).subscribe(() => {
        this.getAllBooks();
        this.resetForm();
      });
    }
  }

  deleteBook(bookID: string) {
    this.bookService.deleteBook(bookID).subscribe(() => {
      this.getAllBooks();
    });
  }

  toggleStock(book: Book) {
    this.bookService.updateBookStock(book.bookID, { isInStock: !book.isInStock }).subscribe(() => {
      this.getAllBooks();
    });
  }

  populateForm(book: Book) {
    this.editBook = book;
  }

  resetForm() {
    this.editBook = null;
  }

  cancelEdit() {
    this.resetForm();
  }
}
