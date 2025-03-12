// // // this work 
// // #include <WiFi.h>
// // #include <WebServer.h>
// // #include <DNSServer.h>
// // #include <HTTPClient.h>

// // const char *ssid = "SMART-FARMING-ESP32";
// // const char *password = "smartfarming";
// // const char* serverUrl = "http://10.0.23.158:8080/api/npk/add";

// // const char *ssid_sta = "Zion Piso Wifi"; // Change to your router's Wi-Fi

// // IPAddress apIP(192, 168, 4, 1);
// // IPAddress gateway(192, 168, 4, 1);
// // IPAddress subnet(255, 255, 255, 0);

// // DNSServer dnsServer;
// // WebServer server(80);

// // const byte DNS_PORT = 53;

// // // Sensor data placeholders
// // String NPK = "-";
// // String nitrogen = "-";
// // String phosphorous = "-";
// // String potassium = "-";
// // String pH = "-";
// // String temperature = "-";
// // String humidity = "-";
// // String moisture = "-";
// // String ecValue = "-";

// // String html_page;

// // void generatePage() {
// //   html_page = R"rawliteral(
// //     <!DOCTYPE html><html><head><title>Smart Farming</title>
// //     <style>body{font-family:Arial;text-align:center;padding:20px;}table{margin:auto;}</style>
// //     <script>
// //     function fetchData() {
// //       fetch('/data')
// //         .then(response => response.json())
// //         .then(data => {
// //           document.getElementById('npk').innerText = data.NPK;
// //           document.getElementById('ph').innerText = data.pH;
// //           document.getElementById('temp').innerText = data.temperature + " °C";
// //           document.getElementById('humidity').innerText = data.humidity + " %";
// //           document.getElementById('moisture').innerText = data.moisture;
// //           document.getElementById('ec').innerText = data.ecValue;
// //         });
// //     }
// //     setInterval(fetchData, 2000); // Update every 2 seconds
// //     </script>
// //     </head><body>
// //     <h1>Smart Farming Data</h1>
// //     <table border='1'>
// //       <tr><th>Sensor</th><th>Value</th></tr>
// //       <tr><td>NPK</td><td id="npk">-</td></tr>
// //       <tr><td>pH</td><td id="ph">-</td></tr>
// //       <tr><td>Temperature</td><td id="temp">-</td></tr>
// //       <tr><td>Humidity</td><td id="humidity">-</td></tr>
// //       <tr><td>Soil Moisture</td><td id="moisture">-</td></tr>
// //       <tr><td>EC</td><td id="ec">-</td></tr>
// //     </table>
// //     </body></html>
// //   )rawliteral";
// // }

// // void handleRoot() {
// //   generatePage();
// //   server.send(200, "text/html", html_page);
// // }

// // void handleData() {
// //   String json = "{";
// //   json += "\"NPK\":\"" + NPK + "\",";
// //   json += "\"pH\":\"" + pH + "\",";
// //   json += "\"temperature\":\"" + temperature + "\",";
// //   json += "\"humidity\":\"" + humidity + "\",";
// //   json += "\"moisture\":\"" + moisture + "\",";
// //   json += "\"ecValue\":\"" + ecValue + "\"";
// //   json += "}";
// //   server.send(200, "application/json", json);
// // }

// // void setup() {
// //   Serial.begin(9600);
// //   Serial2.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17
  
// //   WiFi.softAPConfig(apIP, gateway, subnet);
// //   WiFi.softAP(ssid, password);
// //   dnsServer.start(DNS_PORT, "*", apIP);

// //    // Connect to Router (STA mode)
// //     WiFi.begin(ssid_sta);
// //     Serial.print("Connecting to Wi-Fi");
// //     while (WiFi.status() != WL_CONNECTED) {
// //         delay(500);
// //         Serial.print(".");
// //     }
  
// //   server.on("/", handleRoot);
// //   server.on("/data", handleData);  // JSON endpoint
// //   server.onNotFound(handleRoot);
// //   server.begin();

// //   Serial.println("✅ ESP32 Wi-Fi Server with AJAX Started");
// //   Serial.println(WiFi.softAPIP());
// // }

// // void sendDataToServer() {
// //     if (WiFi.status() == WL_CONNECTED) {
// //         HTTPClient http;
// //         http.begin(serverUrl);
// //         http.addHeader("Content-Type", "application/json");

// //         String jsonData = "{\"n\":\"" + nitrogen + "\",\"p\":\"" + phosphorous + "\",\"k\":\"" + potassium +  "\",\"temperature\":\"" + temperature + "\",\"humidity\":\"" + humidity + "\"}";

// //         int httpResponseCode = http.POST(jsonData);
// //         if (httpResponseCode > 0) {
// //             Serial.println("Data sent successfully: " + jsonData);
// //             String response = http.getString();
// //             Serial.println("Server response: " + response);
// //         } else {
// //             Serial.print("Error sending data: ");
// //             Serial.println(httpResponseCode);
// //         }
// //         http.end();
// //     } else {
// //         Serial.println("Wi-Fi Disconnected");
// //     }
// // }

// // void loop() {
// //   dnsServer.processNextRequest();
// //   server.handleClient();

// //   if (Serial2.available()) {
// //     String data = Serial2.readStringUntil('\n');
// //     data.trim();
// //     if (data.length() > 0) {
// //       Serial.println("Received: " + data);
// //       parseData(data);
// //     }
// //   }

// //   sendDataToServer();
// //   delay(5000);
// // }

// // void parseData(String data) {
// //   int nIndex = data.indexOf("N:") + 2;
// //   int pIndex = data.indexOf("P:") + 2;
// //   int kIndex = data.indexOf("K:") + 2;
// //   int moistureIndex = data.indexOf("Moisture:") + 9;
// //   int tempIndex = data.indexOf("Temp:") + 5;
// //   int ecIndex = data.indexOf("EC:") + 3;
// //   int humidityIndex = data.indexOf("Humidity:") + 9;
// //   int phIndex = data.indexOf("pH:") + 3;

// //   int n = data.substring(nIndex, data.indexOf(",", nIndex)).toInt();
// //   int p = data.substring(pIndex, data.indexOf(",", pIndex)).toInt();
// //   int k = data.substring(kIndex, data.indexOf(",", kIndex)).toInt();
// //   float moistureVal = data.substring(moistureIndex, data.indexOf(",", moistureIndex)).toFloat();
// //   float tempVal = data.substring(tempIndex, data.indexOf(",", tempIndex)).toFloat();
// //   float ecVal = data.substring(ecIndex, data.indexOf(",", ecIndex)).toFloat();
// //   float humidityVal = data.substring(humidityIndex, data.indexOf(",", humidityIndex)).toFloat();
// //   float phVal = data.substring(phIndex).toFloat();

// //   NPK = String(n) + "-" + String(p) + "-" + String(k);
// //   nitrogen = String(n);
// //   phosphorous = String(p);
// //   potassium = String(k);
// //   moisture = String(moistureVal);
// //   temperature = String(tempVal);
// //   ecValue = String(ecVal);
// //   humidity = String(humidityVal);
// //   pH = String(phVal);
// // }










