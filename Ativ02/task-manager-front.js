// script.js
const API_URL = 'http://localhost:5000';
let editingTaskId = null;

// Carregar tarefas ao iniciar a página
async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        alert('Erro ao carregar tarefas');
    }
}


// Buscar uma tarefa pelo ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Adicionar nova tarefa
async function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    if (!title || !dueDate) {
        alert('Por favor, preencha os campos obrigatórios!');
        return;
    }

    const task = {
        title,
        description,
        dueDate,
        priority,
        completed: false
    };

    try {
        const method = editingTaskId ? 'PUT' : 'POST';
        const url = editingTaskId
            ? `${API_URL}/tasks/${editingTaskId}`
            : `${API_URL}/tasks`;

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) throw new Error('Erro ao salvar tarefa');

        clearForm();
        editingTaskId = null;
        loadTasks();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao salvar tarefa');
    }
}

// Renderizar tarefas
function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;

        taskElement.innerHTML = `
            <div>
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                    onchange="toggleTask('${task._id}', ${!task.completed})">
                <span class="${task.priority}">
                    ${task.title} - ${new Date(task.dueDate).toLocaleDateString()}
                </span>
                <p>${task.description}</p>
            </div>
            <div>
                <button class="edit-btn" onclick="editTask('${task._id}')">Editar</button>
                <button class="delete-btn" onclick="deleteTask('${task._id}')">Deletar</button>
            </div>
        `;

        taskList.appendChild(taskElement);
    });
}

// Editar tarefa
async function editTask(id) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`);
        const task = await response.json();

        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
        document.getElementById('dueDate').value = task.dueDate.split('T')[0];
        document.getElementById('priority').value = task.priority;

        editingTaskId = id;
    } catch (error) {
        console.error('Erro ao carregar tarefa para edição:', error);
        alert('Erro ao carregar tarefa para edição');
    }
}

// Alternar status da tarefa
async function toggleTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed })
        });

        if (!response.ok) throw new Error('Erro ao atualizar tarefa');

        loadTasks();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar tarefa');
    }
}

// Deletar tarefa
async function deleteTask(id) {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) return;

    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao deletar tarefa');

        loadTasks();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar tarefa');
    }
}

// Limpar formulário
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('priority').value = 'low';
}

// Carregar tarefas ao iniciar
loadTasks();
