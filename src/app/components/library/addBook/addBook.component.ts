import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../Services/book.services';
import { CreateBookDTO } from '../../../Models/CreateBookDTO';

@Component({
  selector: 'app-add-book',
  standalone: true,
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule // Import RouterModule
  ]
})
export class AddBookComponent implements OnInit {
  addBookForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      publicationYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      bookDescription: [''],
      isInStock: [false]
    });
  }

  onSubmit(): void {
    if (this.addBookForm.valid) {
      const newBook: CreateBookDTO = {
        title: this.addBookForm.get('title')!.value,
        author: this.addBookForm.get('author')!.value,
        genre: this.addBookForm.get('genre')!.value,
        publicationYear: this.addBookForm.get('publicationYear')!.value,
        bookDescription: this.addBookForm.get('bookDescription')!.value,
        isInStock: this.addBookForm.get('isInStock')!.value
      };

      this.bookService.addBook(newBook).subscribe(
        response => {
          console.log('Book added successfully', response);
          this.router.navigate(['/library']);
        },
        error => {
          console.error('Error adding book', error);
        }
      );
    }
  }
}