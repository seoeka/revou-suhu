function validateInput(input) {
  input.value = input.value.replace(/[^\d.-]/g, '');
}

function convertTemperature(inputElementId, outputElementId, formulaElementId, isToFahrenheit) {
  const input = parseFloat(document.getElementById(inputElementId).value);
  const output = isToFahrenheit ? ((input * 9/5) + 32) : ((input - 32) * 5/9);
  const formattedOutput = parseFloat(output.toFixed(3));

  document.getElementById(outputElementId).value = formattedOutput;
  document.getElementById(formulaElementId).value = 
    isToFahrenheit ? `(${input}°C × 9/5) + 32 = ${formattedOutput}°F` : `(${input}°F − 32) × 5/9 = ${formattedOutput}°C`;
}

function convertToFahrenheit() {
  convertTemperature("inputC", "outputF", "calcMethod", true);
}

function convertToCelsius() {
  convertTemperature("inputF", "outputC", "calcMethod2", false);
}

function reset() {
  const elements = document.querySelectorAll("#inputC, #inputF, #calcMethod, #outputC, #outputF, #calcMethod2");
  elements.forEach(element => element.value = "");
}

function restart() {
  const elements = document.querySelectorAll("#outputF, #calcMethod, #outputC, #calcMethod2");
  elements.forEach(element => element.value = "");
}

function reverse() {
  let colElements = document.getElementsByClassName("col");
  for (let i = 0; i < colElements.length; i++) {
    if (colElements[i].classList.contains("reverse")) {
      colElements[i].classList.remove("reverse");
      colElements[i].style.display = "flex";
    } else {
      colElements[i].classList.add("reverse");
      colElements[i].style.display = "none";
    }
  }
}