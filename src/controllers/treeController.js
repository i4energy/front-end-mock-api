import { staticAssetHeaders, staticMockTreeStructure, staticTopicHeaders, staticTopicInfo } from "../static/staticData.js";
import { getMockTreeAssetTopics, mockTreeAssetsMap } from "../utils/generateUtils.js";
import { getMockAssetMqttInfoData, getMockTopicMqttInfoData } from "../utils/mqttUtils.js";

export const getMockTreeStructure = async (req, res) => {
  try {
    res.status(200).json(staticMockTreeStructure);
  } catch (error) {
    console.error('[getMockTreeStructure] Error:', error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getTreeTopicInfo = async (req, res) => {
  try {
      const topicId = req.params.topicId;
      if (!topicId) return res.status(400).json({ message: "No topicId provided" });

      const parts = topicId.split("_topic_");
      if (parts.length !== 2) return res.status(400).json({ message: "Invalid topicId format" });

      const assetId = parts[0];
      const topicIndex = parseInt(parts[1], 10);
      if (isNaN(topicIndex)) return res.status(400).json({ message: "Invalid topic index" });

      const asset = mockTreeAssetsMap[assetId];
      if (!asset) return res.status(404).json({ message: "Asset not found" });

      const topic = asset.topics[topicIndex];
      if (!topic) return res.status(404).json({ message: "Topic not found" });

      let topicInfo = getMockTopicMqttInfoData(topic);
      topicInfo = { ...staticTopicInfo, ...topicInfo, topic, mqttInfoPath: `${topic}/INFO` };

      res.status(200).json(topicInfo);
  } catch (error) {
      console.error('[getTreeTopicInfo] Error:', error);
      res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getTreeTopicInfoHeaders = async (req, res) => {
  try {
    res.status(200).json(staticTopicHeaders);
  } catch (error) {
    console.error('[getTreeTopicInfoHeaders] Error:', error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getTreeAssetInfo = async (req, res) => {
  try {
      const assetId = req.params.assetId;
      if (!assetId) return res.status(400).json({ message: "No assetId provided" });

      const assetInfo = getMockAssetMqttInfoData(assetId);

      res.status(200).json(assetInfo);
  } catch (error) {
      console.error('[getTreeAssetInfo] Error:', error);
      res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getTreeAssetInfoHeaders = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    if (!assetId) return res.status(400).json({ message: "No assetId provided" });
    res.status(200).json(staticAssetHeaders);
  } catch (error) {
    console.error('[getTreeAssetInfoHeaders] Error:', error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getTreeAssetTopics = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const assetTreeTopics = getMockTreeAssetTopics(assetId);
    res.status(200).json(assetTreeTopics);
  } catch (error) {
    console.error('[getTreeAssetTopics] Error:', error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

