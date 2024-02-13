function validateInput(input) {
  const inputValue = input.value;
  input.value = inputValue.replace(/[^\d.-]/g, '');
  
  if (input.value === ""){ 
    input.closest('.col').querySelector('.emoji').textContent = '😐';
    return "Masukkan angka suhu yang valid!";
  } else {
    const isCelsius = input.id === "inputC";
    const temperatureValue = parseFloat(input.value);
    const fahrenheitValue = isCelsius ? (temperatureValue * 9/5) + 32 : temperatureValue;
    
    if ((isCelsius && temperatureValue < 10) || (!isCelsius && fahrenheitValue < 50)) {
      input.closest('.col').querySelector('.emoji').textContent = '🥶';
    } else if ((isCelsius && temperatureValue < 17) || (!isCelsius && fahrenheitValue < 63)){
      input.closest('.col').querySelector('.emoji').textContent = '😊';
    } else if ((isCelsius && temperatureValue < 25) || (!isCelsius && fahrenheitValue < 77)){
      input.closest('.col').querySelector('.emoji').textContent = '😄';
    } else if ((isCelsius && temperatureValue < 35) || (!isCelsius && fahrenheitValue < 95)){
      input.closest('.col').querySelector('.emoji').textContent = '😅';
    } else if ((isCelsius && temperatureValue <= 50) || (!isCelsius && fahrenheitValue <= 122)){
      input.closest('.col').querySelector('.emoji').textContent = '😰';
    } else if ((isCelsius && temperatureValue > 50) || (!isCelsius && fahrenheitValue < 122)){
      input.closest('.col').querySelector('.emoji').textContent = '🔥';
    }
    else  {
      input.closest('.col').querySelector('.emoji').textContent = '😐';
    }
    
    return "";
  }
}

function convertTemperature(inputElementId, outputElementId, formulaElementId, isToFahrenheit) {
  const inputElement = document.getElementById(inputElementId);
  const inputValue = parseFloat(inputElement.value);
  const errorMessage = validateInput(inputElement);
  
  if (errorMessage !== "") {
    alert(errorMessage);
    return;
  }
  
  const outputValue = isToFahrenheit ? ((inputValue * 9/5) + 32) : ((inputValue - 32) * 5/9);
  const formattedOutput = parseFloat(outputValue.toFixed(3));

  document.getElementById(outputElementId).value = formattedOutput;
  document.getElementById(formulaElementId).value = 
    isToFahrenheit ? `(${inputValue}°C × 9/5) + 32 = ${formattedOutput}°F` : `(${inputValue}°F − 32) × 5/9 = ${formattedOutput}°C`;  
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