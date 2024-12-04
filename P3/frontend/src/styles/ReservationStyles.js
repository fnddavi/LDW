// src/styles/ReservationStyles.js
import styled from "styled-components";

export const FormContainer = styled.form`
  background-color: #f4fce4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 20px auto;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #558b2f;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #c5e1a5;
  border-radius: 5px;
`;

export const Button = styled.button`
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

export const Table = styled.table`
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
  background-color: #f9fbe7;
`;

export const TableHeader = styled.th`
  background-color: #aed581;
  color: white;
  padding: 10px;
  border: 1px solid #dcedc8;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #e8f5e9;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #c5e1a5;
  text-align: center;
`;

export const DeleteButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #e53935;
  }
`;
