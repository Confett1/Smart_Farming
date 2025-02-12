const NPKRepository = require("../repositories/NpkRepository");

class NPKService {
  static async saveNPKData(nitrogen, phosphorous, potassium) {
    return await NPKRepository.insertNPKData(nitrogen, phosphorous, potassium);
  }

  static async fetchAllNPKData() {
    return await NPKRepository.getAllNPKData();
  }
}

module.exports = NPKService;
