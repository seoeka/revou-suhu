function createTemperatureConverter(parentId, isCelsiusToFar) {
  const container = document.getElementById(parentId);
  const direction = isCelsiusToFar ? "Celsius ke Fahrenheit" : "Fahrenheit ke Celsius";
  const inputLabel = isCelsiusToFar ? "Celsius (&deg;C)" : "Fahrenheit (&deg;F)";
  const outputLabel = isCelsiusToFar ? "Fahrenheit (&deg;F)" : "Celsius (&deg;C)";
  
  const idInput = isCelsiusToFar ? "inputC" : "inputF";
  const idOutput = isCelsiusToFar ? "outputF" : "outputC";
  const colClass = isCelsiusToFar ? "" : " reverse";
  const calcMethodId = isCelsiusToFar ? "calcMethod" : "calcMethod2";
  const convertFunction = isCelsiusToFar ? "convertToFahrenheit" : "convertToCelsius";
  
  const html = `
      <div class="col${colClass}">
          <a class="emoji">😐</a>
          <div class="row">
              <div class="suhu celsius">
                  <h4>${inputLabel}</h4>
                  <textarea onclick="restart()" oninput="validateInput(this)" type="number" id="${idInput}" alt="Input Suhu Celsius" required></textarea>
              </div>
              <div class="suhu fahrenheit">
                  <h4>${outputLabel}</h4>
                  <textarea type="number" id="${idOutput}" alt="Output Suhu Fahrenheit" required readonly></textarea>
              </div>
          </div>
          <div>
              <div class="suhu kalkulasi">
                  <h4>Cara Kalkulasi</h4>
                  <textarea type="text" id="${calcMethodId}" alt="Cara Kalkulasi" readonly></textarea>
              </div>
          </div>
          <div class="buttons">
              <button class="b-kon" onclick="${convertFunction}()">Konversi</button>
              <button class="b-res" onclick="reset()">Reset</button>
              <button class="b-rev" onclick="reverse()">Reverse</button>
          </div>
          <div class="link" alt="Link Reverse"><a onclick="reverse()">${direction}</a></div>
          <div>
              <h2>Cara Konversi Dari ${direction}</h2>
              <p alt="Cara Konversi Dari ${direction}">
                  ${getConversionExplanation(isCelsiusToFar)}
              </p>
          </div>
      </div>
  `;
  
  container.innerHTML += html;
}

function getConversionExplanation(isCelsiusToFar) {
  if (isCelsiusToFar) {
      return `
          <p>Suhu <span class="math"><i>S</i></span> dalam derajat Fahrenheit (°F) sama dengan suhu <span class="math"><i>S</i></span> dalam derajat Celsius (°C) kali <span class="math">9/5</span> tambah <span class="math">32</span>.</p>
          <p><span class="math"><i>S</i><sub>(°F)</sub> = (<i>S</i><sub>(°C)</sub> × 9/5) + 32</span></p>
          <p>atau</p>
          <p><span class="math"><i>S</i><sub>(°F)</sub> = (<i>S</i><sub>(°C)</sub> × 1.8) + 32</span></p>
      `;
  } else {
      return `
          <p>Suhu <span class="math"><i>S</i></span> dalam derajat Celsius (°C) sama dengan suhu <span class="math"><i>S</i></span> dalam derajat Fahrenheit (°F) kali <span class="math">5/9</span>.</p>
          <span class="math"><i>S</i><sub>(°C)</sub> = (<i>S</i><sub>(°F)</sub> - 32) × 5/9</span>
      `;
  }
}

createTemperatureConverter("container", true);
createTemperatureConverter("container", false);

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