// // #include <WiFi.h>
// // #include <WebServer.h>
// // #include <DNSServer.h>

// // const char *ssid = "SMART-FARMING-ESP32";
// // const char *password = "smartfarming";

// // IPAddress apIP(192, 168, 4, 1);
// // IPAddress gateway(192, 168, 4, 1);
// // IPAddress subnet(255, 255, 255, 0);

// // DNSServer dnsServer;
// // WebServer server(80);

// // const byte DNS_PORT = 53;

// // String NPK = "-";
// // String pH = "-";
// // String temperature = "-";
// // String humidity = "-";
// // String moisture = "-";
// // String ecValue = "-";

// // String html_page;

// // void generatePage() {
// //   html_page = R"rawliteral(
// //     <!DOCTYPE html>
// //     <html>
// //     <head>
// //       <title>Smart Farming Dashboard</title>
// //       <style>
// //         body { font-family: Arial; text-align: center; padding: 20px; }
// //         table { margin: auto; border-collapse: collapse; width: 80%; }
// //         th, td { border: 1px solid #ddd; padding: 8px; }
// //         iframe { width: 100%; max-width: 640px; height: 480px; }
// //       </style>
// //       <script>
// //       function fetchData() {
// //         fetch('/data')
// //           .then(response => response.json())
// //           .then(data => {
// //             document.getElementById('npk').innerText = data.NPK;
// //             document.getElementById('ph').innerText = data.pH;
// //             document.getElementById('temp').innerText = data.temperature + " °C";
// //             document.getElementById('humidity').innerText = data.humidity + " %";
// //             document.getElementById('moisture').innerText = data.moisture;
// //             document.getElementById('ec').innerText = data.ecValue;
// //           });
// //       }
// //       setInterval(fetchData, 2000);
// //       </script>
// //     </head>
// //     <body>
// //       <h1>Smart Farming Dashboard</h1>
// //       <h2>Live Farm Monitoring</h2>
// //       <iframe src="http://192.168.4.2" frameborder="0"></iframe>

// //       <h2>Sensor Data</h2>
// //       <table>
// //         <tr><th>Sensor</th><th>Value</th></tr>
// //         <tr><td>NPK</td><td id="npk">-</td></tr>
// //         <tr><td>pH</td><td id="ph">-</td></tr>
// //         <tr><td>Temperature</td><td id="temp">-</td></tr>
// //         <tr><td>Humidity</td><td id="humidity">-</td></tr>
// //         <tr><td>Soil Moisture</td><td id="moisture">-</td></tr>
// //         <tr><td>EC</td><td id="ec">-</td></tr>
// //       </table>
// //     </body>
// //     </html>
// //   )rawliteral";
// // }

// // void handleRoot() {
// //   generatePage();
// //   server.send(200, "text/html", html_page);
// // }

// // void handleData() {
// //   String json = "{";
// //   json += "\"NPK\":\"" + NPK + "\",";
// //   json += "\"pH\":\"" + pH + "\",";
// //   json += "\"temperature\":\"" + temperature + "\",";
// //   json += "\"humidity\":\"" + humidity + "\",";
// //   json += "\"moisture\":\"" + moisture + "\",";
// //   json += "\"ecValue\":\"" + ecValue + "\"";
// //   json += "}";
// //   server.send(200, "application/json", json);
// // }

// // void setup() {
// //   Serial.begin(9600);
// //   Serial2.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17

// //   WiFi.softAPConfig(apIP, gateway, subnet);
// //   WiFi.softAP(ssid, password);
// //   dnsServer.start(DNS_PORT, "*", apIP);

// //   server.on("/", handleRoot);
// //   server.on("/data", handleData);
// //   server.onNotFound(handleRoot);
// //   server.begin();

// //   Serial.println("✅ ESP32 Wi-Fi Server started");
// //   Serial.println(WiFi.softAPIP());
// // }

// // void parseData(String data) {
// //   int nIndex = data.indexOf("N:") + 2;
// //   int pIndex = data.indexOf("P:") + 2;
// //   int kIndex = data.indexOf("K:") + 2;
// //   int moistureIndex = data.indexOf("Moisture:") + 9;
// //   int tempIndex = data.indexOf("Temp:") + 5;
// //   int ecIndex = data.indexOf("EC:") + 3;
// //   int humidityIndex = data.indexOf("Humidity:") + 9;
// //   int phIndex = data.indexOf("pH:") + 3;

// //   int n = data.substring(nIndex, data.indexOf(",", nIndex)).toInt();
// //   int p = data.substring(pIndex, data.indexOf(",", pIndex)).toInt();
// //   int k = data.substring(kIndex, data.indexOf(",", kIndex)).toInt();
// //   float moistureVal = data.substring(moistureIndex, data.indexOf(",", moistureIndex)).toFloat();
// //   float tempVal = data.substring(tempIndex, data.indexOf(",", tempIndex)).toFloat();
// //   float ecVal = data.substring(ecIndex, data.indexOf(",", ecIndex)).toFloat();
// //   float humidityVal = data.substring(humidityIndex, data.indexOf(",", humidityIndex)).toFloat();
// //   float phVal = data.substring(phIndex).toFloat();

// //   NPK = String(n) + "-" + String(p) + "-" + String(k);
// //   moisture = String(moistureVal);
// //   temperature = String(tempVal);
// //   ecValue = String(ecVal);
// //   humidity = String(humidityVal);
// //   pH = String(phVal);
// // }

// // void loop() {
// //   dnsServer.processNextRequest();
// //   server.handleClient();

// //   if (Serial2.available()) {
// //     String data = Serial2.readStringUntil('\n');
// //     data.trim();
// //     if (data.length() > 0) {
// //       Serial.println("Received: " + data);
// //       parseData(data);
// //     }
// //   }
// // }































#include <WiFi.h>
#include <WebServer.h>
#include <DNSServer.h>
#include <HTTPClient.h>

const char *ssid = "SMART-FARMING-ESP32";
const char *password = "smartfarming";
const char* serverUrl = "http://192.168.8.100:8080/api/npk/add";

// const char *ssid_sta = "Zion Piso Wifi";

const char *ssid_sta = "HUAWEI-B525-A4E9";
const char *pass_sta = "DHF5H5R4JB0";

IPAddress apIP(192, 168, 4, 1);
IPAddress gateway(192, 168, 4, 1);
IPAddress subnet(255, 255, 255, 0);

DNSServer dnsServer;
WebServer server(80);

const byte DNS_PORT = 53;

// Sensor data placeholders
String NPK = "-";
String nitrogen = "-";
String phosphorous = "-";
String potassium = "-";
String pH = "-";
String temperature = "-";
String humidity = "-";
String moisture = "-";
String ecValue = "-";

String html_page;

