'use strict';

function Thermostat() {
  this.DEFAULT_TEMPERATURE = 20;
  this.MAX_TEMP_PSM_OFF = 32;
  this.MAX_TEMP_PSM_ON = 25;
  this.MINIMUM_TEMPERATURE = 10;
  this.LOW_USAGE_TEMP = 18;
  this.temperature = 20;
  this.powerSavingMode = true;
}

Thermostat.prototype.getCurrentTemperature = function () {
  return this.temperature;
};

Thermostat.prototype.isPowerSavingOn = function () {
  return this.powerSavingMode;
};

Thermostat.prototype.powerSavingOn = function () {
  this.powerSavingMode = true;
};

Thermostat.prototype.powerSavingOff = function () {
  this.powerSavingMode = false;
};


Thermostat.prototype.isMinimumTemperature = function () {
  return this.temperature === this.MINIMUM_TEMPERATURE;
};

Thermostat.prototype.isMaximumTemperature = function () {
  if (this.isPowerSavingOn() === false) {
    return this.temperature === this.MAX_TEMP_PSM_OFF;
  }
  return this.temperature === this.MAX_TEMP_PSM_ON;
};

Thermostat.prototype.up = function () {
  if(this.isMaximumTemperature()) {
    return;
  }
  this.temperature += 1;
};

Thermostat.prototype.down = function () {
  if(this.isMinimumTemperature()) {
    return;
  }
  this.temperature -= 1;
};

Thermostat.prototype.reset = function() {
  this.temperature = this.DEFAULT_TEMPERATURE;
};

Thermostat.prototype.getDisplayColor = function () {
  if(this.getCurrentTemperature() < this.LOW_USAGE_TEMP) {
    return 'low-usage';
  } else if(this.getCurrentTemperature() < this.MAX_TEMP_PSM_ON && this.getCurrentTemperature() > this.LOW_USAGE_TEMP) {
    return 'mid-usage';
  }
  return 'high-usage';
};
