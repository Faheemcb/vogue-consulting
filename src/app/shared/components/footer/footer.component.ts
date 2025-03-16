import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="container mx-auto px-4"> 
    <div class="h-[1px] sm:h-[2px] md:h-[3px] lg:h-[4px] bg-white opacity-20 my-6 sm:my-8 md:my-10 lg:my-12 w-full"></div>
    <footer class="py-2 sm:py-3 md:py-4">
      <p class="text-white text-center text-xs sm:text-sm md:text-base lg:text-lg font-sans">
        © 2024 Vogue Consulting. All Rights Reserved.
      </p>
    </footer>
  </div>
  `,
  styles: [],
})
export class FooterComponent {}
