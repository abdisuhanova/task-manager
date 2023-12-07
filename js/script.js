let tasks = []; // Empty array to store tasks from the API
const userToken = sessionStorage.getItem('userToken'); // Retrieve user token or ID

// Function to fetch tasks for the logged-in user
async function fetchTasks(userId) {
  try {
    const response = await fetch(`https://65708bf009586eff66419795.mockapi.io/tasks?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Display an error message to the user
    // Handle error...
  }
}

// Function to update task status for the logged-in user
async function updateTaskStatus(task) {
  try {
    const response = await fetch(`https://65708bf009586eff66419795.mockapi.io/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(task)
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
  } catch (error) {
    console.error('Error updating task:', error);
    // Handle error...
  }
}

// Function to create a new task for the logged-in user
async function createNewTask(newTaskText, userId) {
  try {
    const response = await fetch('https://65708bf009586eff66419795.mockapi.io/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        text: newTaskText,
        completed: false,
        userId: userId // Include user ID in task data
      })
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    const newTask = await response.json();
    tasks.push(newTask);
    renderTasks(tasks);
  } catch (error) {
    console.error('Error creating task:', error);
    // Handle error...
  }
}

// // Function to render tasks
// function renderTasks(taskArray) {
//   const taskList = document.getElementById('taskList');
//   taskList.innerHTML = '';

//   taskArray.forEach((task) => {
//     const taskItem = document.createElement('div');
//     taskItem.innerHTML = `
//       <input type="checkbox" ${task.completed ? 'checked' : ''}>
//       <span>${task.text}</span>
//     `;
//     taskList.appendChild(taskItem);

//     // Add event listener for checkbox change
//     const checkbox = taskItem.querySelector('input[type="checkbox"]');
//     checkbox.addEventListener('change', async () => {
//       try {
//         // Update the completion status of the task for the logged-in user
//         task.completed = !task.completed;
//         await updateTaskStatus(task);
//       } catch (error) {
//         console.error('Error updating task:', error);
//       }
//     });
//   });
// }

// Function to render tasks
function renderTasks(taskArray) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  taskArray.forEach((task) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item'); // Add a class for styling

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', async () => {
      try {
        task.completed = !task.completed;
        await updateTaskStatus(task);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    });

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async () => {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    });

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', async () => {
      const updatedText = prompt('Enter updated task text:', task.text);
      if (updatedText !== null && updatedText.trim() !== '') {
        task.text = updatedText.trim();
        await updateTaskStatus(task);
      }
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(updateButton);
    taskList.appendChild(taskItem);
  });
}

// Function to delete a task
async function deleteTask(taskId) {
  try {
    const response = await fetch(`https://65708bf009586eff66419795.mockapi.io/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks(tasks);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}


// Initial fetch of tasks for the logged-in user when the page loads
const loggedInUserId = sessionStorage.getItem('userId'); // Retrieve user ID
fetchTasks(loggedInUserId);

// Filter buttons
const allTasksBtn = document.getElementById('allTasksBtn');
const completedTasksBtn = document.getElementById('completedTasksBtn');
const activeTasksBtn = document.getElementById('activeTasksBtn');

allTasksBtn.addEventListener('click', () => {
  fetchTasks(loggedInUserId);
});

completedTasksBtn.addEventListener('click', () => {
  const completedTasks = tasks.filter((task) => task.completed);
  renderTasks(completedTasks);
});

activeTasksBtn.addEventListener('click', () => {
  const activeTasks = tasks.filter((task) => !task.completed);
  renderTasks(activeTasks);
});

// Task creation form
const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const newTaskText = taskInput.value.trim();

  if (newTaskText !== '') {
    try {
      await createNewTask(newTaskText, loggedInUserId);
      taskInput.value = '';
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
});

// Function to handle logout and redirect to login page
function logout() {
  // Perform logout actions here
  // Example: Clear any stored data (e.g., user tokens, session storage, etc.)
  // Example: sessionStorage.removeItem('userToken');
  // Example: sessionStorage.removeItem('userId');
  
  // Redirect to the login page
  window.location.href = 'login.html';
}

// Logout button event listener
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

