class MotorStatus {
    constructor(irrigation_motor_status, nitrogen_motor_status, phosphorus_motor_status, potassium_motor_status, timestamp) {
        this.irrigation_motor_status = irrigation_motor_status;
        this.nitrogen_motor_status = nitrogen_motor_status;
        this.phosphorus_motor_status = phosphorus_motor_status;
        this.potassium_motor_status = potassium_motor_status;
        this.timestamp = timestamp || new Date(); 
    }
  }
  
  module.exports = NPKModel;
  