import { Injectable } from '@angular/core';
import { Reservation, Seat } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  seats: Seat[] = [];
  reservations: Reservation[] = [];

  constructor() {
    this.initializeSeats();
    this.loadReservations();
  }

  private initializeSeats() {
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= (row === 10 ? 3 : 7); col++) {
        const id = `${row}${String.fromCharCode(64 + col)}`;
        this.seats.push({ id, status: 'available' });
      }
    }
  }

  private loadReservations() {
    const storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      this.reservations = JSON.parse(storedReservations);
      this.reservations.forEach((reservation) => {
        reservation.seatIds.forEach((seatId) => {
          const seat = this.seats.find((seat) => seat.id === seatId);
          if (seat) {
            seat.status = 'booked';
          }
        });
      });
    }
  }

  getSeats(): Seat[] {
    return this.seats;
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  bookSeats(name: string, requestedSeats: number): string[] {
    if (requestedSeats > 7) {
      throw new Error('You can only reserve up to 7 seats at a time.');
    }

    const availableSeats = this.seats.filter(
      (seat) => seat.status === 'available'
    );
    if (availableSeats.length < requestedSeats) {
      throw new Error('Not enough seats available.');
    }

    const bookedSeats: string[] = [];
    for (let i = 0; i < requestedSeats; i++) {
      const seat = availableSeats[i];
      seat.status = 'booked';
      bookedSeats.push(seat.id);
    }

    this.reservations.push({
      name,
      numSeats: requestedSeats,
      seatIds: bookedSeats,
    });
    this.updateLocalStorage();
    return bookedSeats;
  }

  private updateLocalStorage() {
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
