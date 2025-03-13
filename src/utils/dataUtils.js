import { generateStringId, randomDateBetween, randomValueBetween } from "./generalUtils.js";
import { formatDate } from "./timeUtils.js";

export const NO_VALUE_DISPLAY = "--";

export const defaultValueRanges = { min: 0, max: 100 };

export const stepFormats = {
  seconds: "DD/MM/YYYY HH:mm:ss",
  minutes: "DD/MM/YYYY HH:mm:ss",
  hours: "DD/MM/YYYY HH:mm",
  days: "DD/MM/YYYY",
  years: "DD/MM/YYYY",
};

export const toTopicPath = (str) => {
  if (str) return str.replace(/\./g, "/").replace(/\s\s+/g, "");

  return "";
};

export const getTopicFullPath = (topic, stat) => {
  let str = topic.path;
  const finalStat = stat || topic.stat || "instant";

  if (finalStat) str = `${topic.path}/${finalStat}`;

  if (topic.selectedInfoField && topic.selectedInfoField !== "value") {
    str = `${str}/${topic.selectedInfoField}`;
  }

  return toTopicPath(str);
};

export const isNumber = (value) => {
  return (
    value !== "" &&
    value != null &&
    value !== true &&
    value !== false &&
    value !== "false" &&
    value !== "true" &&
    !Number.isNaN(Number(value))
  );
};

export const getValueWithDecimals = (
  value,
  decimals = 2,
  rounding = "round"
) => {
  const applyDecimals = isNumber(value);

  if (!applyDecimals) return value;

  if (value != null && applyDecimals) {
    const result = Math[rounding](value * 10 ** decimals) / 10 ** decimals;
    return result.toFixed(decimals);
  }

  return value;
};

export const formatTopicValue = (topic, topicValue, languageId = "en") => {
  try {
    if (topicValue == null) return NO_VALUE_DISPLAY;

    if (typeof topicValue === "string" && topic.selectedInfoField === "dt") {
      return formatDate(topicValue, topic.dateFormat, languageId);
    }

    if (
      typeof topicValue === "boolean" ||
      topicValue === "true" ||
      topicValue === "false"
    ) {
      return `${topicValue}`;
    }

    if (topic.isDigital) {
      return topicValue.toString();
    }

    if (isNumber(topicValue)) {
      return getValueWithDecimals(topicValue, topic.decimals);
    }

    return `${topicValue}`;
  } catch (err) {
    return NO_VALUE_DISPLAY;
  }
};

export const getTopicRangeValues = (topic, valueRanges = { min: 0, max: 100 }) =>  {
  // Check if the topic path matches expected mock topic formats
  const isMockStaticTopic = topic.path?.includes('/StaticTopic_[') && topic.path?.endsWith(']');
  const isMockTopic = topic.path?.includes('/Topic_[') && topic.path?.endsWith(']');

  if (isMockTopic || isMockStaticTopic) {
    const match = isMockStaticTopic ? topic.path.match(/\[(-?\d+)\]/) : topic.path.match(/\[(-?\d+)\]\[(-?\d+)\]/);

    if (!match) return valueRanges; // Return null if no matches are found

    const min = parseFloat(match[1]); // The first captured group is min
    const max = isMockStaticTopic ? min : parseFloat(match[2]); // For static topics, min and max are the same

    if (Number.isNaN(min) || Number.isNaN(max) || min > max) return valueRanges;
    return { min, max };
  }

  return valueRanges; // Return null if not a mock topic
};

