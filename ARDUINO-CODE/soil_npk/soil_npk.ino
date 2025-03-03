#include <SoftwareSerial.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>  // DHT sensor library for temperature and humidity


#define SCREEN_WIDTH 128    // OLED display width, in pixels
#define SCREEN_HEIGHT 64    // OLED display height, in pixels
#define OLED_RESET -1       // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define RE 8
#define DE 7

// NPK sensor commands
const byte nitro[] = {0x01, 0x03, 0x00, 0x1e, 0x00, 0x01, 0xe4, 0x0c};
const byte phos[] = {0x01, 0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc};
const byte pota[] = {0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};

byte values[11];
// SoftwareSerial espSerial(4, 5);
SoftwareSerial mod(2, 3);  // RX, TX pins for the sensor communication

#define DHTPIN 4      // DHT sensor pin
#define DHTTYPE DHT11 // Define the sensor type (DHT11 or DHT22)
DHT dht(DHTPIN, DHTTYPE);

#define MOISTURE_PIN A0  // Soil moisture sensor pin (analog)

void setup() {
  Serial.begin(9600);  // Serial monitor for debugging
  mod.begin(9600);     // Initialize software serial communication with the sensor
  pinMode(RE, OUTPUT);
  pinMode(DE, OUTPUT);
  
  // Initialize the OLED display
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C); // I2C address of the OLED
  delay(500);
  display.clearDisplay();
  display.setCursor(25, 15);
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.println(" NPK Sensor");
  display.setCursor(25, 35);
  display.setTextSize(1);
  display.print("Initializing");
  display.display();
  delay(3000);

  dht.begin();  // Initialize the DHT sensor
}

void loop() {
  byte val1, val2, val3;
  float temperature, humidity, moisture, phValue;
  
  // Read NPK values
  val1 = nitrogen();  // Get Nitrogen value
  delay(250);
  val2 = phosphorous();  // Get Phosphorus value
  delay(250);
  val3 = potassium();  // Get Potassium value
  delay(250);

  // Read other sensor values
  temperature = dht.readTemperature();  // Temperature in Celsius
  humidity = dht.readHumidity();       // Humidity in %
  moisture = analogRead(MOISTURE_PIN);  // Soil moisture value (0-1023)
  moisture = map(moisture, 0, 1023, 0, 100); // Convert to percentage (0-100%)
  phValue = analogRead(A1); // Soil pH sensor (analog pin A1)
  phValue = map(phValue, 0, 1023, 0, 14); // Map to pH scale (0-14)

  //Print all data to Serial Monitor
  Serial.print("N:");
  Serial.print(val1);
  Serial.print(",P:");
  Serial.print(val2);
  Serial.print(",K:");
  Serial.print(val3);
  Serial.print(",T:");
  Serial.print(temperature);
  Serial.print(",H:");
  Serial.print(humidity);
  Serial.print(",M:");
  Serial.print(moisture);
  Serial.print(",pH:");
  Serial.println(phValue);

  // espSerial.print("N:");
  // espSerial.print(val1);
  // espSerial.print(",P:");
  // espSerial.print(val2);
  // espSerial.print(",K:");
  // espSerial.print(val3);
  // espSerial.print(",T:");
  // espSerial.print(temperature);
  // espSerial.print(",H:");
  // espSerial.print(humidity);
  // espSerial.print(",M:");
  // espSerial.print(moisture);
  // espSerial.print(",pH:");
  // espSerial.println(phValue);


  delay(5000);  // Wait for 5 seconds before updating the display

  // Update OLED display with all the sensor values
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

  // Add additional sensor data to the display
  display.setTextSize(1);
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
  if (mod.write(nitro, sizeof(nitro)) == 8) {  // Send Nitrogen command
    digitalWrite(DE, LOW);
    digitalWrite(RE, LOW);
    for (byte i = 0; i < 7; i++) {
      values[i] = mod.read();  // Read response data
    }
  }
  return values[4];  // Return Nitrogen value from response
}

byte phosphorous() {
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(10);
  if (mod.write(phos, sizeof(phos)) == 8) {  // Send Phosphorus command
    digitalWrite(DE, LOW);
    digitalWrite(RE, LOW);
    for (byte i = 0; i < 7; i++) {
      values[i] = mod.read();  // Read response data
    }
  }
  return values[4];  // Return Phosphorus value from response
}

