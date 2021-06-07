import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Region } from '../models/covid/region';
import { Spain } from '../models/covid/spain';
import { Sub_region } from '../models/covid/sub_region';

@Injectable({
  providedIn: 'root'
})
export class CovidSpainService {

  URLSpain: string = environment.URLCountries+'spain';
  URLCovid: string = environment.URLCovid;
  URLSpainRegions: string = environment.URLCovidSpainRegions;
  ccaaSelected: string;
  covidSpain: Spain;
  regionSelected: Region;
  subRegionSelected: Sub_region;
  regionsCASelected: Sub_region[] = [];

  headers = {
    'X-RapidAPI-Key': '2243bc37a5msha57f377017e3cd4p1943a8jsne75590377a09'
  }

  constructor(private httpClient: HttpClient) {}

  getSpainData(): Observable<Object>{
    return this.httpClient.get(this.URLSpain);
  }

  getSpainAndRegionsData(date: string): Observable<Object>{
    return this.httpClient.get(this.URLCovid + date + '/country/spain');
  }

  getSpainRegions(): Observable<Object>{
    return this.httpClient.get(this.URLSpainRegions);
  }

  setCCAASelected(ccaaSelected: string):void{
    this.subRegionSelected = undefined;  // COMPROBAR ESTO
    this.ccaaSelected = ccaaSelected;
  }

  getCCAASelected(): string{
    return this.ccaaSelected;
  }

  setRegionsCCAA(regionsCCAA: Sub_region[]): void{
    this.regionsCASelected = regionsCCAA;
  }

  getRegionsCCAA(): Sub_region[]{
    return this.regionsCASelected;
  }

  setSpain(spain: Spain): void{
    this.covidSpain = spain;
  }

  getSpain(): Spain{
    return this.covidSpain;
  }

  setRegionSelected(region: Region): void{
    this.regionSelected = region;
  }

  getRegionSelected(): Region{
    return this.regionSelected;
  }

  setSubRegion(subRegion: Sub_region): void{
    this.ccaaSelected = undefined; // COMPROBAR ESTO
    this.subRegionSelected = subRegion;
  } 

  getSubRegion(): Sub_region{
    return this.subRegionSelected;
  }

}
