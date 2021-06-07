import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Region } from '../models/covid/region';
import { Sub_region } from '../models/covid/sub_region';
import { CovidSpainService } from '../services/covid-spain.service';

@Component({
  templateUrl: './covid-spain-ccaa.page.html',
  styleUrls: ['./covid-spain-ccaa.page.css']
})
export class CovidSpainCcaaPage implements OnInit {

  region: Region;

  constructor(private navController: NavController, public covidSpainService: CovidSpainService) { }

  ngOnInit(): void {
    this.region = this.covidSpainService.getRegionSelected();
  }

  goBack(){
    this.navController.navigateForward('covid-spain');
  }

  goToSubRegion(){
    this.navController.navigateForward('covid-region-stats');
  }

  setSubRegion(subRegion: Sub_region): void{
    this.covidSpainService.setSubRegion(subRegion);
  }

}
