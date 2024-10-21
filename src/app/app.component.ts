//app.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from './Services/book.services';
import { Book } from './Models/book';
import { CreateBookDTO } from './Models/CreateBookDTO';
import { UpdateBookInfoDTO } from './Models/UpdateBookInfoDTO';
import { UpdateBookStockDTO } from './Models/UpdateBookStockDTO';
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
  ]
})
export class AppComponent implements OnInit {
  title = 'angular-FrontEndLibrary';
  books: Book[] = [];
  editBook: Book | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe(
      (response: { isSuccess: boolean; result: Book[] }) => {
        if (response.isSuccess && Array.isArray(response.result)) {
          this.books = response.result;
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

  handleFormSubmit(book: CreateBookDTO | UpdateBookInfoDTO) {
    if (this.editBook) {
      const updatedBook: UpdateBookInfoDTO = {
        title: book.title,
        author: book.author,
        genre: book.genre,
        publicationYear: String(book.publicationYear), 
        bookDescription: book.bookDescription
      };

      this.bookService.updateBook(this.editBook.bookID, updatedBook).subscribe(() => {
        this.getAllBooks();
        this.resetForm();
      });
    } else {
      const newBook: CreateBookDTO = {
        title: book.title,
        author: book.author,
        genre: book.genre,
        publicationYear: String(book.publicationYear), 
        bookDescription: book.bookDescription,
        isInStock: (book as CreateBookDTO).isInStock // Type assertion to access isInStock
      };

      this.bookService.addBook(newBook).subscribe(() => {
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
    const stockUpdate: UpdateBookStockDTO = {
      isInStock: !book.isInStock
    };

    this.bookService.updateBookStock(book.bookID, stockUpdate).subscribe(() => {
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
