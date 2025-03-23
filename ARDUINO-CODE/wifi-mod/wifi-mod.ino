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































// #include <WiFi.h>
// #include <WebServer.h>
// #include <DNSServer.h>
// #include <HTTPClient.h>

// const char *ssid = "SMART-FARMING-ESP32";
// const char *password = "smartfarming";
// const char* serverUrl = "http://192.168.8.100:8080/api/npk/add";

// // const char *ssid_sta = "Zion Piso Wifi";

// const char *ssid_sta = "HUAWEI-B525-A4E9";
// const char *pass_sta = "DHF5H5R4JB0";

// IPAddress apIP(192, 168, 4, 1);
// IPAddress gateway(192, 168, 4, 1);
// IPAddress subnet(255, 255, 255, 0);

// DNSServer dnsServer;
// WebServer server(80);

// const byte DNS_PORT = 53;

// // Sensor data placeholders
// String NPK = "-";
// String nitrogen = "-";
// String phosphorous = "-";
// String potassium = "-";
// String pH = "-";
// String temperature = "-";
// String humidity = "-";
// String moisture = "-";
// String ecValue = "-";

// String html_page;

// void generatePage() {
//   html_page = R"rawliteral(
//     <!DOCTYPE html><html><head>
//     <title>Smart Farming Dashboard</title>
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Geologica:wght@100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <style>
//         *,
//         *::after,
//         *::before {
//             padding: 0;
//             margin: 0;
//             box-sizing: border-box;
//         }

//         :root {
//             --dark-color: #000;
//             --tree-trunk-color: #5a3825;
//             --tree-leaf-color: #1a6e32;
//             --tree-leaf-highlight: #25a048;
//             --primary-color: #23f0ff;
//             --secondary-color: #1eaf4a;
//             --nitrogen-color: #4287f5;
//             --phosphorous-color: #f54242;
//             --potassium-color: #42f59e;
//             --temperature-color: #ff7b00;
//             --humidity-color: #00a2ff;
//             --moisture-color: #0044ff;
//         }

//         /* Loading Screen */
//         .loading-screen {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: var(--dark-color);
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//             z-index: 9999;
//             transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
//         }

//         .loading-screen.hidden {
//             opacity: 0;
//             visibility: hidden;
//         }

//         .loading-title {
//             color: white;
//             font-family: "Dancing Script", cursive;
//             font-size: 3rem;
//             margin-bottom: 2rem;
//             text-shadow: 0 0 10px rgba(44, 238, 252, 0.8);
//         }

//         .spinner {
//             width: 60px;
//             height: 60px;
//             border: 5px solid rgba(255, 255, 255, 0.3);
//             border-radius: 50%;
//             border-top-color: var(--primary-color);
//             animation: spin 1s ease-in-out infinite;
//         }

//         @keyframes spin {
//             to {
//                 transform: rotate(360deg);
//             }
//         }

//         body {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: flex-end;
//             min-height: 100vh;
//             background-color: var(--dark-color);
//             overflow-x: hidden;
//             perspective: 1000px;
//             font-family: 'Lato', sans-serif;
//             opacity: 0;
//             transition: opacity 1s ease-in;
//         }

//         body.loaded {
//             opacity: 1;
//         }

//         .night {
//             position: fixed;
//             left: 50%;
//             top: 0;
//             transform: translateX(-50%);
//             width: 100%;
//             height: 100%;
//             filter: blur(0.1vmin);
//             background-image: radial-gradient(ellipse at top, transparent 0%, var(--dark-color)), 
//             radial-gradient(ellipse at bottom, var(--dark-color), rgba(145, 233, 255, 0.2)), 
//             repeating-linear-gradient(220deg, black 0px, black 19px, transparent 19px, transparent 22px), 
//             repeating-linear-gradient(189deg, black 0px, black 19px, transparent 19px, transparent 22px), 
//             repeating-linear-gradient(148deg, black 0px, black 19px, transparent 19px, transparent 22px), 
//             linear-gradient(90deg, #00fffa, #f0f0f0);
//         }

//         /* Smart Farming Title */
//         .title {
//             position: fixed;
//             top: 30%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             color: #fff;
//             font-size: 10vmin;
//             font-weight: bold;
//             text-align: center;
//             opacity: 0;
//             z-index: 1000;
//             text-shadow: 0 0 10px rgba(44, 238, 252, 0.8);
//             animation: title-fade-in 2s 1s forwards, title-fade-out 2s 5s forwards;
//             letter-spacing: 0.1vmin;
//             font-family: "Dancing Script", cursive;
//         }

//         @keyframes title-fade-in {
//             from {
//                 opacity: 0;
//                 transform: translate(-50%, -30%);
//             }

//             to {
//                 opacity: 1;
//                 transform: translate(-50%, -50%);
//             }
//         }

//         @keyframes title-fade-out {
//             from {
//                 opacity: 1;
//                 transform: translate(-50%, -50%);
//             }

//             to {
//                 opacity: 0;
//                 transform: translate(-50%, -70%);
//             }
//         }

//         /* Header */
//         .header-title {
//             position: fixed;
//             z-index: 1000;
//             top: 0;
//             left: 0;
//             width: 100%;
//             background-color: rgba(0, 0, 0, 0.3);
//             padding: 10px 10px 10px 20px;
//             font-size: 10px;
//             color: white;
//             font-family: "Lato", sans-serif;
//             opacity: 0;
//             z-index: 1000;
//             animation: header-transition 2s 6s forwards;
//         }

//         .header-title h1 {
//             font-size: 1.5rem;
//         }

//         /* Main Content */
//         .main-content {
//             position: relative;
//             z-index: 100;
//             width: 100%;
//             overflow: auto;
//             height: 100vh;
//             padding-top: 60px; /* Space for fixed header */
//         }

//         /* Grid table */
//         .container {
//             width: 100%;
//             height: 100%;
//             padding: 20px;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//         }

//         .grid-1 {
//             width: 100%;
//             max-width: 90%;
//             margin-bottom: 20px;
//             color: white;
//             font-family: "Lato", sans-serif;
//             opacity: 0;
//             animation: table-fade-in 2s 6s forwards;
//         }

//         .grid-1 h1 {
//             font-size: 1.5rem;
//             margin-bottom: 10px;
//         }

//         /* Grid table */
//         .grid {
//             width: 100%;
//             max-width: 90%;
//             display: grid;
//             grid-template-columns: repeat(3, 1fr);
//             gap: 20px;
//             margin-bottom: 20px;
//         }

//         /* Tablet: 2 columns */
//         @media (max-width: 1024px) {
//             .grid {
//                 grid-template-columns: repeat(2, 1fr);
//             }
//         }

//         /* Mobile: 1 column */
//         @media (max-width: 768px) {
//             .grid {
//                 grid-template-columns: 1fr;
//             }
            
//             .title {
//                 font-size: 8vmin;
//             }
            
//             .header-title h1 {
//                 font-size: 1.2rem;
//             }
//         }

//         /* Nutrient Table */
//         .nutrient-table {
//             background-color: rgba(0, 0, 0, 0.7);
//             border-radius: 8px;
//             padding: 20px;
//             color: white;
//             font-family: "Lato", sans-serif;
//             opacity: 0;
//             z-index: 1000;
//             animation: table-fade-in 2s 6s forwards;
//             box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
//             border: 1px solid rgba(44, 238, 252, 0.3);
//         }

//         /* Water Tank */
//         .water-tank {
//             opacity: 0;
//             height: 300px;
//             box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
//             border: 1px solid rgba(44, 238, 252, 0.3);
//             border-radius: 8px;
//             position: relative;
//             overflow: hidden;
//             background-color: rgba(0, 0, 0, 0.7);
//             animation: table-fade-in 2s 6s forwards;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             padding: 20px;
//         }

//         .water-tank h1 {
//             margin-bottom: 20px;
//             font-size: 18px;
//             color: white;
//             font-weight: 700;
//             text-align: left;
//             width: 100%;
//         }

//         .water-container {
//             width: 100%;
//             height: 200px;
//             position: relative;
//             background: linear-gradient(to bottom, #0a3b5c, #0d5c8c);
//             border-radius: 8px;
//             overflow: hidden;
//             box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
//         }

//         .water-level {
//             position: absolute;
//             bottom: 0;
//             width: 100%;
//             height: 0%;
//             background: linear-gradient(to bottom, rgba(0, 204, 255, 0.3), rgba(0, 68, 255, 0.8));
//             transition: height 1s ease-in-out;
//         }

//         .water-value {
//             position: absolute;
//             top: 10px;
//             right: 10px;
//             background-color: rgba(0, 0, 0, 0.6);
//             color: white;
//             padding: 5px 10px;
//             border-radius: 4px;
//             font-size: 14px;
//         }

//         .water-marks {
//             position: absolute;
//             right: 0;
//             height: 100%;
//             width: 30px;
//             display: flex;
//             flex-direction: column;
//             justify-content: space-between;
//             padding: 10px 0;
//         }

//         .water-mark {
//             position: relative;
//             width: 100%;
//             height: 1px;
//             background-color: rgba(255, 255, 255, 0.5);
//         }

//         .water-mark::after {
//             content: "";
//             position: absolute;
//             right: 0;
//             top: 0;
//             width: 10px;
//             height: 1px;
//             background-color: rgba(255, 255, 255, 0.8);
//         }

//         .water-mark-label {
//             position: absolute;
//             right: 15px;
//             color: white;
//             font-size: 12px;
//             transform: translateY(-50%);
//         }

//         .water-mark-label.level-100 {
//             top: 10px;
//         }

//         .water-mark-label.level-75 {
//             top: 25%;
//         }

//         .water-mark-label.level-50 {
//             top: 50%;
//         }

//         .water-mark-label.level-25 {
//             top: 75%;
//         }

//         .water-mark-label.level-0 {
//             bottom: 10px;
//         }

//         /* Soil Moisture */
//         .soil-moisture {
//             opacity: 0;
//             height: 300px;
//             box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
//             border: 1px solid rgba(44, 238, 252, 0.3);
//             border-radius: 8px;
//             position: relative;
//             overflow: hidden;
//             background-color: rgba(0, 0, 0, 0.7);
//             animation: table-fade-in 2s 6s forwards;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             padding: 20px;
//         }

//         .soil-moisture h1 {
//             margin-bottom: 20px;
//             font-size: 18px;
//             color: white;
//             font-weight: 700;
//             text-align: left;
//             width: 100%;
//         }

//         .moisture-container {
//             width: 100%;
//             height: 200px;
//             position: relative;
//             background: linear-gradient(to bottom, #6b3d1a, #8b5a2b);
//             border-radius: 8px;
//             overflow: hidden;
//             box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
//         }

//         .moisture-level {
//             position: absolute;
//             bottom: 0;
//             width: 100%;
//             height: 0%;
//             background: linear-gradient(to bottom, rgba(0, 68, 255, 0.3), rgba(0, 68, 255, 0.8));
//             transition: height 1s ease-in-out;
//         }

