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

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html', // Split into a separate HTML file
  styleUrls: ['./app.component.css'],  // Split into a separate CSS file
  imports: [CommonModule, RouterModule, BookListComponent, BookFormComponent, LibraryComponent, HeaderComponent, SearchComponent]
})
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


// --Latest working

// import { Component } from '@angular/core';
// import { BookService } from './Services/book.services';
// import { Book } from './Models/book';
// import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   template: `
//     <h1>View All Books</h1>
//     <div class="card-grid">
//       <div class="card-row" *ngFor="let book of books">
//         <div (click)="populateForm(book)" class="card-row-details">
//           <span>{{ book.title }}</span>
//           <span>{{ book.author }}</span>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .card-grid {
//       display: flex;
//       flex-wrap: wrap;
//     }
//     .card-row {
//       border: 1px solid #ccc;
//       margin: 10px;
//       padding: 10px;
//       flex: 1 0 30%; /* Adjust the width as needed */
//     }
//     .card-row-details {
//       cursor: pointer;
//     }
//   `],
//   imports: [CommonModule] // Add CommonModule to imports array
// })
// export class AppComponent {
//   books: Book[] = [];

//   constructor(private bookService: BookService) {}

//   ngOnInit(): void {
//     this.getAllBooks();
//   }
//   getAllBooks() {
//     this.bookService.getAllBooks().subscribe((response: any) => {
//       if (response.isSuccess && Array.isArray(response.result)) {
//         // Extract the 'result' array, which contains the books
//         this.books = response.result;
//       } else {
//         // Handle error or unexpected response format
//         console.error('API response is not as expected:', response);
//         this.books = []; // Default to empty array to avoid template errors
//       }
//     }, error => {
//       // Handle HTTP errors
//       console.error('Error fetching books:', error);
//       this.books = []; // Default to empty array on error
//     });
//   }

//   populateForm(book: Book) {
//     console.log('Selected book:', book);
//     // Implement form population logic if needed
//   }
// }

// ---




// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Book } from './Models/book';
// import { BookService } from './Services/book.services';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import {} from '@angular/common/http';
// import { response } from 'express';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     RouterOutlet, 
//     FormsModule, 
//     CommonModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'angular-FrontEndLibrary';

//   books: Book[] = [];

//   book: Book = {
//     bookID: '',
//     title: '',
//     author: '',
//     genre: '',
//     publicationYear: '',
//     bookDescription: '',
//     isInStock: true

//   };

//   constructor(private bookService: BookService) {}

//   ngOnInit(): void{
//     this.getAllBooks();
//   }

//   //Get
//   getAllBooks() {
//     this.bookService.getAllBooks().subscribe((response) => {
//       this.books = response;
//     });
//   }

  // onSubmit() {
  //   if (this.book.title == '') {
  //     this.bookService.addBook(this.book).subscribe((response) => {
  //       this.getAllBooks();
  //       this.book = {
  //         bookID: '',
  //         title: '',
  //         author: '',
  //         bookDescription: '',
  //         publicationYear: '',
  //         genre: '',
  //         isInStock: true
  //       };
  //     });
  //   } else {
  //     this.update(this.card);
  //   }
  // }
    //Populate
//     populateForm(book:Book){
//       book = book;
//     }
// }
