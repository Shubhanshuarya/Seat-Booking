import { Component } from '@angular/core';
import { SeatService } from './services/seat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  storedReservations: any[] = [];

  constructor(private seatService: SeatService) {}

  ngOnInit() {
    this.storedReservations = this.seatService.getReservations();
    localStorage.clear();
  }
}
