import { Component } from '@angular/core';
import { ContactFormService } from '../../shared/services/contact-form.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

  isHovered = false;

  constructor(private contactModalService: ContactFormService) {}

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

openContactForm() {
  this.contactModalService.open();
}

}
