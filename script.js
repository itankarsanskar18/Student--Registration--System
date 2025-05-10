// Get the form and table body element
const form = document.getElementById("student-form");
const tableBody = document.getElementById("table-body");

// Load existing student records from localStorage or initialize an empty array
let students = JSON.parse(localStorage.getItem("students")) || [];

/* -------------------------------
   Function to Render Student Records
----------------------------------- */
function renderStudents() {
  // Clear existing rows before re-rendering
  tableBody.innerHTML = "";

  // Loop through students and create table rows
  students.forEach((student, index) => {
    const row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.className}</td>
        <td>${student.rollNo}</td>
        <td>
          <button class="action-btn" onclick="editStudent(${index})">Edit</button>
          <button class="action-btn" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>`;
    // Insert row into table body
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

/* -------------------------------
   Input Validation Function
----------------------------------- */
function validateInput(name, id, className, rollNo) {
  const namePattern = /^[a-zA-Z\s]+$/; // Only letters and spaces
  const idPattern = /^[0-9]+$/;        // Only digits
  const rollPattern = /^[0-9]+$/;      // Only digits

  // Ensure no field is empty and formats are valid
  if (!name || !id || !className || !rollNo) return false;
  if (!namePattern.test(name)) return false;
  if (!idPattern.test(id)) return false;
  if (!rollPattern.test(rollNo)) return false;

  return true;
}

/* -------------------------------
   Add Student on Form Submit
----------------------------------- */
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  // Get field values
  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const className = document.getElementById("class").value.trim();
  const rollNo = document.getElementById("rollNo").value.trim();

  // Validate input
  if (!validateInput(name, id, className, rollNo)) {
    alert("Invalid input. Please check your entries.");
    return;
  }

  // Add student to array
  students.push({ name, id, className, rollNo });

  // Save to localStorage
  localStorage.setItem("students", JSON.stringify(students));

  // Re-render table and reset form
  renderStudents();
  form.reset();
});

/* -------------------------------
   Edit Student Record
----------------------------------- */
function editStudent(index) {
  const student = students[index];

  // Fill form fields with selected student data
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.id;
  document.getElementById("class").value = student.className;
  document.getElementById("rollNo").value = student.rollNo;

  // Remove the old entry temporarily
  students.splice(index, 1);
  renderStudents(); // Re-render to remove from display
}

/* -------------------------------
   Delete Student Record
----------------------------------- */
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1); // Remove from array
    localStorage.setItem("students", JSON.stringify(students)); // Update localStorage
    renderStudents(); // Re-render table
  }
}

// Render students from storage on page load
window.onload = renderStudents;
