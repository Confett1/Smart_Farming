const db = require("../config/db");

// class NPKRepository {
//   static insertNPKData(nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture) {
//     return new Promise((resolve, reject) => {
//       const query = "INSERT INTO npk_readings (nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture) VALUES (?, ?, ?, ?, ?, ?)";
//       db.query(query, [nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture], (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });
//   }

//   static getAllNPKData() {
//     return new Promise((resolve, reject) => {
//       db.query("SELECT * FROM npk_readings ORDER BY timestamp DESC", (err, results) => {
//         if (err) return reject(err);
//         resolve(results);
//       });
//     });
//   }
// }

// module.exports = NPKRepository;

class MotorStatusRepo {
      static insertStatus(irrigation_motor_status, nitrogen_motor_status, phosphorus_motor_status, potassium_motor_status) {
        return new Promise((resolve, reject) => {
          const query = "INSERT INTO motor_status (irrigation_motor_status, nitrogen_motor_status, phosphorus_motor_status, potassium_motor_status) VALUES (?, ?, ?, ?)";
          db.query(query, [irrigation_motor_status, nitrogen_motor_status, phosphorus_motor_status, potassium_motor_status], (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      }
}

module.exports = MotorStatusRepo;

