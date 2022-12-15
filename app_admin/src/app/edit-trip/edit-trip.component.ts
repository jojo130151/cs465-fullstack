import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tripService: TripDataService
  ) { }

  ngOnInit() {

    // retrieve stashed tripId
    let tripCode = localStorage.getItem("tripCode"); 
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return; 
    }
    
    console.log('EditTripComponent#onInit found tripCode ' + tripCode);

    // initialize form
    this.editForm = this.formBuilder.group({
    _id: [],
    code: [tripCode, Validators.required],
    name: ['', Validators.required],
    length: ['', Validators.required],
    start: ['', Validators.required],
    resort: ['', Validators.required],
    perPerson: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    })

    console.log('EditTripComponent#onInit calling TripDataService#getTrip(\'' + tripCode + '\')');

    this.tripService.getTrip(tripCode)
      .then(data => {
        console.log(data);
        // Don't use editForm.setValue() as it will throw console error 
        this.editForm.patchValue(data[0]);
    })
  }
    
  /* Runs when the submit or delete button on edit-trip page is presssed - 
  updates trip in database and navigates user back to trips-list page or
  deletes trip from database altogether. */
  onSubmit() {
    if (this.submitted == true) {
      if (this.editForm.valid) {
        this.tripService.updateTrip(this.editForm.value)
          .then(data => {
            console.log(data);
            console.log("Rerouting to list-trips through edit-component.ts");
            this.router.navigate(['list-trips']);
          });
      }
    }
    if (this.submitted == false) {
      this.tripService.deleteTrip(this.editForm.value)
        .then(data => {
          console.log(data);
          console.log("Rerouting to list-trips through edit-component.ts");
          this.router.navigate(['list-trips']);
        });
    }
  }

  // These functions run before onSubmit() and lets that function know what button was pressed on the edit-trip page
  onSubmitClick() {
    this.submitted = true;
  }
  onDeleteClick() {
    this.submitted = false;
  }


  get f() { return this.editForm.controls; }
}
