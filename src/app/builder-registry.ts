import type { RegisteredComponent } from "@builder.io/sdk-angular";
import { AppComponent } from "./app.component";
import { BookFormComponent } from "./BookFormComponent/bookForm.component";
import { BookListComponent } from "./BookListComponent/bookList.component";
import { BuilderPage } from "./components/builder-page.component";
import { Counter } from "./components/counter.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

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
    component: LandingPageComponent,
    name: "LandingPageComponent",
  },
];
