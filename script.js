const list = document.getElementById('taskList');

function addTask() {
  const name = document.getElementById('taskName').value.trim();
  const date = document.getElementById('taskDate').value;
  const cat = document.getElementById('taskCategory').value;
  const priority = document.getElementById('taskPriority').value;

  if (!name) return alert("Task name is required.");

  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" onchange="toggleDone(this)" />
    <div class="info">
      <span>${name}</span>
      <div class="meta">
        ${cat || "No category"} | 
        ${priority || "No priority"} | 
        ${date || "No due date"}
      </div>
    </div>
    <div class="actions">
      <i class="fas fa-edit" onclick="editTask(this)"></i>
      <i class="fas fa-trash" onclick="this.closest('li').remove()"></i>
    </div>
  `;
  list.appendChild(li);

  ['taskName', 'taskDate', 'taskCategory', 'taskPriority'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

function toggleDone(checkbox) {
  checkbox.parentElement.classList.toggle('done', checkbox.checked);
}

function editTask(icon) {
  const li = icon.closest('li');
  const span = li.querySelector('span');
  const current = span.textContent;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = current;

  input.onblur = () => {
    span.textContent = input.value.trim() || current;
    span.style.display = 'inline';
    input.remove();
  };

  span.style.display = 'none';
  span.after(input);
  input.focus();
}


