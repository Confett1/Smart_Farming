#include "esp_camera.h"
#include <WiFi.h>
#include "camera_pins.h"

const char* ssid = "Smart_Farming_Cam";
const char* password = "smartfarming";

#define CAMERA_MODEL_AI_THINKER


void startCamera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if (psramFound()) {
    config.frame_size = FRAMESIZE_SVGA; // Resolution: 800x600
    config.jpeg_quality = 10;          // Quality (0-63, lower is better)
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_CIF; // Lower resolution if no PSRAM
    config.jpeg_quality = 12;         // Slightly lower quality
    config.fb_count = 1;
  }

  // Initialize the camera
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }
}

// Start Wi-Fi
void startWiFi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

 
  Serial.print("Camera Stream Ready! Go to: http://");
  Serial.println(WiFi.localIP());
}

// Handle the HTTP request for the video stream
void handleStream() {
  WiFiClient client = server.available();
  if (!client) {
    return;
  }

  // Wait for data from the client
  Serial.println("New client connected");
  String request = client.readStringUntil('\r');
  Serial.println(request);
  client.flush();

  // Send the HTTP response header
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: multipart/x-mixed-replace; boundary=frame");
  client.println();
  client.println("--frame");

  // Continuously capture and send frames
  while (true) {
    camera_fb_t* fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("Camera capture failed");
      break;
    }

    // Send the image frame
    client.println("Content-Type: image/jpeg");
    client.println("Content-Length: " + String(fb->len));
    client.println();
    client.write(fb->buf, fb->len);
    client.println();
    client.println("--frame");

    // Return the frame buffer to the driver
    esp_camera_fb_return(fb);

    // Check if the client is still connected
    if (!client.connected()) {
      Serial.println("Client disconnected");
      break;
    }
  }

  client.stop();
  Serial.println("Client disconnected");
}

// Create a web server
WiFiServer server(80);

void setup() {
  Serial.begin(115200);

 
  startCamera();

 
  startWiFi();

  
  server.begin();
}

void loop() {

  handleStream();
}