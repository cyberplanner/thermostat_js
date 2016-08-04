'use strict';

describe('Thermostat' , function(){

  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function(){
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMPERATURE);
  });

  it('increases temperature using up button', function() {
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMPERATURE + 1);
  });

  it('decreases temperature with up button', function() {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMPERATURE - 1);
  });

  it('has minimum temperature of 10 degrees', function(){
    for (var i = 0; i < 11; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.MINIMUM_TEMPERATURE);
  });

  it('checks power-saving mode is on', function() {
    thermostat.powerSavingOn();
    expect(thermostat.powerSavingMode).toBe(true);
  });

  it('can switch powe-saving mode off', function() {
    thermostat.powerSavingOff();
    expect(thermostat.isPowerSavingOn()).toBe(false);
  });

  it('can switch powe-saving mode back on', function() {
    thermostat.powerSavingOff();
    expect(thermostat.isPowerSavingOn()).toBe(false);
    thermostat.powerSavingOn();
    expect(thermostat.isPowerSavingOn()).toBe(true);
  });

  describe('When power-saving mode is ON', function() {
    it('maximum temperature is 25', function() {
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(thermostat.MAX_TEMP_PSM_ON);
    });
  });

  describe('When power-saving mode is OFF', function() {
    it('maximum temperature is 32', function() {
      thermostat.powerSavingOff();
      for(var i = 0; i < 13; i++ ) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(thermostat.MAX_TEMP_PSM_OFF);
    });
  });

  describe('Reset button:', function() {
    it('resets the maximum power to 25', function() {
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      thermostat.reset();
      expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMPERATURE);
    });
  });

  describe('Display colours:', function() {
    it('Yellow under 25 and over 18', function() {
      expect(thermostat.getDisplayColor()).toEqual('mid-usage');
    });

    it('Green under 18 degrees', function() {
      for(var i = 0; i < 3; i++) {
        thermostat.down();
      }
      expect(thermostat.getDisplayColor()).toEqual('low-usage');
    });

    it('Red over 25 degrees', function() {
      for(var i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.getDisplayColor()).toEqual('high-usage');
    });
  });




});
