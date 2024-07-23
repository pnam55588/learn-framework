import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { HousingLocation } from '@app/interfaces/housing-location';
import { HousingService } from '@app/services/housing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  addForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    photo: new FormControl(''),
    availableUnits: new FormControl(''),
    wifi: new FormControl(''),
    laundry: new FormControl(''),
  });
  housingService!: HousingService;

  constructor(housingService: HousingService, private formBuilder: FormBuilder, private router: Router) {
    this.housingService = housingService;
  }
  onSubmit() {
    const newHousingLocation: HousingLocation = {
      id: this.addForm.value.id,
      name: this.addForm.value.name,
      city: this.addForm.value.city,
      state: this.addForm.value.state,
      photo: this.addForm.value.photo,
      availableUnits: this.addForm.value.availableUnits,
      wifi: this.addForm.value.wifi,
      laundry: this.addForm.value.laundry,
    }
    console.log(newHousingLocation);
    this.housingService.addHousingLocation(newHousingLocation);
    this.router.navigate(['/']);
  }

  // onFileChange(event: any) {
  //   const file = event.target.files[0];

  // }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [Date.now().toString()],
      name: [''],
      city: [''],
      state: [''],
      photo: ['https://www.pixel4k.com/wp-content/uploads/2018/09/city-toronto-canada-sky-clouds-houses-4k_1538068516.jpg.webp'],
      availableUnits: [0],
      wifi: [true],
      laundry: [true],
    });
  }

}
