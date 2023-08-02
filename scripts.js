let selectedRow = null;

function onFormSubmit() {
    if (validate()) {
        const formData = readFormData();
        if (selectedRow === null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    const formData = {};
    formData.fullName = document.querySelector("#fullName").value;
    formData.email = document.querySelector("#email").value;
    formData.salary = document.querySelector("#salary").value;
    formData.city = document.querySelector("#city").value;
    return formData;
}

function insertNewRecord(data) {
    const table = document.querySelector("#employeeList tbody");
    const newRow = table.insertRow(table.length);
    const cells = Object.values(data);
    cells.forEach((value, index) => {
        const cell = newRow.insertCell(index);
        cell.innerHTML = value;
    });
    const actionCell = newRow.insertCell(cells.length);
    actionCell.innerHTML = `<a class="edit-link">Edit</a>
                            <a class="delete-link">Delete</a>`;
    setupActionHandlers(newRow);
}

function resetForm() {
    const formInputs = document.querySelectorAll("input");
    formInputs.forEach((input) => (input.value = ""));
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    const fullName = selectedRow.cells[0].innerHTML;
    const email = selectedRow.cells[1].innerHTML;
    const salary = selectedRow.cells[2].innerHTML;
    const city = selectedRow.cells[3].innerHTML;

    document.querySelector("#fullName").value = fullName;
    document.querySelector("#email").value = email;
    document.querySelector("#salary").value = salary;
    document.querySelector("#city").value = city;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm("Are you sure you want to delete this record?")) {
        const row = td.parentElement.parentElement;
        document.querySelector("#employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    const fullNameInput = document.querySelector("#fullName");
    const fullNameValidationError = document.querySelector("#fullNameValidationError");

    if (fullNameInput.value === "") {
        fullNameValidationError.classList.remove("hide");
        return false;
    } else {
        fullNameValidationError.classList.add("hide");
        return true;
    }
}

function setupActionHandlers(row) {
    const editLink = row.querySelector(".edit-link");
    const deleteLink = row.querySelector(".delete-link");

    editLink.addEventListener("click", () => onEdit(editLink));
    deleteLink.addEventListener("click", () => onDelete(deleteLink));
}
