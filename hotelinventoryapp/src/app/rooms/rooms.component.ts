import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.headerComponent.title = 'Rooms View';
  }

  hotelName = 'Hilton Hotel';

  numberOfRooms = 10;

  hideRooms = false;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  }

  roomsList: RoomList[] = [];

  selectedRoom!: RoomList;

  totalBytes = 0;

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  constructor(private roomsService: RoomsService) {
  }

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch(event.type){
        case HttpEventType.Sent: {
          console.log('Request has been made');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    });

    this.roomsService.getRooms().subscribe(rooms => {
      this.roomsList = rooms;
    });
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditionr, Free Wi-Fi, bathroom, TV, Kitchen.',
      price: 500,
      photos: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021')
    }

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomsList = data;
    });

  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditionr, Free Wi-Fi, bathroom, TV, Kitchen.',
      price: 500,
      photos: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021')
    }

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomsList = data;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom('2').subscribe((data) => {
      this.roomsList = data;
    });
  }
}