void generatePage() {
  html_page = R"rawliteral(
    <!DOCTYPE html><html><head>
    <title>Smart Farming Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Geologica:wght@100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        *,
        *::after,
        *::before {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        :root {
            --dark-color: #000;
            --tree-trunk-color: #5a3825;
            --tree-leaf-color: #1a6e32;
            --tree-leaf-highlight: #25a048;
            --primary-color: #23f0ff;
            --secondary-color: #1eaf4a;
            --nitrogen-color: #4287f5;
            --phosphorous-color: #f54242;
            --potassium-color: #42f59e;
            --temperature-color: #ff7b00;
            --humidity-color: #00a2ff;
            --moisture-color: #0044ff;
        }

        /* Loading Screen */
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--dark-color);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
        }

        .loading-screen.hidden {
            opacity: 0;
            visibility: hidden;
        }

        .loading-title {
            color: white;
            font-family: "Dancing Script", cursive;
            font-size: 3rem;
            margin-bottom: 2rem;
            text-shadow: 0 0 10px rgba(44, 238, 252, 0.8);
        }

        .spinner {
            width: 60px;
            height: 60px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: var(--primary-color);
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            min-height: 100vh;
            background-color: var(--dark-color);
            overflow-x: hidden;
            perspective: 1000px;
            font-family: 'Lato', sans-serif;
            opacity: 0;
            transition: opacity 1s ease-in;
        }

        body.loaded {
            opacity: 1;
        }

        .night {
            position: fixed;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            width: 100%;
            height: 100%;
            filter: blur(0.1vmin);
            background-image: radial-gradient(ellipse at top, transparent 0%, var(--dark-color)), 
            radial-gradient(ellipse at bottom, var(--dark-color), rgba(145, 233, 255, 0.2)), 
            repeating-linear-gradient(220deg, black 0px, black 19px, transparent 19px, transparent 22px), 
            repeating-linear-gradient(189deg, black 0px, black 19px, transparent 19px, transparent 22px), 
            repeating-linear-gradient(148deg, black 0px, black 19px, transparent 19px, transparent 22px), 
            linear-gradient(90deg, #00fffa, #f0f0f0);
        }

        /* Smart Farming Title */
        .title {
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 10vmin;
            font-weight: bold;
            text-align: center;
            opacity: 0;
            z-index: 1000;
            text-shadow: 0 0 10px rgba(44, 238, 252, 0.8);
            animation: title-fade-in 2s 1s forwards, title-fade-out 2s 5s forwards;
            letter-spacing: 0.1vmin;
            font-family: "Dancing Script", cursive;
        }

        @keyframes title-fade-in {
            from {
                opacity: 0;
                transform: translate(-50%, -30%);
            }

            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }

        @keyframes title-fade-out {
            from {
                opacity: 1;
                transform: translate(-50%, -50%);
            }

            to {
                opacity: 0;
                transform: translate(-50%, -70%);
            }
        }

        /* Header */
        .header-title {
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            padding: 10px 10px 10px 20px;
            font-size: 10px;
            color: white;
            font-family: "Lato", sans-serif;
            opacity: 0;
            z-index: 1000;
            animation: header-transition 2s 6s forwards;
        }

        .header-title h1 {
            font-size: 1.5rem;
        }

        /* Main Content */
        .main-content {
            position: relative;
            z-index: 100;
            width: 100%;
            overflow: auto;
            height: 100vh;
            padding-top: 60px; /* Space for fixed header */
        }

        /* Grid table */
        .container {
            width: 100%;
            height: 100%;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .grid-1 {
            width: 100%;
            max-width: 90%;
            margin-bottom: 20px;
            color: white;
            font-family: "Lato", sans-serif;
            opacity: 0;
            animation: table-fade-in 2s 6s forwards;
        }

        .grid-1 h1 {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }

        /* Grid table */
        .grid {
            width: 100%;
            max-width: 90%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 20px;
        }

        /* Tablet: 2 columns */
        @media (max-width: 1024px) {
            .grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        /* Mobile: 1 column */
        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
            }
            
            .title {
                font-size: 8vmin;
            }
            
            .header-title h1 {
                font-size: 1.2rem;
            }
        }

        /* Nutrient Table */
        .nutrient-table {
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 8px;
            padding: 20px;
            color: white;
            font-family: "Lato", sans-serif;
            opacity: 0;
            z-index: 1000;
            animation: table-fade-in 2s 6s forwards;
            box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
            border: 1px solid rgba(44, 238, 252, 0.3);
        }

        /* Water Tank */
        .water-tank {
            opacity: 0;
            height: 300px;
            box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
            border: 1px solid rgba(44, 238, 252, 0.3);
            border-radius: 8px;
            position: relative;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.7);
            animation: table-fade-in 2s 6s forwards;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .water-tank h1 {
            margin-bottom: 20px;
            font-size: 18px;
            color: white;
            font-weight: 700;
            text-align: left;
            width: 100%;
        }

        .water-container {
            width: 100%;
            height: 200px;
            position: relative;
            background: linear-gradient(to bottom, #0a3b5c, #0d5c8c);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .water-level {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 0%;
            background: linear-gradient(to bottom, rgba(0, 204, 255, 0.3), rgba(0, 68, 255, 0.8));
            transition: height 1s ease-in-out;
        }

        .water-value {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
        }

        .water-marks {
            position: absolute;
            right: 0;
            height: 100%;
            width: 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10px 0;
        }

        .water-mark {
            position: relative;
            width: 100%;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.5);
        }

        .water-mark::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            width: 10px;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.8);
        }

        .water-mark-label {
            position: absolute;
            right: 15px;
            color: white;
            font-size: 12px;
            transform: translateY(-50%);
        }

        .water-mark-label.level-100 {
            top: 10px;
        }

        .water-mark-label.level-75 {
            top: 25%;
        }

        .water-mark-label.level-50 {
            top: 50%;
        }

        .water-mark-label.level-25 {
            top: 75%;
        }

        .water-mark-label.level-0 {
            bottom: 10px;
        }

        /* Soil Moisture */
        .soil-moisture {
            opacity: 0;
            height: 300px;
            box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
            border: 1px solid rgba(44, 238, 252, 0.3);
            border-radius: 8px;
            position: relative;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.7);
            animation: table-fade-in 2s 6s forwards;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .soil-moisture h1 {
            margin-bottom: 20px;
            font-size: 18px;
            color: white;
            font-weight: 700;
            text-align: left;
            width: 100%;
        }

        .moisture-container {
            width: 100%;
            height: 200px;
            position: relative;
            background: linear-gradient(to bottom, #6b3d1a, #8b5a2b);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .moisture-level {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 0%;
            background: linear-gradient(to bottom, rgba(0, 68, 255, 0.3), rgba(0, 68, 255, 0.8));
            transition: height 1s ease-in-out;
        }

        .moisture-value {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
        }

        /* Temperature and Humidity */
        .climate-container {
            opacity: 0;
            min-height: 300px;
            height: auto;
            box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
            border: 1px solid rgba(44, 238, 252, 0.3);
            border-radius: 8px;
            position: relative;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.7);
            animation: table-fade-in 2s 6s forwards;
            display: flex;
            flex-direction: column;
            padding: 20px;
        }

        .climate-container h1 {
            margin-bottom: 20px;
            font-size: 18px;
            color: white;
            font-weight: 700;
        }

        .gauges {
            display: flex;
            justify-content: space-around;
            height: 100%;
            flex-wrap: wrap;
        }

        .gauge {
            position: relative;
            width: 45%;
            height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        @media (max-width: 480px) {
            .gauge {
                width: 100%;
                margin-bottom: 20px;
            }
        }

        .gauge-title {
            color: white;
            margin-bottom: 10px;
            font-size: 16px;
        }

        .gauge-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .gauge-fill {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50%;
            transition: transform 1s ease-in-out;
            transform-origin: center bottom;
        }

        .temperature-fill {
            background: linear-gradient(to top, #ff0000, #ff7b00);
        }

        .humidity-fill {
            background: linear-gradient(to top, #0044ff, #00a2ff);
        }

        .gauge-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .gauge-marks {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .gauge-mark {
            position: absolute;
            width: 2px;
            height: 10px;
            background-color: rgba(255, 255, 255, 0.5);
            transform-origin: center 75px;
        }

        /* Nutrient Graph */
        .nutrient-graph {
            opacity: 0;
            height: 300px;
            box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
            border: 1px solid rgba(44, 238, 252, 0.3);
            border-radius: 8px;
            position: relative;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.7);
            animation: table-fade-in 2s 6s forwards;
            display: flex;
            flex-direction: column;
            padding: 20px;
        }

        .nutrient-graph h1 {
            margin-bottom: 10px;
            font-size: 18px;
            color: white;
            font-weight: 700;
        }

        .graph-container {
            position: relative;
            width: 95%;
            height: 200px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            border-left: 1px solid rgba(255, 255, 255, 0.3);
            margin-top: 20px;
            margin-left: 15px;
        }

        .graph-y-axis {
            position: absolute;
            left: -5px;
            top: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .graph-y-label {
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            transform: translateX(-100%);
            margin-left: 0px;
            text-align: right;
        }

        .graph-x-axis {
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .graph-x-label {
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            transform: translateY(100%);
            margin-top: 5px;
        }

        .graph-line {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            fill: none;
            stroke-width: 2;
        }

        .graph-legend {
            display: flex;
            justify-content: center;
            margin-top: 30px;
            flex-wrap: wrap;
        }

        .legend-item {
            display: flex;
            align-items: center;
            margin: 0 10px 5px 10px;
        }

        .legend-color {
            width: 15px;
            height: 15px;
            margin-right: 5px;
            border-radius: 3px;
        }

        .legend-text {
            color: white;
            font-size: 12px;
        }

        .nitrogen-color {
            background-color: var(--nitrogen-color);
        }

        .phosphorous-color {
            background-color: var(--phosphorous-color);
        }

        .potassium-color {
            background-color: var(--potassium-color);
        }

        @keyframes table-fade-in {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes header-transition {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        .nutrient-table table {
            border-collapse: collapse;
            width: 100%;
        }

        .nutrient-table th,
        .nutrient-table td {
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nutrient-table th {
            background-color: rgba(26, 110, 50, 0.6);
            color: white;
        }

        .nutrient-table tr:nth-child(even) {
            background-color: rgba(255, 255, 255, 0.05);
        }

        .nutrient-table tr:hover {
            background-color: rgba(44, 238, 252, 0.1);
        }

        .nutrient-level {
            display: inline-block;
            width: 80px;
            height: 10px;
            background-color: #333;
            border-radius: 5px;
            overflow: hidden;
        }

        .nutrient-level-fill {
            height: 100%;
            background: linear-gradient(to right, #23f0ff, #1eaf4a);
        }

        .high {
            width: 90%;
        }

        .medium {
            width: 60%;
        }

        .low {
            width: 30%;
        }

        /* Control Panel Styles */
        .control-panel {
            width: 100%;
            max-width: 90%;
            opacity: 0;
            box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
            border: 1px solid rgba(44, 238, 252, 0.3);
            border-radius: 8px;
            background-color: rgba(0, 0, 0, 0.7);
            animation: table-fade-in 2s 6s forwards;
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
        }

        .panel-header {
            background-color: rgba(26, 110, 50, 0.6);
            padding: 15px;
            border-bottom: 1px solid rgba(44, 238, 252, 0.3);
        }

        .panel-header h2 {
            font-size: 18px;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            color: white;
        }

        .panel-header h2 svg {
            margin-right: 10px;
            color: white;
        }

        .panel-header p {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
        }

        .panel-content {
            padding: 20px;
        }

        /* Tabs */
        .tabs {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 20px;
        }

        .tab {
            padding: 10px 20px;
            cursor: pointer;
            background-color: transparent;
            color: white;
            border: none;
            border-bottom: 2px solid transparent;
            transition: all 0.3s;
            text-align: center;
        }

        .tab.active {
            border-bottom: 2px solid var(--primary-color);
            background-color: rgba(26, 110, 50, 0.3);
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        /* Nutrient Controls */
        .nutrient-control {
            margin-bottom: 25px;
        }

        .nutrient-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .nutrient-name {
            display: flex;
            align-items: center;
            font-weight: bold;
            color: white;
        }

        .nutrient-name span {
            padding-left: 7px;
        }

        .nutrient-icon {
            margin-right: 8px;
        }

        .nutrient-value {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
        }

        .slider-container {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 10px;
        }

        .slider {
            flex: 1;
            -webkit-appearance: none;
            height: 8px;
            background: #333;
            border-radius: 4px;
            outline: none;
            width: 100%;
        }

        .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--primary-color);
            cursor: pointer;
        }

        .slider::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--primary-color);
            cursor: pointer;
            border: none;
        }

        .btn {
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }

        .btn-primary {
            background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
            color: black;
        }

        .btn-primary:hover {
            opacity: 0.9;
        }

        .btn-primary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .btn-success {
            background-color: var(--secondary-color);
            color: white;
        }

        .btn-danger {
            background-color: var(--phosphorous-color);
            color: white;
        }

        .progress-bar {
            height: 8px;
            background-color: #333;
            border-radius: 4px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            width: 0%;
            transition: width 0.3s ease;
        }

        .nitrogen-fill {
            background-color: var(--nitrogen-color);
        }

        .phosphorous-fill {
            background-color: var(--phosphorous-color);
        }

        .potassium-fill {
            background-color: var(--potassium-color);
        }

        /* Switch Toggle */
        .switch-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .switch-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #333;
            transition: .4s;
            border-radius: 34px;
        }

        .switch-slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .switch-slider {
            background-color: var(--secondary-color);
        }

        input:checked + .switch-slider:before {
            transform: translateX(26px);
        }

        /* Irrigation and Drainage Controls */
        .control-group {
            margin-bottom: 20px;
        }

        .control-group label {
            display: block;
            margin-bottom: 8px;
            color: white;
        }

        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }

        .button-group .btn {
            flex: 1;
        }

        .checkbox-container {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            color: white;
        }

        .checkbox-container input[type="checkbox"] {
            margin-right: 10px;
            width: 18px;
            height: 18px;
            color: white;
        }

        /* Disabled Controls */
        .disabled-controls {
            opacity: 0.5;
            pointer-events: none;
        }

        /* Status Bar */
        .status-bar {
            background-color: rgba(0, 0, 0, 0.5);
            padding: 10px 20px;
            border-top: 1px solid rgba(44, 238, 252, 0.2);
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
        }

        /* Responsive Design for Control Panel */
        @media (max-width: 768px) {
            .slider-container {
                flex-direction: column;
                align-items: stretch;
                gap: 10px;
            }
            
            .button-group {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
                margin-bottom: 10px;
            }
            
            .switch-container {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
            
            .switch {
                margin-top: 5px;
            }
        }

        .space {
            width: 100%;
            height: 50px;
        }

        /* For very small screens */
        @media (max-width: 480px) {
            .header-title h1 {
                font-size: 1rem;
            }
            
            .grid-1 h1 {
                font-size: 1.2rem;
            }
            
            .panel-header h2 {
                font-size: 16px;
            }
            
            .tabs {
                grid-template-columns: 1fr;
            }
            
            .tab {
                padding: 8px;
                font-size: 14px;
            }
        }
    </style>
    <script>
    function fetchData() {
      fetch('/data')
        .then(response => response.json())
        .then(data => {
          // Update NPK values
          document.getElementById('npk-value').innerText = data.NPK;
          
          // Update pH value
          document.getElementById('ph-value').innerText = data.pH;
          
          // Update temperature display
          document.getElementById('temp-value').innerText = data.temperature + "°C";
          const tempVal = parseFloat(data.temperature);
          if (!isNaN(tempVal)) {
            // Calculate rotation based on temperature (0-50°C range)
            const tempRotation = Math.min(Math.max(tempVal / 50 * 180, 0), 180);
            document.querySelector('.temperature-fill').style.transform = `rotate(${tempRotation}deg)`;
          }
          
          // Update humidity display
          document.getElementById('humidity-value').innerText = data.humidity + "%";
          const humidityVal = parseFloat(data.humidity);
          if (!isNaN(humidityVal)) {
            // Calculate rotation based on humidity (0-100% range)
            const humidityRotation = Math.min(Math.max(humidityVal / 100 * 180, 0), 180);
            document.querySelector('.humidity-fill').style.transform = `rotate(${humidityRotation}deg)`;
          }
          
          // Update moisture level
          const moistureVal = parseFloat(data.moisture);
          if (!isNaN(moistureVal)) {
            document.querySelector('.moisture-value').innerText = moistureVal + "%";
            document.querySelector('.moisture-level').style.height = moistureVal + "%";
          }
          
          // Update water level (assuming water level is derived from moisture)
          const waterVal = parseFloat(data.moisture);
          if (!isNaN(waterVal)) {
            document.querySelector('.water-value').innerText = waterVal + "%";
            document.querySelector('.water-level').style.height = waterVal + "%";
          }
          
          // Update EC value
          document.getElementById('ec-value').innerText = data.ecValue;
          
          // Update last updated time
          document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          document.getElementById('system-status').textContent = 'Error';
        });
    }
    
    // Initial data fetch
    document.addEventListener('DOMContentLoaded', function() {
      fetchData();
      // Set up interval for periodic updates
      setInterval(fetchData, 2000); // Update every 2 seconds
    });
    </script>
    </head>
    <body>
    <!-- Loading Screen -->
    <div class="loading-screen" id="loading-screen">
        <div class="loading-title">Smart Farming</div>
        <div class="spinner"></div>
    </div>

    <div class="night"></div>
    <div class="title">Smart Farming</div>

    <div class="header-title">
        <h1>SMART FARMING</h1>
    </div>

    <div class="main-content">
        <div class="container">
            <div class="grid-1">
                <h1>DATA AND STATISTICS</h1>
            </div>
            <div class="grid">
                <div class="nutrient-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Nutrient</th>
                                <th>Value</th>
                                <th>Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>NPK</td>
                                <td id="npk-value">-</td>
                                <td>
                                    <div class="nutrient-level">
                                        <div class="nutrient-level-fill high"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>pH</td>
                                <td id="ph-value">-</td>
                                <td>
                                    <div class="nutrient-level">
                                        <div class="nutrient-level-fill medium"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>EC</td>
                                <td id="ec-value">-</td>
                                <td>
                                    <div class="nutrient-level">
                                        <div class="nutrient-level-fill low"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Nutrient Graph -->
                <div class="nutrient-graph">
                    <h1>Nutrient Levels Over Time</h1>
                    <div class="graph-container">
                        <div class="graph-y-axis">
                            <div class="graph-y-label">100</div>
                            <div class="graph-y-label">75</div>
                            <div class="graph-y-label">50</div>
                            <div class="graph-y-label">25</div>
                            <div class="graph-y-label">0</div>
                        </div>
                        <div class="graph-x-axis">
                            <div class="graph-x-label">Mon</div>
                            <div class="graph-x-label">Tue</div>
                            <div class="graph-x-label">Wed</div>
                            <div class="graph-x-label">Thu</div>
                            <div class="graph-x-label">Fri</div>
                            <div class="graph-x-label">Sat</div>
                            <div class="graph-x-label">Sun</div>
                        </div>
                        <svg class="graph-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <!-- Nitrogen Line -->
                            <polyline points="0,30 15,25 30,20 45,15 60,22 75,18 100,10" 
                                    stroke="var(--nitrogen-color)" fill="none" stroke-width="2" />
                            <!-- Phosphorous Line -->
                            <polyline points="0,50 15,48 30,52 45,45 60,40 75,45 100,40" 
                                    stroke="var(--phosphorous-color)" fill="none" stroke-width="2" />
                            <!-- Potassium Line -->
                            <polyline points="0,70 15,65 30,68 45,72 60,65 75,70 100,68" 
                                    stroke="var(--potassium-color)" fill="none" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="graph-legend">
                        <div class="legend-item">
                            <div class="legend-color nitrogen-color"></div>
                            <div class="legend-text">Nitrogen</div>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color phosphorous-color"></div>
                            <div class="legend-text">Phosphorous</div>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color potassium-color"></div>
                            <div class="legend-text">Potassium</div>
                        </div>
                    </div>
                </div>
                
                <!-- Temperature and Humidity -->
                <div class="climate-container">
                    <h1>Climate Conditions</h1>
                    <div class="gauges">
                        <div class="gauge">
                            <div class="gauge-title">Temperature</div>
                            <div class="gauge-circle">
                                <div class="gauge-fill temperature-fill" style="transform: rotate(0deg)"></div>
                                <div class="gauge-center" id="temp-value">-</div>
                                <div class="gauge-marks">
                                    <!-- Gauge marks will be added by JavaScript -->
                                </div>
                            </div>
                        </div>
                        <div class="gauge">
                            <div class="gauge-title">Humidity</div>
                            <div class="gauge-circle">
                                <div class="gauge-fill humidity-fill" style="transform: rotate(0deg)"></div>
                                <div class="gauge-center" id="humidity-value">-</div>
                                <div class="gauge-marks">
                                    <!-- Gauge marks will be added by JavaScript -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Enhanced Water Tank -->
                <div class="water-tank">
                    <h1>Water Level</h1>
                    <div class="water-container">
                        <div class="water-level"></div>
                        <div class="water-value">-</div>
                        <div class="water-marks">
                            <div class="water-mark"></div>
                            <div class="water-mark"></div>
                            <div class="water-mark"></div>
                            <div class="water-mark"></div>
                            <div class="water-mark"></div>
                        </div>
                        <div class="water-mark-label level-100">100%</div>
                        <div class="water-mark-label level-75">75%</div>
                        <div class="water-mark-label level-50">50%</div>
                        <div class="water-mark-label level-25">25%</div>
                        <div class="water-mark-label level-0">0%</div>
                    </div>
                </div>
                
                <!-- Soil Moisture -->
                <div class="soil-moisture">
                    <h1>Soil Moisture</h1>
                    <div class="moisture-container">
                        <div class="moisture-level"></div>
                        <div class="moisture-value">-</div>
                    </div>
                </div>
            </div>
        
            <!-- Control Panel -->
            <div class="control-panel">
                <div class="panel-header">
                    <h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="8"></circle>
                            <line x1="12" y1="2" x2="12" y2="4"></line>
                            <line x1="12" y1="20" x2="12" y2="22"></line>
                            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>
                            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>
                            <line x1="2" y1="12" x2="4" y2="12"></line>
                            <line x1="20" y1="12" x2="22" y2="12"></line>
                            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>
                            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line>
                        </svg>
                        Manual Control System
                    </h2>
                    <p>Adjust and monitor your farming parameters</p>
                </div>
        
                <div class="panel-content">
                    <div class="tabs">
                        <button class="tab active" data-tab="nutrients">Nutrients</button>
                        <button class="tab" data-tab="irrigation">Irrigation</button>
                        <button class="tab" data-tab="drainage">Drainage</button>
                    </div>
        
                    <!-- Nutrients Tab -->
                    <div id="nutrients-tab" class="tab-content active">
                        <!-- Nitrogen Control -->
                        <div class="nutrient-control">
                            <div class="nutrient-header">
                                <div class="nutrient-name">
                                    <svg class="nutrient-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4287f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"></path>
                                        <path d="M12 22V15.5"></path>
                                        <path d="M22 8.5L12 15.5L2 8.5"></path>
                                        <path d="M12 2V8.5"></path>
                                        <path d="M7 5.5L17 11.5"></path>
                                    </svg>
                                    <span>Nitrogen (N)</span>
                                </div>
                                <div class="nutrient-value" id="nitrogen-value">0%</div>
                            </div>
                            <div class="slider-container">
                                <input type="range" min="0" max="100" value="0" class="slider" id="nitrogen-slider">
                                <button class="btn btn-primary" id="nitrogen-btn" disabled>Dispense</button>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill nitrogen-fill" id="nitrogen-fill"></div>
                            </div>
                        </div>
        
                        <!-- Phosphorous Control -->
                        <div class="nutrient-control">
                            <div class="nutrient-header">
                                <div class="nutrient-name">
                                    <svg class="nutrient-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f54242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"></path>
                                        <path d="M12 22V15.5"></path>
                                        <path d="M22 8.5L12 15.5L2 8.5"></path>
                                        <path d="M12 2V8.5"></path>
                                        <path d="M7 5.5L17 11.5"></path>
                                    </svg>
                                    <span>Phosphorous (P)</span>
                                </div>
                                <div class="nutrient-value" id="phosphorous-value">0%</div>
                            </div>
                            <div class="slider-container">
                                <input type="range" min="0" max="100" value="0" class="slider" id="phosphorous-slider">
                                <button class="btn btn-primary" id="phosphorous-btn" disabled>Dispense</button>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill phosphorous-fill" id="phosphorous-fill"></div>
                            </div>
                        </div>
        
                        <!-- Potassium Control -->
                        <div class="nutrient-control">
                            <div class="nutrient-header">
                                <div class="nutrient-name">
                                    <svg class="nutrient-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#42f59e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"></path>
                                        <path d="M12 22V15.5"></path>
                                        <path d="M22 8.5L12 15.5L2 8.5"></path>
                                        <path d="M12 2V8.5"></path>
                                        <path d="M7 5.5L17 11.5"></path>
                                    </svg>
                                    <span>Potassium (K)</span>
                                </div>
                                <div class="nutrient-value" id="potassium-value">0%</div>
                            </div>
                            <div class="slider-container">
                                <input type="range" min="0" max="100" value="0" class="slider" id="potassium-slider">
                                <button class="btn btn-primary" id="potassium-btn" disabled>Dispense</button>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill potassium-fill" id="potassium-fill"></div>
                            </div>
                        </div>
                    </div>
        
                    <!-- Irrigation Tab -->
                    <div id="irrigation-tab" class="tab-content">
                        <div class="switch-container">
                            <div class="nutrient-name">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00a2ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                                </svg>
                                <span>Irrigation System</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="irrigation-toggle">
                                <span class="switch-slider"></span>
                            </label>
                        </div>
        
                        <div id="irrigation-controls" class="disabled-controls">
                            <div class="control-group">
                                <label for="flow-rate-slider">Flow Rate: <span id="flow-rate-value">50%</span></label>
                                <input type="range" min="0" max="100" value="50" class="slider" id="flow-rate-slider">
                            </div>
        
                            <div class="control-group">
                                <label for="duration-slider">Duration: <span id="duration-value">10</span> minutes</label>
                                <input type="range" min="1" max="60" value="10" class="slider" id="duration-slider">
                            </div>
        
                            <div class="checkbox-container">
                                <input type="checkbox" id="schedule-irrigation">
                                <label for="schedule-irrigation">Schedule Irrigation</label>
                            </div>
        
                            <div class="button-group">
                                <button class="btn btn-success" id="start-irrigation">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 16l-4-4 4-4"></path>
                                        <path d="M16 12H8"></path>
                                    </svg>
                                    Start Irrigation
                                </button>
                                <button class="btn btn-danger" id="stop-irrigation">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <rect x="9" y="9" width="6" height="6"></rect>
                                    </svg>
                                    Stop
                                </button>
                            </div>
                        </div>
                    </div>
        
                    <!-- Drainage Tab -->
                    <div id="drainage-tab" class="tab-content">
                        <div class="switch-container">
                            <div class="nutrient-name">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#42f59e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 12l4 4 4-4"></path>
                                    <path d="M12 8v8"></path>
                                </svg>
                                <span>Drainage System</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="drainage-toggle">
                                <span class="switch-slider"></span>
                            </label>
                        </div>
        
                        <div id="drainage-controls" class="disabled-controls">
                            <div class="checkbox-container">
                                <input type="checkbox" id="auto-drainage" checked>
                                <label for="auto-drainage">Automatic Mode</label>
                            </div>
        
                            <div id="manual-drainage-controls" class="disabled-controls">
                                <div class="button-group">
                                    <button class="btn btn-success" id="open-drainage">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;">
                                            <path d="M18 6L6 18"></path>
                                            <path d="M6 6l12 12"></path>
                                        </svg>
                                        Open Drainage
                                    </button>
                                    <button class="btn btn-danger" id="close-drainage">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;">
                                            <path d="M18 6L6 18"></path>
                                            <path d="M6 6l12 12"></path>
                                        </svg>
                                        Close Drainage
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div class="status-bar">
                    <div>System Status: <span id="system-status">Online</span></div>
                    <div>Last Updated: <span id="last-updated"></span></div>
                </div>
            </div>

            <div class="space">.............</div>
        </div>
    </div>

    <script>
        // Loading screen handler
        window.addEventListener('load', function() {
            // Show loading screen for at least 2 seconds
            setTimeout(function() {
                document.getElementById('loading-screen').classList.add('hidden');
                document.body.classList.add('loaded');
            }, 2000);
            
            // Create gauge marks
            const gaugeMarks = document.querySelectorAll('.gauge-marks');
            gaugeMarks.forEach(markContainer => {
                for (let i = 0; i < 10; i++) {
                    const mark = document.createElement('div');
                    mark.className = 'gauge-mark';
                    mark.style.transform = `rotate(${i * 18}deg)`;
                    mark.style.left = 'calc(50% - 1px)';
                    markContainer.appendChild(mark);
                }
            });
            
            // Tab Switching
            const tabs = document.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabId = tab.getAttribute('data-tab');
                    
                    // Update active tab
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Show correct tab content
                    tabContents.forEach(content => {
                        content.classList.remove('active');
                    });
                    document.getElementById(tabId + '-tab').classList.add('active');
                });
            });

            // Nutrient Sliders
            const setupNutrientSlider = (nutrient) => {
                const slider = document.getElementById(`${nutrient}-slider`);
                const value = document.getElementById(`${nutrient}-value`);
                const fill = document.getElementById(`${nutrient}-fill`);
                const btn = document.getElementById(`${nutrient}-btn`);
                
                slider.addEventListener('input', () => {
                    const sliderValue = slider.value;
                    value.textContent = `${sliderValue}%`;
                    fill.style.width = `${sliderValue}%`;
                    
                    // Enable/disable button based on value
                    if (sliderValue > 0) {
                        btn.disabled = false;
                    } else {
                        btn.disabled = true;
                    }
                });
                
                btn.addEventListener('click', () => {
                    // Send command to ESP32
                    sendCommand(`dispense_${nutrient}`, slider.value);
                    
                    // Visual feedback
                    btn.textContent = 'Dispensing...';
                    btn.disabled = true;
                    
                    // Reset after 3 seconds
                    setTimeout(() => {
                        slider.value = 0;
                        value.textContent = '0%';
                        fill.style.width = '0%';
                        btn.textContent = 'Dispense';
                        btn.disabled = true;
                        
                        // Update last updated time
                        document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
                    }, 3000);
                });
            };

            setupNutrientSlider('nitrogen');
            setupNutrientSlider('phosphorous');
            setupNutrientSlider('potassium');

            // Irrigation System
            const irrigationToggle = document.getElementById('irrigation-toggle');
            const irrigationControls = document.getElementById('irrigation-controls');
            const flowRateSlider = document.getElementById('flow-rate-slider');
            const flowRateValue = document.getElementById('flow-rate-value');
            const durationSlider = document.getElementById('duration-slider');
            const durationValue = document.getElementById('duration-value');
            const startIrrigationBtn = document.getElementById('start-irrigation');
            const stopIrrigationBtn = document.getElementById('stop-irrigation');

            irrigationToggle.addEventListener('change', () => {
                if (irrigationToggle.checked) {
                    irrigationControls.classList.remove('disabled-controls');
                    sendCommand('irrigation_system', 'on');
                } else {
                    irrigationControls.classList.add('disabled-controls');
                    sendCommand('irrigation_system', 'off');
                }
                
                // Update last updated time
                document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
            });

            flowRateSlider.addEventListener('input', () => {
                flowRateValue.textContent = `${flowRateSlider.value}%`;
            });

            durationSlider.addEventListener('input', () => {
                durationValue.textContent = durationSlider.value;
            });

            startIrrigationBtn.addEventListener('click', () => {
                if (irrigationToggle.checked) {
                    sendCommand('start_irrigation', {
                        flowRate: flowRateSlider.value,
                        duration: durationSlider.value
                    });
                    
                    // Visual feedback
                    startIrrigationBtn.textContent = 'Starting...';
                    startIrrigationBtn.disabled = true;
                    
                    setTimeout(() => {
                        startIrrigationBtn.textContent = 'Start Irrigation';
                        startIrrigationBtn.disabled = false;
                        
                        // Update last updated time
                        document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
                    }, 2000);
                }
            });

            stopIrrigationBtn.addEventListener('click', () => {
                if (irrigationToggle.checked) {
                    sendCommand('stop_irrigation', {});
                    
                    // Update last updated time
                    document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
                }
            });

            // Drainage System
            const drainageToggle = document.getElementById('drainage-toggle');
            const drainageControls = document.getElementById('drainage-controls');
            const autoDrainageToggle = document.getElementById('auto-drainage');
            const manualDrainageControls = document.getElementById('manual-drainage-controls');
            const openDrainageBtn = document.getElementById('open-drainage');
            const closeDrainageBtn = document.getElementById('close-drainage');

            drainageToggle.addEventListener('change', () => {
                if (drainageToggle.checked) {
                    drainageControls.classList.remove('disabled-controls');
                    sendCommand('drainage_system', 'on');
                    
                    // Check auto mode
                    if (autoDrainageToggle.checked) {
                        manualDrainageControls.classList.add('disabled-controls');
                    } else {
                        manualDrainageControls.classList.remove('disabled-controls');
                    }
                } else {
                    drainageControls.classList.add('disabled-controls');
                    sendCommand('drainage_system', 'off');
                }
                
                // Update last updated time
                document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
            });

            autoDrainageToggle.addEventListener('change', () => {
                if (autoDrainageToggle.checked) {
                    manualDrainageControls.classList.add('disabled-controls');
                    sendCommand('drainage_mode', 'auto');
                } else {
                    manualDrainageControls.classList.remove('disabled-controls');
                    sendCommand('drainage_mode', 'manual');
                }
                
                // Update last updated time
                document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
            });

            openDrainageBtn.addEventListener('click', () => {
                if (drainageToggle.checked && !autoDrainageToggle.checked) {
                    sendCommand('open_drainage', {});
                    
                    // Visual feedback
                    openDrainageBtn.textContent = 'Opening...';
                    openDrainageBtn.disabled = true;
                    
                    setTimeout(() => {
                        openDrainageBtn.textContent = 'Open Drainage';
                        openDrainageBtn.disabled = false;
                        
                        // Update last updated time
                        document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
                    }, 2000);
                }
            });

            closeDrainageBtn.addEventListener('click', () => {
                if (drainageToggle.checked && !autoDrainageToggle.checked) {
                    sendCommand('close_drainage', {});
                    
                    // Visual feedback
                    closeDrainageBtn.textContent = 'Closing...';
                    closeDrainageBtn.disabled = true;
                    
                    setTimeout(() => {
                        closeDrainageBtn.textContent = 'Close Drainage';
                        closeDrainageBtn.disabled = false;
                        
                        // Update last updated time
                        document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
                    }, 2000);
                }
            });

            // Function to send commands to ESP32
            function sendCommand(command, value) {
                console.log(`Sending command: ${command}, value: ${JSON.stringify(value)}`);
                
                // For ESP32 integration, you would use fetch or XMLHttpRequest
                fetch(`/api/${command}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ value: value }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    document.getElementById('system-status').textContent = 'Online';
                })
                .catch((error) => {
                    console.error('Error:', error);
                    document.getElementById('system-status').textContent = 'Error';
                });
            }
        });

        // Browser compatibility check
        function checkBrowserCompatibility() {
            // Check for CSS Grid support
            if (window.CSS && CSS.supports && !CSS.supports('display', 'grid')) {
                console.warn('Your browser does not fully support CSS Grid. Some layout features may not display correctly.');
            }
            
            // Check for Flexbox support
            if (window.CSS && CSS.supports && !CSS.supports('display', 'flex')) {
                console.warn('Your browser does not fully support Flexbox. Some layout features may not display correctly.');
            }
            
            // Check for SVG support
            if (!(document.implementation && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"))) {
                console.warn('Your browser does not fully support SVG. Some graphics may not display correctly.');
            }
        }
        
        // Run compatibility check
        checkBrowserCompatibility();
        
        // Handle window resize events for responsive adjustments
        window.addEventListener('resize', function() {
            // Adjust gauge sizes for small screens
            if (window.innerWidth <= 480) {
                const gaugeCircles = document.querySelectorAll('.gauge-circle');
                gaugeCircles.forEach(circle => {
                    circle.style.width = '120px';
                    circle.style.height = '120px';
                });
            } else {
                const gaugeCircles = document.querySelectorAll('.gauge-circle');
                gaugeCircles.forEach(circle => {
                    circle.style.width = '150px';
                    circle.style.height = '150px';
                });
            }
        });
    </script>
</body>
    </html>
  )rawliteral";
}

void handleRoot() {
  generatePage();
  server.send(200, "text/html", html_page);
}

void handleData() {
  String json = "{";
  json += "\"NPK\":\"" + NPK + "\",";
  json += "\"pH\":\"" + pH + "\",";
  json += "\"temperature\":\"" + temperature + "\",";
  json += "\"humidity\":\"" + humidity + "\",";
  json += "\"moisture\":\"" + moisture + "\",";
  json += "\"ecValue\":\"" + ecValue + "\"";
  json += "}";
  server.send(200, "application/json", json);
}

// API endpoint for commands
void handleCommand() {
  if (server.method() != HTTP_POST) {
    server.send(405, "text/plain", "Method Not Allowed");
    return;
  }
  
  String command = server.uri().substring(5); // Remove "/api/" prefix
  String body = server.arg("plain");
  
  // Log the command
  Serial.println("Command received: " + command);
  Serial.println("Body: " + body);
  
  // Process command (you can expand this based on your needs)
  if (command.startsWith("dispense_")) {
    // Handle nutrient dispensing
    server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Dispensing nutrient\"}");
  } else if (command == "irrigation_system") {
    // Handle irrigation system toggle
    server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Irrigation system toggled\"}");
  } else if (command == "start_irrigation") {
    // Handle start irrigation
    server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Irrigation started\"}");
  } else if (command == "stop_irrigation") {
    // Handle stop irrigation
    server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Irrigation stopped\"}");
  } else if (command == "drainage_system") {
    // Handle drainage system toggle
    server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Drainage system toggled\"}");
  } else if (command == "drainage_mode") {
    // Handle drainage mode change
    server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Drainage mode changed\"}");
  } else if (command == "open_drainage" || command == "close_drainage") {
    // Handle drainage control
    server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Drainage control updated\"}");
  } else {
    // Unknown command
    server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Unknown command\"}");
  }
}

void setup() {
  Serial.begin(9600);
  Serial2.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17
  
  WiFi.softAPConfig(apIP, gateway, subnet);
  WiFi.softAP(ssid, password);
  dnsServer.start(DNS_PORT, "*", apIP);

     // Connect to Router (STA mode)
    WiFi.begin(ssid_sta, pass_sta);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
  
  server.on("/", handleRoot);
  server.on("/data", handleData);  // JSON endpoint
  
  // Add API route handler for commands
  // server.on(UriBraces("/api/{}"), handleCommand);
  
  server.onNotFound(handleRoot);
  server.begin();

  Serial.println("✅ ESP32 Wi-Fi Server with AJAX Started");
  Serial.println(WiFi.softAPIP());
}

void sendDataToServer() {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");

        String jsonData = "{\"n\":\"" + nitrogen + "\",\"p\":\"" + phosphorous + "\",\"k\":\"" + potassium +  "\",\"temperature\":\"" + temperature + "\",\"humidity\":\"" + humidity + "\",\"moisture\":\"" + moisture + "\",\"water_level\":\"" + 0 + "\"}";

        int httpResponseCode = http.POST(jsonData);
        if (httpResponseCode > 0) {
            Serial.println("Data sent successfully: " + jsonData);
            String response = http.getString();
            Serial.println("Server response: " + response);
        } else {
            Serial.print("Error sending data: ");
            Serial.println(httpResponseCode);
        }
        http.end();
    } else {
        Serial.println("Wi-Fi Disconnected");
    }
}

void parseData(String data) {
  int nIndex = data.indexOf("N:") + 2;
  int pIndex = data.indexOf("P:") + 2;
  int kIndex = data.indexOf("K:") + 2;
  int moistureIndex = data.indexOf("Moisture:") + 9;
  int tempIndex = data.indexOf("Temp:") + 5;
  int ecIndex = data.indexOf("EC:") + 3;
  int humidityIndex = data.indexOf("Humidity:") + 9;
  int phIndex = data.indexOf("pH:") + 3;

  // Check if all indices are valid before extracting data
  if (nIndex > 1 && pIndex > 1 && kIndex > 1) {
    int n = data.substring(nIndex, data.indexOf(",", nIndex)).toInt();
    int p = data.substring(pIndex, data.indexOf(",", pIndex)).toInt();
    int k = data.substring(kIndex, data.indexOf(",", kIndex)).toInt();
    NPK = String(n) + "-" + String(p) + "-" + String(k);
    nitrogen = String(n);
    phosphorous = String(p);
    potassium = String(k);
  }
  
  if (moistureIndex > 8) {
    float moistureVal = data.substring(moistureIndex, data.indexOf(",", moistureIndex)).toFloat();
    moisture = String(moistureVal);
  }
  
  if (tempIndex > 4) {
    float tempVal = data.substring(tempIndex, data.indexOf(",", tempIndex)).toFloat();
    temperature = String(tempVal);
  }
  
  if (ecIndex > 2) {
    float ecVal = data.substring(ecIndex, data.indexOf(",", ecIndex)).toFloat();
    ecValue = String(ecVal);
  }
  
  if (humidityIndex > 8) {
    float humidityVal = data.substring(humidityIndex, data.indexOf(",", humidityIndex)).toFloat();
    humidity = String(humidityVal);
  }
  
  if (phIndex > 2) {
    float phVal = data.substring(phIndex).toFloat();
    pH = String(phVal);
  }
}

void loop() {
  dnsServer.processNextRequest();
  server.handleClient();

  if (Serial2.available()) {
    String data = Serial2.readStringUntil('\n');
    data.trim();
    if (data.length() > 0) {
      Serial.println("Received: " + data);
      parseData(data);
    }
  }

    sendDataToServer();
    delay(5000);
}