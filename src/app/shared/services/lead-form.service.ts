import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

interface ContactFormData {
  name: string;
  email: string;
  service: string[];
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class LeadFormService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitForm(formData: ContactFormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
  getLeadDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
