import { Component } from '@angular/core';
import { ContactFormService } from '../../services/contact-form.service';

@Component({
  selector: 'app-navbar',
  template: `
<nav
  class="navbar-background flex items-center justify-between px-6 sm:px-12 lg:px-36 h-[120px]"
>
<div class="flex items-center space-x-20 sm:space-x-20">
  <!-- Logo -->
  <a routerLink="/" class="flex items-center">
    <img
      src="../../../assets/img/image-1.png"
      class="h-12 sm:h-14 w-auto" 
      alt="Flowbite Logo"
    />
  </a>
  <!-- Navigation Links -->
  <div
    class="hidden md:flex ml-8 sm:ml-16 lg:ml-24 space-x-8 sm:space-x-14 lg:space-x-16 items-center text-sm sm:text-base lg:text-lg"
  >
    <a routerLink="/services" class="text-white hover:text-[#b424ff] font-light px-2">
      Our Services
    </a>
    <a routerLink="/about-us" class="text-white hover:text-[#b424ff] font-light px-2">
      About Us
    </a>
    <a routerLink="/contact-us" class="text-white hover:text-[#b424ff] font-light px-2">
      Contact Us
    </a>
  </div>
</div>
  <!-- Button -->
  <div class="hidden md:block">
  <button
  class="bg-black text-white px-4 py-2 sm:px-8 sm:py-2.5 rounded-4xl hover:bg-gray-800 text-sm sm:text-lg cursor-pointer
   hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:border-transparent hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
   (click)="openContactForm()"
>
  Get Your Free Audit
</button>
  </div>
  <!-- Hamburger Menu for Mobile -->
  <div class="block md:hidden">
    <button
      class="text-white text-3xl focus:outline-none"
      (click)="toggleMobileMenu()"
    >
      &#9776;
    </button>
  </div>
</nav>
<!-- Mobile Menu -->
<div
  *ngIf="isMobileMenuOpen"
  class="absolute top-[120px] left-0 w-full bg-black text-white flex flex-col items-center space-y-8 py-8 md:hidden"
>
  <a routerLink="/services" class="hover:text-[#b424ff] font-light text-xl py-2">Our Services</a>
  <a routerLink="/about-us" class="hover:text-[#b424ff] font-light text-xl py-2">About Us</a>
  <a routerLink="/contact-us" class="hover:text-[#b424ff] font-light text-xl py-2">Contact Us</a>
  <button
    class="bg-white text-black px-6 py-2 rounded-4xl hover:bg-gray-200 text-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:border-transparent hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 font-light mt-4" (click)="openContactForm()"
  >
    Get Your Free Audit
  </button>
</div>
  `,
  styles: [
    `
      .navbar-background {
        background-image: linear-gradient(
          95deg,
          #fff 0%,
          #000 0%,
          #570471 75%,
          #00058d 110%
        );
      }
    `,
  ],
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  constructor(private contactModalService: ContactFormService) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openContactForm() {
    this.contactModalService.open();
  }
}
