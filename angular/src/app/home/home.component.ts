import { Component, OnInit } from '@angular/core';
import { HousingLocation } from '../interfaces/housing-location';
import { HousingService } from '../services/housing.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  // standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  housingLocationList: HousingLocation[] = [];
  housingService!: HousingService;
  filterForm = new FormGroup({
    city: new FormControl('city'),
  })
  constructor(housingService: HousingService) {
    this.housingService = housingService
    housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList
    })
  }
  filterByCity() {
    this.housingService.filterByCity(this.filterForm.value.city).then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList
    })
  }
  ngOnInit(): void {
  }

}
