$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();
  function updateTemperature() {
    $("#temperature").text(thermostat.getCurrentTemperature());
    $("#temperature, #degrees").attr('class', thermostat.getDisplayColor());
  };
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
});
