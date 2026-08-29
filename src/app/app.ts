import { Component, signal } from '@angular/core';
import { FirewatchParallax } from "./firewatch-parallax/firewatch-parallax";

@Component({
  imports: [FirewatchParallax],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('creative-web-development');
}
