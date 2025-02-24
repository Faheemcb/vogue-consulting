import { Component } from '@angular/core';

@Component({
  selector: 'app-offer',
  template: `
    <header
      *ngIf="isVisible"
      class="bg-[rgba(0,0,0,0.9)] flex justify-between items-center px-4 sm:px-8 h-auto md:h-[90px] py-4 md:py-0 relative"
    >
      <p
        class="text-sm sm:text-base md:text-lg lg:text-xl font-light text-white text-center flex-1 max-w-[80%] md:max-w-full truncate"
      >
        Unlock our exclusive offer! Receive a free audit of your website and
        paid media platforms. Available until June 2025. Don’t miss out.
      </p>
      <button
        class="text-white absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-gray-400 focus:outline-none"
        aria-label="Close"
        (click)="closeOffer()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6 md:w-8 md:h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </header>
  `,
  styles: [
    `
      header {
        z-index: 50;
        position: relative;
        width: 100%;
      }
    `,
  ],
})
export class OfferComponent {
  isVisible = true; // Controls the visibility of the component

  closeOffer() {
    this.isVisible = false;
  }
}