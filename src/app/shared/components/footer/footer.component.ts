import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="h-50"> 
<div class="h-[4px] bg-white opacity-20 mx-auto my-12 max-w-screen-xl"></div>
<footer class="py-4">
  <p class="text-white text-center text-sm sm:text-base lg:text-lg font-sans">
    © 2024 Vogue Consulting. All Rights Reserved.
  </p>
</footer>
  </div>
  `,
  styles: [],
})
export class FooterComponent {}
