//book.services.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../Models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://localhost:7291/api/Library'; 

  constructor(private http: HttpClient) {}

  // Retrieve all books
  getAllBooks(): Observable<{ isSuccess: boolean; result: Book[] }> {
    return this.http.get<{ isSuccess: boolean; result: Book[] }>(this.apiUrl);
  }

  // Retrieve a single book by ID
  getBookById(bookID: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${bookID}`);
  }

  // Add a new book
  addBook(book: Book): Observable<any> {
    return this.http.post<any>(this.apiUrl, book);
  }

  // Update an existing book by ID
  updateBook(bookID: string, updatedBook: Book): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${bookID}`, updatedBook);
  }

  // Update book stock status
  updateBookStock(bookID: string, stockUpdate: { isInStock: boolean }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${bookID}/stock`, stockUpdate);
}

  // Delete a book by ID
  deleteBook(bookID: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${bookID}`);
  }
}





// import { HttpClient } from "@angular/common/http";
// import { Book } from "../Models/book";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";

// @Injectable({
//     providedIn:'root'
// })

// export class BookService{
//     baseUrl = "https://localhost:7291/api/Library";
//     constructor(private http:HttpClient){}

//     //GetAllBooks
//     getAllBooks():Observable<Book[]>{
//         return this.http.get<Book[]>(this.baseUrl);
//     }
    
//     addBook(book:Book): Observable<Book>{
//         book.title = 'Title'
//         book.author = 'Author'
//         return this.http.post<Book>(this.baseUrl, book)
//     }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Book } from '../Models/book';

// @Injectable({
//   providedIn: 'root'
// })
// export class BookService {
//   private apiUrl = 'https://localhost:7291/api/Library'; 

//   constructor(private http: HttpClient) {}

//   getAllBooks(): Observable<Book[]> {
//     return this.http.get<Book[]>(this.apiUrl);
//   }
// }
