const int WATER_SENSOR = A0;  // Water level sensor
const int buzzerPin = 6;     // Passive Buzzer
#define RELAY_PIN 7      // Relay module connected to digital pin 7
int sensorValue = 0;


#define WATER_DETECTED_THRESHOLD 500  // Adjust based on sensor readings

void setup() {
  pinMode(2, OUTPUT); // LED 1
  pinMode(3, OUTPUT); // LED 2
  pinMode(4, OUTPUT); // LED 3
  pinMode(5, OUTPUT); // LED 4
  pinMode(buzzerPin, OUTPUT);
  
    // pinMode(WATER_SENSOR, INPUT);
    pinMode(RELAY_PIN, OUTPUT);
    digitalWrite(RELAY_PIN, LOW); // Ensure the pump is OFF initially
  
  Serial.begin(9600);
}

void loop() {
  sensorValue = analogRead(WATER_SENSOR);
  Serial.print("Sensor Value: ");
  Serial.println(sensorValue);
  
  // Turn off all LEDs first
  digitalWrite(2, LOW);
  digitalWrite(3, LOW);
  digitalWrite(4, LOW);
  digitalWrite(5, LOW);
  digitalWrite(buzzerPin, LOW);  // Turn off buzzer

  // Water level detection with LED and buzzer alert
  if (sensorValue >= 100 && sensorValue <= 300) {
    digitalWrite(2, HIGH);
  } 
  else if (sensorValue >= 301 && sensorValue <= 500) {
    digitalWrite(3, HIGH);
  }  
  else if (sensorValue >= 501 && sensorValue <= 600) {
    digitalWrite(4, HIGH);
    digitalWrite(5, HIGH);
    tone(buzzerPin, 1000); // Buzzer sounds at 1000Hz
    delay(500);
    noTone(buzzerPin); // Stop buzzer after 500ms

    
    digitalWrite(RELAY_PIN, HIGH); // Activate relay (Pump ON)
        Serial.println("Water detected! Pump ON.");
  }


     // If water is detected, turn ON the pump
    if (sensorValue > WATER_DETECTED_THRESHOLD) {
        digitalWrite(RELAY_PIN, HIGH); // Activate relay (Pump ON)
        Serial.println("Water detected! Pump ON.");
    } 
    // If no water is detected, turn OFF the pump
    else {
        digitalWrite(RELAY_PIN, LOW); // Deactivate relay (Pump OFF)
        Serial.println("No water detected! Pump OFF.");
    }

  delay(500); // Delay for better readings
}
