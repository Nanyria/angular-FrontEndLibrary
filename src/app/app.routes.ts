import { Routes } from '@angular/router';
import { LibraryComponent } from './components/library/library.component';


export const routes: Routes = [
  { path: '', redirectTo: '/library', pathMatch: 'full' },
  { path: 'library', component: LibraryComponent },

  { path: '**', redirectTo: '/library' } // Wildcard route for a 404 page
];