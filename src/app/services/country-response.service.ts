import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Country } from '../models/countries/country';
import { CountryResponse } from '../models/responses/CountryResponse';

@Injectable({
  providedIn: 'root'
})
export class CountryResponseService {

  constructor(private http:HttpClient) {}

  getAllCountries(): Promise<Country[]>{
    return new Promise((resolve, reject) => {
      this.http.get(environment.URLCountryResponse + 'getAllCountries').subscribe(
        (countriesResults: any) => {
          resolve(countriesResults);
        },
        (error: any) =>{
          console.log('Error in CountryResponseService trying getAllCountries() ', error);
          reject(error);
        }
      );
    });
  }

  saveCountry(countryResponse: CountryResponse): Promise<boolean>{
    return new Promise((resolve, reject) =>{
      this.http.post(environment.URLCountryResponse + 'saveCountry', countryResponse).subscribe(
        (data: any) =>{
          resolve(true);
        },
        (error: any) =>{
          console.log("Error saving country", error);
          reject(false);
        }
      );
    });
  }

}
