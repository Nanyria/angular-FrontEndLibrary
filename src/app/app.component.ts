import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './Models/book';
import { BookService } from './Services/book.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-FrontEndLibrary';

  books: Book[] = [];

  book: Book = {
    bookID: '',
    title: '',
    author: '',
    genre: '',
    publicationYear: '',
    bookDescription: '',
    isInStock: true

  };

  constructor(private bookService: BookService) {}

  ngOnInit(): void{
    this.getAllBooks();
  }

  //Get
  getAllBooks() {
    this.bookService.getAllBooks().subscribe((response) => {
      this.books = response;
    });
  }

    //Populate
    populateForm(book:Book){
      book = book;
    }
}

