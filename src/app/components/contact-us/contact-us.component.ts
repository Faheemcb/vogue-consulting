import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  selectedService: string = ''; // Stores the currently selected service
  selectedServices: string[] = []; // Stores all selected services

  addService() {
    if (
      this.selectedService &&
      !this.selectedServices.includes(this.selectedService)
    ) {
      this.selectedServices.push(this.selectedService);
      this.selectedService = ''; // Reset the dropdown
    }
  }

  removeService(service: string) {
    this.selectedServices = this.selectedServices.filter(
      (item) => item !== service
    );
  }

}
