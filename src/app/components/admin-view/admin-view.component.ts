import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
// import { AppwriteService } from '../../shared/services/appwrite.service';

interface Lead {
  id: number;
  name: string;
  email: string;
  message: string;
  service: string[];
  created_at: string;
}

@Component({
  selector: 'app-admin-view',
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white p-6"
    >
      <!-- Login Form -->
      <div
        *ngIf="!isAuthenticated"
        class="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-white/20"
        @fadeInOut
      >
        <h2 class="text-2xl font-light mb-6">Admin Login</h2>
        <div class="mb-4 relative">
          <input
            [type]="showPassword ? 'text' : 'password'"
            [(ngModel)]="password"
            placeholder="Enter admin password"
            class="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-300"
          />
          <button
            type="button"
            (click)="togglePasswordVisibility()"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
          >
            <svg
              *ngIf="!showPassword"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.03.104-.062.207-.095.31M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12c1.274 4.057 5.064 7 9.542 7 4.478 0 8.268-2.943 9.542-7"
              />
            </svg>
            <svg
              *ngIf="showPassword"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825a10.05 10.05 0 01-1.875.175c-4.478 0-8.268-2.943-9.542-7 .143-.468.316-.92.516-1.35m3.954 6.472c1.536 1.33 3.552 2.173 5.848 2.173m5.138-2.645A9.965 9.965 0 0121.543 12M14.121 14.121a3 3 0 010-4.242M9.879 9.879a3 3 0 014.242 0"
              />
            </svg>
          </button>
        </div>
        <button
          (click)="login()"
          class="w-full h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-lg font-medium hover:bg-white/20 transition-all duration-300"
        >
          Login
        </button>
        <p *ngIf="loginError" class="mt-4 text-red-400 text-sm">
          Invalid password
        </p>
      </div>

      <!-- Leads Dashboard -->
      <div *ngIf="isAuthenticated" @fadeInOut>
        <div class="max-w-6xl mx-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-light">Lead Management</h2>
            <button
              (click)="logout()"
              class="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            >
              Logout
            </button>
          </div>

          <!-- Filters -->
          <div class="mb-6 flex flex-wrap gap-4">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              placeholder="Search leads..."
              class="px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-300"
              (input)="filterLeads()"
            />
            <!-- <select 
              [(ngModel)]="serviceFilter"
              (change)="filterLeads()"
              class="px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-purple-300 text-white appearance-none cursor-pointer"
            >
              <option value="">All Services</option>
              <option value="Social Media Marketing">Social Media Marketing</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Content Writing">Content Writing</option>
              <option value="Web Design & Development">Web Design & Development</option>
            </select> -->
          </div>

          <!-- Leads Table -->
          <div
            class="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden"
          >
            <table class="w-full">
              <thead>
                <tr class="border-b border-white/20">
                  <th class="px-6 py-4 text-left">Name</th>
                  <th class="px-6 py-4 text-left">Email</th>
                  <th class="px-6 py-4 text-left">Services</th>
                  <th class="px-6 py-4 text-left">Message</th>
                  <th class="px-6 py-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="let lead of filteredLeads"
                  class="border-b border-white/10 hover:bg-white/5"
                >
                  <td class="px-6 py-4">{{ lead.name }}</td>
                  <td class="px-6 py-4">{{ lead.email }}</td>
                  <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-2">
                      <span
                        *ngFor="let service of lead.service"
                        class="bg-purple-900/50 text-sm px-2 py-1 rounded-full"
                      >
                        {{ service }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4">{{ lead.message }}</td>
                  <td class="px-6 py-4">
                    {{ lead.created_at | date : 'medium' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
export class AdminViewComponent {
  isAuthenticated = false;
  password = '';
  loginError = false;
  leads: Lead[] = [];
  filteredLeads: Lead[] = [];
  searchTerm = '';
  serviceFilter = '';
  private API_URL = environment.apiUrl;
  showPassword = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('adminToken');
    if (token) {
      this.isAuthenticated = true;
      this.fetchLeads();
    }
  }

  login() {
    this.http
      .post<{ success: boolean; token?: string }>(
        `${this.API_URL}?action=login`,
        { password: this.password }
      )
      .subscribe({
        next: (response) => {
          if (response.success && response.token) {
            localStorage.setItem('adminToken', response.token);
            this.isAuthenticated = true;
            this.fetchLeads();
          }
        },
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  fetchLeads() {
    const token = localStorage.getItem('adminToken');
    this.http
      .get<{ success: boolean; data: Lead[] }>(`${this.API_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe((response) => {
        if (response.success) {
          this.leads = response.data;
          this.filterLeads();
        }
      });
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.isAuthenticated = false;
    this.leads = [];
    this.filteredLeads = [];
  }
  filterLeads() {
    this.filteredLeads = this.leads.filter((lead) => {
      const matchesSearch =
        !this.searchTerm ||
        lead.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.message.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesService =
        !this.serviceFilter || lead.service.includes(this.serviceFilter);

      return matchesSearch && matchesService;
    });
  }
}
