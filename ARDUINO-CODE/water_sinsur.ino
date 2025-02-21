const int analogInPin = A0;
int sensorValue = 0;

void setup() {
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  sensorValue = analogRead(analogInPin);
  Serial.print("Sensor Value: ");
  Serial.println(sensorValue);
  delay(500); // Increased delay for better readings

  // Turn off all LEDs first
  digitalWrite(2, LOW);
  digitalWrite(3, LOW);
  digitalWrite(4, LOW);
  digitalWrite(5, LOW);

  // Turn on LEDs based on water level
  if (sensorValue >= 100 && sensorValue <= 600) {
    digitalWrite(2, HIGH);
  } 
  else if (sensorValue >= 601 && sensorValue <= 625) {
    digitalWrite(3, HIGH);
  }  
  else if (sensorValue >= 626 && sensorValue <= 700) {
    digitalWrite(4, HIGH);
    digitalWrite(5, HIGH);
  }
}
