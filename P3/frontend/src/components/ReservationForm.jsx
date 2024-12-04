import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  background-color: #f4fce4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 20px auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #558b2f;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #c5e1a5;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #8bc34a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #7cb342;
  }
`;

const ReservationForm = ({ onAddReservation }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    tableNumber: "",
    reservationDate: "",
    contactPhone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReservation(formData);
    setFormData({
      customerName: "",
      tableNumber: "",
      reservationDate: "",
      contactPhone: "",
    });
  };


  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Nova Reserva</h2>
      <div>
        <Label>Nome do Cliente:</Label>
        <Input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Número da Mesa:</Label>
        <Input
          type="text"
          name="tableNumber"
          value={formData.tableNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Data da Reserva:</Label>
        <Input
          type="date"
          name="reservationDate"
          value={formData.reservationDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Telefone de Contato:</Label>
        <Input
          type="text"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          pattern="\d{11}"
          title="O telefone deve ter 11 dígitos, incluindo o código de área."
          required
        />
      </div>
      <Button type="submit">Criar Reserva</Button>
    </FormContainer>
  );
};

export default ReservationForm;
