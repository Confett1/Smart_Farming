const NPKRepository = require("../repositories/NpkRepository");

class NPKService {
  static async saveNPKData(nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture, water_level) {
    return await NPKRepository.insertNPKData(nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture, water_level);
  }

  static async fetchAllNPKData() {
    return await NPKRepository.getAllNPKData();
  }
}

module.exports = NPKService;
