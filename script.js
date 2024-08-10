document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
    const dialog = document.getElementById('dialog');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    let currentTask;

    // Add task when button is clicked
    addTaskBtn.addEventListener('click', addTask);

    // Add task when enter key is pressed
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            return;
        }

        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';

        const span = document.createElement('span');
        span.textContent = taskText;

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = '...';
        deleteBtn.addEventListener('click', function() {
            currentTask = li;
            dialog.style.display = 'block';
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = '';
        taskInput.focus();
    }

    // Confirm delete
    confirmDeleteBtn.addEventListener('click', function() {
        if (currentTask) {
            taskList.removeChild(currentTask);
            currentTask = null;
            dialog.style.display = 'none';
        }
    });

    // Cancel delete
    cancelBtn.addEventListener('click', function() {
        currentTask = null;
        dialog.style.display = 'none';
    });

    // Delete selected tasks
    deleteSelectedBtn.addEventListener('click', function() {
        const tasks = document.querySelectorAll('#taskList li');
        tasks.forEach(task => {
            const checkbox = task.querySelector('.checkbox');
            if (checkbox.checked) {
                taskList.removeChild(task);
            }
        });
    });
});
