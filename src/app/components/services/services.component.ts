import { Component } from '@angular/core';
import { ContactFormService } from '../../shared/services/contact-form.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  constructor(private contactFormService: ContactFormService){}

  openContactForm(){
    this.contactFormService.open();
  }

}
