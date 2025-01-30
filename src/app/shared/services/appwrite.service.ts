import { Injectable } from '@angular/core';
import { Client, Databases } from 'appwrite';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppwriteService {

  private client = new Client();
  private databases: Databases;
  private databaseId = environment.databaseId; 
  private collectionId = environment.collectionId; 
  private endpoint = environment.appwriteEndpoint; 
  private projectId = environment.appwriteProjectId; 

  constructor() {
    this.client
      .setEndpoint(this.endpoint) 
      .setProject(this.projectId); 

    this.databases = new Databases(this.client);
  }

  // POST: Save form data to Appwrite
  saveFormData(data: { name: string, email: string, services: string[], message: string }) {
    return this.databases.createDocument(
      this.databaseId, 
      this.collectionId, 
      'unique()', 
      data
    );
  }

  // GET: Fetch all form submissions
  getFormSubmissions() {
    return this.databases.listDocuments(
      this.databaseId, 
      this.collectionId 
    );
  }
}
