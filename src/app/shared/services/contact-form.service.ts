import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { ContactFormComponent } from '../components/contact-form-component/contact-form-component.component';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private modalComponentRef: ComponentRef<ContactFormComponent> | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open() {
    if (this.modalComponentRef) {
      return;
    }

    // Create component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContactFormComponent);
    this.modalComponentRef = componentFactory.create(this.injector);

    // Attach component to app
    this.appRef.attachView(this.modalComponentRef.hostView);

    // Get DOM element
    const domElem = (this.modalComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Listen for close event
    this.modalComponentRef.instance.close.subscribe(() => {
      this.closeModal();
    });
  }

  private closeModal() {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
      this.modalComponentRef = null;
    }
  }
}
