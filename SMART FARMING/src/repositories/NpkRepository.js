const db = require("../config/db");

class NPKRepository {
  static insertNPKData(nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture, water_level) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO npk_readings (nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture, water_level) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(query, [nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture, water_level], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  static getAllNPKData() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM npk_readings ORDER BY timestamp DESC", (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = NPKRepository;
