import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CCAA_CODES } from '../models/ccaa/ccaa-codes.json';
import { Vaccination } from '../models/vaccinations/vaccination';

@Injectable({
  providedIn: 'root'
})
export class VaccinationsSpainService {

  vaccinationUrl: string = environment.URLVaccination;
  jsonCCAACodes = CCAA_CODES;
  ccaaSelected: Vaccination;

  constructor(private httpClient: HttpClient) {}

  getVaccinationData(): Observable<Object>{
    return this.httpClient.get(this.vaccinationUrl);
  }

  getCCAAFlag(ccaaName: string): string{
    let flagRoute: string = './assets/images/vaccinations/ccaa-flags/';
    if(ccaaName === 'Castilla-La Mancha')
      ccaaName = 'Castilla La Mancha';
    else if(ccaaName === 'Castilla y León')
      ccaaName = 'Castilla y Leon';  
    this.jsonCCAACodes.forEach(element => {
      if (ccaaName === element.name)
        flagRoute+= element.code;
    });
    flagRoute += '.png';
    return flagRoute;
  }

  setCCAASelected(ccaa: Vaccination){
    this.ccaaSelected = ccaa;
  }

  getCCAASelected(): Vaccination{
    return this.ccaaSelected;
  }

}
