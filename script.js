let currentInputTokens = 87000;
let currentOutputTokens = 74000;

function calculateMonthlyCost(model, inputTokens, outputTokens) {
  const inputCost = (inputTokens / 1000000) * model.inputPrice;
  const outputCost = (outputTokens / 1000000) * model.outputPrice;
  return inputCost + outputCost;
}

function updateCosts() {
  const rows = document.querySelectorAll("#modelTable tbody tr");
  rows.forEach((row, index) => {
    const model = modelData[index];
    const cost = calculateMonthlyCost(
      model,
      currentInputTokens,
      currentOutputTokens
    );
    row.querySelector(".cost").textContent = `$${cost.toFixed(2)}`;
  });
}

function populateTable() {
  const tbody = document.querySelector("#modelTable tbody");
  tbody.innerHTML = ""; // Clear existing rows

  modelData.forEach((model) => {
    const row = document.createElement("tr");
    const monthlyCost = calculateMonthlyCost(
      model,
      currentInputTokens,
      currentOutputTokens
    );
    row.innerHTML = `
            <td class="model-name">${model.model}</td>
            <td>${model.provider}</td>
            <td class="number">${model.smartsElo}</td>
            <td class="number">${model.codingElo}</td>
            <td class="number">${model.speed || "-"}</td>
            <td class="number">${model.context}</td>
            <td class="number">$${model.inputPrice}</td>
            <td class="number">$${model.outputPrice}</td>
            <td class="number cost">$${monthlyCost.toFixed(2)}</td>
            <td>${model.hasVision ? "✓" : "-"}</td>
            <td>${model.hasFreeTier ? "✓" : "-"}</td>
            <td>${model.notes || ""}</td>
        `;
    tbody.appendChild(row);
  });
}

function initializeSliders() {
  const inputSlider = document.getElementById("inputTokens");
  const outputSlider = document.getElementById("outputTokens");
  const inputValue = document.getElementById("inputTokensValue");
  const outputValue = document.getElementById("outputTokensValue");

  function updateSliderDisplay(value, element) {
    element.textContent = Number(value).toLocaleString();
  }

  inputSlider.addEventListener("input", (e) => {
    currentInputTokens = parseInt(e.target.value);
    updateSliderDisplay(currentInputTokens, inputValue);
    updateCosts();
  });

  outputSlider.addEventListener("input", (e) => {
    currentOutputTokens = parseInt(e.target.value);
    updateSliderDisplay(currentOutputTokens, outputValue);
    updateCosts();
  });

  // Initialize displays
  updateSliderDisplay(currentInputTokens, inputValue);
  updateSliderDisplay(currentOutputTokens, outputValue);
}

// Add sorting functionality (keep your existing sort function)
let sortDirections = {}; // To keep track of sort direction for each column

function sortTable(column) {
  const tbody = document.querySelector("#modelTable tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  // Toggle sort direction for the column
  sortDirections[column] = !sortDirections[column];

  rows.sort((a, b) => {
    let aVal = a.cells[column].textContent
      .replace("$", "")
      .replace("✓", "1")
      .replace("-", "0");
    let bVal = b.cells[column].textContent
      .replace("$", "")
      .replace("✓", "1")
      .replace("-", "0");

    // Convert to numbers if possible
    if (!isNaN(aVal) && !isNaN(bVal)) {
      aVal = Number(aVal);
      bVal = Number(bVal);
      return sortDirections[column] ? aVal - bVal : bVal - aVal;
    }

    // Handle null/empty values
    if (aVal === "") return 1;
    if (bVal === "") return -1;

    // String comparison
    return sortDirections[column]
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  // Clear and repopulate tbody
  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));

  // Update sort indicators
  updateSortIndicators(column);
}

function updateSortIndicators(activeColumn) {
  const headers = document.querySelectorAll("#modelTable th");
  headers.forEach((header, index) => {
    // Remove existing indicators
    header.textContent = header.textContent.replace(" ▲", "").replace(" ▼", "");

    // Add indicator to active column
    if (index === activeColumn) {
      header.textContent += sortDirections[activeColumn] ? " ▲" : " ▼";
    }
  });
}

// Initialize everything when the page loads
document.addEventListener("DOMContentLoaded", () => {
  initializeSliders();
  populateTable();

  // Add click handlers for sorting
  document.querySelectorAll("#modelTable th").forEach((header, index) => {
    header.addEventListener("click", () => sortTable(index));
  });
});
