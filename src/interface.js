$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();

  function updateTemperature() {
    $("#temperature").text(thermostat.getCurrentTemperature());
    $("#temperature, #degrees").attr('class', thermostat.getDisplayColor());
  }

  $("#up").click(function(){
      thermostat.up();
      updateTemperature();
  });

  $("#down").click(function(){
      thermostat.down();
      updateTemperature();
  });

  $("#reset").click(function() {
    thermostat.reset();
    updateTemperature();
  });

  $("#power-save-on").click(function() {
    thermostat.powerSavingOn();
    $("#power-saving-mode").text("On");
  });

  $("#power-save-off").click(function() {
    thermostat.powerSavingOff();
    $("#power-saving-mode").text("Off");
  });

  $("#select-city").submit(function(event) {
    event.preventDefault();
    var city = $("#current-city").val();
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
