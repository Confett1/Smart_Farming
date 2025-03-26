// // const { SerialPort } = require("serialport");
// // const { ReadlineParser } = require("@serialport/parser-readline"); // Correct import
// // const express = require("express");
// // const cors = require("cors");
// // const bodyParser = require("body-parser");
// // const dotenv = require("dotenv");
// // const npkRoutes = require("./src/routes/NpkRoutes");
// // const NPKService = require("./src/service/NpkService");

// // dotenv.config();
// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use("/api/npk", npkRoutes);

// // // // Serial Port Setup (Change 'COM11' to match your Arduino port)
// // // const serialPort = new SerialPort({ path: "COM11", baudRate: 9600 });
// // // const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" })); // Correct usage

// // // // Listen for data from Arduino
// // // parser.on("data", async (data) => {
// // //   console.log("Received:", data);

// // //   try {
// // //     const [nPart, pPart, kPart] = data.split(",");
// // //     const nitrogen = parseInt(nPart.split(":")[1]);
// // //     const phosphorous = parseInt(pPart.split(":")[1]);
// // //     const potassium = parseInt(kPart.split(":")[1]);

// // //     // Save data to the database
// // //     await NPKService.saveNPKData(nitrogen, phosphorous, potassium);
// // //     console.log("Data inserted successfully.");
// // //   } catch (error) {
// // //     console.error("Error parsing data:", error);
// // //   }
// // // });

// // // Start Express server
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });













// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const npkRoutes = require("./src/routes/NpkRoutes");
// const NPKService = require("./src/service/NpkService");

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use("/api/npk", npkRoutes);

// // ✅ API Route to Receive ESP32 Data
// app.post("/api/npk", async (req, res) => {

//   console.log("Received Data:", req.body);
//   try {
//     const { n, p, k, temperature, humidity } = req.body;

//     const nitrogen = parseInt(n, 10);
//     const phosphorous = parseInt(p, 10);
//     const potassium = parseInt(k, 10);
//     const temp = parseFloat(temperature);
//     const humid = parseFloat(humidity);

//     // ✅ Ensure values are valid numbers
//     // if (isNaN(nitrogen) || isNaN(phosphorous) || isNaN(potassium) || isNaN(temp) || isNaN(humid)) {
//     //   return res.status(400).json({ message: "Invalid data format" });
//     // }

//     // ✅ Save to database
//     await NPKService.saveNPKData({
//       nitrogen,
//       phosphorous,
//       potassium,
//       // moisture,
//       temperature: temp,
//       // ecValue,
//       humidity: humid,
//       // pH,
//     });

//     console.log("Data received from ESP32 and saved:", req.body);
//     res.status(200).json({ message: "Data saved successfully!" });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ Start Express server
// app.listen(PORT, () => {
//   console.log(`Server running on http://0.0.0.0:${PORT}`);
// });












const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const npkRoutes = require("./src/routes/NpkRoutes");
const MotorRoute = require("./src/routes/MotorRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/npk", npkRoutes);
app.use("/status", MotorRoute);

// ✅ Start Express Server
app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
