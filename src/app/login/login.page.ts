import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UserResponse } from '../models/responses/UserResponse';
import { StorageService } from '../services/storage.service';
import { UserResponseService } from '../services/user-response.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {

  email!:string;
  password!:string;
  rememberUserInfo: boolean = false;

  constructor(private userResponseService: UserResponseService, public toastController: ToastController, 
    public storageService: StorageService, private navController: NavController) {}

  ionViewDidLeave(){
    this.email = '';
    this.password = '';
  }

  checkLogin(){
    let userResponse: UserResponse = new UserResponse(null, null, this.email, this.password, null, null, null, null, null);

    const myPromise: Promise<any> = this.userResponseService.checkUserLogin(userResponse)
    .then((response) =>{
      this.successLoginToast(true);
      this.userResponseService.addUserLogged(response.email);
      if(this.rememberUserInfo)
        this.persisUserData(response);
      this.goToCoverPage();  
    }).catch(() =>{
      this.successLoginToast(false);
    });
  }

  persisUserData(userResponse: UserResponse): void{
    this.storageService.setObject('userData', userResponse).then(result => {
      console.log('User data is saved');
    }).catch(e =>{
      console.log('Error saving user data ' + e);
    });
  }

  goToCoverPage(): void {
    this.navController.navigateForward('cover');
  }

  async successLoginToast(isSuccessful: boolean) {
    const toastOk = await this.toastController.create({
      message: 'Logeado con éxito',
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
