import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SearchComponent {
  constructor(private router: Router) {}

  addNewBook() {
    this.router.navigate(['/add-book']);
  }
}