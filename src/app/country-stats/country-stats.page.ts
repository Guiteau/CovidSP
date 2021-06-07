import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Country } from '../models/countries/country';
import { RestWorldService } from '../services/rest-world.service';

@Component({
  templateUrl: './country-stats.page.html',
  styleUrls: ['./country-stats.page.css']
})
export class CountryStatsPage implements OnInit {

  country: Country;

  constructor(private navController: NavController, public restWorldService: RestWorldService) {}

  ngOnInit(): void {
    this.country = this.restWorldService.getCountrySelect();
  }

  goBack(){
    this.navController.navigateForward('covid-world');
  }

  ionViewWillLeave(){
    console.log('ion will leave');
  }

}
