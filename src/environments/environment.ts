// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URLCountries: 'https://covid-19-tracking.p.rapidapi.com/v1/',
  URLVaccination: 'https://covid-vacuna.app/data/latest.json',
  URLCovid: 'https://api.covid19tracking.narrativa.com/api/',
  URLCovidSpainRegions: 'https://api.covid19tracking.narrativa.com/api/countries/spain/regions',
  URLCountryResponse: 'http://localhost:8080/country/',
  URLUserResponse: 'http://localhost:8080/user/',
  URLSessionResponse: 'http://localhost:8080/session/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
