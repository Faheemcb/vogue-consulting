import { Component } from '@angular/core';
import { LeadFormService } from '../../shared/services/lead-form.service';
import { ContactFormService } from '../../shared/services/contact-form.service';

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
  isHovered = false; // For hover effect on the button
  
  constructor(private LeadFormService: LeadFormService,
     private contactModalService: ContactFormService) {}
  
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

    openContactForm() {
      this.contactModalService.open();
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

  getButtonStyle(): string {
    const baseStyle = `
      background: linear-gradient(152deg, #9f00d1 1%, #4b00d3 56%);
      -webkit-background: linear-gradient(152deg, #9f00d1 1%, #4b00d3 56%);
      transition: all 0.3s ease;
      -webkit-transition: all 0.3s ease;
    `;
    
    const hoverStyle = this.isHovered ? `
      background: linear-gradient(to right, #a855f7, #3b82f6) !important;
      -webkit-background: linear-gradient(to right, #a855f7, #3b82f6) !important;
      transform: scale(1.05);
      -webkit-transform: scale(1.05);
      box-shadow: 0 10px 25px rgba(168, 85, 247, 0.5);
      -webkit-box-shadow: 0 10px 25px rgba(168, 85, 247, 0.5);
    ` : '';
    
    return baseStyle + hoverStyle;
  }

  getTextStyle(): string {
    return `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);
      -webkit-transform: translate(-50%, -50%) rotate(-90deg);
      transform-origin: center;
      -webkit-transform-origin: center;
      white-space: nowrap;
    `;
  }

}
