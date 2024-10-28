let modelData = []; // LLM data
let sttModelData = []; // STT data
let currentInputTokens = 87000;
let currentOutputTokens = 74000;
let currentAudioTime = {
  days: 0,
  hours: 1,
  minutes: 0
};

// Add these preset configurations
const timePresets = [
  { label: '1 Hour Call', days: 0, hours: 1, minutes: 0 },
  { label: '8 Hour Day', days: 0, hours: 8, minutes: 0 },
  { label: 'Work Week (40h)', days: 5, hours: 0, minutes: 0 },
  { label: 'Full Month (720h)', days: 30, hours: 0, minutes: 0 }
];

// Add this function to calculate total minutes
function calculateTotalMinutes() {
  return (currentAudioTime.days * 24 * 60) +
         (currentAudioTime.hours * 60) +
         currentAudioTime.minutes;
}
function calculateMonthlyCost(model, inputTokens, outputTokens) {
  const inputCost = (inputTokens / 1000000) * model.inputPrice;
  const outputCost = (outputTokens / 1000000) * model.outputPrice;
  return inputCost + outputCost;
}

// Update the calculateSTTMonthlyCost function to use the new time calculation
function calculateSTTMonthlyCost(model, audioTime) {
  const totalMinutes = calculateTotalMinutes();
  if (model.models) {
    return totalMinutes * model.models[0].pricePerMinute;
  }
  return totalMinutes * model.pricePerMinute;
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
              <a href="${model.pricingUrl}" target="_blank" rel="noopener noreferrer" class="model-link">
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

function populateSTTTable() {
  const tbody = document.querySelector("#sttTable tbody");
  tbody.innerHTML = ''; // Clear existing content

  sttModelData.models.forEach((provider) => {
    if (provider.models) {
      // Handle providers with multiple models
      provider.models.forEach((model) => {
        const row = createSTTTableRow({
          provider: provider.provider,
          model: model.name,
          pricePerMinute: model.pricePerMinute,
          realtime: provider.realtime,
          languages: provider.languages,
          freeQuota: provider.freeQuota,
          url: provider.url
        });
        tbody.appendChild(row);
      });
    } else {
      // Handle single model providers
      const row = createSTTTableRow({
        provider: provider.provider,
        model: provider.model,
        pricePerMinute: provider.pricePerMinute,
        realtime: provider.realtime,
        languages: provider.languages,
        freeQuota: provider.freeQuota,
        url: provider.url
      });
      tbody.appendChild(row);
    }
  });
}

function createSTTTableRow(data) {
  const row = document.createElement("tr");
  const monthlyCost = calculateSTTMonthlyCost({ pricePerMinute: data.pricePerMinute });

  row.innerHTML = `
    <td class="model-name">
      <a href="${data.url}" target="_blank" rel="noopener noreferrer" class="model-link">
        ${data.model}
        <svg class="external-link-icon" width="12" height="12" viewBox="0 0 12 12">
          <path fill="currentColor" d="M3.5 3a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V6h1v2.5A1.5 1.5 0 0 1 8.5 10h-5A1.5 1.5 0 0 1 2 8.5v-5A1.5 1.5 0 0 1 3.5 2H6v1H3.5z"/>
          <path fill="currentColor" d="M6.5 1H11v4.5L9.25 3.75 6.5 6.5 5.5 5.5l2.75-2.75L6.5 1z"/>
        </svg>
      </a>
    </td>
    <td>${data.provider}</td>
    <td class="number">$${data.pricePerMinute.toFixed(4)}</td>
    <td>${data.realtime ? "✓" : "-"}</td>
    <td>${data.languages}</td>
    <td class="number cost">$${monthlyCost.toFixed(2)}</td>
  `;
  return row;
}

// Update the updateSTTCosts function
function updateSTTCosts() {
  const totalMinutes = calculateTotalMinutes();
  document.getElementById('totalMinutes').textContent =
    `Total: ${totalMinutes.toLocaleString()} minutes`;

  const rows = document.querySelectorAll("#sttTable tbody tr");
  rows.forEach((row) => {
    const pricePerMinute = parseFloat(row.querySelector("td:nth-child(3)").textContent.replace("$", ""));
    const monthlyCost = calculateSTTMonthlyCost({ pricePerMinute }, totalMinutes);
    row.querySelector(".cost").textContent = `$${monthlyCost.toFixed(2)}`;
  });
}
function initializeTimeInputs() {
  // Early return if we're not on the STT tab
  if (!document.querySelector('.time-input')) {
    return;
  }

  const timeInputs = document.querySelectorAll('.time-input');
  
  timeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const value = parseInt(e.target.value) || 0;
      currentAudioTime[e.target.dataset.unit] = value;
      updateSTTCosts();
    });
  });

  // Initialize preset buttons
  document.querySelectorAll('.time-preset').forEach(button => {
    button.addEventListener('click', () => {
      const preset = timePresets[parseInt(button.dataset.preset)];
      currentAudioTime = { ...preset };
      
      // Update input fields
      document.querySelector('[data-unit="days"]').value = preset.days;
      document.querySelector('[data-unit="hours"]').value = preset.hours;
      document.querySelector('[data-unit="minutes"]').value = preset.minutes;
      
      updateSTTCosts();
    });
  });

  // Initialize total minutes display
  updateSTTCosts();
}
// Modify the initializeSliders function to handle only LLM sliders
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

