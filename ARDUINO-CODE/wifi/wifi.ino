// #include <ESP8266WiFi.h>
// #include <ESP8266HTTPClient.h>

// const char* ssid = "HUAWEI-B525-A4E9";
// const char* password = "DHF5H5R4JB0";
// const char* serverUrl = "http://192.168.8.186:8080/api/npk/add";

// WiFiClient client;
// String receivedData = "";

// void setup() {
//     Serial.begin(115200);
//     WiFi.begin(ssid, password);
    
//     Serial.print("Connecting to WiFi");
//     while (WiFi.status() != WL_CONNECTED) {
//         delay(500);
//         Serial.print(".");
//     }

//     Serial.println("\nWiFi Connected!");
//     Serial.print("IP Address: ");
//     Serial.println(WiFi.localIP());
// }

// void loop() {
//     if (Serial.available()) {
//         receivedData = Serial.readStringUntil('\n');
//         receivedData.trim();
        
//         if (receivedData.length() > 0) {
//             Serial.println("Received from Nano: " + receivedData);
//             sendDataToServer(receivedData);
//         }
//     }
// }

// void sendDataToServer(String npkData) {
//     if (WiFi.status() == WL_CONNECTED) {
//         HTTPClient http;
//         http.begin(client, serverUrl);
//         http.addHeader("Content-Type", "application/json");
        
//         String jsonData = "{";
//         jsonData += "\"data\":\"" + npkData + "\"";
//         jsonData += "}";

//         int httpResponseCode = http.POST(jsonData);
        
//         Serial.print("Server Response: ");
//         Serial.println(httpResponseCode);
        
//         http.end();
//     } else {
//         Serial.println("WiFi Disconnected!");
//     }
// }











#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "HUAWEI-B525-A4E9";
const char* password = "DHF5H5R4JB0";
const char* serverUrl = "http://192.168.8.186:8080/api/npk/add";

void setup() {
    Serial.begin(115200); 
    Serial2.begin(9600, SERIAL_8N1, 16, 17); // RX = 16, TX = 17

    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("\nWiFi Connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
}

void loop() {
    if (Serial2.available()) {
        String receivedData = Serial2.readStringUntil('\n');
        receivedData.trim();
        
        if (receivedData.length() > 0) {
            Serial.println("Received from Nano: " + receivedData);
            sendDataToServer(receivedData);
        }
    }
}

void sendDataToServer(String npkData) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");

        int httpResponseCode = http.POST(npkData);

        Serial.print("Server Response: ");
        Serial.println(httpResponseCode);

        http.end();
    } else {
        Serial.println("WiFi Disconnected!");
    }
}
