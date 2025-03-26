// const NPKService = require("../service/NpkService"); 
const MotorStatusService = require("../service/MotorStatusService");

class MotorController {
  static async addStatus(req, res) {
    try {
      const { irrigation, nitrogen, phosphorus, potassium } = req.body;
      await MotorStatusService.saveStatus(irrigation, nitrogen, phosphorus, potassium);
      res.status(201).json({ message: `Data inserted successfully irrigation: ${irrigation}, nitrogen: ${nitrogen}, phosphorus: ${phosphorus}, potassium: ${potassium}`});
      console.log("Data inserted: " + irrigation, nitrogen, phosphorus, potassium);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MotorController;