byte potassium() {
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(10);
  if (mod.write(pota, sizeof(pota)) == 8) {  // Send Potassium command
    digitalWrite(DE, LOW);
    digitalWrite(RE, LOW);
    for (byte i = 0; i < 7; i++) {
      values[i] = mod.read();  // Read response data
    }
  }
  return values[4];  // Return Potassium value from response
}





// #include <SoftwareSerial.h>
// #include <Wire.h>
// #include <Adafruit_GFX.h>
// #include <Adafruit_SSD1306.h>
// #include <DHT.h>
// #include <WiFi.h>
// #include <WebServer.h> // ESP32 Web Server Library

// // WiFi Credentials
// const char* ssid = "TAIY0'S Wifi";       // Replace with your WiFi SSID
// const char* password = "khyledenyse25"; // Replace with your WiFi password

// WebServer server(80); // HTTP Server on Port 80

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

// byte values[11];
// SoftwareSerial mod(2, 3);

// #define DHTPIN 4
// #define DHTTYPE DHT11
// DHT dht(DHTPIN, DHTTYPE);

// #define MOISTURE_PIN A0

// // Sensor values
// float temperature, humidity, moisture, phValue;
// byte val1, val2, val3;

// // Function to handle web requests
// void handleRoot() {
//   String page = "<html><body>";
//   page += "<h1>Sensor Data</h1>";
//   page += "<p><b>Nitrogen:</b> " + String(val1) + " mg/kg</p>";
//   page += "<p><b>Phosphorous:</b> " + String(val2) + " mg/kg</p>";
//   page += "<p><b>Potassium:</b> " + String(val3) + " mg/kg</p>";
//   page += "<p><b>Temperature:</b> " + String(temperature) + " °C</p>";
//   page += "<p><b>Humidity:</b> " + String(humidity) + " %</p>";
//   page += "<p><b>Moisture:</b> " + String(moisture) + " %</p>";
//   page += "<p><b>pH Level:</b> " + String(phValue) + "</p>";
//   page += "</body></html>";

//   server.send(200, "text/html", page);
// }

// void setup() {
//   Serial.begin(115200);
//   mod.begin(9600);
//   pinMode(RE, OUTPUT);
//   pinMode(DE, OUTPUT);
  
//   // Initialize OLED Display
//   display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
//   delay(500);
//   display.clearDisplay();
//   display.setCursor(25, 15);
//   display.setTextSize(1);
//   display.setTextColor(WHITE);
//   display.println("NPK Sensor");
//   display.setCursor(25, 35);
//   display.print("Initializing...");
//   display.display();
//   delay(3000);

//   dht.begin(); 

//   // Connect to WiFi
//   WiFi.begin(ssid, password);
//   Serial.print("Connecting to WiFi");
//   display.setCursor(25, 50);
//   display.print("WiFi Connecting...");
//   display.display();
  
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
  
//   Serial.println("\nConnected to WiFi!");
//   Serial.print("IP Address: ");
//   Serial.println(WiFi.localIP());

//   display.clearDisplay();
//   display.setCursor(10, 20);
//   display.print("WiFi Connected!");
//   display.setCursor(10, 40);
//   display.print(WiFi.localIP());
//   display.display();

//   // Start the web server
//   server.on("/", handleRoot);
//   server.begin();
// }

// void loop() {
//   server.handleClient();

//   val1 = nitrogen();
//   delay(250);
//   val2 = phosphorous();
//   delay(250);
//   val3 = potassium();
//   delay(250);

//   temperature = dht.readTemperature();
//   humidity = dht.readHumidity();
//   moisture = analogRead(MOISTURE_PIN);
//   moisture = map(moisture, 0, 1023, 0, 100);
  // phValue = analogRead(A1);
  // phValue = map(phValue, 0, 1023, 0, 14);

//   // Print sensor data to Serial Monitor
//   Serial.print("N:");
//   Serial.print(val1);
//   Serial.print(",P:");
//   Serial.print(val2);
//   Serial.print(",K:");
//   Serial.print(val3);
//   Serial.print(",T:");
//   Serial.print(temperature);
//   Serial.print(",H:");
//   Serial.print(humidity);
//   Serial.print(",M:");
//   Serial.print(moisture);
//   Serial.print(",pH:");
//   Serial.println(phValue);

