class NPKModel {
    constructor(nitrogen, phosphorous, potassium, timestamp) {
      this.nitrogen = nitrogen;
      this.phosphorous = phosphorous;
      this.potassium = potassium;
      this.timestamp = timestamp || new Date();
    }
  }
  
  module.exports = NPKModel;
  