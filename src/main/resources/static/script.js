const API_BASE_URL = "/forms";

const form = document.getElementById("infoForm");
const recordIdInput = document.getElementById("recordId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const submitButton = document.getElementById("submitButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const refreshButton = document.getElementById("refreshButton");
const formModeLabel = document.getElementById("formModeLabel");
const formTitle = document.getElementById("formTitle");
const message = document.getElementById("message");
const recordsTable = document.getElementById("recordsTable");
const recordsBody = document.getElementById("recordsBody");
const loadingState = document.getElementById("loadingState");
const emptyState = document.getElementById("emptyState");
const recordCount = document.getElementById("recordCount");

function showMessage(text, type = "") {
  message.textContent = text;
  message.className = `message ${type}`.trim();
}

function resetForm() {
  form.reset();
  recordIdInput.value = "";
  formModeLabel.textContent = "New record";
  formTitle.textContent = "Add a person";
  submitButton.textContent = "Save record";
  cancelEditButton.classList.add("hidden");
}

function startEdit(record) {
  recordIdInput.value = record.id;
  nameInput.value = record.name;
  emailInput.value = record.email;
  ageInput.value = record.age;

  formModeLabel.textContent = `Editing record #${record.id}`;
  formTitle.textContent = "Update person";
  submitButton.textContent = "Update record";
  cancelEditButton.classList.remove("hidden");
  showMessage("");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createActionButton(label, className, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.className = `action-button ${className}`;
  button.addEventListener("click", handler);
  return button;
}

function renderRecords(records) {
  recordsBody.innerHTML = "";
  recordCount.textContent = `${records.length} ${records.length === 1 ? "record" : "records"}`;

  if (records.length === 0) {
    recordsTable.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  recordsTable.classList.remove("hidden");

  records.forEach((record) => {
    const row = document.createElement("tr");

    [record.id, record.name, record.email, record.age].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    const actionsCell = document.createElement("td");
    actionsCell.className = "actions";
    actionsCell.appendChild(createActionButton("Edit", "edit", () => startEdit(record)));
    actionsCell.appendChild(
      createActionButton("Delete", "delete", () => deleteRecord(record.id))
    );

    row.appendChild(actionsCell);
    recordsBody.appendChild(row);
  });
}

async function loadRecords() {
  loadingState.classList.remove("hidden");
  emptyState.classList.add("hidden");
  recordsTable.classList.add("hidden");

  try {
    const response = await fetch(`${API_BASE_URL}/all`);

    if (!response.ok) {
      throw new Error(`Could not load records. Status: ${response.status}`);
    }

    const records = await response.json();
    renderRecords(records);
  } catch (error) {
    showMessage(error.message, "error");
    recordCount.textContent = "0 records";
    emptyState.textContent = "Could not connect to the Spring Boot server.";
    emptyState.classList.remove("hidden");
  } finally {
    loadingState.classList.add("hidden");
  }
}

async function deleteRecord(id) {
  const confirmed = window.confirm(`Delete record #${id}?`);
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`Could not delete record. Status: ${response.status}`);
    }

    if (recordIdInput.value === String(id)) {
      resetForm();
    }

    showMessage("Record deleted successfully.", "success");
    await loadRecords();
  } catch (error) {
    showMessage(error.message, "error");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = recordIdInput.value;
  const payload = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    age: Number(ageInput.value)
  };

  const isEditing = Boolean(id);
  const url = isEditing ? `${API_BASE_URL}/${id}` : API_BASE_URL;
  const method = isEditing ? "PUT" : "POST";

  submitButton.disabled = true;
  submitButton.textContent = isEditing ? "Updating..." : "Saving...";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Request failed. Status: ${response.status}`);
    }

    resetForm();
    showMessage(
      isEditing ? "Record updated successfully." : "Record created successfully.",
      "success"
    );
    await loadRecords();
  } catch (error) {
    showMessage(error.message, "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = recordIdInput.value ? "Update record" : "Save record";
  }
});

cancelEditButton.addEventListener("click", () => {
  resetForm();
  showMessage("Edit cancelled.");
});

refreshButton.addEventListener("click", loadRecords);

loadRecords();