//   // Update OLED Display
//   display.clearDisplay();
//   display.setTextSize(1);
//   display.setCursor(0, 5);
//   display.print("N: ");
//   display.print(val1);
//   display.print(" mg/kg");

//   display.setCursor(0, 15);
//   display.print("P: ");
//   display.print(val2);
//   display.print(" mg/kg");

//   display.setCursor(0, 25);
//   display.print("K: ");
//   display.print(val3);
//   display.print(" mg/kg");

//   display.setCursor(0, 35);
//   display.print("T: ");
//   display.print(temperature);
//   display.print("C");

//   display.setCursor(60, 35);
//   display.print("H: ");
//   display.print(humidity);
//   display.print("%");

//   display.setCursor(0, 45);
//   display.print("M: ");
//   display.print(moisture);
//   display.print("%");

//   display.setCursor(60, 45);
//   display.print("pH: ");
//   display.print(phValue);

//   display.display();
//   delay(5000);
// }

// byte nitrogen() {
//   digitalWrite(DE, HIGH);
//   digitalWrite(RE, HIGH);
//   delay(10);
//   if (mod.write(nitro, sizeof(nitro)) == 8) {  
//     digitalWrite(DE, LOW);
//     digitalWrite(RE, LOW);
//     for (byte i = 0; i < 7; i++) {
//       values[i] = mod.read();
//     }
//   }
//   return values[4];  
// }

// byte phosphorous() {
//   digitalWrite(DE, HIGH);
//   digitalWrite(RE, HIGH);
//   delay(10);
//   if (mod.write(phos, sizeof(phos)) == 8) {  
//     digitalWrite(DE, LOW);
//     digitalWrite(RE, LOW);
//     for (byte i = 0; i < 7; i++) {
//       values[i] = mod.read();
//     }
//   }
//   return values[4];  
// }

// byte potassium() {
//   digitalWrite(DE, HIGH);
//   digitalWrite(RE, HIGH);
//   delay(10);
//   if (mod.write(pota, sizeof(pota)) == 8) {  
//     digitalWrite(DE, LOW);
//     digitalWrite(RE, LOW);
//     for (byte i = 0; i < 7; i++) {
//       values[i] = mod.read();
//     }
//   }
//   return values[4];  
// }












// #include <SoftwareSerial.h>
// #include <Wire.h>
// #include <Adafruit_GFX.h>
// #include <Adafruit_SSD1306.h>
// // #include <WiFi.h> // Include for WiFi functionality, or use Ethernet.h if using Ethernet shield.

// #define SCREEN_WIDTH 128    // OLED display width, in pixels
// #define SCREEN_HEIGHT 64    // OLED display height, in pixels
// #define OLED_RESET -1       // Reset pin # (or -1 if sharing Arduino reset pin)
// Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// #define RE 8
// #define DE 7

// const byte nitro[] = {0x01,0x03, 0x00, 0x1e, 0x00, 0x01, 0xe4, 0x0c};
// const byte phos[] = {0x01,0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc};
// const byte pota[] = {0x01,0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};

// byte values[11];
// SoftwareSerial mod(2, 3);

// // // WiFi credentials
// // const char* ssid = "your-ssid";
// // const char* password = "your-password";
// // const char* serverUrl = "http://your-server-ip:3000/api/npk";  // Update to your server's API endpoint.

// WiFiClient client;

// void setup() {
//   Serial.begin(9600);
//   mod.begin(9600);
//   pinMode(RE, OUTPUT);
//   pinMode(DE, OUTPUT);
  
//   // Initialize OLED display
//   display.begin(SSD1306_SWITCHCAPVCC, 0x3C); 
//   delay(500);
//   display.clearDisplay();
//   display.setCursor(25, 15);
//   display.setTextSize(1);
//   display.setTextColor(WHITE);
//   display.println(" NPK Sensor");
//   display.setCursor(25, 35);
//   display.setTextSize(1);
//   display.print("Initializing");
//   display.display();
//   delay(3000);

