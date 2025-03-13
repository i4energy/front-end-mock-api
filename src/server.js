import express from "express";
import cors from 'cors';
import compression from 'compression';
import dotenv from "dotenv";
import treeRoutes from './routes/treeRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import { mqttClientSetup } from "./config/mqttClient.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(compression());

// Routes
app.use("/api/mock_tree", treeRoutes);
app.use("/api/mock_data", dataRoutes);

// Start the server
const PORT = process.env.API_PORT || 8004;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  mqttClientSetup()
});
