import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Inject,
} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'hotelinventoryapp';

  role = 'admin';

  @ViewChild('user', { read: ViewContainerRef }) vcr: ViewContainerRef;

  constructor(
    @Inject(localStorageToken) private localStorage: Storage,
    private initService: InitService,
    private config: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }

  ngOnInit(): void {
    this.localStorage.setItem('name', 'Saffron');
    // this.router.events.subscribe(event => {
    //   console.log(event);
    // })
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      console.log('Navigation Started ');
    })

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => console.log('Navigation Completed'))
  }

  ngAfterViewInit(): void {
    const componentRef = this.vcr?.createComponent(RoomsComponent);
    componentRef.instance.rooms = 10;
  }
}
