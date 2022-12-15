import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: Trip;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  // Checks login status for component visibility
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn(); 
  }

  // Refresehes the tripCode for the freshest infromation and then naviagtes user to the edit-trip page
  private editTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }
}
