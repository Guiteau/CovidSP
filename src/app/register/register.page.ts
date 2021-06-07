import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CountryResponse } from '../models/responses/CountryResponse';
import { CountryResponseService } from '../services/country-response.service';
import { UserResponse } from '../models/responses/UserResponse';
import { UserResponseService } from '../services/user-response.service';

@Component({
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css']
})
export class RegisterPage implements OnInit {

  email!: string;
  birthDate!: string;
  name!: string;
  surname!: string;
  country!: CountryResponse;
  sex!: string;
  password!: string;
  passwordRepeated!: string;
  conditionsAccepted: boolean = false;
  countriesList: CountryResponse[] = [];
  birthDateParsed!: number;
  registerForm: FormGroup;

  constructor(private countryResponseService: CountryResponseService, public toastController: ToastController, private formBuilder: FormBuilder,
    private userResponseService: UserResponseService, private navController: NavController) {

    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      surname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      date: new FormControl('', Validators.compose([
        Validators.required
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required
      ])),
      sex: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      passwordRepeated: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

  }

  ionViewDidLeave(){
    this.email = '';
    this.birthDate = '';
    this.country = null;
    this.sex = '';
    this.password = '';
    this.passwordRepeated = '';
  }

  ngOnInit(): void {
    this.getAllCountries();
  }

  goToLoginPage(): void{
    this.navController.navigateForward('login');
  }

  registerUser(): void {

    this.birthDateParsed = new Date(this.birthDate).getTime();
    let userResponse: UserResponse = new UserResponse(null, this.birthDateParsed, this.email, this.password, this.sex, this.name, this.surname, null, this.country);

    const myPromise: Promise<any> = this.userResponseService.saveUser(userResponse).then(() =>{
      this.successRegistrationToast(true);
      this.email = '';
      this.birthDate = '';
      this.country = null;
      this.sex = '';
      this.password = '';
      this.passwordRepeated = '';
      this.goToLoginPage();
    }).catch(() =>{
      this.successRegistrationToast(false);
    });

  }

  validateForm(): void {
    console.log(this.conditionsAccepted);
    let formValid: Boolean;
    formValid = (this.registerForm.valid) ? true : false;
    if (formValid) {
      if (this.validateEmail()) {
        if (this.checkPasswordMatching()) {
          this.registerUser();
        }
      }
    } else
      this.formUnfilledToast();
  }

  checkPasswordMatching(): boolean {
    if (this.password === this.passwordRepeated)
      return true;
    else {
      this.passwordNotMatchingToast();
      return false;
    }
  }

  validateEmail(): boolean {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
      return true;
    }
    this.wrongEmailToast();
    return false;
  }

  setConditions() {
    this.conditionsAccepted = (!this.conditionsAccepted) ? true : false;
  }

  getAllCountries() {
    this.countryResponseService.getAllCountries().then((response: any) => {
      if (response == undefined)
        console.log('Promise getAllCountries() undefined');
      this.countriesList = response;
      this.sortCountriesList();
    })
  }

  sortCountriesList(): void {
    if (this.countriesList.length != 0)
      this.countriesList.sort((a, b) => a.countryName.localeCompare(b.countryName));
  }

  async wrongEmailToast() {
    const toast = await this.toastController.create({
      message: 'Debes introducir un email válido',
      duration: 2000
    });
    toast.present();
  }

  async formUnfilledToast() {
    const toast = await this.toastController.create({
      message: 'Faltan campos por rellenar',
      duration: 2000
    });
    toast.present();
  }

  async passwordNotMatchingToast() {
    const toast = await this.toastController.create({
      message: 'No coinciden las contraseñas',
      duration: 2000
    });
    toast.present();
  }

  async successRegistrationToast(isSuccessful: boolean) {
    const toastOk = await this.toastController.create({
      message: 'Registrado con éxito',
      duration: 2000
    });
    const toastFail = await this.toastController.create({
      message: 'Algo ha fallado inténtalo de nuevo',
      duration: 2000
    });
    if (isSuccessful)
      toastOk.present();
    else
      toastFail.present();
  }

}
