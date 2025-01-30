import { Component } from '@angular/core';
import { ContactFormService } from '../../shared/services/contact-form.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  constructor(private contactModalService: ContactFormService) {}

openContactForm() {
  this.contactModalService.open();
}

}
