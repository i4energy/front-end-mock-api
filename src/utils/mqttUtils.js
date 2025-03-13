import { publishMqttData } from "../config/mqttClient.js";
import { staticAssetInfo } from "../static/staticData.js";
import { capitalizeFirstLetter } from "./generalUtils.js";
import { mockTreeAssetsMap, TOPIC_PREFIX } from "./generateUtils.js";

let liveDataTimeout;
let infoDataTimeout;

const extractRangeNumber = (str) => {
  // Regular expression to find numbers within brackets
  const regex = /Topic_\[(-?\d+)\]\[(-?\d+)\]/;
  const match = str.match(regex);

  if (match) return `${match[1]} to ${match[2]}`; 
  return null;
}

const extractStaticNumber = (str) => {
  // Regular expression to find numbers within brackets
  const match = str.match(/StaticTopic_\[(\d+)\]/);
  return match ? parseInt(match[1]) : null; 
}

export const getMockTopicMqttData = (topic) => {
  if (!topic) return {};
  const isStatic = topic.includes('StaticTopic_')

  // Extracting min and max values from the topic string
  const match = topic.match(/\[(-?\d+)\]\[(-?\d+)\]/);
  const match2 = topic.match(/\[(-?\d+)\]/);

  if (!match && !match2) return {};

  const min = isStatic ? parseFloat(match2[1]) : parseFloat(match[1]);
  const max = isStatic ? parseFloat(match2[1]) : parseFloat(match[2]);
  
  if (isNaN(min) || isNaN(max) || min > max) return {};

  let value;
  if(isStatic) {
    value = min
  } else if (min === 0 && max === 1) {
    value = Math.random() < 0.7 ? 1 : 0;
  } else {
    value = Math.random() * (max - min) + min;
  }

  // Creating a timestamp for the current date and time
  const dt = new Date().toISOString();

  return { value, dt };
};

export const getMockTopicMqttInfoData = (topic) => {
  if (!topic) return {};

  // Extracting the last part of the topic string
  const splitTopic = topic.split("/");
  const topicLastPart = splitTopic[splitTopic.length - 1];

  const isStatic = topicLastPart.includes('StaticTopic_')
  let topicDescription =  '';

  if(isStatic) {
    const textValue = extractStaticNumber(topicLastPart);
    topicDescription = `Topic with static value ${textValue}`
  }else{
    const textValue = extractRangeNumber(topicLastPart);
    topicDescription = `Topic with range value from ${textValue}`
  }

  if (!topicDescription) return {}; // Return empty object if required data is missing

  return {
    description: topicDescription,
    tagName: topicLastPart,
    address: "12332",
    dataType: "Float",
    clientAccess: "Read/Write",
    supportsControl: false,
    protocol: "Modbus TCP/IP",
    scanRate: 1000,
    saveValues: true,
    hasThirdPartyConnections: false,
  };
};

export const getMockAssetMqttInfoData = (assetId) => {
    if (!assetId) return {};
  
    const assetTopic = `${TOPIC_PREFIX}/${capitalizeFirstLetter(assetId)}`
    
    let assetName = capitalizeFirstLetter(assetId);
    assetName = assetName.replace('_', ' ');
  
    return {
      ...staticAssetInfo,
      id: assetId,
      topic: assetTopic,
      mqttInfoPath: `${assetTopic}/INFO`,
      entityName: [
        { text: assetName, languageID: 'en' },
        { text: assetName, languageID: 'el' }
    ],
    };
  };

export const publishLiveMqttData = () => {
  clearTimeout(liveDataTimeout);
  Object.keys(mockTreeAssetsMap).forEach((asset) => {
    const assetTopics = mockTreeAssetsMap[asset].topics;
    assetTopics.forEach((topic) => {
      const data = getMockTopicMqttData(topic);
      publishMqttData(topic, data);
    });
  });

  liveDataTimeout = setTimeout(() => {
    publishLiveMqttData()
  }, 2000)
};

export const publishInfoMqttData = () => {
    clearTimeout(infoDataTimeout)
    Object.keys(mockTreeAssetsMap).forEach((asset) => {
      const assetTopics = mockTreeAssetsMap[asset].topics;
      const assetInfo = getMockAssetMqttInfoData(asset);
      const assetName = capitalizeFirstLetter(asset);
      publishMqttData(`${TOPIC_PREFIX}/${assetName}/INFO`, assetInfo, true);

      assetTopics.forEach((topic) => {
        const data = getMockTopicMqttInfoData(topic);
        const topicInfo = `${topic}/INFO`;
        publishMqttData(topicInfo, data, true);
      });
    });
  
    infoDataTimeout = setTimeout(() => {
        publishInfoMqttData()
    }, 30 * 60 * 1000)
  };
