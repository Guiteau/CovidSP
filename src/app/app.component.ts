import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { SessionResponse } from './models/responses/SessionResponse';
import { IpServiceService } from './services/ip-service.service';
import { SessionResponseService } from './services/session-response.service';
import { StorageService } from './services/storage.service';
import { UserResponseService } from './services/user-response.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  userLogged$: Observable<string>;
  userEmail!: string;
  userServiceSubscription$!: Subscription;
  ipServiceSubscription$!: Subscription;
  ipAddress: string;
  session: SessionResponse;
  backButtonSubscription: Subscription;

  public appPages = [
    { title: 'COVID España', url: 'covid-spain', icon: 'locate' },
    { title: 'COVID Mundo', url: 'covid-world', icon: 'paper-plane' },
    { title: 'Vacunas España', url: 'vaccinations-spain', icon: 'heart' },
    { title: 'Información', url: 'information', icon: 'information' }, // esto no lo he modificado (falta un componente)
    { title: 'Regístrate', url: 'register', icon: 'person' }, // esto no lo he modificado aún (falta un componente)
    { title: 'Login', url: 'login', icon: 'log-in' },
  ];

  constructor(private userResponseService: UserResponseService, public storageService: StorageService, 
    private ipService: IpServiceService, private sessionResponseService: SessionResponseService,
    private platform: Platform) { }

  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnInit(): void {
    this.initSubscription();
    this.session = new SessionResponse(null, null, null, null, null);
    // this.storageService.clear();
  }

  initSubscription(): void {
    this.userLogged$ = this.userResponseService.getUserLogged$();
    this.userServiceSubscription$ = this.userLogged$.subscribe(userLoggedEmail => this.userEmail = userLoggedEmail);
    this.ipServiceSubscription$ = this.ipService.getIpAddress().subscribe((result: any) => this.ipAddress = result.ip);
    this.storageService.getObject('userData').then(result => {
      if (result != null) {
        this.session.id = result.userId;
        this.userEmail = result.email;
        this.session.userResponse = result; // guardamos ya en el objeto sessión el userResponse
        this.session.sessionStart = new Date().getTime(); // guardamos el tiempo de inicio de la sesión
        console.log(this.session);
      }
    })
  }

  ngOnDestroy() {
    if (this.userServiceSubscription$ != null)
      this.userServiceSubscription$.unsubscribe();
    if (this.ipServiceSubscription$ != null)
      this.ipServiceSubscription$.unsubscribe();
    if (this.session.id != undefined) {
      this.session.sessionEnd = new Date().getTime();
      this.session.ipAddress = this.ipAddress;
      this.sessionResponseService.saveSession(this.session);
    }
    this.backButtonSubscription.unsubscribe();
  }

  // exitApp(): void {
  //   if (this.session.id != undefined) {
  //     this.session.sessionEnd = new Date().getTime();
  //     this.session.ipAddress = this.ipAddress;
  //     this.sessionResponseService.saveSession(this.session);
  //   }
  // }  // PRUEBA PARA GUARDAR LA SESIÓN DEL USUARIO

}