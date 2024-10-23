function populateTable() {
  const tbody = document.querySelector("#modelTable tbody");

  modelData.forEach((model) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="model-name">${model.model}</td>
            <td>${model.provider}</td>
            <td class="number">${model.smartsElo}</td>
            <td class="number">${model.codingElo}</td>
            <td class="number">${model.speed || "-"}</td>
            <td class="number">${model.context}</td>
            <td class="number">$${model.inputPrice}</td>
            <td class="number">$${model.outputPrice}</td>
            <td class="number">$${model.costPerMonth.toFixed(2)}</td>
            <td>${model.hasVision ? "✓" : "-"}</td>
            <td>${model.hasFreeTier ? "✓" : "-"}</td>
            <td>${model.notes || ""}</td>
        `;
    tbody.appendChild(row);
  });
}

// Add sorting functionality
function sortTable(column) {
  const tbody = document.querySelector("#modelTable tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    let aVal = a.cells[column].textContent;
    let bVal = b.cells[column].textContent;

    // Convert to numbers if possible
    if (!isNaN(aVal) && !isNaN(bVal)) {
      return Number(aVal) - Number(bVal);
    }
    return aVal.localeCompare(bVal);
  });

  // Clear and repopulate tbody
  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));
}

// Add click handlers for sorting
document.querySelectorAll("#modelTable th").forEach((header, index) => {
  header.addEventListener("click", () => sortTable(index));
});

// Initialize the table when the page loads
document.addEventListener("DOMContentLoaded", populateTable);
