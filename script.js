// Get the task list container <ul id="taskList">
const list = document.getElementById('taskList');

// Function to add a new task to the list
function addTask() {
  // Get and trim input values from the form
  const name = document.getElementById('taskName').value.trim();       // Task name
  const date = document.getElementById('taskDate').value;              // Due date
  const cat = document.getElementById('taskCategory').value;           // Category
  const priority = document.getElementById('taskPriority').value;      // Priority

  // Validate that the task name is not empty
  if (!name) return alert("Task name is required.");

  // Create a new <li> element to represent the task
  const li = document.createElement('li');

  // Set the HTML content of the task item
  li.innerHTML = `
    <input type="checkbox" onchange="toggleDone(this)" />  <!-- Mark task as done -->
    <div class="info">
      <span>${name}</span>  <!-- Task name -->
      <div class="meta">
        ${cat || "No category"} | 
        ${priority || "No priority"} | 
        ${date || "No due date"}  <!-- Show metadata or default text -->
      </div>
    </div>
    <div class="actions">
      <i class="fas fa-edit" onclick="editTask(this)"></i>       <!-- Edit button -->
      <i class="fas fa-trash" onclick="this.closest('li').remove()"></i> <!-- Delete button -->
    </div>
  `;

  // Append the new task to the task list
  list.appendChild(li);

  // Reset form fields to empty
  ['taskName', 'taskDate', 'taskCategory', 'taskPriority'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

// Function to toggle the "done" state of a task
function toggleDone(checkbox) {
  // Add or remove the 'done' class based on whether checkbox is checked
  checkbox.parentElement.classList.toggle('done', checkbox.checked);
}

// Function to edit a task name directly in the list
function editTask(icon) {
  // Get the parent <li> of the clicked icon
  const li = icon.closest('li');

  // Get the <span> that displays the task name
  const span = li.querySelector('span');

  // Store the current task name
  const current = span.textContent;

  // Create an input box to edit the task name
  const input = document.createElement('input');
  input.type = 'text';
  input.value = current;

  // When input loses focus, update the name and remove the input
  input.onblur = () => {
    // If user cleared input, keep original name
    span.textContent = input.value.trim() || current;

    // Show the span again and remove the input
    span.style.display = 'inline';
    input.remove();
  };

  // Hide the span and insert the input box after it
  span.style.display = 'none';
  span.after(input);
  input.focus(); // Auto-focus on the new input field
}