function initializeTabs() {
  const tabs = document.querySelectorAll('.tab-button');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const contentId = `${tab.dataset.tab}-content`;
      document.getElementById(contentId).classList.add('active');
    });
  });
}

let sortDirections = {};

function sortTable(column, tableSelector) {
  const tbody = document.querySelector(`${tableSelector} tbody`);
  const rows = Array.from(tbody.querySelectorAll("tr"));

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

    if (aVal === "" || aVal === "null") aVal = "0";
    if (bVal === "" || bVal === "null") bVal = "0";

    if (!isNaN(aVal) && !isNaN(bVal)) {
      aVal = Number(aVal);
      bVal = Number(bVal);
      return sortDirections[column] ? aVal - bVal : bVal - aVal;
    }

    return sortDirections[column]
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));

  updateSortIndicators(column);
}

function updateSortIndicators(activeColumn) {
  const headers = document.querySelectorAll("#modelTable th");
  headers.forEach((header, index) => {
    header.textContent = header.textContent.replace(" ▲", "").replace(" ▼", "");

    if (index === activeColumn) {
      header.textContent += sortDirections[activeColumn] ? " ▲" : " ▼";
    }
  });
}

// Modify the initialize function to call both initialization functions
async function initialize() {
  try {
    const [llmResponse, sttResponse] = await Promise.all([
      fetch('data.json'),
      fetch('stt-data.json')
    ]);

    modelData = await llmResponse.json();
    sttModelData = await sttResponse.json();

    initializeSliders(); // LLM sliders
    initializeTimeInputs(); // STT time inputs
    initializeTabs();
    populateTable();
    populateSTTTable();

    // Add click handlers for sorting
    document.querySelectorAll("#modelTable th").forEach((header, index) => {
      header.addEventListener("click", () => sortTable(index, "#modelTable"));
    });

    document.querySelectorAll("#sttTable th").forEach((header, index) => {
      header.addEventListener("click", () => sortTable(index, "#sttTable"));
    });

    // Initial sort
    sortDirections[3] = true;
    sortTable(3, "#modelTable");

    // Update initial STT costs
    updateSTTCosts();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

document.addEventListener("DOMContentLoaded", initialize);

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

if ("ontouchstart" in window) {
  document.querySelectorAll("th[title]").forEach((th) => {
    th.addEventListener("click", function (e) {
      alert(this.getAttribute("title"));
    });
  });
}