//         .moisture-value {
//             position: absolute;
//             top: 10px;
//             right: 10px;
//             background-color: rgba(0, 0, 0, 0.6);
//             color: white;
//             padding: 5px 10px;
//             border-radius: 4px;
//             font-size: 14px;
//         }

//         /* Temperature and Humidity */
//         .climate-container {
//             opacity: 0;
//             min-height: 300px;
//             height: auto;
//             box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
//             border: 1px solid rgba(44, 238, 252, 0.3);
//             border-radius: 8px;
//             position: relative;
//             overflow: hidden;
//             background-color: rgba(0, 0, 0, 0.7);
//             animation: table-fade-in 2s 6s forwards;
//             display: flex;
//             flex-direction: column;
//             padding: 20px;
//         }

//         .climate-container h1 {
//             margin-bottom: 20px;
//             font-size: 18px;
//             color: white;
//             font-weight: 700;
//         }

//         .gauges {
//             display: flex;
//             justify-content: space-around;
//             height: 100%;
//             flex-wrap: wrap;
//         }

//         .gauge {
//             position: relative;
//             width: 45%;
//             height: 200px;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//         }

//         @media (max-width: 480px) {
//             .gauge {
//                 width: 100%;
//                 margin-bottom: 20px;
//             }
//         }

//         .gauge-title {
//             color: white;
//             margin-bottom: 10px;
//             font-size: 16px;
//         }

//         .gauge-circle {
//             width: 150px;
//             height: 150px;
//             border-radius: 50%;
//             background-color: rgba(0, 0, 0, 0.3);
//             position: relative;
//             overflow: hidden;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
//         }

//         .gauge-fill {
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 100%;
//             height: 50%;
//             transition: transform 1s ease-in-out;
//             transform-origin: center bottom;
//         }

//         .temperature-fill {
//             background: linear-gradient(to top, #ff0000, #ff7b00);
//         }

//         .humidity-fill {
//             background: linear-gradient(to top, #0044ff, #00a2ff);
//         }

//         .gauge-center {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             width: 80%;
//             height: 80%;
//             border-radius: 50%;
//             background-color: rgba(0, 0, 0, 0.7);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             color: white;
//             font-size: 24px;
//             font-weight: bold;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
//         }

//         .gauge-marks {
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//         }

//         .gauge-mark {
//             position: absolute;
//             width: 2px;
//             height: 10px;
//             background-color: rgba(255, 255, 255, 0.5);
//             transform-origin: center 75px;
//         }

//         /* Nutrient Graph */
//         .nutrient-graph {
//             opacity: 0;
//             height: 300px;
//             box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
//             border: 1px solid rgba(44, 238, 252, 0.3);
//             border-radius: 8px;
//             position: relative;
//             overflow: hidden;
//             background-color: rgba(0, 0, 0, 0.7);
//             animation: table-fade-in 2s 6s forwards;
//             display: flex;
//             flex-direction: column;
//             padding: 20px;
//         }

//         .nutrient-graph h1 {
//             margin-bottom: 10px;
//             font-size: 18px;
//             color: white;
//             font-weight: 700;
//         }

//         .graph-container {
//             position: relative;
//             width: 95%;
//             height: 200px;
//             border-bottom: 1px solid rgba(255, 255, 255, 0.3);
//             border-left: 1px solid rgba(255, 255, 255, 0.3);
//             margin-top: 20px;
//             margin-left: 15px;
//         }

//         .graph-y-axis {
//             position: absolute;
//             left: -5px;
//             top: 0;
//             height: 100%;
//             display: flex;
//             flex-direction: column;
//             justify-content: space-between;
//         }

//         .graph-y-label {
//             color: rgba(255, 255, 255, 0.7);
//             font-size: 12px;
//             transform: translateX(-100%);
//             margin-left: 0px;
//             text-align: right;
//         }

//         .graph-x-axis {
//             position: absolute;
//             bottom: -5px;
//             left: 0;
//             width: 100%;
//             display: flex;
//             justify-content: space-between;
//         }

//         .graph-x-label {
//             color: rgba(255, 255, 255, 0.7);
//             font-size: 12px;
//             transform: translateY(100%);
//             margin-top: 5px;
//         }

//         .graph-line {
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             fill: none;
//             stroke-width: 2;
//         }

//         .graph-legend {
//             display: flex;
//             justify-content: center;
//             margin-top: 30px;
//             flex-wrap: wrap;
//         }

//         .legend-item {
//             display: flex;
//             align-items: center;
//             margin: 0 10px 5px 10px;
//         }

//         .legend-color {
//             width: 15px;
//             height: 15px;
//             margin-right: 5px;
//             border-radius: 3px;
//         }

//         .legend-text {
//             color: white;
//             font-size: 12px;
//         }

//         .nitrogen-color {
//             background-color: var(--nitrogen-color);
//         }

//         .phosphorous-color {
//             background-color: var(--phosphorous-color);
//         }

//         .potassium-color {
//             background-color: var(--potassium-color);
//         }

//         @keyframes table-fade-in {
//             from {
//                 opacity: 0;
//             }
//             to {
//                 opacity: 1;
//             }
//         }

//         @keyframes header-transition {
//             from {
//                 opacity: 0;
//             }
//             to {
//                 opacity: 1;
//             }
//         }

//         .nutrient-table table {
//             border-collapse: collapse;
//             width: 100%;
//         }

//         .nutrient-table th,
//         .nutrient-table td {
//             padding: 10px;
//             text-align: center;
//             border-bottom: 1px solid rgba(255, 255, 255, 0.2);
//         }

//         .nutrient-table th {
//             background-color: rgba(26, 110, 50, 0.6);
//             color: white;
//         }

//         .nutrient-table tr:nth-child(even) {
//             background-color: rgba(255, 255, 255, 0.05);
//         }

//         .nutrient-table tr:hover {
//             background-color: rgba(44, 238, 252, 0.1);
//         }

//         .nutrient-level {
//             display: inline-block;
//             width: 80px;
//             height: 10px;
//             background-color: #333;
//             border-radius: 5px;
//             overflow: hidden;
//         }

//         .nutrient-level-fill {
//             height: 100%;
//             background: linear-gradient(to right, #23f0ff, #1eaf4a);
//         }

//         .high {
//             width: 90%;
//         }

//         .medium {
//             width: 60%;
//         }

//         .low {
//             width: 30%;
//         }

//         /* Control Panel Styles */
//         .control-panel {
//             width: 100%;
//             max-width: 90%;
//             opacity: 0;
//             box-shadow: 0 0 2px rgba(44, 238, 252, 0.4);
//             border: 1px solid rgba(44, 238, 252, 0.3);
//             border-radius: 8px;
//             background-color: rgba(0, 0, 0, 0.7);
//             animation: table-fade-in 2s 6s forwards;
//             display: flex;
//             flex-direction: column;
//             margin-bottom: 20px;
//         }

//         .panel-header {
//             background-color: rgba(26, 110, 50, 0.6);
//             padding: 15px;
//             border-bottom: 1px solid rgba(44, 238, 252, 0.3);
//         }

//         .panel-header h2 {
//             font-size: 18px;
//             margin-bottom: 5px;
//             display: flex;
//             align-items: center;
//             color: white;
//         }

//         .panel-header h2 svg {
//             margin-right: 10px;
//             color: white;
//         }

//         .panel-header p {
//             font-size: 14px;
//             color: rgba(255, 255, 255, 0.7);
//         }

//         .panel-content {
//             padding: 20px;
//         }

//         /* Tabs */
//         .tabs {
//             display: grid;
//             grid-template-columns: repeat(3, 1fr);
//             border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//             margin-bottom: 20px;
//         }

//         .tab {
//             padding: 10px 20px;
//             cursor: pointer;
//             background-color: transparent;
//             color: white;
//             border: none;
//             border-bottom: 2px solid transparent;
//             transition: all 0.3s;
//             text-align: center;
//         }

//         .tab.active {
//             border-bottom: 2px solid var(--primary-color);
//             background-color: rgba(26, 110, 50, 0.3);
//         }

//         .tab-content {
//             display: none;
//         }

//         .tab-content.active {
//             display: block;
//         }

//         /* Nutrient Controls */
//         .nutrient-control {
//             margin-bottom: 25px;
//         }

//         .nutrient-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 10px;
//         }

//         .nutrient-name {
//             display: flex;
//             align-items: center;
//             font-weight: bold;
//             color: white;
//         }

//         .nutrient-name span {
//             padding-left: 7px;
//         }

//         .nutrient-icon {
//             margin-right: 8px;
//         }

//         .nutrient-value {
//             font-size: 14px;
//             color: rgba(255, 255, 255, 0.7);
//         }

//         .slider-container {
//             display: flex;
//             align-items: center;
//             gap: 15px;
//             margin-bottom: 10px;
//         }

//         .slider {
//             flex: 1;
//             -webkit-appearance: none;
//             height: 8px;
//             background: #333;
//             border-radius: 4px;
//             outline: none;
//             width: 100%;
//         }

//         .slider::-webkit-slider-thumb {
//             -webkit-appearance: none;
//             appearance: none;
//             width: 18px;
//             height: 18px;
//             border-radius: 50%;
//             background: var(--primary-color);
//             cursor: pointer;
//         }

//         .slider::-moz-range-thumb {
//             width: 18px;
//             height: 18px;
//             border-radius: 50%;
//             background: var(--primary-color);
//             cursor: pointer;
//             border: none;
//         }

//         .btn {
//             padding: 8px 15px;
//             border: none;
//             border-radius: 4px;
//             cursor: pointer;
//             font-weight: bold;
//             transition: all 0.3s;
//         }

//         .btn-primary {
//             background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
//             color: black;
//         }

//         .btn-primary:hover {
//             opacity: 0.9;
//         }

//         .btn-primary:disabled {
//             opacity: 0.5;
//             cursor: not-allowed;
//         }

//         .btn-success {
//             background-color: var(--secondary-color);
//             color: white;
//         }

//         .btn-danger {
//             background-color: var(--phosphorous-color);
//             color: white;
//         }

//         .progress-bar {
//             height: 8px;
//             background-color: #333;
//             border-radius: 4px;
//             overflow: hidden;
//         }

//         .progress-fill {
//             height: 100%;
//             width: 0%;
//             transition: width 0.3s ease;
//         }

//         .nitrogen-fill {
//             background-color: var(--nitrogen-color);
//         }

//         .phosphorous-fill {
//             background-color: var(--phosphorous-color);
//         }

//         .potassium-fill {
//             background-color: var(--potassium-color);
//         }

//         /* Switch Toggle */
//         .switch-container {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 20px;
//         }

//         .switch {
//             position: relative;
//             display: inline-block;
//             width: 60px;
//             height: 34px;
//         }

//         .switch input {
//             opacity: 0;
//             width: 0;
//             height: 0;
//         }

//         .switch-slider {
//             position: absolute;
//             cursor: pointer;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background-color: #333;
//             transition: .4s;
//             border-radius: 34px;
//         }

