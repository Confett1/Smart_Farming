// const int WATER_SENSOR = A0;  // Water level sensor
// const int buzzerPin = 6;     // Passive Buzzer
// #define RELAY_PIN 7      // Relay module connected to digital pin 7
// int sensorValue = 0;

// //ultra sonic
// #define TRIG_PIN 9
// #define ECHO_PIN 10
// #define TANK_HEIGHT_CM 100  // Example: 100 cm deep

// long duration;
// float distance;
// float waterLevel;
// float waterPercent;  // Water level in percent

// //---

// #define WATER_DETECTED_THRESHOLD 500  // Adjust based on sensor readings

// void setup() {
//   pinMode(2, OUTPUT); // LED 1
//   pinMode(3, OUTPUT); // LED 2
//   pinMode(4, OUTPUT); // LED 3
//   pinMode(5, OUTPUT); // LED 4
//   pinMode(buzzerPin, OUTPUT);

//   //Ultra sonic 
//   pinMode(TRIG_PIN, OUTPUT);
//   pinMode(ECHO_PIN, INPUT);
//   //--
  
//     // pinMode(WATER_SENSOR, INPUT);
//     pinMode(RELAY_PIN, OUTPUT);
//     digitalWrite(RELAY_PIN, LOW); // Ensure the pump is OFF initially
  
//   Serial.begin(9600);
// }

// void loop() {
//   sensorValue = analogRead(WATER_SENSOR);
//   Serial.print("Sensor Value: ");
//   Serial.println(sensorValue);
  
//   // Turn off all LEDs first
//   digitalWrite(2, LOW);
//   digitalWrite(3, LOW);
//   digitalWrite(4, LOW);
//   digitalWrite(5, LOW);
//   digitalWrite(buzzerPin, LOW);  // Turn off buzzer

//   // Water level detection with LED and buzzer alert
//   if (sensorValue >= 100 && sensorValue <= 300) {
//     digitalWrite(2, HIGH);
//   } 
//   else if (sensorValue >= 301 && sensorValue <= 500) {
//     digitalWrite(3, HIGH);
//   }  
//   else if (sensorValue >= 501 && sensorValue <= 600) {
//     digitalWrite(4, HIGH);
//     digitalWrite(5, HIGH);
//     tone(buzzerPin, 1000); // Buzzer sounds at 1000Hz
//     delay(500);
//     noTone(buzzerPin); // Stop buzzer after 500ms

    
//     digitalWrite(RELAY_PIN, HIGH); // Activate relay (Pump ON)
//         Serial.println("Water detected! Pump ON.");
//   }


//      // If water is detected, turn ON the pump
//     if (sensorValue > WATER_DETECTED_THRESHOLD) {
//         digitalWrite(RELAY_PIN, HIGH); // Activate relay (Pump ON)
//         Serial.println("Water detected! Pump ON.");
//     } 
//     // If no water is detected, turn OFF the pump
//     else {
//         digitalWrite(RELAY_PIN, LOW); // Deactivate relay (Pump OFF)
//         Serial.println("No water detected! Pump OFF.");
//     }




//   // Ultra Sonic

//   // Trigger the sensor
//   digitalWrite(TRIG_PIN, LOW);
//   delayMicroseconds(2);
//   digitalWrite(TRIG_PIN, HIGH);
//   delayMicroseconds(10);
//   digitalWrite(TRIG_PIN, LOW);

//   // Read the echo time
//   duration = pulseIn(ECHO_PIN, HIGH);

//   // Convert to distance (cm)
//   distance = (duration * 0.0343) / 2;


//   // Calculate water level in cm
//   waterLevel = TANK_HEIGHT_CM - distance;
//   if (waterLevel < 0) waterLevel = 0;
//   if (waterLevel > TANK_HEIGHT_CM) waterLevel = TANK_HEIGHT_CM;

//   // Calculate water level percentage
//   waterPercent = (waterLevel / TANK_HEIGHT_CM) * 100.0;


