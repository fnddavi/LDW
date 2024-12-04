import React, { useState } from "react";
import ReservationForm from "./components/ReservationForm";



function App() {
  const [reservations, setReservations] = useState([]);

  const handleAddReservation = (newReservation) => {
    setReservations([...reservations, newReservation]);
  };

  return (
    <div>
      <h1>Gerenciador de Reservas</h1>
      <ReservationForm onAddReservation={handleAddReservation} />
      <ul>
        {reservations.map((reservation, index) => (
          <li key={index}>
            {reservation.customerName} - Mesa {reservation.tableNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