//   // // Connect to WiFi
//   // WiFi.begin(ssid, password);
//   // while (WiFi.status() != WL_CONNECTED) {
//   //   delay(1000);
//   //   Serial.println("Connecting to WiFi...");
//   // }
//   // Serial.println("Connected to WiFi");
// }

// void loop() {
//   byte val1, val2, val3;
//   val1 = nitrogen();
//   delay(250);
//   val2 = phosphorous();
//   delay(250);
//   val3 = potassium();
//   delay(250);

//   // // Print values to Serial Monitor
//   // Serial.print("Nitrogen: ");
//   // Serial.print(val1);
//   // Serial.println(" mg/kg");
//   // Serial.print("Phosphorous: ");
//   // Serial.print(val2);
//   // Serial.println(" mg/kg");
//   // Serial.print("Potassium: ");
//   // Serial.print(val3);
//   // Serial.println(" mg/kg");

//   // Send formatted data via Serial (e.g., "N:20,P:15,K:30")
//   Serial.print("N:");
//   Serial.print(val1);
//   Serial.print(",P:");
//   Serial.print(val2);
//   Serial.print(",K:");
//   Serial.println(val3);

//   // Send data to the server
//   // sendDataToServer(val1, val2, val3);

//   delay(5000); // Send data every 5 seconds

//   // Update OLED display
//   display.clearDisplay();
//   display.setTextSize(2);
//   display.setCursor(0, 5);
//   display.print("N: ");
//   display.print(val1);
//   display.setTextSize(1);
//   display.print(" mg/kg");
 
//   display.setTextSize(2);
//   display.setCursor(0, 25);
//   display.print("P: ");
//   display.print(val2);
//   display.setTextSize(1);
//   display.print(" mg/kg");
 
//   display.setTextSize(2);
//   display.setCursor(0, 45);
//   display.print("K: ");
//   display.print(val3);
//   display.setTextSize(1);
//   display.print(" mg/kg");
 
//   display.display();
// }

// byte nitrogen(){
//   digitalWrite(DE, HIGH);
//   digitalWrite(RE, HIGH);
//   delay(10);
//   if (mod.write(nitro, sizeof(nitro)) == 8) {
//     digitalWrite(DE, LOW);
//     digitalWrite(RE, LOW);
//     Serial.println("Received data: ");
//     for (byte i = 0; i < 7; i++) {
//       values[i] = mod.read();
//       Serial.print(values[i], HEX);
//     }
//   }
//   return values[4];
// }

// byte phosphorous(){
//   digitalWrite(DE, HIGH);
//   digitalWrite(RE, HIGH);
//   delay(10);
//   if (mod.write(phos, sizeof(phos)) == 8) {
//     digitalWrite(DE, LOW);
//     digitalWrite(RE, LOW);
//     Serial.println("Received data: ");
//     for (byte i = 0; i < 7; i++) {
//       values[i] = mod.read();
//       Serial.print(values[i], HEX);
//     }
//   }
//   return values[4];
// }

// byte potassium(){
//   digitalWrite(DE, HIGH);
//   digitalWrite(RE, HIGH);
//   delay(10);
//   if (mod.write(pota, sizeof(pota)) == 8) {
//     digitalWrite(DE, LOW);
//     digitalWrite(RE, LOW);
//     Serial.println("Received data: ");
//     for (byte i = 0; i < 7; i++) {
//       values[i] = mod.read();
//       Serial.print(values[i], HEX);
//     }
//   }
//   return values[4];
// }

// void sendDataToServer(byte nitrogenValue, byte phosphorousValue, byte potassiumValue) {
//   if (client.connect(serverUrl, 80)) {
//     // Prepare the JSON data to send
//     String postData = "{\"nitrogen\": " + String(nitrogenValue) + 
//                       ", \"phosphorous\": " + String(phosphorousValue) +
//                       ", \"potassium\": " + String(potassiumValue) + "}";

//     client.println("POST /api/npk HTTP/1.1");
//     client.println("Host: your-server-ip");
//     client.println("Content-Type: application/json");
//     client.print("Content-Length: ");
//     client.println(postData.length());
//     client.println();
//     client.print(postData);

//     // Wait for server response
//     delay(200);
//     client.stop();
//   } else {
//     Serial.println("Connection failed.");
//   }
// }
