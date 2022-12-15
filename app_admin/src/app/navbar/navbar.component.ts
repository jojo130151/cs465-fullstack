import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html', 
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { } 

  ngOnInit() { }

  // Checks login status for visibility of certain page components
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  //Logs the user put and then navigates back to previous page if allowed
  private onLogout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('#');
    return;
  }
}