//const int sensorPin = 2;  // Digital input pin for water sensor (S)
//const int relayPin = 7;   // Digital output pin for relay module
//int sensorValue;          // Stores sensor reading
//
//void setup() {
//    pinMode(sensorPin, INPUT);  // Set sensor pin as input
//    pinMode(relayPin, OUTPUT);  // Set relay pin as output
//    digitalWrite(relayPin, HIGH); // Turn OFF the pump initially
//    Serial.begin(9600);          // Start Serial Monitor for debugging
//}
//
//void loop() {
//    sensorValue = digitalRead(sensorPin); // Read water sensor value
//
//    if (sensorValue == HIGH) {  // If soil is dry
//        digitalWrite(relayPin, LOW); // Turn ON the water pump
//        Serial.println("Soil is dry! Pump ON...");
//    } 
//    else {  // If soil is wet
//        digitalWrite(relayPin, HIGH); // Turn OFF the water pump
//        Serial.println("Soil is wet. Pump OFF.");
//    }
//    
//    delay(2000); // Wait 2 seconds before next reading
//}
//
//
//
//
//
//
//
//
////
////#define RELAY_PIN 7  // Relay module connected to digital pin 7
////
////void setup() {
////    pinMode(RELAY_PIN, OUTPUT);
////    digitalWrite(RELAY_PIN, LOW); // Ensure the pump is OFF initially
////}
////
////void loop() {
////    digitalWrite(RELAY_PIN, HIGH); // Turn ON pump
////    delay(5000); // Keep pump ON for 5 seconds (adjust as needed)
////
////    digitalWrite(RELAY_PIN, LOW); // Turn OFF pump
////    delay(10000); // Keep pump OFF for 10 seconds (adjust as needed)
////}












#define WATER_SENSOR A0  // Water level sensor connected to analog pin A0
#define RELAY_PIN 7      // Relay module connected to digital pin 7

#define WATER_DETECTED_THRESHOLD 500  // Adjust based on your sensor readings

void setup() {
    pinMode(WATER_SENSOR, INPUT);
    pinMode(RELAY_PIN, OUTPUT);
    digitalWrite(RELAY_PIN, LOW); // Ensure the pump is OFF initially
    Serial.begin(9600); // Start Serial Monitor for debugging
}

void loop() {
    int waterLevel = analogRead(WATER_SENSOR); // Read water sensor value
    Serial.print("Water Level Sensor Reading: ");
    Serial.println(waterLevel); // Print value to Serial Monitor

    // If water is detected, turn ON the pump
    if (waterLevel > WATER_DETECTED_THRESHOLD) {
        digitalWrite(RELAY_PIN, HIGH); // Activate relay (Pump ON)
        Serial.println("Water detected! Pump ON.");
    } 
    // If no water is detected, turn OFF the pump
    else {
        digitalWrite(RELAY_PIN, LOW); // Deactivate relay (Pump OFF)
        Serial.println("No water detected! Pump OFF.");
    }

    delay(2000); // Wait for 2 seconds before reading again
}
