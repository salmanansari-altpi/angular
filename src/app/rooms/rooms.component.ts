import {
  Component,
  DoCheck,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
  OnDestroy,
  SkipSelf
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './service/rooms.service';
import { Observable, Subscription, map } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {
  hotelName: string = 'Saffron Hotel';
  rooms: number = 12;
  isHidden: boolean = false;

  room: Room = {
    availableRooms: 10,
    bookedRooms: 5,
    totalRooms: 20,
  };

  roomList: RoomList[] = [];

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error')
  });

  selectedRoom: RoomList;

  title: string = 'Room List';

  totalBytes = 0;

  subscription: Subscription;

  // rooms$ = this.roomsService.getRooms$

  // roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length))

  constructor(private roomsService: RoomsService) {}


  ngOnInit() {
    this.subscription = this.roomsService.getRooms$.subscribe((res) => (this.roomList = res.user));
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          console.log(this.totalBytes);
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });
  }

  ngDoCheck(): void {
    // this.stream.subscribe((data) => console.log(data));
    // this.stream.subscribe(data => console.log(data))
  }

  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent: QueryList<HeaderComponent>;

  ngAfterViewInit(): void {
    console.log(this.headerComponent);
    this.headerComponent.title = 'Rooms List';
    console.log(this.headerChildrenComponent);
    this.headerChildrenComponent.last.title = 'Last Title';
    this.headerChildrenComponent.get(1).title = 'Middle Title';
  }

  toggle() {
    this.isHidden = !this.isHidden;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    console.log(room);
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomType: 'Deluxe Room',
      amenities:
        'Air Conditioner, Free Wi-Fi, Tv, Bathroom, Kitchen, Swimming Pool',
      price: 15000,
      photos: 'https://avatars.githubusercontent.com/u/78205495?v=4',
      rating: 4.4,
    };

    this.roomsService.addRoom(room).subscribe((data) => {
      console.log(data.user);
      this.roomList = data.user;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
