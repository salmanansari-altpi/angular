import { Injectable, Inject } from '@angular/core';
import { RoomList } from '../rooms';
import { AppConfig } from '../../AppConfig/appConfig.interface';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appConfig.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomList: RoomList[] = [];

   getRooms$ = this.http.get<any>('http://localhost:5000/rooms').pipe(shareReplay(1))

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log(this.config.apiEndpoint);
  }

  getRooms() {
    return this.http.get<any>('http://localhost:5000/rooms');
  }

  addRoom(room: RoomList) {
    return this.http.post<any>('http://localhost:5000/rooms', room);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/photos',
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);
  }
}
