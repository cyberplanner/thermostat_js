$(document).ready(function() {
  $("body").tooltip({ selector: '[data-toggle=tooltip]' });

  var thermostat = new Thermostat();
  updateTemperature();

  $.getJSON("http://localhost:4567/local-temp", function(data) {
    thermostat.temperature = data.temp;
    if(data.psm == true) {
      thermostat.powerSavingOn();
    } else {
      thermostat.powerSavingOff();
    }
    $("current-city").val(data.city);
    displayWeather(data.city);
    updateTemperature();
    updatePSM();
  });

  function sendDataRequest() {
    var tempData = {
      temp: thermostat.temperature,
      psm: thermostat.isPowerSavingOn(),
    }
    $.post("http://localhost:4567/local-temp", tempData, function() {});
  }

  function updateTemperature() {
    $("#temperature").text(thermostat.getCurrentTemperature());
    $("#temperature, #degrees").attr('class', thermostat.getDisplayColor());
  }

  function updatePSM() {
    if(thermostat.powerSavingMode === true){
      $("#power-saving-mode").text("ON");
    } else if(thermostat.powerSavingMode === false) {
      $("#power-saving-mode").text("OFF")
    }
  }

  $("#up").click(function(){
      thermostat.up();
      updateTemperature();
      sendDataRequest();
  });

  $("#down").click(function(){
      thermostat.down();
      updateTemperature();
      sendDataRequest();
  });

  $("#reset").click(function() {
    thermostat.reset();
    updateTemperature();
    sendDataRequest();
  });

  $("#power-save-on").click(function() {
    thermostat.powerSavingOn();
    $("#power-saving-mode").text("On");
    sendDataRequest();
  });

  $("#power-save-off").click(function() {
    thermostat.powerSavingOff();
    $("#power-saving-mode").text("Off");
    sendDataRequest();
  });

  $("#select-city").submit(function(event) {
    event.preventDefault();
    var city = $("#current-city").val();
    var requestData = {
      city: city,
    }
    $.post("http://localhost:4567/local-temp", requestData, function() {});
    displayWeather(city);
  });

  function displayWeather(city) {
    var link = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var key = '&appid=2b53a6756fdc4c64828e22d00f507709';
    var units = '&units=metric';
    $.get(link + key + units, function(data) {
      $("#local-temp").text(data.main.temp);
    });
  }


});
