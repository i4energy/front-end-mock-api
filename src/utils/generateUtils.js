import { baseAlertMocks, baseEventMocks } from "./baseMockUtils.js";

export const TOPIC_PREFIX = process.env.TOPIC_PREFIX || 'MAS_MOCK';

const generateNegativeRanges = (start, end, step) => {
  let ranges = [];
  for (let i = start; i <= end; i += step) {
    ranges.push({ min: -i, max: -(i - step), type: 'float' });
  }
  return ranges;
};

const generatePositiveRanges = (start, end, step) => {
  let ranges = [];
  for (let i = start; i <= end; i += step) {
    ranges.push({ min: i - step, max: i, type: 'float' });
  }
  return ranges;
};

const commonRanges = [
  { min: -1, max: 1, type: 'float' },
  { min: -1, max: 0, type: 'float' },
  { min: 0, max: 1, type: 'float' },
];

const commonStaticRanges = [
  { min: -1, max: 1, type: 'float' },
  { min: 1, max: 2, type: 'float' },
];

export const getMockTreeAssetsMap = () => {
  const asset_1_Ranges = [ ...commonRanges, ...generateNegativeRanges(5, 50, 5), ...generatePositiveRanges(5, 300, 5)];
  const asset_1_Topics = asset_1_Ranges.map((range) => `${TOPIC_PREFIX}/Asset_1/Topic_[${range.min}][${range.max}]`);

  const asset_2_Ranges = [ ...commonRanges, ...generateNegativeRanges(10, 50, 10), ...generatePositiveRanges(10, 300, 10) ];
  const asset_2_Topics = asset_2_Ranges.map((range) => `${TOPIC_PREFIX}/Asset_2/Topic_[${range.min}][${range.max}]`);

  const asset_3_Ranges = [ ...commonRanges, ...generateNegativeRanges(25, 50, 25), ...generatePositiveRanges(25, 300, 25) ];
  const asset_3_Topics = asset_3_Ranges.map((range) => `${TOPIC_PREFIX}/Asset_3/Topic_[${range.min}][${range.max}]`);

  const asset_4_Ranges = [ ...commonRanges, ...generateNegativeRanges(50, 50, 50), ...generatePositiveRanges(50, 300, 50) ];
  const asset_4_Topics = asset_4_Ranges.map((range) => `${TOPIC_PREFIX}/Asset_4/Topic_[${range.min}][${range.max}]`);

  const asset_5_Ranges = [...commonStaticRanges, ...generateNegativeRanges(5, 50, 5), ...generatePositiveRanges(5, 305, 5)];
  const asset_5_Topics = asset_5_Ranges.map((range) => `${TOPIC_PREFIX}/Asset_5/StaticTopic_[${range.min}]`);

  return {
    asset_1: {
      id: 'm7mt0gkv_nga79cxvut5m_1',
      parentIds: ['m7mszwme_hj37klg5679_0'],
      title: 'Asset 1',
      infoLink: '/mock_tree/assets/asset_1/info',
      link: '/mock_tree/assets/asset_1/topics',
      treeLink: '/mock_tree/assets/asset_1/topics',
      topicsCount: asset_1_Topics.length,
      topics: asset_1_Topics,
    },
    asset_2: {
      id: 'm7mt0gkv_nga79cxvut5m_2',
      parentIds: ['m7mszwme_hj37klg5679_0'],
      title: 'Asset 2',
      infoLink: '/mock_tree/assets/asset_2/info',
      link: '/mock_tree/assets/asset_2/topics',
      treeLink: '/mock_tree/assets/asset_2/topics',
      topicsCount: asset_2_Topics.length,
      topics: asset_2_Topics,
    },
    asset_3: {
      id: 'm7mt0gkv_nga79cxvut5m_3',
      parentIds: ['m7mszwme_hj37klg5679_0'],
      title: 'Asset 3',
      infoLink: '/mock_tree/assets/asset_3/info',
      link: '/mock_tree/assets/asset_3/topics',
      treeLink: '/mock_tree/assets/asset_3/topics',
      topicsCount: asset_3_Topics.length,
      topics: asset_3_Topics,
    },
    asset_4: {
      id: 'm7mt0gkv_nga79cxvut5m_4',
      parentIds: ['m7mszwme_hj37klg5679_0'],
      title: 'Asset 4',
      infoLink: '/mock_tree/assets/asset_4/info',
      link: '/mock_tree/assets/asset_4/topics',
      treeLink: '/mock_tree/assets/asset_4/topics',
      topicsCount: asset_4_Topics.length,
      topics: asset_4_Topics,
    },
    asset_5: {
      id: 'm7mt0gkv_nga79cxvut5m_5',
      parentIds: ['m7mszwme_hj37klg5679_0'],
      title: 'Asset 5',
      infoLink: '/mock_tree/assets/asset_5/info',
      link: '/mock_tree/assets/asset_5/topics',
      treeLink: '/mock_tree/assets/asset_5/topics',
      topicsCount: asset_5_Ranges.length,
      topics: asset_5_Topics,
    },
  };
};

