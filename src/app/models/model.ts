// Schema for a single seat in the coach
export interface Seat {
  id: string; // Unique identifier for the seat (e.g., 1A, 2B)
  status: 'available' | 'booked'; // Current status of the seat
}

// Schema for a single reservation
export interface Reservation {
  name: string; // Name of the person who made the reservation
  numSeats: number; // Number of seats reserved
  seatIds: string[]; // Array of seat IDs associated with the reservation
}
