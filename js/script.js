function convertToFahrenheit() {
    let celsiusInput = document.getElementById("inputC").value;
    let fahrenheitOutput = (celsiusInput * 9/5) + 32;
    document.getElementById("inputF").value = fahrenheitOutput;
    document.getElementById("calcMethod").value = 
        "(" + celsiusInput + "°C × 9/5) + 32 = " + fahrenheitOutput + "°F";
  }
  
  function convertToCelsius() {
    let fahrenheitInput = document.getElementById("inputF2").value;
    let celsiusOutput = (fahrenheitInput - 32) * 5/9;
    document.getElementById("inputC2").value = celsiusOutput;
    document.getElementById("calcMethod2").value = 
    "(" + fahrenheitInput + "F − 32) × 5/9 = 93,333" + celsiusOutput + "°C";
  }
  
  function reset() {
    document.getElementById("inputC").value = "";
    document.getElementById("inputF").value = "";
    document.getElementById("calcMethod").value = "";
    document.getElementById("inputC2").value = "";
    document.getElementById("inputF2").value = "";
    document.getElementById("calcMethod2").value = "";
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