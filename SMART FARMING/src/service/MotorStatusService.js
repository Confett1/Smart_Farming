// const  = require("../repositories/NpkRepository");

// class NPKService {
//   static async saveNPKData(nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture) {
//     return await NPKRepository.insertNPKData(nitrogen, phosphorous, potassium, temperature, humidity, soil_moisture);
//   }

//   static async fetchAllNPKData() {
//     return await NPKRepository.getAllNPKData();
//   }
// }

// module.exports = NPKService;

const MotorStatusRepo = require("../repositories/MotorStatusRepo");

class MotorStatusService {
    static async saveStatus(irrigation_motor_status, nitrogen_motor_status, phosphorus_motor_status, potassium_motor_status) {
        return await MotorStatusRepo.insertStatus(irrigation_motor_status, nitrogen_motor_status, phosphorus_motor_status, potassium_motor_status);
    }
}

module.exports = MotorStatusService;