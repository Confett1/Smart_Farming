// // // #include <SoftwareSerial.h>

// // // #define RE 8
// // // #define DE 7
// // // SoftwareSerial mod(2, 3);  // RS485 communication

// // // const byte nitro[] = {0x01, 0x03, 0x00, 0x1e, 0x00, 0x01, 0xe4, 0x0c};
// // // const byte phos[]  = {0x01, 0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc};
// // // const byte pota[]  = {0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};

// // // SoftwareSerial espSerial(4, 5);  // Connects to ESP8266 (TX, RX)

// // // void setup() {
// // //     Serial.begin(115200);
// // //     mod.begin(9600);
// // //     espSerial.begin(115200);
    
// // //     pinMode(RE, OUTPUT);
// // //     pinMode(DE, OUTPUT);
    
// // //     Serial.println("NPK Sensor Initialization...");
// // // }

// // // void loop() {
// // //     byte val1 = nitrogen();
// // //     delay(250);
// // //     byte val2 = phosphorous();
// // //     delay(250);
// // //     byte val3 = potassium();
// // //     delay(250);

// // //     // Send data to ESP8266 via SoftwareSerial
// // //     String npkData = "N:" + String(val1) + ",P:" + String(val2) + ",K:" + String(val3);
// // //     Serial.println(npkData);

// // //     Serial.println(npkData);
// // //     delay(5000);
// // // }

// // // byte nitrogen() {
// // //     return readSensor(nitro);
// // // }
// // // byte phosphorous() {
// // //     return readSensor(phos);
// // // }
// // // byte potassium() {
// // //     return readSensor(pota);
// // // }

// // // byte readSensor(const byte* command) {
// // //     digitalWrite(DE, HIGH);
// // //     digitalWrite(RE, HIGH);
// // //     delay(10);

// // //     mod.write(command, 8);
// // //     digitalWrite(DE, LOW);
// // //     digitalWrite(RE, LOW);
    
// // //     byte values[7] = {0};
// // //     delay(100);
// // //     for (byte i = 0; i < 7; i++) {
// // //         if (mod.available()) {
// // //             values[i] = mod.read();
// // //         }
// // //     }
// // //     return values[4];
// // // }








// // #include <SoftwareSerial.h>

// // #define RE 8
// // #define DE 7
// // SoftwareSerial mod(2, 3);  // RS485 communication

// // const byte nitro[] = {0x01, 0x03, 0x00, 0x1e, 0x00, 0x01, 0xe4, 0x0c};
// // const byte phos[]  = {0x01, 0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc};
// // const byte pota[]  = {0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};

// // // Additional Queries (from ESP32 Code)
// // const byte soilMoistureQuery[]   = {0x01, 0x03, 0x00, 0x03, 0x00, 0x01, 0x24, 0x0F};
// // const byte soilTemperatureQuery[] = {0x01, 0x03, 0x00, 0x13, 0x00, 0x01, 0x75, 0xCF};
// // const byte conductivityQuery[]    = {0x01, 0x03, 0x00, 0x15, 0x00, 0x01, 0x95, 0xCE};

// // SoftwareSerial espSerial(4, 5);  // Connects to ESP8266 (TX, RX)

// // void setup() {
// //     Serial.begin(115200);
// //     mod.begin(9600);
// //     espSerial.begin(115200);
    
// //     pinMode(RE, OUTPUT);
// //     pinMode(DE, OUTPUT);
    
// //     Serial.println("NPK Sensor Initialization...");
// // }

// // void loop() {
// //     byte val1 = nitrogen();
// //     delay(250);
// //     byte val2 = phosphorous();
// //     delay(250);
// //     byte val3 = potassium();
// //     delay(250);
// //     byte val4 = soilMoisture();
// //     delay(250);
// //     byte val5 = soilTemperature();
// //     delay(250);
// //     byte val6 = conductivity();
// //     delay(250);

// //     // Send data to ESP8266 via SoftwareSerial
// //     String npkData = "N:" + String(val1) + ", P:" + String(val2) + ", K:" + String(val3) +
// //                      ", Moisture:" + String(val4) + ", Temp:" + String(val5) + ", EC:" + String(val6);
// //     Serial.println(npkData);
// //     espSerial.println(npkData); // Send to ESP8266

// //     delay(5000);
// // }

