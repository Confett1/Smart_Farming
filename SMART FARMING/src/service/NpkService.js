const NPKRepository = require("../repositories/NpkRepository");

class NPKService {
  static async saveNPKData(nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture) {
    return await NPKRepository.insertNPKData(nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture);
  }

  static async fetchAllNPKData() {
    return await NPKRepository.getAllNPKData();
  }
}

module.exports = NPKService;
