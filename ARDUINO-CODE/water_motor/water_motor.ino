#define WATER_SENSOR A0  // Water level sensor connected to analog pin A0
#define RELAY_PIN 7      // Relay module connected to digital pin 7

#define WATER_DETECTED_THRESHOLD 500  // Adjust based on sensor readings

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