//         .switch-slider:before {
//             position: absolute;
//             content: "";
//             height: 26px;
//             width: 26px;
//             left: 4px;
//             bottom: 4px;
//             background-color: white;
//             transition: .4s;
//             border-radius: 50%;
//         }

//         input:checked + .switch-slider {
//             background-color: var(--secondary-color);
//         }

//         input:checked + .switch-slider:before {
//             transform: translateX(26px);
//         }

//         /* Irrigation and Drainage Controls */
//         .control-group {
//             margin-bottom: 20px;
//         }

//         .control-group label {
//             display: block;
//             margin-bottom: 8px;
//             color: white;
//         }

//         .button-group {
//             display: flex;
//             gap: 10px;
//             margin-top: 20px;
//         }

//         .button-group .btn {
//             flex: 1;
//         }

//         .checkbox-container {
//             display: flex;
//             align-items: center;
//             margin-bottom: 15px;
//             color: white;
//         }

//         .checkbox-container input[type="checkbox"] {
//             margin-right: 10px;
//             width: 18px;
//             height: 18px;
//             color: white;
//         }

//         /* Disabled Controls */
//         .disabled-controls {
//             opacity: 0.5;
//             pointer-events: none;
//         }

//         /* Status Bar */
//         .status-bar {
//             background-color: rgba(0, 0, 0, 0.5);
//             padding: 10px 20px;
//             border-top: 1px solid rgba(44, 238, 252, 0.2);
//             display: flex;
//             justify-content: space-between;
//             font-size: 12px;
//             color: rgba(255, 255, 255, 0.5);
//         }

//         /* Responsive Design for Control Panel */
//         @media (max-width: 768px) {
//             .slider-container {
//                 flex-direction: column;
//                 align-items: stretch;
//                 gap: 10px;
//             }
            
//             .button-group {
//                 flex-direction: column;
//             }
            
//             .btn {
//                 width: 100%;
//                 margin-bottom: 10px;
//             }
            
//             .switch-container {
//                 flex-direction: column;
//                 align-items: flex-start;
//                 gap: 10px;
//             }
            
//             .switch {
//                 margin-top: 5px;
//             }
//         }

//         .space {
//             width: 100%;
//             height: 50px;
//         }

//         /* For very small screens */
//         @media (max-width: 480px) {
//             .header-title h1 {
//                 font-size: 1rem;
//             }
            
//             .grid-1 h1 {
//                 font-size: 1.2rem;
//             }
            
//             .panel-header h2 {
//                 font-size: 16px;
//             }
            
//             .tabs {
//                 grid-template-columns: 1fr;
//             }
            
//             .tab {
//                 padding: 8px;
//                 font-size: 14px;
//             }
//         }
//     </style>
//     <script>
//     function fetchData() {
//       fetch('/data')
//         .then(response => response.json())
//         .then(data => {
//           // Update NPK values
//           document.getElementById('npk-value').innerText = data.NPK;
          
//           // Update pH value
//           document.getElementById('ph-value').innerText = data.pH;
          
//           // Update temperature display
//           document.getElementById('temp-value').innerText = data.temperature + "°C";
//           const tempVal = parseFloat(data.temperature);
//           if (!isNaN(tempVal)) {
//             // Calculate rotation based on temperature (0-50°C range)
//             const tempRotation = Math.min(Math.max(tempVal / 50 * 180, 0), 180);
//             document.querySelector('.temperature-fill').style.transform = `rotate(${tempRotation}deg)`;
//           }
          
//           // Update humidity display
//           document.getElementById('humidity-value').innerText = data.humidity + "%";
//           const humidityVal = parseFloat(data.humidity);
//           if (!isNaN(humidityVal)) {
//             // Calculate rotation based on humidity (0-100% range)
//             const humidityRotation = Math.min(Math.max(humidityVal / 100 * 180, 0), 180);
//             document.querySelector('.humidity-fill').style.transform = `rotate(${humidityRotation}deg)`;
//           }
          
//           // Update moisture level
//           const moistureVal = parseFloat(data.moisture);
//           if (!isNaN(moistureVal)) {
//             document.querySelector('.moisture-value').innerText = moistureVal + "%";
//             document.querySelector('.moisture-level').style.height = moistureVal + "%";
//           }
          
//           // Update water level (assuming water level is derived from moisture)
//           const waterVal = parseFloat(data.moisture);
//           if (!isNaN(waterVal)) {
//             document.querySelector('.water-value').innerText = waterVal + "%";
//             document.querySelector('.water-level').style.height = waterVal + "%";
//           }
          
//           // Update EC value
//           document.getElementById('ec-value').innerText = data.ecValue;
          
//           // Update last updated time
//           document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
//         })
//         .catch(error => {
//           console.error('Error fetching data:', error);
//           document.getElementById('system-status').textContent = 'Error';
//         });
//     }
    
//     // Initial data fetch
//     document.addEventListener('DOMContentLoaded', function() {
//       fetchData();
//       // Set up interval for periodic updates
//       setInterval(fetchData, 2000); // Update every 2 seconds
//     });
//     </script>
//     </head>
//     <body>
//     <!-- Loading Screen -->
//     <div class="loading-screen" id="loading-screen">
//         <div class="loading-title">Smart Farming</div>
//         <div class="spinner"></div>
//     </div>

//     <div class="night"></div>
//     <div class="title">Smart Farming</div>

//     <div class="header-title">
//         <h1>SMART FARMING</h1>
//     </div>

//     <div class="main-content">
//         <div class="container">
//             <div class="grid-1">
//                 <h1>DATA AND STATISTICS</h1>
//             </div>
//             <div class="grid">
//                 <div class="nutrient-table">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Nutrient</th>
//                                 <th>Value</th>
//                                 <th>Level</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>NPK</td>
//                                 <td id="npk-value">-</td>
//                                 <td>
//                                     <div class="nutrient-level">
//                                         <div class="nutrient-level-fill high"></div>
//                                     </div>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>pH</td>
//                                 <td id="ph-value">-</td>
//                                 <td>
//                                     <div class="nutrient-level">
//                                         <div class="nutrient-level-fill medium"></div>
//                                     </div>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>EC</td>
//                                 <td id="ec-value">-</td>
//                                 <td>
//                                     <div class="nutrient-level">
//                                         <div class="nutrient-level-fill low"></div>
//                                     </div>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
                
//                 <!-- Nutrient Graph -->
//                 <div class="nutrient-graph">
//                     <h1>Nutrient Levels Over Time</h1>
//                     <div class="graph-container">
//                         <div class="graph-y-axis">
//                             <div class="graph-y-label">100</div>
//                             <div class="graph-y-label">75</div>
//                             <div class="graph-y-label">50</div>
//                             <div class="graph-y-label">25</div>
//                             <div class="graph-y-label">0</div>
//                         </div>
//                         <div class="graph-x-axis">
//                             <div class="graph-x-label">Mon</div>
//                             <div class="graph-x-label">Tue</div>
//                             <div class="graph-x-label">Wed</div>
//                             <div class="graph-x-label">Thu</div>
//                             <div class="graph-x-label">Fri</div>
//                             <div class="graph-x-label">Sat</div>
//                             <div class="graph-x-label">Sun</div>
//                         </div>
//                         <svg class="graph-line" viewBox="0 0 100 100" preserveAspectRatio="none">
//                             <!-- Nitrogen Line -->
//                             <polyline points="0,30 15,25 30,20 45,15 60,22 75,18 100,10" 
//                                     stroke="var(--nitrogen-color)" fill="none" stroke-width="2" />
//                             <!-- Phosphorous Line -->
//                             <polyline points="0,50 15,48 30,52 45,45 60,40 75,45 100,40" 
//                                     stroke="var(--phosphorous-color)" fill="none" stroke-width="2" />
//                             <!-- Potassium Line -->
//                             <polyline points="0,70 15,65 30,68 45,72 60,65 75,70 100,68" 
//                                     stroke="var(--potassium-color)" fill="none" stroke-width="2" />
//                         </svg>
//                     </div>
//                     <div class="graph-legend">
//                         <div class="legend-item">
//                             <div class="legend-color nitrogen-color"></div>
//                             <div class="legend-text">Nitrogen</div>
//                         </div>
//                         <div class="legend-item">
//                             <div class="legend-color phosphorous-color"></div>
//                             <div class="legend-text">Phosphorous</div>
//                         </div>
//                         <div class="legend-item">
//                             <div class="legend-color potassium-color"></div>
//                             <div class="legend-text">Potassium</div>
//                         </div>
//                     </div>
//                 </div>
                
//                 <!-- Temperature and Humidity -->
//                 <div class="climate-container">
//                     <h1>Climate Conditions</h1>
//                     <div class="gauges">
//                         <div class="gauge">
//                             <div class="gauge-title">Temperature</div>
//                             <div class="gauge-circle">
//                                 <div class="gauge-fill temperature-fill" style="transform: rotate(0deg)"></div>
//                                 <div class="gauge-center" id="temp-value">-</div>
//                                 <div class="gauge-marks">
//                                     <!-- Gauge marks will be added by JavaScript -->
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="gauge">
//                             <div class="gauge-title">Humidity</div>
//                             <div class="gauge-circle">
//                                 <div class="gauge-fill humidity-fill" style="transform: rotate(0deg)"></div>
//                                 <div class="gauge-center" id="humidity-value">-</div>
//                                 <div class="gauge-marks">
//                                     <!-- Gauge marks will be added by JavaScript -->
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//                 <!-- Enhanced Water Tank -->
//                 <div class="water-tank">
//                     <h1>Water Level</h1>
//                     <div class="water-container">
//                         <div class="water-level"></div>
//                         <div class="water-value">-</div>
//                         <div class="water-marks">
//                             <div class="water-mark"></div>
//                             <div class="water-mark"></div>
//                             <div class="water-mark"></div>
//                             <div class="water-mark"></div>
//                             <div class="water-mark"></div>
//                         </div>
//                         <div class="water-mark-label level-100">100%</div>
//                         <div class="water-mark-label level-75">75%</div>
//                         <div class="water-mark-label level-50">50%</div>
//                         <div class="water-mark-label level-25">25%</div>
//                         <div class="water-mark-label level-0">0%</div>
//                     </div>
//                 </div>
                
//                 <!-- Soil Moisture -->
//                 <div class="soil-moisture">
//                     <h1>Soil Moisture</h1>
//                     <div class="moisture-container">
//                         <div class="moisture-level"></div>
//                         <div class="moisture-value">-</div>
//                     </div>
//                 </div>
//             </div>
        
//             <!-- Control Panel -->
//             <div class="control-panel">
//                 <div class="panel-header">
//                     <h2>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                             <circle cx="12" cy="12" r="8"></circle>
//                             <line x1="12" y1="2" x2="12" y2="4"></line>
//                             <line x1="12" y1="20" x2="12" y2="22"></line>
//                             <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>
//                             <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>
//                             <line x1="2" y1="12" x2="4" y2="12"></line>
//                             <line x1="20" y1="12" x2="22" y2="12"></line>
//                             <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>
//                             <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line>
//                         </svg>
//                         Manual Control System
//                     </h2>
//                     <p>Adjust and monitor your farming parameters</p>
//                 </div>
        
