import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fetchOneEntry, type BuilderContent } from '@builder.io/sdk-angular';
import { Content } from '@builder.io/sdk-angular';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [Content, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  apiKey = "0b48fe8e354b4d2f9b80496aa2074bf7";
  model = 'page';
  content: BuilderContent | null = null;

  async ngOnInit() {
    const urlPath = window.location.pathname || '';
    // fetch the content for the current page based on the current URL 
    const content = await fetchOneEntry({
      apiKey: this.apiKey,
      model: this.model,
      userAttributes: {
        urlPath,
      },
    });

    if (!content) {
      return;
    }

    this.content = content;
  }
}