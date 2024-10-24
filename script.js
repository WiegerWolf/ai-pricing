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

  modelData.forEach((model) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td class="model-name">
              <a href="${
                model.pricingUrl
              }" target="_blank" rel="noopener noreferrer" class="model-link">
                  ${model.model}
                  <svg class="external-link-icon" width="12" height="12" viewBox="0 0 12 12">
                      <path fill="currentColor" d="M3.5 3a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V6h1v2.5A1.5 1.5 0 0 1 8.5 10h-5A1.5 1.5 0 0 1 2 8.5v-5A1.5 1.5 0 0 1 3.5 2H6v1H3.5z"/>
                      <path fill="currentColor" d="M6.5 1H11v4.5L9.25 3.75 6.5 6.5 5.5 5.5l2.75-2.75L6.5 1z"/>
                  </svg>
              </a>
          </td>
          <td>${model.provider}</td>
          <td class="number">${model.smartsElo || "-"}</td>
          <td class="number">${model.codingElo || "-"}</td>
          <td class="number">${model.speed || "-"}</td>
          <td class="number">${model.context}</td>
          <td class="number">$${model.inputPrice || "null"}</td>
          <td class="number">$${model.outputPrice || "null"}</td>
          <td class="number cost">$${calculateMonthlyCost(
            model,
            currentInputTokens,
            currentOutputTokens
          ).toFixed(2)}</td>
          <td>${model.hasVision ? "✓" : "-"}</td>
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

    // Convert empty/null values to 0
    if (aVal === "" || aVal === "null") aVal = "0";
    if (bVal === "" || bVal === "null") bVal = "0";

    // Convert to numbers if possible
    if (!isNaN(aVal) && !isNaN(bVal)) {
      aVal = Number(aVal);
      bVal = Number(bVal);
      return sortDirections[column] ? aVal - bVal : bVal - aVal;
    }

    // String comparison for non-numeric values
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

  // Sort by coding ELO (column index 3) in descending order on page load
  sortDirections[3] = true; // Set to false for ascending order
  sortTable(3); // 3 is the index of the coding ELO column
});

// Add to existing script.js
document
  .getElementById("showCalculator")
  .addEventListener("click", function () {
    const calculatorSection = document.getElementById("calculatorSection");
    const button = document.getElementById("showCalculator");

    if (calculatorSection.style.display === "none") {
      calculatorSection.style.display = "block";
      button.textContent = "Hide Usage Calculator";
    } else {
      calculatorSection.style.display = "none";
      button.textContent = "Show Usage Calculator";
    }
  });

// Add helpful tooltips for mobile users (where hover doesn't work)
if ("ontouchstart" in window) {
  document.querySelectorAll("th[title]").forEach((th) => {
    th.addEventListener("click", function (e) {
      alert(this.getAttribute("title"));
    });
  });
}
