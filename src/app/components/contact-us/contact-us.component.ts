import { Component } from '@angular/core';
import { LeadFormService } from '../../shared/services/lead-form.service';

interface FormData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  selectedService: string = ''; // Stores the currently selected service
  selectedServices: string[] = []; // Stores all selected services
  isDropdownOpen: boolean = false;
  submissionSuccess = false;
  
  constructor(private LeadFormService: LeadFormService) {}
  
    formData: FormData = {
      name: '',
      email: '',
      message: ''
    };

    addService(): void {
      if (this.selectedService && !this.selectedServices.includes(this.selectedService)) {
        this.selectedServices.push(this.selectedService);
        this.selectedService = '';
      }
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
        this.formData = {
          name: '',
          email: '',
          message: ''
        }
        this.selectedServices = [];
        this.selectedService = '';
      },
      error: (error) => {
        console.error('Error submitting form:', error);
      }
    });
  }


  removeService(service: string) {
    this.selectedServices = this.selectedServices.filter(
      (item) => item !== service
    );
  }

  onServiceChange() {
    console.log("Service selected:", this.selectedService);
    this.isDropdownOpen = false; // Ensure chevron resets after selection
  }

  dismissToast(): void {
    this.submissionSuccess = false;
  }

}
