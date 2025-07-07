document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("task-input");
  const addButton = document.getElementById("add-button");
  const list = document.getElementById("task-list");
  const trashButton = document.getElementById("trash-button");
  const badge = trashButton.querySelector(".badge span");
  const noTasksMessage = document.getElementById("no-tasks-message");

  function createTaskElement(text) {
    const item = document.createElement("div");
    item.className = "item";

    const button = document.createElement("button");
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" stroke="#0E6BA8" stroke-width="2"/>
      </svg>
    `;

    const span = document.createElement("span");
    span.textContent = text;

    item.appendChild(button);
    item.appendChild(span);

    item.addEventListener("click", () => {
      item.classList.toggle("marked");
      updateIcon(item);
      updateTrashState();
    });

    return item;
  }

    
 function updateNoTasksMessage() {
    const hasItems = list.querySelectorAll(".item").length > 0;
    noTasksMessage.style.display = hasItems ? "none" : "flex";
  }

  function updateIcon(item) {
    const svg = item.querySelector("svg");
    if (item.classList.contains("marked")) {
      svg.innerHTML = `
        <path d="M17 7L7 17M7 7L17 17" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    } else {
      svg.innerHTML = `
        <circle cx="12" cy="12" r="5" stroke="#0E6BA8" stroke-width="2"/>
      `;
    }
  }

  function updateTrashState() {
    const markedItems = list.querySelectorAll(".item.marked");
    if (markedItems.length > 0) {
      trashButton.style.display = "inline-flex";
      badge.textContent = markedItems.length;
    } else {
      trashButton.style.display = "none";
    }
  }

  function addTask() {
    const value = input.value.trim();
    if (!value) return;

    const taskElement = createTaskElement(value);
    list.appendChild(taskElement);

    input.value = "";
    input.focus();
    updateTrashState();
    updateNoTasksMessage();
  }

  function removeMarked() {
    const markedItems = list.querySelectorAll(".item.marked");
    markedItems.forEach(el => el.remove());
    updateTrashState();
    updateNoTasksMessage();
  }

  addButton.addEventListener("click", addTask);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") addTask();
  });
  trashButton.addEventListener("click", removeMarked);

  trashButton.style.display = "none";
  updateNoTasksMessage();
});
