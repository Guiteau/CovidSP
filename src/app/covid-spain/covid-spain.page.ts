import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { CovidSpainService } from '../services/covid-spain.service';
import { NavController, ToastController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { Country } from '../models/countries/country';
import { RestWorldService } from '../services/rest-world.service';
import { VaccinationsSpainService } from '../services/vaccinations-spain.service';
import { Spain } from '../models/covid/spain';
import { Region } from '../models/covid/region';
import { Sub_region } from '../models/covid/sub_region';

@Component({
  templateUrl: './covid-spain.page.html',
  styleUrls: ['./covid-spain.page.css']
})
export class CovidSpainPage implements OnInit {

  date: string;
  private ngUnsubscribe = new Subject();
  loading: boolean;
  covidSpainData: Spain;
  spainCountry: Country;
  CCAASpain: string[] = [];
  regionsSpainList: any[] = [];
  textToSearch: string = '';

  constructor(private datePipe: DatePipe, public covidSpainService: CovidSpainService, public toastController: ToastController, 
    private restWorldService: RestWorldService, public vaccinationSpainService: VaccinationsSpainService, 
    private navController: NavController) { }

  ngOnInit(): void {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.loading = true;
    this.initCovidSpainSubscription();
    this.initSpainRegionsSubscription();
    this.initCovidRegionsSubscription();
  }

  ionViewDidLeave(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initCovidRegionsSubscription() {
    this.covidSpainService.getSpainAndRegionsData(this.date).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((response: any) => {
      this.covidSpainData = response.dates[this.date].countries.Spain;
      this.loading = false;
    }, (error) => { this.presentToast() },
      () => { this.filterArray() }
    )
  }

  initCovidSpainSubscription() {
    this.restWorldService.getCountries('spain').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((response: any) => {
      this.spainCountry = new Country(response["Active Cases_text"], response.Country_text, response["Last Update"], response["New Cases_text"],
        response["New Deaths_text"], response["Total Cases_text"], response["Total Deaths_text"], response["Total Recovered_text"]);
    }, (error) => { this.presentToastSpain() }
    );
  }

  initSpainRegionsSubscription() {
    this.covidSpainService.getSpainRegions().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((response: any) => {
      response.countries[0].spain.forEach(element => {
        this.CCAASpain.push(element.name);
      });
    }, (error) => { this.presentToastRegions() },
      () => { this.filterArray(); this.sortCCAAList() }
    );
  }

  goToCAorRegion(ccaa: string) {
    this.covidSpainService.setCCAASelected(ccaa);
    this.covidSpainService.setRegionsCCAA(this.extractSubRegions(ccaa));
    this.covidSpainService.setSpain(this.covidSpainData);
    if(this.covidSpainService.getRegionsCCAA().length != 0)
      this.navController.navigateForward('covid-subregions-list');
    else
      this.navController.navigateForward('covid-spain-ccaa');
  }

  extractSubRegions(ccaa: string): Sub_region[] {
    let regionsCA: Sub_region[] = [];
    this.covidSpainData.regions.forEach(element => {
      if (element.name_es === ccaa) {
        element.sub_regions.forEach(subRegion => {
          regionsCA.push(subRegion);
        });
        if(regionsCA.length === 0)
          this.extractRegionCAObject(element);
      }
    });
    return regionsCA;
  }

  extractRegionCAObject(ccaa: Region): void{
    this.covidSpainService.setRegionSelected(ccaa);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Error al recuperar los datos, inténtalo más tarde',
      duration: 2000
    });
    toast.present();
  }

  async presentToastSpain() {
    const toast = await this.toastController.create({
      message: 'Error al recuperar los datos totales del país',
      duration: 2000
    });
    toast.present();
  }

  async presentToastRegions() {
    const toast = await this.toastController.create({
      message: 'Error al recuperar los datos de las regiones del país',
      duration: 2000
    });
    toast.present();
  }

  searchItem(event) {
    this.textToSearch = event.detail.value;
  }

  filterArray() {
    let unique = this.CCAASpain.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
  }

  sortCCAAList(): void {
    if (this.CCAASpain.length != 0)
      this.CCAASpain.sort((a, b) => a.localeCompare(b));
  }

}