//   // Print values
//   Serial.print("Water Level: ");
//   Serial.print(waterLevel);
//   Serial.print(" cm | ");
//   Serial.print("Water Level: ");
//   Serial.print(waterPercent);
//   Serial.println(" %");

//   //--


  
//   delay(5000); // Delay for better readings

// }



























// // Water sensor (optional)
// const int WATER_SENSOR = A0;  // Water detection sensor
// const int buzzerPin = 6;      // Passive Buzzer
// #define RELAY_PIN 7           // Relay module
// #define TRIG_PIN 9            // Ultrasonic Trigger pin
// #define ECHO_PIN 10           // Ultrasonic Echo pin
// #define TANK_HEIGHT_CM 100    // Tank height in cm

// // Thresholds
// #define WATER_SENSOR_THRESHOLD 500  // For analog water sensor

// // Variables
// long duration;
// float distance;
// float waterLevel;
// float waterPercent;
// int sensorValue = 0;

// void setup() {
//   // LEDs
//   pinMode(2, OUTPUT); // LED 1
//   pinMode(3, OUTPUT); // LED 2
//   pinMode(4, OUTPUT); // LED 3
//   pinMode(5, OUTPUT); // LED 4

//   // Buzzer and relay
//   pinMode(buzzerPin, OUTPUT);
//   pinMode(RELAY_PIN, OUTPUT);
//   digitalWrite(RELAY_PIN, LOW); // Pump OFF at start

//   // Ultrasonic sensor
//   pinMode(TRIG_PIN, OUTPUT);
//   pinMode(ECHO_PIN, INPUT);

//   Serial.begin(9600);
// }

// void loop() {
//   // --- Optional YL-69 Water Sensor ---
//   sensorValue = analogRead(WATER_SENSOR);
//   Serial.print("Analog Sensor Value: ");
//   Serial.println(sensorValue);

//   // --- Ultrasonic Water Level Measurement ---
//   digitalWrite(TRIG_PIN, LOW);
//   delayMicroseconds(2);
//   digitalWrite(TRIG_PIN, HIGH);
//   delayMicroseconds(10);
//   digitalWrite(TRIG_PIN, LOW);

//   duration = pulseIn(ECHO_PIN, HIGH);
//   distance = (duration * 0.0343) / 2;
//   waterLevel = TANK_HEIGHT_CM - distance;

//   if (waterLevel < 0) waterLevel = 0;
//   if (waterLevel > TANK_HEIGHT_CM) waterLevel = TANK_HEIGHT_CM;

//   waterPercent = (waterLevel / TANK_HEIGHT_CM) * 100.0;

//   Serial.print("Water Level: ");
//   Serial.print(waterLevel);
//   Serial.print(" cm | ");
//   Serial.print(waterPercent);
//   Serial.println(" %");

//   // --- LED and Buzzer Alerts based on Water Level Percentage ---
//   digitalWrite(2, LOW);
//   digitalWrite(3, LOW);
//   digitalWrite(4, LOW);
//   digitalWrite(5, LOW);
//   noTone(buzzerPin);

//   if (waterPercent >= 0 && waterPercent <= 25) {
//     digitalWrite(2, HIGH); // Low water
//   } else if (waterPercent > 25 && waterPercent <= 50) {
//     digitalWrite(3, HIGH); // Medium-low water
//   } else if (waterPercent > 50 && waterPercent <= 75) {
//     digitalWrite(4, HIGH); // Medium-high water
//   } else if (waterPercent > 75) {
//     digitalWrite(5, HIGH); // Almost full
//     tone(buzzerPin, 1000); // Buzzer ON
//     delay(500);
//     noTone(buzzerPin);
//   }

