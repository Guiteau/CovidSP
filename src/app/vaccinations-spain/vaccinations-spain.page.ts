import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Vaccination } from '../models/vaccinations/vaccination';
import { VaccinationsSpainService } from '../services/vaccinations-spain.service';

@Component({
  templateUrl: './vaccinations-spain.page.html',
  styleUrls: ['./vaccinations-spain.page.css']
})
export class VaccinationsSpainPage implements OnInit {

  private ngUnsubscribe = new Subject();
  allVaccinationsSpainDataList: Vaccination[] = [];
  loading: boolean;
  textToSearch: string = '';
  vaccinationsSubscription$!: Subscription;

  constructor(public vaccinationsService: VaccinationsSpainService, public toastController: ToastController, private navController: NavController) { }

  ngOnInit(): void {
    this.loading = true;
    this.initSubscription();
  }
  
  ionViewDidLeave(){
    if(this.vaccinationsSubscription$ != null){
      this.vaccinationsSubscription$.unsubscribe();
    }
  }

  initSubscription(): void {
    this.vaccinationsSubscription$ = this.vaccinationsService.getVaccinationData().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((response: Vaccination []) => {
      this.allVaccinationsSpainDataList = response;
      this.loading = false;
    }, (error) => { this.presentToast }
    )
  }

  async presentToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Error al recuperar los datos',
      duration: 2000
    });
    toast.present();
  }

  searchItem(event): void {
    this.textToSearch = event.detail.value;
  }

  goToVaccinationCCAAStats(ccaa: Vaccination): void{
    this.vaccinationsService.setCCAASelected(ccaa);
    this.navController.navigateForward('ccaa-vaccination-stats');
  }

}
