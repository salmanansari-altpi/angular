import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent implements OnInit {
  id: number = 0;

  id$ = this.activatedRoute.paramMap.pipe(map(params => params.get('id')))

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.id = +this.activatedRoute.snapshot.paramMap.get('id')
    // this.activatedRoute.paramMap.subscribe(params => params.get('id'))
    // this.activatedRoute.params.subscribe(param => this.id = +param['id'])
  }
}