//   // --- Relay (Pump) Control ---
//   if (waterPercent <= 20) { // If water level is too low, turn OFF the pump
//     digitalWrite(RELAY_PIN, LOW);
//     Serial.println("Water low! Pump OFF.");
//   } else if (waterPercent > 20) { // Enough water to turn ON the pump
//     digitalWrite(RELAY_PIN, HIGH);
//     Serial.println("Water sufficient! Pump ON.");
//   }

//   delay(5000); // Delay for better readings
// }





























#include <Servo.h>

// Water sensor (optional)
const int WATER_SENSOR = A0;  // Water detection sensor
const int buzzerPin = 6;      // Passive Buzzer
#define RELAY_PIN 7           // Relay module
#define TRIG_PIN 9            // Ultrasonic Trigger pin
#define ECHO_PIN 10           // Ultrasonic Echo pin
#define TANK_HEIGHT_CM 100    // Tank height in cm
#define SERVO_PIN 11          // Servo motor signal pin

// Thresholds
#define WATER_SENSOR_THRESHOLD 500  // For analog water sensor

// Variables
long duration;
float distance;
float waterLevel;
float waterPercent;
int sensorValue = 0;

Servo drainageServo;  // Create servo object

void setup() {
  // LEDs
  pinMode(2, OUTPUT); // LED 1
  pinMode(3, OUTPUT); // LED 2
  pinMode(4, OUTPUT); // LED 3
  pinMode(5, OUTPUT); // LED 4

  // Buzzer and relay
  pinMode(buzzerPin, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Pump OFF at start

  // Ultrasonic sensor
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  drainageServo.attach(SERVO_PIN); // Attach servo to pin 11
  drainageServo.write(0); // Start with drainage closed

  Serial.begin(9600);
}

void loop() {
  // --- Optional YL-69 Water Sensor ---
  sensorValue = analogRead(WATER_SENSOR);
  Serial.print("Analog Sensor Value: ");
  Serial.println(sensorValue);

  // --- Ultrasonic Water Level Measurement ---
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  duration = pulseIn(ECHO_PIN, HIGH);
  distance = (duration * 0.0343) / 2;
  waterLevel = TANK_HEIGHT_CM - distance;

  if (waterLevel < 0) waterLevel = 0;
  if (waterLevel > TANK_HEIGHT_CM) waterLevel = TANK_HEIGHT_CM;

  waterPercent = (waterLevel / TANK_HEIGHT_CM) * 100.0;

  Serial.print("Water Level: ");
  Serial.print(waterLevel);
  Serial.print(" cm | ");
  Serial.print(waterPercent);
  Serial.println(" %");

  // --- LED and Buzzer Alerts ---
  digitalWrite(2, LOW);
  digitalWrite(3, LOW);
  digitalWrite(4, LOW);
  digitalWrite(5, LOW);
  noTone(buzzerPin);

  if (waterPercent >= 0 && waterPercent <= 25) {
    digitalWrite(2, HIGH);
  } else if (waterPercent > 25 && waterPercent <= 50) {
    digitalWrite(3, HIGH);
  } else if (waterPercent > 50 && waterPercent <= 75) {
    digitalWrite(4, HIGH);
  } else if (waterPercent > 75) {
    digitalWrite(5, HIGH);
    tone(buzzerPin, 1000);
    delay(500);
    noTone(buzzerPin);
  }

  // --- Relay (Pump) Control ---
  if (waterPercent <= 20) {
    digitalWrite(RELAY_PIN, LOW);
    Serial.println("Water low! Pump OFF.");
  } else if (waterPercent > 20) {
    digitalWrite(RELAY_PIN, HIGH);
    Serial.println("Water sufficient! Pump ON.");
  }

  // --- Servo (Drainage) Control ---
  if (waterPercent >= 80) {
    drainageServo.write(90);  // Open drainage
    Serial.println("Drainage OPEN (Servo at 90°)");
  } else if (waterPercent <= 50) {
    drainageServo.write(0);   // Close drainage
    Serial.println("Drainage CLOSED (Servo at 0°)");
  }

  delay(5000); // Delay for better readings
}
