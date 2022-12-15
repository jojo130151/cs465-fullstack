import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authResponse';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  // Get JWT token from local storgae
  public getToken(): string {
    return this.storage.getItem('travlr-token');
  }

  // Save JWT token to local storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Save the JWT token by first iterating through service login function and then grabbing token from there
  public login(user: User): Promise<any> {
    return this.tripDataService.login(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  // Save the JWT token by first iterating through service register function and then grabbing token from there
  public register(user: User): Promise<any> {
    return this.tripDataService.register(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  // Remove JWT toeken from local storage when user logs out
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Allows browser to check logged in status for displaying specific components
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); 
      console.log(payload);
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  // Get User object of cuurent logged in user
  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
  }
}
