import { Injectable } from '@angular/core';
import { HousingLocation } from '../interfaces/housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  
  // protected housingLocationList: HousingLocation[] = []
  url = 'http://localhost:3000/housingLocationList'  
  constructor() { }
  
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application submitted for ${firstName} ${lastName} with email ${email}`);
  }
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const response = await fetch(this.url)
    return await response.json() ?? []
  }
  async  getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const response = await fetch(`${this.url}/${id}`)
    return await response.json() ?? undefined
  }
  async addHousingLocation(housingLocation: HousingLocation): Promise<void> {
    await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(housingLocation)
    })
  }
  async deleteHousingLocation(id: number): Promise<void> {
    await fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    })
  }
  async filterByCity(city: string): Promise<HousingLocation[]> {
    const response = await fetch(`${this.url}?city=${city}`)
    return await response.json() ?? []
  }
}
