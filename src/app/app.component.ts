import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef, Inject } from '@angular/core'
import { RoomsComponent } from './rooms/rooms.component'
import { localStorageToken } from './localstorage.token'
import { InitService } from './init.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'hotelinventoryapp'

  role = 'admin'

  @ViewChild('user', { read: ViewContainerRef }) vcr: ViewContainerRef

  constructor(@Inject(localStorageToken) private localStorage: Storage, private initService: InitService) {
    console.log(initService.config);

  }

  ngOnInit(): void {
    this.localStorage.setItem('name', 'Saffron')
  }

  ngAfterViewInit(): void {
    const componentRef = this.vcr?.createComponent(RoomsComponent)
    componentRef.instance.rooms = 10
  }
}
