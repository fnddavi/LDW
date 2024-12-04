import React, { useState, useEffect } from "react";
import { getReservations, deleteReservation } from "../services/api";
import { io } from "socket.io-client";
import styled from "styled-components";


function ReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getReservations();
        setReservations(response.data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    };

    fetchReservations();

    const socket = io("http://localhost:3030");

    socket.on("reservationCreated", (newReservation) => {
      setReservations((prevReservations) => [
        ...prevReservations,
        newReservation,
      ]);
    });

    socket.on("reservationUpdated", (updatedReservation) => {
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === updatedReservation._id
            ? updatedReservation
            : reservation
        )
      );
    });

    socket.on("reservationDeleted", (id) => {
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation._id !== id)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteReservation(id);
      setReservations(
        reservations.filter((reservation) => reservation._id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar reserva:", error);
    }
  };

  return (
    <Container>
      <Title>Reservas</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Nome do Cliente</TableHeader>
            <TableHeader>Número da Mesa</TableHeader>
            <TableHeader>Data</TableHeader>
            <TableHeader>Ações</TableHeader>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <TableRow key={reservation._id}>
              <TableCell>{reservation.customerName}</TableCell>
              <TableCell>{reservation.tableNumber}</TableCell>
              <TableCell>
                {new Date(reservation.reservationDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(reservation._id)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}


const Container = styled.div`
  padding: 20px;
  background-color: #f9fbe7; /* Amarelo bem claro */
`;

const Title = styled.h2`
  color: #558b2f; /* Verde escuro */
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fffde7; /* Amarelo suave */
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #dce775; /* Amarelo claro */
  color: #33691e; /* Verde forte */
  border: 1px solid #c5e1a5; /* Verde claro */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f1f8e9; /* Verde bem claro */
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border: 1px solid #c5e1a5; /* Verde claro */
`;

const Button = styled.button`
  background-color: #66bb6a; /* Verde vibrante */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #388e3c; /* Verde mais escuro */
  }
`;

export default ReservationList;