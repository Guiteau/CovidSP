import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CcaaVaccinationStatsPage } from './ccaa-vaccination-stats/ccaa-vaccination-stats.page';
import { CountryStatsPage } from './country-stats/country-stats.page';
import { CoverPage } from './cover/cover.page';
import { CovidSpainCcaaPage } from './covid-spain-ccaa/covid-spain-ccaa.page';
import { CovidSpainPage } from './covid-spain/covid-spain.page';
import { CovidSubregionStatsPage } from './covid-subregion-stats/covid-subregion-stats.page';
import { CovidSubregionsListPage } from './covid-subregions-list/covid-subregions-list.page';
import { CovidWorldPage } from './covid-world/covid-world.page';
import { InformationPage } from './information/information.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { VaccinationsSpainPage } from './vaccinations-spain/vaccinations-spain.page';

const routes: Routes = [
  {path: 'cover', component: CoverPage},
  {path: 'covid-spain', component: CovidSpainPage},
  {path: 'covid-world', component: CovidWorldPage},
  {path: 'vaccinations-spain', component: VaccinationsSpainPage},
  {path: 'country-stats', component: CountryStatsPage},
  {path: 'ccaa-vaccination-stats', component: CcaaVaccinationStatsPage},
  {path: 'covid-spain-ccaa', component: CovidSpainCcaaPage},
  {path: 'covid-subregions-list', component: CovidSubregionsListPage},
  {path: 'covid-subregion-stats', component: CovidSubregionStatsPage},
  {path: 'information', component: InformationPage},
  {path: 'register', component: RegisterPage},
  {path: 'login', component: LoginPage},
  {path: '', redirectTo: 'cover', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
