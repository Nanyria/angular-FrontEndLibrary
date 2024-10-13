import type { RegisteredComponent } from "@builder.io/sdk-angular";
import { AppComponent } from "./app.component";
import { BookFormComponent } from "./components/BookFormComponent/bookForm.component";
import { BookListComponent } from "./components/BookListComponent/bookList.component";
import { BookTableComponent } from "./components/library/book-table/book-table.component";
import { BuilderPage } from "./components/builder-page.component";
import { Counter } from "./components/counter.component";
import { FigmaImportsPage } from "./components/figma-imports.component";
import { HeaderComponent } from "./components/library/header/header.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { LibraryComponent } from "./components/library/library.component";
import { SearchComponent } from "./components/library/search/search.component";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: AppComponent,
    name: "AppComponent",
  },
  {
    component: BookFormComponent,
    name: "BookFormComponent",
    inputs: [
      {
        name: "editBook",
        type: "Book",
      },
    ],
  },
  {
    component: BookListComponent,
    name: "BookListComponent",
    inputs: [
      {
        name: "books",
        type: "Book[]",
      },
    ],
  },
  {
    component: BookTableComponent,
    name: "BookTableComponent",
  },
  {
    component: BuilderPage,
    name: "BuilderPage",
    inputs: [
      {
        name: "model",
        type: "string",
      },
    ],
  },
  {
    component: Counter,
    name: "Counter",
    inputs: [
      {
        name: "initialCount",
        type: "number",
      },
    ],
  },
  {
    component: FigmaImportsPage,
    name: "FigmaImportsPage",
  },
  {
    component: HeaderComponent,
    name: "HeaderComponent",
  },
  {
    component: LandingPageComponent,
    name: "LandingPageComponent",
  },
  {
    component: LibraryComponent,
    name: "LibraryComponent",
  },
  {
    component: SearchComponent,
    name: "SearchComponent",
  },
];
