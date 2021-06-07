import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Country } from '../models/countries/country';
import { COUNTRY_CODES } from '../models/countries/country-codes.json';

@Injectable({
  providedIn: 'root'
})
export class RestWorldService {

  url: string = environment.URLCountries;
  countrySelected: Country;
  jsonCountryCodes = COUNTRY_CODES;

  headers = {
    'X-RapidAPI-Key': '2243bc37a5msha57f377017e3cd4p1943a8jsne75590377a09'
  }
  requestOptions = {
    headers: new HttpHeaders(this.headers)
  }

  constructor(private httpClient: HttpClient){}

  public getCountries(country:string): Observable<Object>{
    return this.httpClient.get(this.url+country, this.requestOptions);
  }

  public setCountrySelected(country: Country){
    this.countrySelected = country;
  }

  public getCountrySelect(){
    return this.countrySelected;
  }
  
  getCountryFlag(countryCode: string): string {
    let flagRoute: string = '../../assets/images/countries/country-flags/';
    this.jsonCountryCodes.forEach(element => {
      if (countryCode === element.name)
        flagRoute+= element.code;
    });
    flagRoute += '.png';
    return flagRoute;
  }

}