import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Sub_region } from '../models/covid/sub_region';
import { CovidSpainService } from '../services/covid-spain.service';

@Component({
  templateUrl: './covid-subregion-stats.page.html',
  styleUrls: ['./covid-subregion-stats.page.css']
})
export class CovidSubregionStatsPage implements OnInit {

  subRegion: Sub_region;

  constructor(private navController: NavController, public covidSpainService: CovidSpainService) {}

  ngOnInit(): void {
    this.subRegion = this.covidSpainService.getSubRegion();
  }

  goBack(){
    this.navController.navigateForward('covid-subregions-list');
  }

}