// // // Functions to read values
// // byte nitrogen()       { return readSensor(nitro); }
// // byte phosphorous()    { return readSensor(phos); }
// // byte potassium()      { return readSensor(pota); }
// // byte soilMoisture()   { return readSensor(soilMoistureQuery); }
// // byte soilTemperature(){ return readSensor(soilTemperatureQuery); }
// // byte conductivity()   { return readSensor(conductivityQuery); }

// // byte readSensor(const byte* command) {
// //     digitalWrite(DE, HIGH);
// //     digitalWrite(RE, HIGH);
// //     delay(10);

// //     mod.write(command, 8);
// //     digitalWrite(DE, LOW);
// //     digitalWrite(RE, LOW);
    
// //     byte values[7] = {0};
// //     delay(100);
// //     for (byte i = 0; i < 7; i++) {
// //         if (mod.available()) {
// //             values[i] = mod.read();
// //         }
// //     }
// //     return values[4]; // Extract the correct sensor value
// // }








// #include <SoftwareSerial.h>
// #include <Wire.h>
// #include <Adafruit_GFX.h>
// #include <Adafruit_SSD1306.h>

// #define SCREEN_WIDTH 128  
// #define SCREEN_HEIGHT 64  
// #define OLED_RESET -1     
// Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// #define RE 8
// #define DE 7

// // NPK sensor commands
// const byte nitro[] = {0x01, 0x03, 0x00, 0x1e, 0x00, 0x01, 0xe4, 0x0c};
// const byte phos[] = {0x01, 0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc};
// const byte pota[] = {0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};
// const byte moisture_cmd[] = {0x01, 0x03, 0x00, 0x21, 0x00, 0x01, 0x74, 0x0f};
// const byte temp_cmd[] = {0x01, 0x03, 0x00, 0x22, 0x00, 0x01, 0x44, 0x03};
// const byte ec_cmd[] = {0x01, 0x03, 0x00, 0x23, 0x00, 0x01, 0x35, 0xc3};
// const byte ph_cmd[] = {0x01, 0x03, 0x00, 0x24, 0x00, 0x01, 0x25, 0xcf};

// byte values[11];
// SoftwareSerial mod(2, 3);  

// void setup() {
//   Serial.begin(9600);
//   mod.begin(9600);
//   pinMode(RE, OUTPUT);
//   pinMode(DE, OUTPUT);
  
//   display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
//   delay(500);
//   display.clearDisplay();
//   display.setCursor(25, 15);
//   display.setTextSize(1);
//   display.setTextColor(WHITE);
//   display.println("NPK Sensor");
//   display.setCursor(25, 35);
//   display.setTextSize(1);
//   display.print("Initializing...");
//   display.display();
//   delay(3000);
// }

// void loop() {
//   byte val1, val2, val3, moisture, temp, ec;
//   float phValue;
  
//   val1 = readSensor(nitro);
//   delay(250);
//   val2 = readSensor(phos);
//   delay(250);
//   val3 = readSensor(pota);
//   delay(250);
//   moisture = readSensor(moisture_cmd);
//   delay(250);
//   temp = readSensor(temp_cmd);
//   delay(250);
//   ec = readSensor(ec_cmd);
//   delay(250);
//   phValue = readSensor(ph_cmd) / 10.0;

//   // Print sensor data to Serial Monitor
//   Serial.print("N:"); Serial.print(val1);
//   Serial.print(", P:"); Serial.print(val2);
//   Serial.print(", K:"); Serial.print(val3);
//   Serial.print(", Moisture:"); Serial.print(moisture); Serial.print("%");
//   Serial.print(", Temp:"); Serial.print(temp); Serial.print("C");
//   Serial.print(", EC:"); Serial.print(ec); Serial.print("uS/cm");
//   Serial.print(", pH:"); Serial.println(phValue);

//   delay(5000);

//   // Update OLED display
//   display.clearDisplay();
//   display.setTextSize(2);
//   display.setCursor(0, 5);
//   display.print("N: "); display.print(val1);
//   display.setTextSize(1);
//   display.print(" mg/kg");

//   display.setTextSize(2);
//   display.setCursor(0, 25);
//   display.print("P: "); display.print(val2);
//   display.setTextSize(1);
//   display.print(" mg/kg");

//   display.setTextSize(2);
//   display.setCursor(0, 45);
//   display.print("K: "); display.print(val3);
//   display.setTextSize(1);
//   display.print(" mg/kg");

