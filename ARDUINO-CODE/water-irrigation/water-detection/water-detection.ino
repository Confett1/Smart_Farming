// #include <Servo.h>

// // Water sensor (optional)
// const int WATER_SENSOR = A0;  // Water detection sensor
// const int buzzerPin = 6;      // Passive Buzzer
// #define RELAY_PIN 7           // Relay module
// #define TRIG_PIN 9            // Ultrasonic Trigger pin
// #define ECHO_PIN 10           // Ultrasonic Echo pin
// #define TANK_HEIGHT_CM 10.16    // Tank height in cm
// #define SERVO_PIN 11          // Servo motor signal pin

// // Thresholds
// #define WATER_SENSOR_THRESHOLD 500  // For analog water sensor

// // Variables
// long duration;
// float distance;
// float waterLevel;
// float waterPercent;
// int sensorValue = 0;

// Servo drainageServo;  // Create servo object

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

//   drainageServo.attach(SERVO_PIN); // Attach servo to pin 11
//   drainageServo.write(0); // Start with drainage closed

//   Serial.begin(9600);
// }

// void loop() {
//   // --- Optional YL-69 Water Sensor ---
//   sensorValue = analogRead(WATER_SENSOR);
//   Serial.print("Canal Water Level: ");
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

//   // --- LED and Buzzer Alerts ---
//   digitalWrite(2, LOW);
//   digitalWrite(3, LOW);
//   digitalWrite(4, LOW);
//   digitalWrite(5, LOW);
//   noTone(buzzerPin);

//   if (waterPercent >= 0 && waterPercent <= 25) {
//     digitalWrite(2, HIGH);
//   } else if (waterPercent > 25 && waterPercent <= 50) {
//     digitalWrite(3, HIGH);
//   } else if (waterPercent > 50 && waterPercent <= 75) {
//     digitalWrite(4, HIGH);
//   } else if (waterPercent > 75) {
//     digitalWrite(5, HIGH);
//     tone(buzzerPin, 1000);
//     delay(500);
//     noTone(buzzerPin);
//   }

//   // --- Relay (Pump) Control ---
//   if (waterPercent <= 20) {
//     digitalWrite(RELAY_PIN, LOW);
//     Serial.println("Water low! Pump OFF.");
//   } else if (waterPercent > 20) {
//     digitalWrite(RELAY_PIN, HIGH);
//     Serial.println("Water sufficient! Pump ON.");
//   }

//   // --- Servo (Drainage) Control ---
//   if (waterPercent >= 80) {
//     drainageServo.write(90);  // Open drainage
//     Serial.println("Drainage OPEN (Servo at 90°)");
//   } else if (waterPercent <= 50) {
//     drainageServo.write(0);   // Close drainage
//     Serial.println("Drainage CLOSED (Servo at 0°)");
//   }

//   delay(5000); // Delay for better readings
// }













#include <Servo.h>

// Water sensor pins
const int CANAL_SENSOR = A1;  // HW-038 Water Sensor for canal
const int SOIL_SENSOR = A2;   // YL-69 Soil Moisture Sensor
const int WATER_SENSOR = A0;  // Water detection sensor

// Buzzer, relay, ultrasonic, and servo
const int buzzerPin = 6;
#define RELAY_PIN 7            // Relay for tank pump
#define IRRIGATION_PUMP 8      // Relay for irrigation
#define TRIG_PIN 9             // Ultrasonic Trigger pin
#define ECHO_PIN 10            // Ultrasonic Echo pin
#define TANK_HEIGHT_CM 10.16   // Tank height in cm
#define SERVO_PIN 11           // Servo motor signal pin

// Thresholds
#define WATER_SENSOR_THRESHOLD 500  // YL-69 Soil Moisture Threshold
#define CANAL_THRESHOLD 600         // HW-038 Water Sensor Threshold
#define LOW_SOIL_MOISTURE 400       // Dry soil threshold

// Variables
long duration;
float distance, waterLevel, waterPercent;
int canalValue, soilMoisture, sensorValue;

Servo drainageServo;

void setup() {
  pinMode(2, OUTPUT); // LED 1
  pinMode(3, OUTPUT); // LED 2
  pinMode(4, OUTPUT); // LED 3
  pinMode(5, OUTPUT); // LED 4
  pinMode(buzzerPin, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(IRRIGATION_PUMP, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);   // Tank Pump OFF at start
  digitalWrite(IRRIGATION_PUMP, LOW); // Irrigation OFF at start
  
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  drainageServo.attach(SERVO_PIN);
  drainageServo.write(0); // Start with drainage closed

  Serial.begin(9600);
}

void loop() {
  // --- Read HW-038 Canal Water Sensor ---
  canalValue = analogRead(CANAL_SENSOR);
  Serial.print("Canal Water Level: ");
  Serial.println(canalValue);
  
  // --- Read YL-69 Soil Moisture Sensor ---
  soilMoisture = analogRead(SOIL_SENSOR);
  Serial.print("Soil Moisture: ");
  Serial.println(soilMoisture);

  // --- Read Ultrasonic Water Level ---
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

  Serial.print("Tank Water Level: ");
  Serial.print(waterLevel);
  Serial.print(" cm | ");
  Serial.print(waterPercent);
  Serial.println(" %");

  // --- LED and Buzzer Alerts for Tank ---
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

  // --- Pump Control for Tank ---
  if (waterPercent <= 20) {
    digitalWrite(RELAY_PIN, LOW);
    Serial.println("Tank Water Low! Pump OFF.");
  } else if (waterPercent > 20) {
    digitalWrite(RELAY_PIN, HIGH);
    Serial.println("Tank Water Sufficient! Pump ON.");
  }

  // --- Drainage Control using Servo ---
  if (canalValue >= CANAL_THRESHOLD) {
    drainageServo.write(90);  // Open drainage
    Serial.println("Canal Water High! Drainage OPEN.");
  } else {
    drainageServo.write(0);   // Close drainage
    Serial.println("Canal Water Normal. Drainage CLOSED.");
  }

  // --- Soil Moisture Based Irrigation ---
  if (soilMoisture < LOW_SOIL_MOISTURE) {
    digitalWrite(IRRIGATION_PUMP, HIGH);
    Serial.println("Soil is dry! Irrigation Pump ON.");
  } else {
    digitalWrite(IRRIGATION_PUMP, LOW);
    Serial.println("Soil is moist! Irrigation Pump OFF.");
  }

  delay(5000);
}
