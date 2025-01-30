import { Component } from '@angular/core';
import { AppwriteService } from '../../shared/services/appwrite.service';

@Component({
  selector: 'app-admin-view',
  template: `
 <div *ngFor="let submission of submissions">
  <p><strong>Name:</strong> {{ submission.name }}</p>
  <p><strong>Email:</strong> {{ submission.email }}</p>
  <p><strong>Services:</strong> {{ submission.services.join(', ') }}</p>
  <p><strong>Message:</strong> {{ submission.message }}</p>
  <hr>
</div>
  `,
  styles: ``
})
export class AdminViewComponent {
  submissions: any[] = [];

  constructor(private appwriteService: AppwriteService) {}

  ngOnInit() {
    this.appwriteService.getFormSubmissions()
      .then((response: any) => {
        this.submissions = response.documents;
      })
      .catch((error) => {
        console.error('Error fetching submissions: ', error);
      });
  }

}
