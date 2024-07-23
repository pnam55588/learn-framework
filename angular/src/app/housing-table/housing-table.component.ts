import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HousingLocation } from '@app/interfaces/housing-location';
import { HousingService } from '@app/services/housing.service';

@Component({
  selector: 'app-housing-table',
  templateUrl: './housing-table.component.html',
  styleUrls: ['./housing-table.component.scss']
})
export class HousingTableComponent implements OnInit {

  dataSource: HousingLocation[] = []; // Dữ liệu của bảng
  displayedColumns: string[] = ['id', 'name', 'location', 'availableUnits', 'wifi', 'laundry', 'actions'];

  constructor(private dialog: MatDialog, private housingService: HousingService) {
    this.loadData();
  }

  loadData() {
    this.housingService.getAllHousingLocations().then((data : HousingLocation[]) => {
      this.dataSource = data;
    });
  }

  delete(element: any) {
    this.housingService.deleteHousingLocation(element.id).then(() => {
      this.loadData();
    });
  }
  ngOnInit(): void {
  }

}
