const apiUrl = "http://localhost:5000/api/expenses";

// Função para atualizar a lista de despesas e o total
async function updateExpensesList() {
    try {
        // Buscar despesas
        const response = await fetch(apiUrl);
        const expenses = await response.json();

        // Limpar a lista de despesas no frontend
        const expensesList = document.getElementById("expenses-list");
        expensesList.innerHTML = "";

        // Variável para calcular o total
        let total = 0;

        // Listar cada despesa
        expenses.forEach(expense => {
            total += expense.amount;

            const expenseDiv = document.createElement("div");
            expenseDiv.innerHTML = `
                ${expense.description} - R$ ${expense.amount.toFixed(2)} - ${new Date(expense.date).toLocaleDateString()}
                <button onclick="editExpense('${expense._id}')">Alterar</button>
                <button onclick="deleteExpense('${expense._id}')">Excluir</button>
            `;
            expensesList.appendChild(expenseDiv);
        });

        // Atualizar o total de despesas
        document.getElementById("total-amount").textContent = total.toFixed(2);
    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
    }
}

// Função para cadastrar uma nova despesa
document.getElementById("expense-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    try {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description, amount, date })
        });
        updateExpensesList();
    } catch (error) {
        console.error('Erro ao adicionar despesa:', error);
    }
});

// Função para editar uma despesa
async function editExpense(id) {
    const description = prompt('Nova descrição:');
    const amount = parseFloat(prompt('Novo valor:'));
    const date = prompt('Nova data (yyyy-mm-dd):');

    if (description && !isNaN(amount) && date) {
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description, amount, date })
            });
            updateExpensesList();
        } catch (error) {
            console.error('Erro ao editar despesa:', error);
        }
    }
}

// Função para excluir uma despesa
async function deleteExpense(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        updateExpensesList();
    } catch (error) {
        console.error('Erro ao excluir despesa:', error);
    }
}

// Carregar a lista de despesas e o total ao iniciar a página
window.addEventListener('DOMContentLoaded', updateExpensesList);

