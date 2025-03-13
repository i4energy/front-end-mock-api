import express from "express";
import {
  getTreeTopicInfo,
  getTreeTopicInfoHeaders,
  getTreeAssetInfo,
  getTreeAssetInfoHeaders,
  getTreeAssetTopics,
  getMockTreeStructure,
} from "../controllers/treeController.js";

const router = express.Router();

router.get("/structure", getMockTreeStructure);
router.get("/topics/:topicId/info", getTreeTopicInfo);
router.get("/topics/:topicId/info/headers", getTreeTopicInfoHeaders);
router.get("/assets/:assetId/info", getTreeAssetInfo);
router.get("/assets/:assetId/info/headers", getTreeAssetInfoHeaders);
router.get("/assets/:assetId/topics", getTreeAssetTopics);

export default router;
