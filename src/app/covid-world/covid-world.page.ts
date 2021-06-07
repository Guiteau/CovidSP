import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Country } from '../models/countries/country';
import { COUNTRIES } from '../models/countries/countries.json';
import { RestWorldService } from '../services/rest-world.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  templateUrl: './covid-world.page.html',
  styleUrls: ['./covid-world.page.css']
})
export class CovidWorldPage implements OnInit {

  jsonCountries = COUNTRIES;
  private ngUnsubscribe = new Subject();
  allCountriesDataList: Country[] = [];
  country: Country;
  loading: boolean = false;
  textToSearch: string = '';
  world: Country;
  covidWorldSubscription$: Subscription;

  constructor(public restWorldService: RestWorldService, public toastController: ToastController, private navController: NavController) { }

  ngOnInit(): void {
    this.loading = true;
    this.initSubscription();
  }

  ionViewDidLeave(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initSubscription() {
    this.jsonCountries.forEach(element => {
      this.covidWorldSubscription$ = this.restWorldService.getCountries(element.country).pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((response: any) => {
        this.allCountriesDataList.push(new Country(response["Active Cases_text"], response.Country_text, response["Last Update"], response["New Cases_text"],
          response["New Deaths_text"], response["Total Cases_text"], response["Total Deaths_text"], response["Total Recovered_text"]));
        this.loading = false;
      }, (error) => { this.presentToast() },
        () => { this.sortCountyList(); this.setWorld(); }
      )
    });
  }

  sortCountyList(): void {
    if (this.allCountriesDataList.length != 0)
      this.allCountriesDataList.sort((a, b) => a.country_text.localeCompare(b.country_text));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Error al recuperar los datos',
      duration: 2000
    });
    toast.present();
  }

  goToCountry(country: Country): void {
    this.restWorldService.setCountrySelected(country);
    this.navController.navigateForward('country-stats');
  }

  searchItem(event) {
    this.textToSearch = event.detail.value;
  }

  setWorld() {
    this.allCountriesDataList.forEach(element => {
      if (element.country_text === 'World')
        this.world = element;
    });
  }

}
