import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Sub_region } from '../models/covid/sub_region';
import { CovidSpainService } from '../services/covid-spain.service';

@Component({
  templateUrl: './covid-subregions-list.page.html',
  styleUrls: ['./covid-subregions-list.page.css']
})
export class CovidSubregionsListPage implements OnInit {

  subRegionsCASelected: Sub_region [] = [];
  selectedCA: string;

  constructor(private navController: NavController, public covidSpainService: CovidSpainService) { }

  ngOnInit(): void {
    this.selectedCA = this.covidSpainService.getCCAASelected();
    this.subRegionsCASelected = this.covidSpainService.getRegionsCCAA();
  }

  goBack(){
    this.navController.navigateForward('covid-spain');
  }

  goToSubRegion(){
    this.navController.navigateForward('covid-subregion-stats');
  }

  setSubRegion(subRegion: Sub_region): void{
    this.covidSpainService.setSubRegion(subRegion);
  }

}
