import { Component } from '@angular/core';
import { ContactFormService } from '../../shared/services/contact-form.service';
import { LeadFormService } from '../../shared/services/lead-form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedService: string = '';
  selectedServices: string[] = [];
  isMobileMenuOpen = false;
  submissionSuccess = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMenu() {
    this.isMobileMenuOpen = false;
  }

  formData = {
    name: '',
    email: '',
    services: [] as string[],
    message: ''
  };

  constructor( private contactFormService: ContactFormService, private LeadFormService: LeadFormService) {}

  // Add a service to the list
  addService() {
    if (this.selectedService && !this.selectedServices.includes(this.selectedService)) {
      this.selectedServices.push(this.selectedService);
      this.formData.services = this.selectedServices;
    }
    this.selectedService = '';
  }

  // Remove a service from the list
  removeService(service: string) {
    this.selectedServices = this.selectedServices.filter(s => s !== service);
    this.formData.services = this.selectedServices;
  }

  // Submit the form
  onSubmit() {
    const dataToSend = {
      ...this.formData,
      service: this.selectedServices
    };

    this.LeadFormService.submitForm(dataToSend).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.submissionSuccess = true;
        this.formData = {
          name: '',
          email: '',
          services: [],
          message: ''
        }
        this.selectedServices = [];
        this.selectedService = '';
        // setTimeout(() => this.closeModal(), 2000);
      },
      error: (error) => {
        console.error('Error submitting form:', error);
      }
    });
  }

  // Reset the form
  resetForm() {
    this.selectedService = '';
    this.selectedServices = [];
    this.formData = {
      name: '',
      email: '',
      services: [],
      message: ''
    };
  }

  openContactForm() {
    this.contactFormService.open();
  }

  dismissToast(): void {
    this.submissionSuccess = false;
  
  }
}