//   display.setTextSize(1);
//   display.setCursor(0, 55);
//   display.print("Moist:"); display.print(moisture); display.print("%");

//   display.setCursor(60, 55);
//   display.print("Temp:"); display.print(temp); display.print("C");

//   display.setCursor(0, 65);
//   display.print("EC:"); display.print(ec); display.print("uS/cm");

//   display.setCursor(60, 65);
//   display.print("pH:"); display.print(phValue);

//   display.display();
// }

// byte readSensor(const byte *cmd) {
//   digitalWrite(DE, HIGH);
//   digitalWrite(RE, HIGH);
//   delay(10);
//   if (mod.write(cmd, 8) == 8) {
//     digitalWrite(DE, LOW);
//     digitalWrite(RE, LOW);
//     for (byte i = 0; i < 7; i++) {
//       values[i] = mod.read();
//     }
//   }
//   return values[4];
// }



#include <SoftwareSerial.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>

#define SCREEN_WIDTH 128    
#define SCREEN_HEIGHT 64    
#define OLED_RESET -1       
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define RE 8
#define DE 7

// NPK sensor commands
const byte nitro[] = {0x01, 0x03, 0x00, 0x1e, 0x00, 0x01, 0xe4, 0x0c};
const byte phos[] = {0x01, 0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc};
const byte pota[] = {0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};

byte values[11];
SoftwareSerial mod(2, 3);  

#define DHTPIN 4      
#define DHTTYPE DHT11 
DHT dht(DHTPIN, DHTTYPE);

#define MOISTURE_PIN A0  
#define PH_PIN A1         
#define EC_PIN A2        

void setup() {
  Serial.begin(9600);
  mod.begin(9600);
  pinMode(RE, OUTPUT);
  pinMode(DE, OUTPUT);
  
  // OLED display initialization
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setCursor(25, 15);
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.println("NPK Sensor");
  display.setCursor(25, 35);
  display.print("Initializing...");
  display.display();
  delay(3000);

  dht.begin();  
}

void loop() {
  byte val1, val2, val3;
  float temperature, humidity, moisture, phValue, ecValue;
  
  // Read NPK values
  val1 = nitrogen();  
  delay(250);
  val2 = phosphorous();
  delay(250);
  val3 = potassium();
  delay(250);

  // Read Temperature & Humidity
  temperature = dht.readTemperature();  
  humidity = dht.readHumidity();       

  if (isnan(temperature) || isnan(humidity)) {
    temperature = 0.0;
    humidity = 0.0;
  }

  // Read Soil Moisture
  moisture = analogRead(MOISTURE_PIN);  
  moisture = map(moisture, 0, 1023, 0, 100);

  // Read Soil pH
  phValue = analogRead(PH_PIN);  
  phValue = map(phValue, 0, 1023, 0, 14);

  // Read Electrical Conductivity (EC)
  ecValue = analogRead(EC_PIN);  
  ecValue = map(ecValue, 0, 1023, 0, 2000);  

  // Print all data to Serial Monitor
  Serial.print("N:");
  Serial.print(val1);
  Serial.print(", P:");
  Serial.print(val2);
  Serial.print(", K:");
  Serial.print(val3);
  Serial.print(", Moisture:");
  Serial.print(moisture);
  Serial.print("%, Temp:");
  Serial.print(temperature);
  Serial.print("C, EC:");
  Serial.print(ecValue);
  Serial.print("uS/cm, H:");
  Serial.print(humidity);
  Serial.print("%, pH:");
  Serial.println(phValue);

  delay(5000);  

  // Update OLED display
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0, 5);
  display.print("N: ");
  display.print(val1);
  display.setTextSize(1);
  display.print(" mg/kg");

  display.setTextSize(2);
  display.setCursor(0, 25);
  display.print("P: ");
  display.print(val2);
  display.setTextSize(1);
  display.print(" mg/kg");

  display.setTextSize(2);
  display.setCursor(0, 45);
  display.print("K: ");
  display.print(val3);
  display.setTextSize(1);
  display.print(" mg/kg");

  display.setCursor(0, 55);
  display.print("T:");
  display.print(temperature);
  display.print("C");

  display.setCursor(60, 55);
  display.print("H:");
  display.print(humidity);
  display.print("%");

  display.display();
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
