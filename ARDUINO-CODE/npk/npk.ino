//this work

#include <SoftwareSerial.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>

#define RE 8
#define DE 7
#define DHTPIN 4

#define DHTTYPE DHT11

#define MOISTURE_PIN A0
#define PH_PIN A1
#define EC_PIN A2

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);  // Change 0x27 to 0x3F if your LCD has a different address

const byte nitro[] = {0x01, 0x03, 0x00, 0x1e, 0x00, 0x01, 0xe4, 0x0c};
const byte phos[] = {0x01, 0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc};
const byte pota[] = {0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};

byte values[11];
SoftwareSerial mod(2, 3);  // RS485 communication

void setup() {
  Serial.begin(9600);  // For UART communication with ESP32
  mod.begin(9600);
  pinMode(RE, OUTPUT);
  pinMode(DE, OUTPUT);

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print(" SMART FARMING ");
  lcd.setCursor(0, 1);
  lcd.print("Initializing..");
  delay(3000);
  lcd.clear();

  dht.begin();
}

void loop() {
  byte val1, val2, val3;
  float temperature, humidity, moisture, phValue, ecValue;

  val1 = nitrogen();
  delay(250);
  val2 = phosphorous();
  delay(250);
  val3 = potassium();
  delay(250);

  temperature = dht.readTemperature();
  humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    temperature = 0.0;
    humidity = 0.0;
  }

  moisture = analogRead(MOISTURE_PIN);
  moisture = map(moisture, 0, 1023, 0, 100);

  phValue = analogRead(PH_PIN);
  phValue = map(phValue, 0, 1023, 0, 14);

  ecValue = analogRead(EC_PIN);
  ecValue = map(ecValue, 0, 1023, 0, 2000);

  // Send sensor data to ESP32 via UART
  Serial.print("N:");
  Serial.print(val1);
  Serial.print(",P:");
  Serial.print(val2);
  Serial.print(",K:");
  Serial.print(val3);
  Serial.print(",Moisture:");
  Serial.print(moisture);
  Serial.print(",Temp:");
  Serial.print(temperature);
  Serial.print(",EC:");
  Serial.print(ecValue);
  Serial.print(",Humidity:");
  Serial.print(humidity);
  Serial.print(",pH:");
  Serial.println(phValue);

  // Show NPK on LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("N:");
  lcd.print(val1);
  lcd.print(" P:");
  lcd.print(val2);

  lcd.setCursor(0, 1);
  lcd.print("K:");
  lcd.print(val3);
  lcd.print(" T:");
  lcd.print((double)temperature);
  lcd.write(byte(223)); 
  lcd.print("C");
  delay(5000);

  // Show moisture and pH on LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Moist:");
  lcd.print((int)moisture);
  lcd.print("%");

  lcd.setCursor(0, 1);
  lcd.print("pH:");
  lcd.print(phValue);
  // lcd.print(" EC:");
  // lcd.print((int)(ecValue / 1000));
  // lcd.print("mS");


  lcd.print(" H:");
  lcd.print((int)(humidity));
  lcd.print("%");
  delay(5000);
}

byte nitrogen() {
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(10);
  if (mod.write(nitro, sizeof(nitro)) == 8) {
    digitalWrite(DE, LOW);
    digitalWrite(RE, LOW);
    delay(50);
    for (byte i = 0; i < 7; i++) {
      if (mod.available()) values[i] = mod.read();
    }
  }
  return values[4];
}

byte phosphorous() {
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(10);
  if (mod.write(phos, sizeof(phos)) == 8) {
    digitalWrite(DE, LOW);
    digitalWrite(RE, LOW);
    delay(50);
    for (byte i = 0; i < 7; i++) {
      if (mod.available()) values[i] = mod.read();
    }
  }
  return values[4];
}

byte potassium() {
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(10);
  if (mod.write(pota, sizeof(pota)) == 8) {
    digitalWrite(DE, LOW);
    digitalWrite(RE, LOW);
    delay(50);
    for (byte i = 0; i < 7; i++) {
      if (mod.available()) values[i] = mod.read();
    }
  }
  return values[4];
}











// #include <SoftwareSerial.h>
// #include <Wire.h>
// #include <LiquidCrystal_I2C.h>

// #define RE 8
// #define DE 7

// LiquidCrystal_I2C lcd(0x27, 16, 2); // LCD address

