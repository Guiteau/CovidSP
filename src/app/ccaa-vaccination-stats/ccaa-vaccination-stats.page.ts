import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Vaccination } from '../models/vaccinations/vaccination';
import { VaccinationsSpainService } from '../services/vaccinations-spain.service';

@Component({
  templateUrl: './ccaa-vaccination-stats.page.html',
  styleUrls: ['./ccaa-vaccination-stats.page.css']
})
export class CcaaVaccinationStatsPage implements OnInit {

  ccaa: Vaccination;

  constructor(public vaccinationSpainService: VaccinationsSpainService, private navController: NavController) { }

  ngOnInit(): void {
    this.ccaa = this.vaccinationSpainService.getCCAASelected();
  }

  goBack(){
    this.navController.navigateForward('vaccinations-spain');
  }

}
