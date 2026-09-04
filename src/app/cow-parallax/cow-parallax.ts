import { afterNextRender, Component, DestroyRef, inject } from '@angular/core';
import { Parallax } from "./parallax/parallax";
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollSmoother);

@Component({
  selector: 'app-cow-parallax',
  imports: [Parallax],
  template: `<div id="smooth-wrapper">
    <div id="smooth-content">
      <app-parallax></app-parallax>

      <div class="content-section">
        <h2>Dalsza treść Twojej strony...</h2>
        <p>Scrolluj w górę i w dół, aby zobaczyć działanie animacji.</p>
      </div>
    </div>
  </div>`,
  styleUrl: './cow-parallax.css',
})
export class CowParallax {
  private smoother?: ScrollSmoother;

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.initParallaxAnimation();
    });

    this.destroyRef.onDestroy(() => {
      this.smoother?.kill();
    });
  }

  private initParallaxAnimation(): void {
    this.smoother = ScrollSmoother.create({
      smooth: 1.2,
      effects: false,
      smoothTouch: 0.1,
    });
  }
}
