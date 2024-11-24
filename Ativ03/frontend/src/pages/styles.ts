import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 10%;
  gap: 20px;
  align-self: center;
`;

export const ExpenseForm = styled.div`
  display: flex;
  width: 45%;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 15px;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(180deg, #454545, #d4d4d4);
  justify-content: space-between;
  div {
    display: flex;
    gap: 10px;
  }
`;

export const ExpenseList = styled.div`
  display: flex;
  width: 70%;
  height: 530px;
  flex-direction: column;
  padding: 30px;
  gap: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background: linear-gradient(180deg, #454545, #d4d4d4);
`;

export const ExpenseListScroll = styled.div`
  display: flex;
  height: 530px;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
  border-radius: 4px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;

export const ExpenseItem = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: white;

  div {
    display: flex;
    gap: 10px;
  }
`;

export const InputDescricao = styled.textarea`
  display: block;
  height: 200px;
  width: 100%;
  padding: 75px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  text-align: center;
  resize: none;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
  box-sizing: border-box;
`;

export const Input = styled.input`
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  text-align: center;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }
`;

export const UpdateButton = styled(Button)`
  width: 10%;
  background: #006400; /* Verde escuro */
  padding: 5px 10px;
  &:hover {
    background-color: #004d00; /* Tom mais escuro de verde */
  }
`;

export const DeleteButton = styled(Button)`
  width: 10%;
  background: red;
  padding: 5px 10px;
  &:hover {
    background-color: darkred;
  }
`;

export const Label = styled.p`
  margin: 0;
  font-size: 14px;
  color: black;
`;

export const LabelTitle = styled.p`
  margin: 0;
  font-size: 20px;
  color: white;
  font-weight: bold;
  text-align: center;
`;