//                 <div class="panel-content">
//                     <div class="tabs">
//                         <button class="tab active" data-tab="nutrients">Nutrients</button>
//                         <button class="tab" data-tab="irrigation">Irrigation</button>
//                         <button class="tab" data-tab="drainage">Drainage</button>
//                     </div>
        
//                     <!-- Nutrients Tab -->
//                     <div id="nutrients-tab" class="tab-content active">
//                         <!-- Nitrogen Control -->
//                         <div class="nutrient-control">
//                             <div class="nutrient-header">
//                                 <div class="nutrient-name">
//                                     <svg class="nutrient-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4287f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                                         <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"></path>
//                                         <path d="M12 22V15.5"></path>
//                                         <path d="M22 8.5L12 15.5L2 8.5"></path>
//                                         <path d="M12 2V8.5"></path>
//                                         <path d="M7 5.5L17 11.5"></path>
//                                     </svg>
//                                     <span>Nitrogen (N)</span>
//                                 </div>
//                                 <div class="nutrient-value" id="nitrogen-value">0%</div>
//                             </div>
//                             <div class="slider-container">
//                                 <input type="range" min="0" max="100" value="0" class="slider" id="nitrogen-slider">
//                                 <button class="btn btn-primary" id="nitrogen-btn" disabled>Dispense</button>
//                             </div>
//                             <div class="progress-bar">
//                                 <div class="progress-fill nitrogen-fill" id="nitrogen-fill"></div>
//                             </div>
//                         </div>
        
//                         <!-- Phosphorous Control -->
//                         <div class="nutrient-control">
//                             <div class="nutrient-header">
//                                 <div class="nutrient-name">
//                                     <svg class="nutrient-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f54242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                                         <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"></path>
//                                         <path d="M12 22V15.5"></path>
//                                         <path d="M22 8.5L12 15.5L2 8.5"></path>
//                                         <path d="M12 2V8.5"></path>
//                                         <path d="M7 5.5L17 11.5"></path>
//                                     </svg>
//                                     <span>Phosphorous (P)</span>
//                                 </div>
//                                 <div class="nutrient-value" id="phosphorous-value">0%</div>
//                             </div>
//                             <div class="slider-container">
//                                 <input type="range" min="0" max="100" value="0" class="slider" id="phosphorous-slider">
//                                 <button class="btn btn-primary" id="phosphorous-btn" disabled>Dispense</button>
//                             </div>
//                             <div class="progress-bar">
//                                 <div class="progress-fill phosphorous-fill" id="phosphorous-fill"></div>
//                             </div>
//                         </div>
        
//                         <!-- Potassium Control -->
//                         <div class="nutrient-control">
//                             <div class="nutrient-header">
//                                 <div class="nutrient-name">
//                                     <svg class="nutrient-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#42f59e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                                         <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"></path>
//                                         <path d="M12 22V15.5"></path>
//                                         <path d="M22 8.5L12 15.5L2 8.5"></path>
//                                         <path d="M12 2V8.5"></path>
//                                         <path d="M7 5.5L17 11.5"></path>
//                                     </svg>
//                                     <span>Potassium (K)</span>
//                                 </div>
//                                 <div class="nutrient-value" id="potassium-value">0%</div>
//                             </div>
//                             <div class="slider-container">
//                                 <input type="range" min="0" max="100" value="0" class="slider" id="potassium-slider">
//                                 <button class="btn btn-primary" id="potassium-btn" disabled>Dispense</button>
//                             </div>
//                             <div class="progress-bar">
//                                 <div class="progress-fill potassium-fill" id="potassium-fill"></div>
//                             </div>
//                         </div>
//                     </div>
        
//                     <!-- Irrigation Tab -->
//                     <div id="irrigation-tab" class="tab-content">
//                         <div class="switch-container">
//                             <div class="nutrient-name">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00a2ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                                     <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
//                                 </svg>
//                                 <span>Irrigation System</span>
//                             </div>
//                             <label class="switch">
//                                 <input type="checkbox" id="irrigation-toggle">
//                                 <span class="switch-slider"></span>
//                             </label>
//                         </div>
        
//                         <div id="irrigation-controls" class="disabled-controls">
//                             <div class="control-group">
//                                 <label for="flow-rate-slider">Flow Rate: <span id="flow-rate-value">50%</span></label>
//                                 <input type="range" min="0" max="100" value="50" class="slider" id="flow-rate-slider">
//                             </div>
        
//                             <div class="control-group">
//                                 <label for="duration-slider">Duration: <span id="duration-value">10</span> minutes</label>
//                                 <input type="range" min="1" max="60" value="10" class="slider" id="duration-slider">
//                             </div>
        
//                             <div class="checkbox-container">
//                                 <input type="checkbox" id="schedule-irrigation">
//                                 <label for="schedule-irrigation">Schedule Irrigation</label>
//                             </div>
        
//                             <div class="button-group">
//                                 <button class="btn btn-success" id="start-irrigation">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;">
//                                         <circle cx="12" cy="12" r="10"></circle>
//                                         <path d="M12 16l-4-4 4-4"></path>
//                                         <path d="M16 12H8"></path>
//                                     </svg>
//                                     Start Irrigation
//                                 </button>
//                                 <button class="btn btn-danger" id="stop-irrigation">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;">
//                                         <circle cx="12" cy="12" r="10"></circle>
//                                         <rect x="9" y="9" width="6" height="6"></rect>
//                                     </svg>
//                                     Stop
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
        
//                     <!-- Drainage Tab -->
//                     <div id="drainage-tab" class="tab-content">
//                         <div class="switch-container">
//                             <div class="nutrient-name">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#42f59e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                                     <circle cx="12" cy="12" r="10"></circle>
//                                     <path d="M8 12l4 4 4-4"></path>
//                                     <path d="M12 8v8"></path>
//                                 </svg>
//                                 <span>Drainage System</span>
//                             </div>
//                             <label class="switch">
//                                 <input type="checkbox" id="drainage-toggle">
//                                 <span class="switch-slider"></span>
//                             </label>
//                         </div>
        
//                         <div id="drainage-controls" class="disabled-controls">
//                             <div class="checkbox-container">
//                                 <input type="checkbox" id="auto-drainage" checked>
//                                 <label for="auto-drainage">Automatic Mode</label>
//                             </div>
        
//                             <div id="manual-drainage-controls" class="disabled-controls">
//                                 <div class="button-group">
//                                     <button class="btn btn-success" id="open-drainage">
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;">
//                                             <path d="M18 6L6 18"></path>
//                                             <path d="M6 6l12 12"></path>
//                                         </svg>
//                                         Open Drainage
//                                     </button>
//                                     <button class="btn btn-danger" id="close-drainage">
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;">
//                                             <path d="M18 6L6 18"></path>
//                                             <path d="M6 6l12 12"></path>
//                                         </svg>
//                                         Close Drainage
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
        
//                 <div class="status-bar">
//                     <div>System Status: <span id="system-status">Online</span></div>
//                     <div>Last Updated: <span id="last-updated"></span></div>
//                 </div>
//             </div>

//             <div class="space">.............</div>
//         </div>
//     </div>

//     <script>
//         // Loading screen handler
//         window.addEventListener('load', function() {
//             // Show loading screen for at least 2 seconds
//             setTimeout(function() {
//                 document.getElementById('loading-screen').classList.add('hidden');
//                 document.body.classList.add('loaded');
//             }, 2000);
            
//             // Create gauge marks
//             const gaugeMarks = document.querySelectorAll('.gauge-marks');
//             gaugeMarks.forEach(markContainer => {
//                 for (let i = 0; i < 10; i++) {
//                     const mark = document.createElement('div');
//                     mark.className = 'gauge-mark';
//                     mark.style.transform = `rotate(${i * 18}deg)`;
//                     mark.style.left = 'calc(50% - 1px)';
//                     markContainer.appendChild(mark);
//                 }
//             });
            
//             // Tab Switching
//             const tabs = document.querySelectorAll('.tab');
//             const tabContents = document.querySelectorAll('.tab-content');

//             tabs.forEach(tab => {
//                 tab.addEventListener('click', () => {
//                     const tabId = tab.getAttribute('data-tab');
                    
//                     // Update active tab
//                     tabs.forEach(t => t.classList.remove('active'));
//                     tab.classList.add('active');
                    
//                     // Show correct tab content
//                     tabContents.forEach(content => {
//                         content.classList.remove('active');
//                     });
//                     document.getElementById(tabId + '-tab').classList.add('active');
//                 });
//             });

//             // Nutrient Sliders
//             const setupNutrientSlider = (nutrient) => {
//                 const slider = document.getElementById(`${nutrient}-slider`);
//                 const value = document.getElementById(`${nutrient}-value`);
//                 const fill = document.getElementById(`${nutrient}-fill`);
//                 const btn = document.getElementById(`${nutrient}-btn`);
                
//                 slider.addEventListener('input', () => {
//                     const sliderValue = slider.value;
//                     value.textContent = `${sliderValue}%`;
//                     fill.style.width = `${sliderValue}%`;
                    
//                     // Enable/disable button based on value
//                     if (sliderValue > 0) {
//                         btn.disabled = false;
//                     } else {
//                         btn.disabled = true;
//                     }
//                 });
                
//                 btn.addEventListener('click', () => {
//                     // Send command to ESP32
//                     sendCommand(`dispense_${nutrient}`, slider.value);
                    
//                     // Visual feedback
//                     btn.textContent = 'Dispensing...';
//                     btn.disabled = true;
                    
//                     // Reset after 3 seconds
//                     setTimeout(() => {
//                         slider.value = 0;
//                         value.textContent = '0%';
//                         fill.style.width = '0%';
//                         btn.textContent = 'Dispense';
//                         btn.disabled = true;
                        
//                         // Update last updated time
//                         document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
//                     }, 3000);
//                 });
//             };

//             setupNutrientSlider('nitrogen');
//             setupNutrientSlider('phosphorous');
//             setupNutrientSlider('potassium');

//             // Irrigation System
//             const irrigationToggle = document.getElementById('irrigation-toggle');
//             const irrigationControls = document.getElementById('irrigation-controls');
//             const flowRateSlider = document.getElementById('flow-rate-slider');
//             const flowRateValue = document.getElementById('flow-rate-value');
//             const durationSlider = document.getElementById('duration-slider');
//             const durationValue = document.getElementById('duration-value');
//             const startIrrigationBtn = document.getElementById('start-irrigation');
//             const stopIrrigationBtn = document.getElementById('stop-irrigation');