// SoftwareSerial mod(2, 3); // RS485 communication

// const byte nitro[]    = {0x01, 0x03, 0x00, 0x1E, 0x00, 0x01, 0xE4, 0x0C}; // Nitrogen
// const byte phos[]     = {0x01, 0x03, 0x00, 0x1F, 0x00, 0x01, 0xB5, 0xCC}; // Phosphorus
// const byte pota[]     = {0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xC0}; // Potassium
// const byte phValueCmd[]= {0x01, 0x03, 0x00, 0x21, 0x00, 0x01, 0x7C, 0x29}; // pH
// const byte ecValueCmd[]= {0x01, 0x03, 0x00, 0x22, 0x00, 0x01, 0xDC, 0x28}; // EC
// const byte moistCmd[] = {0x01, 0x03, 0x00, 0x23, 0x00, 0x01, 0x8D, 0xE8}; // Moisture
// const byte tempCmd[]  = {0x01, 0x03, 0x00, 0x24, 0x00, 0x01, 0x7D, 0xE9}; // Temperature

// byte values[11];

// void setup() {
//   Serial.begin(9600);  // For UART communication
//   mod.begin(9600);

//   pinMode(RE, OUTPUT);
//   pinMode(DE, OUTPUT);

//   lcd.init();
//   lcd.backlight();
//   lcd.setCursor(0, 0);
//   lcd.print(" SMART FARMING ");
//   lcd.setCursor(0, 1);
//   lcd.print("Initializing..");
//   delay(3000);
//   lcd.clear();
// }

// void loop() {
//   byte valN = readModbus(nitro, sizeof(nitro));
//   delay(250);
//   byte valP = readModbus(phos, sizeof(phos));
//   delay(250);
//   byte valK = readModbus(pota, sizeof(pota));
//   delay(250);
//   byte valpH = readModbus(phValueCmd, sizeof(phValueCmd));
//   delay(250);
//   byte valEC = readModbus(ecValueCmd, sizeof(ecValueCmd));
//   delay(250);
//   byte valMoist = readModbus(moistCmd, sizeof(moistCmd));
//   delay(250);
//   byte valTemp = readModbus(tempCmd, sizeof(tempCmd));
//   delay(250);

//   // Send data to serial (ESP32 or monitoring)
//   Serial.print("N:");
//   Serial.print(valN);
//   Serial.print(", P:");
//   Serial.print(valP);
//   Serial.print(", K:");
//   Serial.print(valK);
//   Serial.print(", pH:");
//   Serial.print(valpH);
//   Serial.print(", EC:");
//   Serial.print(valEC);
//   Serial.print(", Moisture:");
//   Serial.print(valMoist);
//   Serial.print(", Temp:");
//   Serial.println(valTemp);

//   // Display NPK on LCD
//   lcd.clear();
//   lcd.setCursor(0, 0);
//   lcd.print("N:");
//   lcd.print(valN);
//   lcd.print(" P:");
//   lcd.print(valP);

//   lcd.setCursor(0, 1);
//   lcd.print("K:");
//   lcd.print(valK);
//   lcd.print(" pH:");
//   lcd.print(valpH);
//   delay(5000);

//   // Display EC, Moisture, Temp
//   lcd.clear();
//   lcd.setCursor(0, 0);
//   lcd.print("EC:");
//   lcd.print(valEC);
//   lcd.print("ms");

//   lcd.setCursor(0, 1);
//   lcd.print("M:");
//   lcd.print(valMoist);
//   lcd.print("% T:");
//   lcd.print(valTemp);
//   lcd.write(byte(223)); // Degree symbol
//   lcd.print("C");
//   delay(5000);
// }

// byte readModbus(const byte *cmd, byte cmdLength) {
//   memset(values, 0, sizeof(values));
//   digitalWrite(DE, HIGH);
//   digitalWrite(RE, HIGH);
//   delay(10);
//   mod.write(cmd, cmdLength);
//   digitalWrite(DE, LOW);
//   digitalWrite(RE, LOW);
//   delay(50);

//   int bytesRead = 0;
//   while (mod.available() && bytesRead < 7) {
//     values[bytesRead++] = mod.read();
//   }

//   if (bytesRead >= 5) {
//     return values[4]; // Data is typically at index 4
//   } else {
//     Serial.println("Error: Incomplete Modbus response.");
//     return 0;
//   }
// }