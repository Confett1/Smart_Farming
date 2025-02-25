#include <WiFi.h>

// WiFi Credentials
const char* ssid = "HUAWEI-B525-A4E9";
const char* password = "DHF5H5R4JB0";

WiFiServer server(80);
String data = "";  // Store incoming data from Arduino Nano

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");
  Serial.print("IP Address: ");
  Serial.print(WiFi.localIP());
  Serial.println();
  server.begin();
}

void loop() {
  WiFiClient client = server.available();

  if (Serial.available()) {
    data = Serial.readStringUntil('\n');
    Serial.println("Received Data: " + data);
  }

  if (client) {
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println("Connection: close");
    client.println();
    client.println("<h1>Smart Farming Data</h1>");
    
    if (data.length() > 0) {
      String values[7];
      int index = 0;
      for (int i = 0; i < data.length(); i++) {
        if (data[i] == ',') {
          index++;
        } else {
          values[index] += data[i];
        }
      }

      client.printf("<p>Nitrogen: %s mg/kg</p>", values[0].c_str());
      client.printf("<p>Phosphorus: %s mg/kg</p>", values[1].c_str());
      client.printf("<p>Potassium: %s mg/kg</p>", values[2].c_str());
      client.printf("<p>Temperature: %s C</p>", values[3].c_str());
      client.printf("<p>Humidity: %s%%</p>", values[4].c_str());
      client.printf("<p>Moisture: %s%%</p>", values[5].c_str());
      client.printf("<p>pH: %s</p>", values[6].c_str());
    }
    client.println();
    delay(10);
    client.stop();
  }
}