//             irrigationToggle.addEventListener('change', () => {
//                 if (irrigationToggle.checked) {
//                     irrigationControls.classList.remove('disabled-controls');
//                     sendCommand('irrigation_system', 'on');
//                 } else {
//                     irrigationControls.classList.add('disabled-controls');
//                     sendCommand('irrigation_system', 'off');
//                 }
                
//                 // Update last updated time
//                 document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
//             });

//             flowRateSlider.addEventListener('input', () => {
//                 flowRateValue.textContent = `${flowRateSlider.value}%`;
//             });

//             durationSlider.addEventListener('input', () => {
//                 durationValue.textContent = durationSlider.value;
//             });

//             startIrrigationBtn.addEventListener('click', () => {
//                 if (irrigationToggle.checked) {
//                     sendCommand('start_irrigation', {
//                         flowRate: flowRateSlider.value,
//                         duration: durationSlider.value
//                     });
                    
//                     // Visual feedback
//                     startIrrigationBtn.textContent = 'Starting...';
//                     startIrrigationBtn.disabled = true;
                    
//                     setTimeout(() => {
//                         startIrrigationBtn.textContent = 'Start Irrigation';
//                         startIrrigationBtn.disabled = false;
                        
//                         // Update last updated time
//                         document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
//                     }, 2000);
//                 }
//             });

//             stopIrrigationBtn.addEventListener('click', () => {
//                 if (irrigationToggle.checked) {
//                     sendCommand('stop_irrigation', {});
                    
//                     // Update last updated time
//                     document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
//                 }
//             });

//             // Drainage System
//             const drainageToggle = document.getElementById('drainage-toggle');
//             const drainageControls = document.getElementById('drainage-controls');
//             const autoDrainageToggle = document.getElementById('auto-drainage');
//             const manualDrainageControls = document.getElementById('manual-drainage-controls');
//             const openDrainageBtn = document.getElementById('open-drainage');
//             const closeDrainageBtn = document.getElementById('close-drainage');

//             drainageToggle.addEventListener('change', () => {
//                 if (drainageToggle.checked) {
//                     drainageControls.classList.remove('disabled-controls');
//                     sendCommand('drainage_system', 'on');
                    
//                     // Check auto mode
//                     if (autoDrainageToggle.checked) {
//                         manualDrainageControls.classList.add('disabled-controls');
//                     } else {
//                         manualDrainageControls.classList.remove('disabled-controls');
//                     }
//                 } else {
//                     drainageControls.classList.add('disabled-controls');
//                     sendCommand('drainage_system', 'off');
//                 }
                
//                 // Update last updated time
//                 document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
//             });

//             autoDrainageToggle.addEventListener('change', () => {
//                 if (autoDrainageToggle.checked) {
//                     manualDrainageControls.classList.add('disabled-controls');
//                     sendCommand('drainage_mode', 'auto');
//                 } else {
//                     manualDrainageControls.classList.remove('disabled-controls');
//                     sendCommand('drainage_mode', 'manual');
//                 }
                
//                 // Update last updated time
//                 document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
//             });

//             openDrainageBtn.addEventListener('click', () => {
//                 if (drainageToggle.checked && !autoDrainageToggle.checked) {
//                     sendCommand('open_drainage', {});
                    
//                     // Visual feedback
//                     openDrainageBtn.textContent = 'Opening...';
//                     openDrainageBtn.disabled = true;
                    
//                     setTimeout(() => {
//                         openDrainageBtn.textContent = 'Open Drainage';
//                         openDrainageBtn.disabled = false;
                        
//                         // Update last updated time
//                         document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
//                     }, 2000);
//                 }
//             });

//             closeDrainageBtn.addEventListener('click', () => {
//                 if (drainageToggle.checked && !autoDrainageToggle.checked) {
//                     sendCommand('close_drainage', {});
                    
//                     // Visual feedback
//                     closeDrainageBtn.textContent = 'Closing...';
//                     closeDrainageBtn.disabled = true;
                    
//                     setTimeout(() => {
//                         closeDrainageBtn.textContent = 'Close Drainage';
//                         closeDrainageBtn.disabled = false;
                        
//                         // Update last updated time
//                         document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
//                     }, 2000);
//                 }
//             });

//             // Function to send commands to ESP32
//             function sendCommand(command, value) {
//                 console.log(`Sending command: ${command}, value: ${JSON.stringify(value)}`);
                
//                 // For ESP32 integration, you would use fetch or XMLHttpRequest
//                 fetch(`/api/${command}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ value: value }),
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log('Success:', data);
//                     document.getElementById('system-status').textContent = 'Online';
//                 })
//                 .catch((error) => {
//                     console.error('Error:', error);
//                     document.getElementById('system-status').textContent = 'Error';
//                 });
//             }
//         });

//         // Browser compatibility check
//         function checkBrowserCompatibility() {
//             // Check for CSS Grid support
//             if (window.CSS && CSS.supports && !CSS.supports('display', 'grid')) {
//                 console.warn('Your browser does not fully support CSS Grid. Some layout features may not display correctly.');
//             }
            
//             // Check for Flexbox support
//             if (window.CSS && CSS.supports && !CSS.supports('display', 'flex')) {
//                 console.warn('Your browser does not fully support Flexbox. Some layout features may not display correctly.');
//             }
            
//             // Check for SVG support
//             if (!(document.implementation && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"))) {
//                 console.warn('Your browser does not fully support SVG. Some graphics may not display correctly.');
//             }
//         }
        
//         // Run compatibility check
//         checkBrowserCompatibility();
        
//         // Handle window resize events for responsive adjustments
//         window.addEventListener('resize', function() {
//             // Adjust gauge sizes for small screens
//             if (window.innerWidth <= 480) {
//                 const gaugeCircles = document.querySelectorAll('.gauge-circle');
//                 gaugeCircles.forEach(circle => {
//                     circle.style.width = '120px';
//                     circle.style.height = '120px';
//                 });
//             } else {
//                 const gaugeCircles = document.querySelectorAll('.gauge-circle');
//                 gaugeCircles.forEach(circle => {
//                     circle.style.width = '150px';
//                     circle.style.height = '150px';
//                 });
//             }
//         });
//     </script>
// </body>
//     </html>
//   )rawliteral";
// }

// void handleRoot() {
//   generatePage();
//   server.send(200, "text/html", html_page);
// }

// void handleData() {
//   String json = "{";
//   json += "\"NPK\":\"" + NPK + "\",";
//   json += "\"pH\":\"" + pH + "\",";
//   json += "\"temperature\":\"" + temperature + "\",";
//   json += "\"humidity\":\"" + humidity + "\",";
//   json += "\"moisture\":\"" + moisture + "\",";
//   json += "\"ecValue\":\"" + ecValue + "\"";
//   json += "}";
//   server.send(200, "application/json", json);
// }

// // API endpoint for commands
// void handleCommand() {
//   if (server.method() != HTTP_POST) {
//     server.send(405, "text/plain", "Method Not Allowed");
//     return;
//   }
  
//   String command = server.uri().substring(5); // Remove "/api/" prefix
//   String body = server.arg("plain");
  
//   // Log the command
//   Serial.println("Command received: " + command);
//   Serial.println("Body: " + body);
  
//   // Process command (you can expand this based on your needs)
//   if (command.startsWith("dispense_")) {
//     // Handle nutrient dispensing
//     server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Dispensing nutrient\"}");
//   } else if (command == "irrigation_system") {
//     // Handle irrigation system toggle
//     server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Irrigation system toggled\"}");
//   } else if (command == "start_irrigation") {
//     // Handle start irrigation
//     server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Irrigation started\"}");
//   } else if (command == "stop_irrigation") {
//     // Handle stop irrigation
//     server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Irrigation stopped\"}");
//   } else if (command == "drainage_system") {
//     // Handle drainage system toggle
//     server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Drainage system toggled\"}");
//   } else if (command == "drainage_mode") {
//     // Handle drainage mode change
//     server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Drainage mode changed\"}");
//   } else if (command == "open_drainage" || command == "close_drainage") {
//     // Handle drainage control
//     server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Drainage control updated\"}");
//   } else {
//     // Unknown command
//     server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Unknown command\"}");
//   }
// }

// void setup() {
//   Serial.begin(9600);
//   Serial2.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17
  
//   WiFi.softAPConfig(apIP, gateway, subnet);
//   WiFi.softAP(ssid, password);
//   dnsServer.start(DNS_PORT, "*", apIP);

//      // Connect to Router (STA mode)
//     WiFi.begin(ssid_sta, pass_sta);
//     Serial.print("Connecting to Wi-Fi");
//     while (WiFi.status() != WL_CONNECTED) {
//         delay(500);
//         Serial.print(".");
//     }
  
//   server.on("/", handleRoot);
//   server.on("/data", handleData);  // JSON endpoint
  
//   // Add API route handler for commands
//   // server.on(UriBraces("/api/{}"), handleCommand);
  
//   server.onNotFound(handleRoot);
//   server.begin();

//   Serial.println("✅ ESP32 Wi-Fi Server with AJAX Started");
//   Serial.println(WiFi.softAPIP());
// }

// void sendDataToServer() {
//     if (WiFi.status() == WL_CONNECTED) {
//         HTTPClient http;
//         http.begin(serverUrl);
//         http.addHeader("Content-Type", "application/json");

//         String jsonData = "{\"n\":\"" + nitrogen + "\",\"p\":\"" + phosphorous + "\",\"k\":\"" + potassium +  "\",\"temperature\":\"" + temperature + "\",\"humidity\":\"" + humidity + "\",\"moisture\":\"" + moisture + "\",\"water_level\":\"" + 0 + "\"}";

//         int httpResponseCode = http.POST(jsonData);
//         if (httpResponseCode > 0) {
//             Serial.println("Data sent successfully: " + jsonData);
//             String response = http.getString();
//             Serial.println("Server response: " + response);
//         } else {
//             Serial.print("Error sending data: ");
//             Serial.println(httpResponseCode);
//         }
//         http.end();
//     } else {
//         Serial.println("Wi-Fi Disconnected");
//     }
// }

// void parseData(String data) {
//   int nIndex = data.indexOf("N:") + 2;
//   int pIndex = data.indexOf("P:") + 2;
//   int kIndex = data.indexOf("K:") + 2;
//   int moistureIndex = data.indexOf("Moisture:") + 9;
//   int tempIndex = data.indexOf("Temp:") + 5;
//   int ecIndex = data.indexOf("EC:") + 3;
//   int humidityIndex = data.indexOf("Humidity:") + 9;
//   int phIndex = data.indexOf("pH:") + 3;

//   // Check if all indices are valid before extracting data
//   if (nIndex > 1 && pIndex > 1 && kIndex > 1) {
//     int n = data.substring(nIndex, data.indexOf(",", nIndex)).toInt();
//     int p = data.substring(pIndex, data.indexOf(",", pIndex)).toInt();
//     int k = data.substring(kIndex, data.indexOf(",", kIndex)).toInt();
//     NPK = String(n) + "-" + String(p) + "-" + String(k);
//     nitrogen = String(n);
//     phosphorous = String(p);
//     potassium = String(k);
//   }
  
