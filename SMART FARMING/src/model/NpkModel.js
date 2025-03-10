class NPKModel {
    constructor(nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture, water_level, timestamp) {
      this.nitrogen = nitrogen;
      this.phosphorous = phosphorous;
      this.potassium = potassium;
      this.temperature = temperature;
      this.humidity = humidity;
      this.soil_moisture = soil_moisture;
      this.water_level = water_level;
      this.timestamp = timestamp || new Date();
    }
  }
  
  module.exports = NPKModel;
  