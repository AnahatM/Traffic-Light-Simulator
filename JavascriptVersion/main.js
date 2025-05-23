// Traffic Light Simulator
// =======================
// State and configuration
let times = {
  red: 3,
  yellow: 3,
  green: 3,
};
let order = ["red", "yellow", "green"];
let current = 0;
let timer = null;

const lights = {
  red: document.getElementById("redLight"),
  yellow: document.getElementById("yellowLight"),
  green: document.getElementById("greenLight"),
};

let enabled = {
  red: true,
  yellow: true,
  green: true,
};
let hideDisabled = false;

// Update the traffic lights' appearance and visibility
function updateLights() {
  const visibleLights = order.filter((color) => enabled[color]);
  for (const color of order) {
    const light = lights[color];
    // Hide or show based on enabled/hidden
    if (!enabled[color]) {
      light.classList.add("inactive");
      light.style.display = hideDisabled ? "none" : "block";
    } else {
      light.style.display = "block";
    }
  }
  // Ensure only the current light is active
  let idx = current;
  if (!enabled[order[idx]]) {
    idx = visibleLights.length ? order.indexOf(visibleLights[0]) : 0;
  }
  for (const color of order) {
    lights[color].classList.add("inactive");
  }
  if (visibleLights.length > 0) {
    lights[order[idx]].classList.remove("inactive");
  }
}

// Advance to the next enabled light
function nextLight() {
  const visibleLights = order.filter((color) => enabled[color]);
  if (visibleLights.length === 0) return;
  do {
    current = (current + 1) % order.length;
  } while (!enabled[order[current]]);
  updateLights();
  timer = setTimeout(nextLight, times[order[current]] * 1000);
}

// Start the light loop from the first enabled light
function startLoop() {
  clearTimeout(timer);
  const visibleLights = order.filter((color) => enabled[color]);
  if (visibleLights.length === 0) {
    for (const color of order) lights[color].classList.add("inactive");
    return;
  }
  current = order.indexOf(visibleLights[0]);
  updateLights();
  timer = setTimeout(nextLight, times[order[current]] * 1000);
}

// Set the direction (horizontal/vertical) and adjust flex and borders
function setDirection(dir) {
  const container = document.querySelector(".traffic-lights");
  const visibleLights = order.filter((color) => enabled[color]);
  if (dir === "horizontal") {
    container.style.flexDirection = "row";
    document.querySelectorAll(".light").forEach((l) => {
      l.style.flex = visibleLights.includes(l.id.replace("Light", ""))
        ? `1 1 0`
        : "0 0 0";
      l.style.width = "100%";
      l.style.height = "100%";
      l.style.borderTop = "";
      l.style.borderBottom = "";
      l.style.borderLeft = "4px solid var(--color-border)";
      l.style.borderRight = "4px solid var(--color-border)";
    });
  } else {
    container.style.flexDirection = "column";
    document.querySelectorAll(".light").forEach((l) => {
      l.style.flex = visibleLights.includes(l.id.replace("Light", ""))
        ? `1 1 0`
        : "0 0 0";
      l.style.width = "100vw";
      l.style.height = "100%";
      l.style.borderLeft = "";
      l.style.borderRight = "";
      l.style.borderTop = "4px solid var(--color-border)";
      l.style.borderBottom = "4px solid var(--color-border)";
    });
  }
}

// Update all settings from UI controls
function updateSettingsFromInputs() {
  times.red = Math.max(
    0.2,
    parseFloat(document.getElementById("redTime").value) || 1
  );
  times.yellow = Math.max(
    0.2,
    parseFloat(document.getElementById("yellowTime").value) || 1
  );
  times.green = Math.max(
    0.2,
    parseFloat(document.getElementById("greenTime").value) || 1
  );
  enabled.red = document.getElementById("enableRed").checked;
  enabled.yellow = document.getElementById("enableYellow").checked;
  enabled.green = document.getElementById("enableGreen").checked;
  hideDisabled = document.getElementById("hideDisabledLights").checked;
  const dir = document.getElementById("directionSelect").value;
  setDirection(dir);
  startLoop();
}

// Listen for changes on all relevant inputs
[
  "redTime",
  "yellowTime",
  "greenTime",
  "enableRed",
  "enableYellow",
  "enableGreen",
  "hideDisabledLights",
  "directionSelect",
].forEach((id) => {
  document
    .getElementById(id)
    .addEventListener("input", updateSettingsFromInputs);
});

document.getElementById("applySettings").onclick = updateSettingsFromInputs;
document.getElementById("resetSettings").onclick = function () {
  document.getElementById("redTime").value = 3;
  document.getElementById("yellowTime").value = 3;
  document.getElementById("greenTime").value = 3;
  document.getElementById("enableRed").checked = true;
  document.getElementById("enableYellow").checked = true;
  document.getElementById("enableGreen").checked = true;
  document.getElementById("hideDisabledLights").checked = false;
  document.getElementById("directionSelect").value = "vertical";
  updateSettingsFromInputs();
};

// Collapsible settings panel
const settingsPanel = document.getElementById("settingsPanel");
const toggleSettings = document.getElementById("toggleSettings");
toggleSettings.onclick = function () {
  settingsPanel.classList.toggle("collapsed");
};

// Initialize: hide settings by default, set defaults
// ==========
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("redTime").value = 3;
  document.getElementById("yellowTime").value = 3;
  document.getElementById("greenTime").value = 3;
  document.getElementById("enableRed").checked = true;
  document.getElementById("enableYellow").checked = true;
  document.getElementById("enableGreen").checked = true;
  document.getElementById("hideDisabledLights").checked = false;
  document.getElementById("directionSelect").value = "vertical";
  settingsPanel.classList.add("collapsed"); // Hide settings by default
  updateSettingsFromInputs();
});
