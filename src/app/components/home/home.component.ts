import { Component } from '@angular/core';
import { ContactFormService } from '../../shared/services/contact-form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedService: string = '';
  selectedServices: string[] = [];
  isMobileMenuOpen = false;

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

  constructor( private contactFormService: ContactFormService) {}

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
    // this.appwriteService.saveFormData(this.formData)
    //   .then(() => {
    //     this.resetForm();
    //   })
    //   .catch((error) => {
    //     console.error('Error submitting form: ', error);
    //   });
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
}
