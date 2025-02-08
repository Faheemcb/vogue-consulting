import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { LeadFormService } from '../../services/lead-form.service';

interface FormData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact-modal-component',
  template: `
<div class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
  <!-- Success Toast -->
  <div *ngIf="submissionSuccess" 
       class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl"
       @toastAnimation>
    <div class="bg-gray-950 text-white px-8 py-4 rounded-lg shadow-lg flex items-center gap-3 mx-4">
      <div class="flex-shrink-0">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div class="flex-grow">
        <p class="text-sm opacity-90">Thank you for your submission. We'll get back to you soon.</p>
      </div>
      <button 
        (click)="dismissToast()" 
        class="flex-shrink-0 text-white/80 hover:text-white">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Form Container -->
  <div *ngIf="!submissionSuccess" 
       class="w-full max-w-2xl mx-4 transform transition-all" 
       @fadeInOut>
    <div class="relative rounded-lg shadow-xl overflow-hidden"
         style="background-image: linear-gradient(142deg, #fff -1%, #000 -1%, #570471 69%, #00058d 101%);">
      
      <button 
        (click)="closeModal()" 
        class="absolute right-4 top-4 text-white hover:text-gray-300 z-10"
        aria-label="Close">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="p-6 lg:p-10">
        <form (ngSubmit)="onSubmit()">
          <div class="mb-6">
            <label for="service" class="block text-2xl font-light mb-2 text-white">How can We Help?</label>
            <div class="relative" style="max-width: 400px;">
              <select
                id="service"
                name="service"
                [(ngModel)]="selectedService"
                (change)="addService()"
                class="w-full h-[50px] bg-purple-900/50 text-white text-lg px-4 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300">
                <option value="" disabled selected>Select Service</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Web Design & Development">Web Design & Development</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Selected Services -->
          <div class="flex flex-wrap gap-3 mb-6">
            <span
              *ngFor="let service of selectedServices"
              class="bg-purple-900/50 text-white text-sm px-3 py-1 rounded-full shadow-md flex items-center gap-2">
              {{ service }}
              <button
                type="button"
                class="text-red-400 hover:text-red-300"
                (click)="removeService(service)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          </div>

          <!-- Name and Email -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
            <div>
              <label for="name" class="block text-lg lg:text-2xl font-light mb-2 text-white">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                autocomplete="off"
                [(ngModel)]="formData.name"
                placeholder="Enter your full name"
                class="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-300">
            </div>
            <div>
              <label for="email" class="block text-lg lg:text-2xl font-light mb-2 text-white">Enter Email</label>
              <input
                type="email"
                autocomplete="off"
                id="email"
                name="email"
                [(ngModel)]="formData.email"
                placeholder="Enter your email"
                class="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-300">
            </div>
          </div>

          <!-- Message -->
          <div class="mb-6">
            <label for="message" class="block text-lg lg:text-2xl font-light mb-2 text-white">Message</label>
            <textarea
              id="message"
              name="message"
              [(ngModel)]="formData.message"
              placeholder="What else can you share about the project"
              class="w-full h-40 px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-purple-300 resize-y text-white placeholder-gray-300"></textarea>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center lg:justify-end">
            <button
              type="submit"
              class="w-full lg:w-[300px] h-12 lg:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-lg lg:text-xl font-medium hover:bg-white/20 transition-all duration-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  `,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ]),
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-100%)' }))
      ])
    ])
  ],
  styles: []
})
export class ContactFormComponent {

  constructor(private LeadFormService: LeadFormService) {}

  @Output() close = new EventEmitter<void>();
  isOpen = false;
  submissionSuccess = false;
  
  formData: FormData = {
    name: '',
    email: '',
    message: ''
  };
  
  selectedService: string = '';
  selectedServices: string[] = [];

  addService(): void {
    if (this.selectedService && !this.selectedServices.includes(this.selectedService)) {
      this.selectedServices.push(this.selectedService);
      this.selectedService = '';
    }
  }

  removeService(service: string): void {
    this.selectedServices = this.selectedServices.filter(s => s !== service);
  }

  onSubmit(): void {
    const dataToSend = {
      ...this.formData,
      service: this.selectedServices
    };

    this.LeadFormService.submitForm(dataToSend).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.submissionSuccess = true;
        setTimeout(() => this.closeModal(), 2000);
      },
      error: (error) => {
        console.error('Error submitting form:', error);
      }
    });
  }

  dismissToast(): void {
    this.submissionSuccess = false;
    this.closeModal();
  }

  closeModal(): void {
    this.close.emit();
  }
}