import { Injectable, Inject } from '@angular/core';
import { RoomList } from '../rooms';
import { AppConfig } from '../../AppConfig/appConfig.interface'
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appConfig.service';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomList: RoomList[] = []

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient) {
    console.log(this.config.apiEndpoint);
  }

  getRooms() {
    return this.http.get<RoomList[]>('http://localhost:3000/rooms')
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('http://localhost:3000/rooms', room)
  }

  getPhotos() {
    const request = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/photos', {
      reportProgress: true
    })
    return this.http.request(request)
  }
}