export const mockTreeAssetsMap = getMockTreeAssetsMap();

export const getMockTreeAssetTopics = (assetId) => {
  if (!assetId) return [];

  const assetInfo = mockTreeAssetsMap[assetId];

  if (!assetInfo?.topics) return [];

  return assetInfo.topics.map((topic, index) => {
    const splitTopic = topic.split('/');
    const topicLastPart = splitTopic[splitTopic.length - 1];
    const topicId = `${assetId}_topic_${index}`;

    return {
      id: topicId,
      parentIDs: [...assetInfo.parentIds, assetInfo.id],
      type: 'register',
      title: topicLastPart,
      infoLink: `/mock_tree/topics/${topicId}/info`,
      uPath: topic,
      path: topic,
      childrenCount: 0,
      children: [],
    };
  });
};

const generateMockAlerterDocs = (baseDoc, count, startIndex = 1) => {
  const mockAlarms = [];
  const baseId = baseDoc.id.slice(0, -1); // Assumes the last character of the ID can be incremented
  const ruleIdBase = baseDoc.rules[0].id.slice(0, -1); // Similar assumption for rule IDs

  for (let i = startIndex; i < startIndex + count; i++) {
      let newAlarm = JSON.parse(JSON.stringify(baseDoc)); // Deep copy the base alarm
      newAlarm.id = baseId + i; // Assign a new unique ID

      // Modify names, descriptions, messages by numbering sequentially across types
      ['names', 'descriptions', 'messages'].forEach(field => {
          newAlarm[field] = newAlarm[field].map(nameDesc => ({
              ...nameDesc,
              text: `${nameDesc.text.replace(/\d+$/, '')}${i}` // Change ending number to current index
          }));
      });

      // Modify rules - iterate through each rule, adjust names
      newAlarm.rules = newAlarm.rules.map((rule, ruleIndex) => {
          const newRule = { ...rule };
          newRule.id = ruleIdBase + (i * 10 + ruleIndex); // New rule ID
          newRule.names = newRule.names.map(name => ({
              ...name,
              text: `${name.text.replace(/\d+$/, '')}${i * 10 + ruleIndex}` // Adjust rule name
          }));
          return newRule;
      });

      mockAlarms.push(newAlarm);
  }

  return mockAlarms;
}

// ------ ALERT/EVENTS  ------ ALERT/EVENTS  ------ ALERT/EVENTS  -------
export const getMockAlertDocs = () => {
  const baseAnalogDoc = baseAlertMocks[0];
  const baseDigitalDoc = baseAlertMocks[1];

  let startingIndex = 1;
  const analogMocks = generateMockAlerterDocs(baseAnalogDoc, 20, startingIndex);
  startingIndex += analogMocks.length; 
  const digitalMocks = generateMockAlerterDocs(baseDigitalDoc, 10, startingIndex);
  return [ ...analogMocks, ...digitalMocks]
}

export const getMockEventDocs = () => {
  const baseAnalogDoc = baseEventMocks[0];
  const baseDigitalDoc = baseEventMocks[1];
  const baseEnumeratorDoc = baseEventMocks[2];

  let startingIndex = 1;
  const analogMocks = generateMockAlerterDocs(baseAnalogDoc, 20, startingIndex);
  startingIndex += analogMocks.length; 
  const digitalMocks = generateMockAlerterDocs(baseDigitalDoc, 10, startingIndex);
  startingIndex += digitalMocks.length;
  const enumeratorMocks = generateMockAlerterDocs(baseEnumeratorDoc, 5, startingIndex);

  return [ ...analogMocks, ...digitalMocks, ...enumeratorMocks]
}

// 'm7mszwme_hj37klg5679'
// 'm7mt0gkv_nga79cxvut5m'
// 'm7mt1071_8vr0clk44vl'
// 'm7mt18gz_3m4cf9oxnyvp'
// 'm7mt1fes_fxyh8rtdnhi'
// 'm7mt1m5e_0txx49iz7mug'
// 'm7mt1s2k_gbopquge50bo'
// 'm7mt1xda_pzx8n9pt7oh'
// 'm7mt22wp_qt65a9fwnume'