//   if (moistureIndex > 8) {
//     float moistureVal = data.substring(moistureIndex, data.indexOf(",", moistureIndex)).toFloat();
//     moisture = String(moistureVal);
//   }
  
//   if (tempIndex > 4) {
//     float tempVal = data.substring(tempIndex, data.indexOf(",", tempIndex)).toFloat();
//     temperature = String(tempVal);
//   }
  
//   if (ecIndex > 2) {
//     float ecVal = data.substring(ecIndex, data.indexOf(",", ecIndex)).toFloat();
//     ecValue = String(ecVal);
//   }
  
//   if (humidityIndex > 8) {
//     float humidityVal = data.substring(humidityIndex, data.indexOf(",", humidityIndex)).toFloat();
//     humidity = String(humidityVal);
//   }
  
//   if (phIndex > 2) {
//     float phVal = data.substring(phIndex).toFloat();
//     pH = String(phVal);
//   }
// }

// void loop() {
//   dnsServer.processNextRequest();
//   server.handleClient();

//   if (Serial2.available()) {
//     String data = Serial2.readStringUntil('\n');
//     data.trim();
//     if (data.length() > 0) {
//       Serial.println("Received: " + data);
//       parseData(data);
//     }
//   }

//     sendDataToServer();
//     delay(5000);
// }



#include <WiFi.h>
#include <WebServer.h>
#include <DNSServer.h>
#include <HTTPClient.h>

const char *ssid = "SMART-FARMING-ESP32";
const char *password = "smartfarming";
const char *serverUrl = "http://192.168.8.100:8080/api/npk/add";

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

void handleRoot() {
  generatePage();
  server.send(200, "text/html", html_page);
}

void handleData() {
  // Escape special characters in variables (if needed)
  NPK.replace("\"", "\\\"");
  pH.replace("\"", "\\\"");
  temperature.replace("\"", "\\\"");
  humidity.replace("\"", "\\\"");
  moisture.replace("\"", "\\\"");
  ecValue.replace("\"", "\\\"");

  // Create JSON string
  String json = "{";
  json += "\"NPK\":\"" + NPK + "\",";
  json += "\"pH\":\"" + pH + "\",";
  json += "\"temperature\":\"" + temperature + "\",";
  json += "\"humidity\":\"" + humidity + "\",";
  json += "\"moisture\":\"" + moisture + "\",";
  json += "\"ecValue\":\"" + ecValue + "\"";
  json += "}";

  // Send JSON response
  server.send(200, "application/json", json);
}

