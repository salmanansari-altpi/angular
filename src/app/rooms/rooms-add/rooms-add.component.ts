import { Component } from '@angular/core';
import { RoomsService } from '../service/rooms.service';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss'],
})
export class RoomsAddComponent {
  roomType: string;
  amenities: string;
  price: number;
  photoURL: string;
  rating: number;
  successMessage: string

  constructor(private roomsService: RoomsService) {}

  addRoom() {
    const room: RoomList = {
      roomType: this.roomType,
      amenities: this.amenities,
      price: this.price,
      photos: this.photoURL,
      rating: this.rating,
    };
    this.roomsService.addRoom(room).subscribe((data) => this.successMessage = 'Room Added Success');
  }
}
