const NPKService = require("../service/NpkService"); 

class NPKController {
  static async addNPKData(req, res) {
    try {
      const { n, p, k, temperature, humidity, moisture, water_level } = req.body;
      await NPKService.saveNPKData(n, p, k, temperature, humidity, moisture, water_level);
      res.status(201).json({ message: "Data inserted successfully" });
      console.log("Data inserted: " + n, p, k, temperature, humidity, moisture, water_level);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getNPKData(req, res) {
    try {
      const data = await NPKService.fetchAllNPKData();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = NPKController;
