import { formatTopicValue, generateMockAlerterData, generateRandomValue, getTopicFullPath, stepFormats } from "../utils/dataUtils.js";
import { getMockAlertDocs, getMockEventDocs } from "../utils/generateUtils.js";
import { formatDate, getFilterDateRange } from "../utils/timeUtils.js";

export const getPeriodData = async (req, res) => {
  try {
    const { filters = {}, latestDocTime } = req.body;
    const { topics, step, stepRange, pagination = {}, displayType, yAxis = [] } = filters;

    if(!filters.topics || !filters.from || !filters.to ) {
      return res.status(400).json({ message: "No filters provided" });
    };

    const { startTime: st, endTime, dataMaxLength } = getFilterDateRange(filters);
    const startTime = latestDocTime || st.clone();

    const result = {};
    const calcSizeDiff = Math.ceil(endTime.diff(startTime, step) / stepRange);
    const timeRangeDiff = displayType !== 'table' ? calcSizeDiff : pagination.pageSize || 100;
    const expectedDocs = Array.from(Array(timeRangeDiff).keys());

    const finalYAxis = yAxis.map(el => (!el.graphScale || el.graphScale === 'static' ? el : { ...el, min: 0, max: 100 }));
    const globalMin = Math.min(...(finalYAxis.length ? finalYAxis.map(axis => axis.min || 0) : [0]));
    const globalMax = Math.max(...(finalYAxis.length ? finalYAxis.map(axis => axis.max || 100) : [100]));
    const defaultValueRanges = { min: globalMin || 0, max: globalMax || 100 };

    let timestamp = startTime.subtract(stepRange, step);

    if (displayType === 'value') {
      topics.forEach(topic => {
        const fullPath = getTopicFullPath(topic);
        const randomValue = generateRandomValue(topic, step, defaultValueRanges, expectedDocs.length);
        result[fullPath] = randomValue;
      });
  
      
      return res.status(200).json({ data: result, dataMaxLength });
    }

    expectedDocs.forEach((el, index) => {
        timestamp = timestamp.add(stepRange, step);
        const docsLength = step === 'seconds' ? 1 : index + 1;
        const topicsValueObj = {};

        topics.forEach(topic => {
          const fullPath = getTopicFullPath(topic);
          const randomValue = generateRandomValue(topic, step, defaultValueRanges, docsLength);
          topicsValueObj[fullPath] = displayType === 'table' ? formatTopicValue(topic, randomValue) : randomValue;
        });
    
        const timestampKey = timestamp.startOf(step).format();
    
        result[timestampKey] = {
          timestamp: displayType === 'table' ? formatDate(timestampKey, stepFormats[step]) : timestampKey,
          ...topicsValueObj
        };
      });

    res.status(200).json({ data: result, dataMaxLength });
  } catch (error) {
    console.error("[getPeriodData] Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAlerterPeriodData = async (req, res) => {
  try {
    const { filters = {} } = req.body;
    const { pagination = {}, displayType } = filters;

    if(!filters.from || !filters.to ) {
      return res.status(400).json({ message: "No filters provided" });
    }

    const { startTime, endTime } = getFilterDateRange(filters);

    const databaseDocs = displayType === "events-table" ? getMockEventDocs() : getMockAlertDocs();
    const triggeredData = generateMockAlerterData(databaseDocs, startTime, endTime, displayType);

    const { page = 0, pageSize = 100 } = pagination;
    if(!pagination) {
      return res.status(200).json({ data: triggeredData, dataMaxLength: triggeredData.length });
    }
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = triggeredData.slice(startIndex, endIndex);

    return res.status(200).json({ data: paginatedData, dataMaxLength: triggeredData.length });
  } catch (error) {
    console.error("[getAlerterPeriodData] Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const getAlerterInfoData = async (req, res) => {
  try {
    const alertDocs = getMockAlertDocs();
    const eventDocs = getMockEventDocs();
    const categoryNames = {};
    const severityNames = {};

    return res.status(200).json({ alertDocs, eventDocs, categoryNames, severityNames });
  } catch (error) {
    console.error("[getAlerterInfoData] Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};