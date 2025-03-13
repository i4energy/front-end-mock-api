import mqtt from "mqtt";
import { publishInfoMqttData, publishLiveMqttData } from "../utils/mqttUtils.js";

const clientId = `mqtt_mock_api_${Math.random().toString(16).slice(3)}`; // Generate a random client ID
const mqttHost = process.env.MQTT_HOST || "ws://localhost:8083";

let mqttClient = null;

export const mqttClientSetup = () => {
  mqttClient = mqtt.connect(mqttHost, {
    clientId,
    clean: true,
    queueQoSZero: true,
    keepalive: 60 * 1000,
    connectTimeout: 10 * 1000,
    wsOptions: { perMessageDeflate: true, skipUTF8Validation: true },
  });

  mqttClient.on("connect", () => {
    console.log("[MqttClient] client connect");
    publishLiveMqttData();
    publishInfoMqttData();
  });

  mqttClient.on("offline", () => {
    console.log("[MqttClient] client offline");
  });

  mqttClient.on("disconnect", () => {
    console.log("[MqttClient] client disconnect");
  });

  mqttClient.on("error", (err) => {
    console.log("[MqttClient] client error", err.message);
  });

  return mqttClient;
};

export const publishMqttData = async (topic, data = {}, retain = false) => {
  if (!mqttClient || !topic) return;

  try {
    await mqttClient.publish(topic, JSON.stringify(data), { qos: 0, retain });
    // console.log(`[MqttClient] publish to topic: ${topic} succeed`);
  } catch (err) {
    console.log(`[MqttClient] publish to topic: ${topic} err`, err);
  }
};

export const getMqttClient = () => {
  return mqttClient;
};
