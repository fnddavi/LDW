import React, { useState, useEffect } from "react";
import axios from "axios"; // Para chamadas à API
import {
  Button,
  Container,
  DeleteButton,
  ExpenseForm,
  ExpenseItem,
  ExpenseList,
  ExpenseListScroll,
  Input,
  InputDescricao,
  Label,
  LabelTitle,
  UpdateButton,
} from "./styles";
import { Expense } from "../types";
import { format } from "date-fns";

const ExpenseScreen: React.FC = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [editingId, setEditingId] = useState<string | null>(null); // ID da despesa em edição
  const [error, setError] = useState<string | null>(null); // Estado para erro

  // Função para carregar as despesas e o total
  const fetchExpenses = async () => {
    try {
      const { data: expenseData } = await axios.get(
        "http://localhost:3010/despesa"
      );
      const { data: totalAmount } = await axios.get(
        "http://localhost:3010/despesa/total"
      );
      setExpenses(expenseData);
      setTotal(totalAmount);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  };

  // Carrega as despesas ao montar o componente
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Função para criar ou atualizar uma despesa
  const handleSubmit = async () => {
    setError(null); // Reseta o erro

    if (!amount) {
      setError("Valor é obrigatório.");
      return;
    }

    try {
      if (editingId) {
        // Atualizar despesa
        const updatedExpense = {
          description,
          amount: parseFloat(amount),
          date,
        };
        await axios.put(
          `http://localhost:3010/despesa/${editingId}`,
          updatedExpense
        );
        setEditingId(null); // Sai do modo de edição
      } else {
        // Criar nova despesa
        const newExpense = {
          description,
          amount: parseFloat(amount),
          date,
        };
        await axios.post("http://localhost:3010/despesa", newExpense);
      }

      setDescription("");
      setAmount("");
      setDate("");
      fetchExpenses(); // Atualiza a lista de despesas
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Captura a mensagem do backend
      } else {
        console.error("Erro ao salvar despesa:", error);
        setError("Erro ao salvar despesa.");
      }
    }
  };

  // Função para preencher o formulário com os dados da despesa selecionada
  const handleEditExpense = (expense: Expense) => {
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setDate(expense.date.slice(0, 10)); // Extrai o formato YYYY-MM-DD
    setEditingId(expense._id); // Define o ID da despesa em edição
  };

  // Função para excluir uma despesa
  const handleDeleteExpense = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3010/despesa/${id}`);
      fetchExpenses(); // Atualiza a lista de despesas
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
    }
  };

  return (
    <Container>
      <ExpenseForm>
        <LabelTitle>Controle de Despesas</LabelTitle>
        <InputDescricao
          placeholder="Descrição da Despesa"
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 100) {
              setDescription(e.target.value);
            }
          }}
        />
        <Input
          type="number"
          placeholder="R$ Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && <Label style={{ color: "red", textAlign:"center", fontWeight: "bold", WebkitTextStroke: "0.1px black", fontSize:16}}>{error}</Label>}
        <Input
          type="date"
          placeholder="Data"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button onClick={handleSubmit}>
          {editingId ? "Atualizar Despesa" : "Cadastrar Despesa"}
        </Button>
      </ExpenseForm>

      <ExpenseList>
        <LabelTitle>Total das Despesas: R$ {total.toFixed(2)}</LabelTitle>
        <ExpenseListScroll>
          {expenses.map((expense) => (
            <ExpenseItem key={expense._id}>
              <Label>Descrição: {expense.description}</Label>
              <Label>Valor: R$ {expense.amount.toFixed(2)}</Label>
              <Label>
                Data: {format(new Date(expense.date), "dd/MM/yyyy")}
              </Label>
              <div>
                <UpdateButton onClick={() => handleEditExpense(expense)}>
                  Alterar
                </UpdateButton>
                <DeleteButton onClick={() => handleDeleteExpense(expense._id)}>
                  Excluir
                </DeleteButton>
              </div>
            </ExpenseItem>
          ))}
        </ExpenseListScroll>
      </ExpenseList>
    </Container>
  );
};

export default ExpenseScreen;
