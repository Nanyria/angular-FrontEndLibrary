import { BookTableComponent } from './book-table/book-table.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.services';
import { HeaderComponent } from '../../components/library/header/header.component';
import { SearchComponent } from '../../components/library/search/search.component';
import { BookListComponent } from '../BookListComponent/bookList.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, SearchComponent, BookTableComponent, BookListComponent]
})
export class LibraryComponent {
  books: Book[] = [];  // Use an object to store books
  editBook: Book | null = null;

  constructor(private bookService: BookService, private router: Router) {}

  addNewBook() {
    this.router.navigate(['/add-book']);
  }
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

  handleSearchResults(results: Book[]) {
    this.books = results;
  }
}