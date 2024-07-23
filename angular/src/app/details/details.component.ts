import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../interfaces/housing-location';
import { HousingService } from '../services/housing.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  housingLocationDetail : HousingLocation | undefined;
  housingService!: HousingService
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor(private route: ActivatedRoute, housingService: HousingService) { 
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService = housingService;
    housingService.getHousingLocationById(housingLocationId).then((housingLocation: HousingLocation | undefined)=>{
      this.housingLocationDetail = housingLocation
    })
  }

  submitApplication(): void {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }


  ngOnInit(): void {
  }

}
