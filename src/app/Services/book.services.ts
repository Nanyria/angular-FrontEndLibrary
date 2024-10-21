//book.services.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../Models/book';
import { CreateBookDTO } from '../Models/CreateBookDTO';
import { UpdateBookInfoDTO } from '../Models/UpdateBookInfoDTO';
import { UpdateBookStockDTO } from '../Models/UpdateBookStockDTO';

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
  addBook(book: CreateBookDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, book);
  }

  // Update an existing book by ID
  updateBook(bookID: string, updatedBook: UpdateBookInfoDTO): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${bookID}`, updatedBook);
  }

  // Update book stock status
  updateBookStock(bookID: string, stockUpdate: UpdateBookStockDTO): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/stock/${bookID}`, stockUpdate);
  }

  // Delete a book by ID
  deleteBook(bookID: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${bookID}`);
  }
}
