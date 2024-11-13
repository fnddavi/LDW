// Configuração da URL base da API
const API_URL = 'http://localhost:3000';

// Funções auxiliares
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
};

// Funções principais
async function fetchExpenses() {
    try {
        const response = await fetch(`${API_URL}/expenses`);
        const expenses = await response.json();
        displayExpenses(expenses);
        await fetchTotalExpenses();
    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        alert('Erro ao carregar despesas');
    }
}

async function fetchTotalExpenses() {
    try {
        const response = await fetch(`${API_URL}/expenses/total`);
        const { total } = await response.json();
        document.getElementById('totalExpenses').textContent = formatCurrency(total);
    } catch (error) {
        console.error('Erro ao buscar total:', error);
    }
}

function displayExpenses(expenses) {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';

    expenses.forEach(expense => {
        const expenseElement = document.createElement('div');
        expenseElement.className = 'expense-item';
        expenseElement.innerHTML = `
            <div class="expense-info">
                <strong>${expense.description}</strong><br>
                ${formatCurrency(expense.amount)} - ${formatDate(expense.date)}
            </div>
            <div class="expense-actions">
                <button class="btn-edit" onclick="editExpense('${expense._id}')">Alterar</button>
                <button class="btn-delete" onclick="deleteExpense('${expense._id}')">Excluir</button>
            </div>
        `;
        expensesList.appendChild(expenseElement);
    });
}

async function createExpense(event) {
    event.preventDefault();

    const expenseData = {
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value),
        date: document.getElementById('date').value
    };

    try {
        const response = await fetch(`${API_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        });

        if (response.ok) {
            event.target.reset();
            await fetchExpenses();
        } else {
            alert('Erro ao cadastrar despesa');
        }
    } catch (error) {
        console.error('Erro ao criar despesa:', error);
        alert('Erro ao cadastrar despesa');
    }
}

async function editExpense(id) {
    try {
        const response = await fetch(`${API_URL}/expenses/${id}`);
        const expense = await response.json();

        const description = prompt('Nova descrição:', expense.description);
        const amount = prompt('Novo valor:', expense.amount);
        const date = prompt('Nova data (YYYY-MM-DD):', expense.date.split('T')[0]);

        if (!description || !amount || !date) return;

        const updateResponse = await fetch(`${API_URL}/expenses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description,
                amount: parseFloat(amount),
                date
            })
        });

        if (updateResponse.ok) {
            await fetchExpenses();
        } else {
            alert('Erro ao atualizar despesa');
        }
    } catch (error) {
        console.error('Erro ao editar despesa:', error);
        alert('Erro ao editar despesa');
    }
}

async function deleteExpense(id) {
    if (!confirm('Tem certeza que deseja excluir esta despesa?')) return;

    try {
        const response = await fetch(`${API_URL}/expenses/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await fetchExpenses();
        } else {
            alert('Erro ao excluir despesa');
        }
    } catch (error) {
        console.error('Erro ao deletar despesa:', error);
        alert('Erro ao excluir despesa');
    }
}

// Event Listeners
document.getElementById('expenseForm').addEventListener('submit', createExpense);
document.addEventListener('DOMContentLoaded', fetchExpenses);