// API endpoint for commands
void handleCommand() {
  if (server.method() != HTTP_POST) {
    server.send(405, "text/plain", "Method Not Allowed");
    return;
  }

  String command = server.uri().substring(5);  // Remove "/api/" prefix
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

void sendDataToServer() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String jsonData = "{\"n\":\"" + nitrogen + "\",\"p\":\"" + phosphorous + "\",\"k\":\"" + potassium + "\",\"temperature\":\"" + temperature + "\",\"humidity\":\"" + humidity + "\",\"moisture\":\"" + moisture + "\",\"water_level\":\"" + 0 + "\"}";

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

  if (moistureIndex > 0) {
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

  if (humidityIndex > 0) {
    float humidityVal = data.substring(humidityIndex, data.indexOf(",", humidityIndex)).toFloat();
    humidity = String(humidityVal);
  }

  if (phIndex > 2) {
    float phVal = data.substring(phIndex).toFloat();
    pH = String(phVal);
  }
}

void generatePage() {
  html_page = R"rawliteral(
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Farming Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* Base styles and CSS variables */
    :root {
      --background: #ffffff;
      --foreground: #0f172a;
      --card: #ffffff;
      --card-foreground: #0f172a;
      --border: #e2e8f0;
      --input: #e2e8f0;
      --primary: #23f0ff;
      --primary-foreground: #0f172a;
      --secondary: #1eaf4a;
      --secondary-foreground: #0f172a;
      --muted: #f1f5f9;
      --muted-foreground: #64748b;
      --accent: #f1f5f9;
      --accent-foreground: #0f172a;
      --destructive: #ef4444;
      --destructive-foreground: #f8fafc;
      --radius: 0.5rem;
      
      --nitrogen-color: #4287f5;
      --phosphorous-color: #f54242;
      --potassium-color: #42f59e;
    }

    .dark {
      --background: #0f172a;
      --foreground: #f8fafc;
      --card: #1e293b;
      --card-foreground: #f8fafc;
      --border: #334155;
      --input: #334155;
      --primary: #23f0ff;
      --primary-foreground: #0f172a;
      --secondary: #1eaf4a;
      --secondary-foreground: #f8fafc;
      --muted: #1e293b;
      --muted-foreground: #94a3b8;
      --accent: #1e293b;
      --accent-foreground: #f8fafc;
      --destructive: #7f1d1d;
      --destructive-foreground: #f8fafc;
    }

    /* Reset and base styles */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      height: fit-content;
      font-family: 'Inter', sans-serif;
      background-color: var(--background);
      color: var(--foreground);
      transition: background-color 0.3s, color 0.3s;
    }

    /* Layout */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      margin-bottom: 1.5rem;
    }

    .title {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .status-display {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .status-text {
      font-size: 0.875rem;
      color: var(--muted-foreground);
    }

    .status-online {
      color: var(--secondary);
      font-weight: 500;
    }

    /* Grid layouts */
    .grid {
      display: grid;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .grid-4 {
      grid-template-columns: repeat(1, 1fr);
    }

    .grid-2 {
      grid-template-columns: repeat(1, 1fr);
    }

    @media (min-width: 768px) {
      .grid-4 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .grid-4 {
        grid-template-columns: repeat(4, 1fr);
      }
      
      .grid-2 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* Card styles */
    .card {
      background-color: var(--card);
      border-radius: var(--radius);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: background-color 0.3s;
    }

    .card-header {
      padding: 1rem 1.5rem 0.5rem;
    }

    .card-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--muted-foreground);
      margin-bottom: 0.25rem;
    }

    .card-content {
      padding: 0.5rem 1.5rem 1.5rem;
    }

    .value-large {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .value-note {
      font-size: 0.75rem;
      color: var(--muted-foreground);
      margin-top: 0.25rem;
    }

    /* Table styles */
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }

    th {
      font-weight: 500;
      color: var(--muted-foreground);
    }

    /* Progress bar */
    .progress-bar {
      width: 100%;
      height: 0.5rem;
      background-color: var(--muted);
      border-radius: 9999px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      border-radius: 9999px;
      transition: width 0.3s ease;
    }

    .progress-fill-high {
      width: 90%;
      background: linear-gradient(to right, var(--primary), var(--secondary));
    }

    .progress-fill-medium {
      width: 60%;
      background: linear-gradient(to right, var(--primary), var(--secondary));
    }

    .progress-fill-low {
      width: 30%;
      background: linear-gradient(to right, var(--primary), var(--secondary));
    }

    /* Graph styles */
    .graph-container {
      position: relative;
      width: 100%;
      height: 200px;
      border-bottom: 1px solid var(--border);
      border-left: 1px solid var(--border);
      margin-top: 1.5rem;
      padding-bottom: 1.5rem;
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
      transform: translateX(-100%);
      margin-left: -5px;
      font-size: 0.75rem;
      color: var(--muted-foreground);
    }

    .graph-x-axis {
      position: absolute;
      bottom: -20px;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .graph-x-label {
      font-size: 0.75rem;
      color: var(--muted-foreground);
    }

    .graph-svg {
      position: absolute;
      bottom: 0;
      left: 20px;
      width: calc(100% - 20px);
      height: 100%;
    }

    .graph-legend {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
    }

    .legend-color {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 0.25rem;
      margin-right: 0.5rem;
    }

    .legend-text {
      font-size: 0.75rem;
    }

    /* Tank and moisture styles */
    .tank-container, .moisture-container {
      position: relative;
      width: 100%;
      height: 200px;
      border-radius: var(--radius);
      overflow: hidden;
    }

    .tank-container {
      background: linear-gradient(to bottom, #0a3b5c, #0d5c8c);
    }

    .moisture-container {
      background: linear-gradient(to bottom, #6b3d1a, #8b5a2b);
    }

    .tank-fill, .moisture-fill {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      transition: height 1s ease-in-out;
    }

    .tank-fill {
      background: linear-gradient(to bottom, rgba(0, 204, 255, 0.3), rgba(0, 68, 255, 0.8));
    }

    .moisture-fill {
      background: linear-gradient(to bottom, rgba(0, 68, 255, 0.3), rgba(0, 68, 255, 0.8));
    }

    .tank-value, .moisture-value {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
    }

    .tank-markers {
      position: absolute;
      right: 0;
      height: 100%;
      width: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.5rem 0;
    }

    .tank-marker {
      position: relative;
      width: 100%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.5);
    }

    .tank-marker::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      width: 10px;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.8);
    }

    .tank-marker-label {
      position: absolute;
      right: 15px;
      color: white;
      font-size: 0.75rem;
      transform: translateY(-50%);
    }

    /* Tabs */
    .tabs {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .tab-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tab-trigger {
      padding: 0.5rem;
      background-color: var(--muted);
      color: var(--muted-foreground);
      border: none;
      border-radius: var(--radius);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .tab-trigger:hover {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }

    .tab-trigger.active {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
    }

    /* Form controls */
    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .slider-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .slider {
      flex: 1;
      -webkit-appearance: none;
      height: 0.5rem;
      background-color: var(--muted);
      border-radius: 9999px;
      outline: none;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: var(--primary);
      cursor: pointer;
    }

    .slider::-moz-range-thumb {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: var(--primary);
      border: none;
      cursor: pointer;
    }

    .slider-value {
      font-size: 0.875rem;
      min-width: 2.5rem;
      text-align: right;
    }

    .switch-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 3rem;
      height: 1.5rem;
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
      background-color: var(--muted);
      transition: 0.4s;
      border-radius: 1.5rem;
    }

    .switch-slider:before {
      position: absolute;
      content: "";
      height: 1rem;
      width: 1rem;
      left: 0.25rem;
      bottom: 0.25rem;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }

    input:checked + .switch-slider {
      background-color: var(--secondary);
    }

    input:checked + .switch-slider:before {
      transform: translateX(1.5rem);
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    .checkbox-container input[type="checkbox"] {
      margin-right: 0.5rem;
      width: 1rem;
      height: 1rem;
    }

    /* Buttons */
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      border-radius: var(--radius);
      border: none;
      cursor: pointer;
      transition: background-color 0.2s, opacity 0.2s;
    }

    .button-primary {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    .button-primary:hover {
      opacity: 0.9;
    }

    .button-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button-destructive {
      background-color: var(--destructive);
      color: var(--destructive-foreground);
    }

    .button-destructive:hover {
      opacity: 0.9;
    }

    .button-destructive:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button-outline {
      background-color: transparent;
      color: var(--foreground);
      border: 1px solid var(--border);
    }

    .button-outline:hover {
      background-color: var(--muted);
    }

    .button-icon {
      padding: 0.5rem;
      border-radius: 9999px;
    }

    .button-group {
      display: flex;
      gap: 0.5rem;
    }

    .button-group .button {
      flex: 1;
    }

    /* Icons */
    .icon {
      width: 1.25rem;
      height: 1.25rem;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
    }

    .icon-small {
      width: 1rem;
      height: 1rem;
    }

    /* Utilities */
    .flex {
      display: flex;
    }

    .items-center {
      align-items: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .gap-2 {
      gap: 0.5rem;
    }

    .gap-4 {
      gap: 1rem;
    }

    .mt-4 {
      margin-top: 1rem;
    }

    .mt-6 {
      margin-top: 1.5rem;
    }

    .mb-2 {
      margin-bottom: 0.5rem;
    }

    .mb-4 {
      margin-bottom: 1rem;
    }

    .space-y-2 > * + * {
      margin-top: 0.5rem;
    }

    .space-y-4 > * + * {
      margin-top: 1rem;
    }

    .space-y-6 > * + * {
      margin-top: 1.5rem;
    }

    .w-full {
      width: 100%;
    }

    .disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Footer */
    .footer {
      display: flex;
      justify-content: space-between;
      padding: 1rem 0;
      margin-top: 2rem;
      border-top: 1px solid var(--border);
      font-size: 0.875rem;
      color: var(--muted-foreground);
    }

    /* Dark mode toggle */
    .theme-toggle {
      background-color: transparent;
      border: 1px solid var(--border);
      border-radius: 9999px;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--foreground);
    }

    .theme-toggle:hover {
      background-color: var(--muted);
    }

    .sun-icon, .moon-icon {
      position: absolute;
      transition: transform 0.2s, opacity 0.2s;
    }

    .sun-icon {
      opacity: 1;
      transform: rotate(0) scale(1);
    }

    .moon-icon {
      opacity: 0;
      transform: rotate(90deg) scale(0);
    }

    .dark .sun-icon {
      opacity: 0;
      transform: rotate(-90deg) scale(0);
    }

    .dark .moon-icon {
      opacity: 1;
      transform: rotate(0) scale(1);
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1 class="title">Smart Farming Dashboard</h1>
      <div class="status-display">
        <div class="status-text">
          System: <span class="status-online" id="system-status">Online</span>
        </div>
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
          <svg class="icon sun-icon" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="icon moon-icon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </div>
    </header>

    <div class="grid grid-4">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Temperature</div>
        </div>
        <div class="card-content">
          <div class="value-large" id="temperature-value">24°C</div>
          <div class="value-note">Optimal range: 20-30°C</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">Humidity</div>
        </div>
        <div class="card-content">
          <div class="value-large" id="humidity-value">65%</div>
          <div class="value-note">Optimal range: 60-80%</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">Soil Moisture</div>
        </div>
        <div class="card-content">
          <div class="value-large" id="moisture-value">45%</div>
          <div class="value-note">Optimal range: 40-60%</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">Water Level</div>
        </div>
        <div class="card-content">
          <div class="value-large" id="water-value">78%</div>
          <div class="value-note">Tank capacity: 100 liters</div>
        </div>
      </div>
    </div>

    <div class="grid grid-2">
      <!-- Nutrient Table -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Nutrient Levels</div>
        </div>
        <div class="card-content">
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
                <td id="npk-value">N: 120, P: 80, K: 60</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill progress-fill-high"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>pH</td>
                <td id="ph-value">6.5</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill progress-fill-medium"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>EC</td>
                <td id="ec-value">1.2 mS/cm</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill progress-fill-low"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Nutrient Graph -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">NPK Trends</div>
        </div>
        <div class="card-content">
          <div class="graph-container">
            <div class="graph-y-axis">
              <div class="graph-y-label">100</div>
              <div class="graph-y-label">75</div>
              <div class="graph-y-label">50</div>
              <div class="graph-y-label">25</div>
              <div class="graph-y-label">0</div>
            </div>
            <svg id="nutrient-graph" class="graph-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <!-- Graph lines will be added by JavaScript -->
            </svg>
            <div class="graph-x-axis">
              <div class="graph-x-label">0</div>
              <div class="graph-x-label">5</div>
              <div class="graph-x-label">10</div>
              <div class="graph-x-label">15</div>
              <div class="graph-x-label">20</div>
            </div>
          </div>
          <div class="graph-legend">
            <div class="legend-item">
              <div class="legend-color" style="background-color: var(--nitrogen-color);"></div>
              <div class="legend-text">Nitrogen</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: var(--phosphorous-color);"></div>
              <div class="legend-text">Phosphorous</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: var(--potassium-color);"></div>
              <div class="legend-text">Potassium</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-2">
      <!-- Water Tank -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Water Tank</div>
        </div>
        <div class="card-content">
          <div class="tank-container">
            <div class="tank-fill" id="tank-fill" style="height: 78%;"></div>
            <div class="tank-value" id="tank-value">78%</div>
            <div class="tank-markers">
              <div class="tank-marker">
                <div class="tank-marker-label">100%</div>
              </div>
              <div class="tank-marker">
                <div class="tank-marker-label">75%</div>
              </div>
              <div class="tank-marker">
                <div class="tank-marker-label">50%</div>
              </div>
              <div class="tank-marker">
                <div class="tank-marker-label">25%</div>
              </div>
              <div class="tank-marker">
                <div class="tank-marker-label">0%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Soil Moisture -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Soil Moisture</div>
        </div>
        <div class="card-content">
          <div class="moisture-container">
            <div class="moisture-fill" id="moisture-fill" style="height: 45%;"></div>
            <div class="moisture-value" id="moisture-display">45%</div>
            <div class="tank-markers">
              <div class="tank-marker">
                <div class="tank-marker-label">100%</div>
              </div>
              <div class="tank-marker">
                <div class="tank-marker-label">75%</div>
              </div>
              <div class="tank-marker">
                <div class="tank-marker-label">50%</div>
              </div>
              <div class="tank-marker">
                <div class="tank-marker-label">25%</div>
              </div>
              <div class="tank-marker">
                <div class="tank-marker-label">0%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Control Panel -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">System Controls</div>
      </div>
      <div class="card-content">
        <div class="tabs">
          <div class="tab-list">
            <button class="tab-trigger active" data-tab="nutrients">
              <svg class="icon icon-small" viewBox="0 0 24 24">
                <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"></path>
                <path d="M12 22V15.5"></path>
                <path d="M22 8.5L12 15.5L2 8.5"></path>
                <path d="M12 2V8.5"></path>
                <path d="M7 5.5L17 11.5"></path>
              </svg>
              <span class="tab-text">Nutrients</span>
            </button>
            <button class="tab-trigger" data-tab="irrigation">
              <svg class="icon icon-small" viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
              <span class="tab-text">Irrigation</span>
            </button>
            <button class="tab-trigger" data-tab="drainage">
              <svg class="icon icon-small" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12l4 4 4-4"></path>
                <path d="M12 8v8"></path>
              </svg>
              <span class="tab-text">Drainage</span>
            </button>
            <button class="tab-trigger" data-tab="settings">
              <svg class="icon icon-small" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span class="tab-text">Settings</span>
            </button>
          </div>

          <!-- Nutrients Tab -->
          <div id="nutrients-tab" class="tab-content active">
            <!-- Nitrogen Control -->
            <div class="form-group">
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-2">
                  <svg class="icon icon-small" viewBox="0 0 24 24" style="color: var(--nitrogen-color);">
                    <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"></path>
                    <path d="M12 22V15.5"></path>
                    <path d="M22 8.5L12 15.5L2 8.5"></path>
                    <path d="M12 2V8.5"></path>
                    <path d="M7 5.5L17 11.5"></path>
                  </svg>
                  <span class="form-label">Nitrogen (N)</span>
                </div>
                <span class="slider-value" id="nitrogen-value">0%</span>
              </div>
              <div class="slider-container">
                <input type="range" min="0" max="100" value="0" class="slider" id="nitrogen-slider">
                <button class="button button-primary" id="nitrogen-btn" disabled>Dispense</button>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" id="nitrogen-fill" style="width: 0%; background-color: var(--nitrogen-color);"></div>
              </div>
            </div>

            <!-- Phosphorous Control -->
            <div class="form-group">
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-2">
                  <svg class="icon icon-small" viewBox="0 0 24 24" style="color: var(--phosphorous-color);">
                    <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"></path>
                    <path d="M12 22V15.5"></path>
                    <path d="M22 8.5L12 15.5L2 8.5"></path>
                    <path d="M12 2V8.5"></path>
                    <path d="M7 5.5L17 11.5"></path>
                  </svg>
                  <span class="form-label">Phosphorous (P)</span>
                </div>
                <span class="slider-value" id="phosphorous-value">0%</span>
              </div>
              <div class="slider-container">
                <input type="range" min="0" max="100" value="0" class="slider" id="phosphorous-slider">
                <button class="button button-primary" id="phosphorous-btn" disabled>Dispense</button>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" id="phosphorous-fill" style="width: 0%; background-color: var(--phosphorous-color);"></div>
              </div>
            </div>

            <!-- Potassium Control -->
            <div class="form-group">
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-2">
                  <svg class="icon icon-small" viewBox="0 0 24 24" style="color: var(--potassium-color);">
                    <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"></path>
                    <path d="M12 22V15.5"></path>
                    <path d="M22 8.5L12 15.5L2 8.5"></path>
                    <path d="M12 2V8.5"></path>
                    <path d="M7 5.5L17 11.5"></path>
                  </svg>
                  <span class="form-label">Potassium (K)</span>
                </div>
                <span class="slider-value" id="potassium-value">0%</span>
              </div>
              <div class="slider-container">
                <input type="range" min="0" max="100" value="0" class="slider" id="potassium-slider">
                <button class="button button-primary" id="potassium-btn" disabled>Dispense</button>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" id="potassium-fill" style="width: 0%; background-color: var(--potassium-color);"></div>
              </div>
            </div>
          </div>

          <!-- Irrigation Tab -->
          <div id="irrigation-tab" class="tab-content">
            <div class="switch-container">
              <div class="flex items-center gap-2">
                <svg class="icon icon-small" viewBox="0 0 24 24" style="color: #00a2ff;">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
                <span class="form-label">Irrigation System</span>
              </div>
              <label class="switch">
                <input type="checkbox" id="irrigation-toggle">
                <span class="switch-slider"></span>
              </label>
            </div>

            <div id="irrigation-controls" class="disabled">
              <div class="form-group">
                <label class="form-label" for="flow-rate-slider">Flow Rate: <span id="flow-rate-value">50%</span></label>
                <input type="range" min="0" max="100" value="50" class="slider" id="flow-rate-slider">
              </div>

              <div class="form-group">
                <label class="form-label" for="duration-slider">Duration: <span id="duration-value">10</span> minutes</label>
                <input type="range" min="1" max="60" value="10" class="slider" id="duration-slider">
              </div>

              <div class="checkbox-container">
                <input type="checkbox" id="schedule-irrigation">
                <label for="schedule-irrigation">Schedule Irrigation</label>
              </div>

              <div class="button-group mt-4">
                <button class="button button-primary" id="start-irrigation">
                  <svg class="icon icon-small" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Start Irrigation
                </button>
                <button class="button button-destructive" id="stop-irrigation" disabled>
                  <svg class="icon icon-small" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12"></rect>
                  </svg>
                  Stop
                </button>
              </div>
            </div>
          </div>

          <!-- Drainage Tab -->
          <div id="drainage-tab" class="tab-content">
            <div class="switch-container">
              <div class="flex items-center gap-2">
                <svg class="icon icon-small" viewBox="0 0 24 24" style="color: var(--potassium-color);">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12l4 4 4-4"></path>
                  <path d="M12 8v8"></path>
                </svg>
                <span class="form-label">Drainage System</span>
              </div>
              <label class="switch">
                <input type="checkbox" id="drainage-toggle">
                <span class="switch-slider"></span>
              </label>
            </div>

            <div id="drainage-controls" class="disabled">
              <div class="checkbox-container">
                <input type="checkbox" id="auto-drainage" checked>
                <label for="auto-drainage">Automatic Mode</label>
              </div>

              <div id="manual-drainage-controls" class="disabled">
                <div class="button-group mt-4">
                  <button class="button button-primary" id="open-drainage">
                    Open Drainage
                  </button>
                  <button class="button button-destructive" id="close-drainage">
                    Close Drainage
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Tab -->
          <div id="settings-tab" class="tab-content">
            <div class="form-group">
              <label class="form-label" for="data-interval-slider">
                Data Sending Interval: <span id="current-interval">5 seconds</span>
              </label>
              <input type="range" min="1" max="60" value="5" class="slider" id="data-interval-slider">
              <p class="value-note">Adjust how frequently data is sent to the server (1-60 seconds)</p>
            </div>

            <div class="checkbox-container">
              <input type="checkbox" id="auto-refresh" checked>
              <label for="auto-refresh">Auto-refresh Dashboard</label>
            </div>

            <div class="checkbox-container">
              <input type="checkbox" id="dark-mode">
              <label for="dark-mode">Dark Mode</label>
            </div>

            <div class="button-group mt-6">
              <button class="button button-primary" id="save-settings">
                Save Settings
              </button>
              <button class="button button-outline" id="reset-settings">
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div>Smart Farming System v1.0</div>
      <div>Last Updated: <span id="last-updated">-</span></div>
    </footer>
  </div>

  <script>
    // Dark mode functionality
    const themeToggle = document.getElementById('theme-toggle');
    const darkModeCheckbox = document.getElementById('dark-mode');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark');
      darkModeCheckbox.checked = true;
    }
    
    // Toggle theme
    function toggleTheme() {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      darkModeCheckbox.checked = isDark;
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    darkModeCheckbox.addEventListener('change', function() {
      if (this.checked !== document.body.classList.contains('dark')) {
        toggleTheme();
      }
    });

    // Tab switching functionality
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        // Remove active class from all triggers and contents
        tabTriggers.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked trigger and corresponding content
        trigger.classList.add('active');
        const tabId = trigger.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
      });
    });

    // Nutrient sliders functionality
    function setupNutrientSlider(nutrient) {
      const slider = document.getElementById(`${nutrient}-slider`);
      const value = document.getElementById(`${nutrient}-value`);
      const fill = document.getElementById(`${nutrient}-fill`);
      const btn = document.getElementById(`${nutrient}-btn`);
      
      slider.addEventListener('input', () => {
        const sliderValue = slider.value;
        value.textContent = `${sliderValue}%`;
        fill.style.width = `${sliderValue}%`;
        
        // Enable/disable button based on value
        btn.disabled = sliderValue <= 0;
      });
      
      btn.addEventListener('click', () => {
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
          updateLastUpdated();
        }, 3000);
      });
    }
    
    setupNutrientSlider('nitrogen');
    setupNutrientSlider('phosphorous');
    setupNutrientSlider('potassium');

    // Irrigation system functionality
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
        irrigationControls.classList.remove('disabled');
      } else {
        irrigationControls.classList.add('disabled');
      }
    });
    
    flowRateSlider.addEventListener('input', () => {
      flowRateValue.textContent = `${flowRateSlider.value}%`;
    });
    
    durationSlider.addEventListener('input', () => {
      durationValue.textContent = durationSlider.value;
    });
    
    startIrrigationBtn.addEventListener('click', () => {
      if (irrigationToggle.checked) {
        startIrrigationBtn.disabled = true;
        stopIrrigationBtn.disabled = false;
        updateLastUpdated();
      }
    });
    
    stopIrrigationBtn.addEventListener('click', () => {
      if (irrigationToggle.checked) {
        startIrrigationBtn.disabled = false;
        stopIrrigationBtn.disabled = true;
        updateLastUpdated();
      }
    });

    // Drainage system functionality
    const drainageToggle = document.getElementById('drainage-toggle');
    const drainageControls = document.getElementById('drainage-controls');
    const autoDrainageToggle = document.getElementById('auto-drainage');
    const manualDrainageControls = document.getElementById('manual-drainage-controls');
    
    drainageToggle.addEventListener('change', () => {
      if (drainageToggle.checked) {
        drainageControls.classList.remove('disabled');
        
        // Check auto mode
        if (autoDrainageToggle.checked) {
          manualDrainageControls.classList.add('disabled');
        } else {
          manualDrainageControls.classList.remove('disabled');
        }
      } else {
        drainageControls.classList.add('disabled');
      }
    });
    
    autoDrainageToggle.addEventListener('change', () => {
      if (autoDrainageToggle.checked) {
        manualDrainageControls.classList.add('disabled');
      } else {
        manualDrainageControls.classList.remove('disabled');
      }
    });

    // Settings functionality
    const dataIntervalSlider = document.getElementById('data-interval-slider');
    const currentInterval = document.getElementById('current-interval');
    const autoRefreshToggle = document.getElementById('auto-refresh');
    const saveSettingsBtn = document.getElementById('save-settings');
    const resetSettingsBtn = document.getElementById('reset-settings');
    
    dataIntervalSlider.addEventListener('input', () => {
      currentInterval.textContent = `${dataIntervalSlider.value} seconds`;
    });
    
    saveSettingsBtn.addEventListener('click', () => {
      // Visual feedback
      saveSettingsBtn.textContent = 'Saved!';
      setTimeout(() => {
        saveSettingsBtn.textContent = 'Save Settings';
      }, 2000);
      
      updateLastUpdated();
    });
    
    resetSettingsBtn.addEventListener('click', () => {
      // Reset to defaults
      dataIntervalSlider.value = 5;
      currentInterval.textContent = '5 seconds';
      autoRefreshToggle.checked = true;
      darkModeCheckbox.checked = false;
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      
      // Visual feedback
      resetSettingsBtn.textContent = 'Reset!';
      setTimeout(() => {
        resetSettingsBtn.textContent = 'Reset to Defaults';
      }, 2000);
      
      updateLastUpdated();
    });

    // Graph functionality
    let nitrogenData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    let phosphorousData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    let potassiumData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    
    function updateGraph() {
      const svg = document.getElementById('nutrient-graph');
      
      // Clear existing paths
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      
      // Create polylines for each data series
      const createPolyline = (data, color) => {
        const points = createGraphPoints(data);
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        polyline.setAttribute("points", points);
        polyline.setAttribute("stroke", color);
        polyline.setAttribute("stroke-width", "2");
        polyline.setAttribute("fill", "none");
        svg.appendChild(polyline);
      };
      
      createPolyline(nitrogenData, 'var(--nitrogen-color)');
      createPolyline(phosphorousData, 'var(--phosphorous-color)');
      createPolyline(potassiumData, 'var(--potassium-color)');
    }
    
    function createGraphPoints(data) {
      if (data.length === 0) return "";
      
      const width = 100;
      const height = 100;
      const xStep = width / (data.length - 1 || 1);
      
      return data.map((value, index) => {
        const x = index * xStep;
        // Normalize value between 0 and 100, then invert (0 at bottom, 100 at top)
        const y = height - (value / 100 * height);
        return `${x},${y}`;
      }).join(" ");
    }
    
    // Update data and UI
    function updateData() {
      // Update temperature
      const tempValue = (20 + Math.random() * 10).toFixed(1);
      document.getElementById('temperature-value').textContent = `${tempValue}°C`;
      
      // Update humidity
      const humidityValue = (60 + Math.random() * 20).toFixed(1);
      document.getElementById('humidity-value').textContent = `${humidityValue}%`;
      
      // Update moisture
      const moistureValue = (40 + Math.random() * 30).toFixed(1);
      document.getElementById('moisture-value').textContent = `${moistureValue}%`;
      document.getElementById('moisture-fill').style.height = `${moistureValue}%`;
      document.getElementById('moisture-display').textContent = `${moistureValue}%`;
      
      // Update water level
      const waterValue = (70 + Math.random() * 20).toFixed(1);
      document.getElementById('water-value').textContent = `${waterValue}%`;
      document.getElementById('tank-fill').style.height = `${waterValue}%`;
      document.getElementById('tank-value').textContent = `${waterValue}%`;
      
      // Update graph data
      nitrogenData.shift();
      nitrogenData.push(Math.floor(Math.random() * 100));
      
      phosphorousData.shift();
      phosphorousData.push(Math.floor(Math.random() * 100));
      
      potassiumData.shift();
      potassiumData.push(Math.floor(Math.random() * 100));
      
      updateGraph();
      updateLastUpdated();
    }
    
    function updateLastUpdated() {
      document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
    }
    
    // Initial setup
    updateGraph();
    updateLastUpdated();
    
    // Set up interval for periodic updates
    let updateInterval = setInterval(updateData, 5000);
    
    // Handle auto-refresh toggle
    autoRefreshToggle.addEventListener('change', () => {
      if (autoRefreshToggle.checked) {
        updateInterval = setInterval(updateData, 5000);
      } else {
        clearInterval(updateInterval);
      }
    });
    
    // Initial data update
    updateData();
  </script>
</body>
</html>
  )rawliteral";
}

void setup() {
  Serial.begin(9600);
  Serial2.begin(9600, SERIAL_8N1, 16, 17);  // RX=16, TX=17

  WiFi.softAPConfig(apIP, gateway, subnet);
  WiFi.softAP(ssid, password);
  dnsServer.start(DNS_PORT, "*", apIP);

  server.on("/", handleRoot);
  server.on("/data", handleData);  // JSON endpoint

  // Add API route handler for commands
server.on("/api/command", handleCommand); // Replace "command" with your desired endpoint

  server.onNotFound(handleRoot);
  server.begin();

  Serial.println("✅ ESP32 Wi-Fi Server with AJAX Started");
  Serial.println(WiFi.softAPIP());
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
