import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CovidWorldPage } from './covid-world/covid-world.page';
import { CovidSpainPage } from './covid-spain/covid-spain.page';
import { VaccinationsSpainPage } from './vaccinations-spain/vaccinations-spain.page';
import { CountryStatsPage } from './country-stats/country-stats.page';
import { PipesModule } from './pipes/pipes.module';
import { CcaaVaccinationStatsPage } from './ccaa-vaccination-stats/ccaa-vaccination-stats.page';
import { CovidSpainCcaaPage } from './covid-spain-ccaa/covid-spain-ccaa.page';
import { CovidSubregionStatsPage } from './covid-subregion-stats/covid-subregion-stats.page';
import { CovidSubregionsListPage } from './covid-subregions-list/covid-subregions-list.page';
import { InformationPage } from './information/information.page';
import { RegisterPage } from './register/register.page';
import { LoginPage } from './login/login.page';
import { CoverPage } from './cover/cover.page';

@NgModule({
  declarations: [AppComponent, CovidWorldPage, CovidSpainPage, VaccinationsSpainPage, CountryStatsPage, CcaaVaccinationStatsPage, CovidSpainCcaaPage, 
    CovidSubregionStatsPage, CovidSubregionsListPage, InformationPage, RegisterPage, LoginPage, CoverPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule, PipesModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