export const generateRandomValue = (topic, step, valueRanges = { min: 0, max: 100 }, expectedDocs = 60, exclusionPercent = 60) => {
  if (!topic?.path) return null;

  const rangeValues = getTopicRangeValues(topic, valueRanges);
  if (!rangeValues) return null;

  // Calculate the range and exclusion
  const range = rangeValues.max - rangeValues.min;
  const exclusion = (range * (exclusionPercent / 100)) / 2;
  const stat = step === 'seconds' ? 'instant' : topic.stat || 'instant';

  let extra = { min: 0, max: 0 };

  if (stat === 'min') extra = { min: -0.8 * exclusion, max: -1.6 * exclusion };
  else if (stat === 'max') extra = { min: 1.6 * exclusion, max: 0.8 * exclusion };
  else if (stat === 'avg') extra = { min: -0.2 * exclusion, max: -0.2 * exclusion };
  else if (stat === 'sum') extra = { min: -0.2 * exclusion, max: 0.2 * exclusion };
  else if (stat === 'range') extra = { min: -0.8 * exclusion, max: 0.8 * exclusion };
  else extra = { min: 0.6 * exclusion, max: 0.2 * exclusion };

  const adjustedMin = rangeValues.min + exclusion + extra.min;
  const adjustedMax = rangeValues.max - exclusion + extra.max;

  // Validate the adjusted range
  if (adjustedMin > adjustedMax) return null;
  if (adjustedMin === adjustedMax) return adjustedMin;

  // Helper function to generate a single random value within the adjusted range
  const generateRandom = () => Math.random() * (adjustedMax - adjustedMin) + adjustedMin;

  // Determine the random value based on the type of statistic
  const values = Array.from({ length: expectedDocs }, generateRandom); // Generate expectedDocs random values
  let value = null;

  if (stat === 'avg') {
    // Calculate average of the three values
    value = values.reduce((acc, cur) => acc + cur, 0) / values.length;
  } else if (stat === 'sum') {
    // Calculate sum of the three values
    value = values.reduce((acc, cur) => acc + cur, 0);
  } else if (stat === 'range') {
    // Calculate the range (difference between max and min values)
    const min = Math.min(...values);
    const max = Math.max(...values);
    value = max - min;
  } else if (stat === 'min') {
    // Calculate the min value
    value = Math.min(...values);
  } else if (stat === 'max') {
    // Calculate the max value
    value = Math.max(...values);
  } else {
    // Default case: use a single random value
    value = generateRandom();
  }

  return value;
};


// ------ ALERT/EVENTS  ------ ALERT/EVENTS  ------ ALERT/EVENTS  -------
export const generateMockAlerterData = (databaseDocs, startTime, endTime, type) => {
  const mockResults = [];
  const desiredCount = type === "alerts-table" ? 320 : 290;
  const triggerChance = 0.6; // Adjust as necessary to ensure target count is likely to be hit

  while (mockResults.length < desiredCount) {
    databaseDocs.forEach((doc) => {
      if (mockResults.length >= desiredCount) return; // Break early if desired count is reached

      doc.rules.forEach((rule) => {
        if (Math.random() < triggerChance && mockResults.length < desiredCount) {
          const triggerCount = Math.min(Math.ceil(Math.random() * 5), desiredCount - mockResults.length); // Ensure not to exceed desiredCount

          for (let i = 0; i < triggerCount; i++) {
            const triggerID = generateStringId();
            const timeOfTrigger = randomDateBetween(startTime.toDate(), endTime.toDate());
            const endTimeTrigger = new Date(timeOfTrigger);
            endTimeTrigger.setHours(endTimeTrigger.getHours() + (Math.random() > 0.7 ? 1 : 0)); // 30% chance the event/alert lasts 1 hour

            const alertEventMock = {
              triggerID: triggerID,
              ruleID: rule.id,
              ruleMinValue: rule.minValue,
              ruleMaxValue: rule.maxValue,
              ruleValue: rule.value,
              startTime: timeOfTrigger,
              recordTime: timeOfTrigger,
              isTriggered: true,
            };

            if (type === "alerts-table") {
              alertEventMock.alertID = doc.id;
              if (Math.random() > 0.8) { // 20% chance of being acknowledged
                alertEventMock.acknowledgeTime = new Date(endTimeTrigger.getTime() + 60000);
                alertEventMock.acknowledgedByUserID = `user_${Math.ceil(Math.random() * 3)}`;
              }
              if (Math.random() > 0.8) { // 20% chance of having an endTime
                alertEventMock.dt = endTimeTrigger;
                alertEventMock.endTime = endTimeTrigger;
              }
            } else {
              alertEventMock.eventID = doc.id;
              if (Math.random() > 0.8) { // 30% chance of having an endTime
                alertEventMock.endTime = endTimeTrigger;
              }
            }

            if (rule.minValue !== null) {
              alertEventMock.focusValue = randomValueBetween(rule.minValue, rule.maxValue);
              alertEventMock.ruleRawValue = randomValueBetween(rule.minValue, rule.maxValue);
            } else {
              alertEventMock.focusValue = rule.value;
              alertEventMock.ruleRawValue = rule.value;
            }

            mockResults.push(alertEventMock);
            if (mockResults.length >= desiredCount) break; // Stop adding if count is met
          }
        }
      });
    });
  }

  return mockResults;
};

