import moment from "moment";
import { NO_VALUE_DISPLAY } from "./dataUtils.js";

export const getFinalPeriodDate = (periodTime) => {
    let finalDate;
  
    if (periodTime.type === 'relative') {
      if (periodTime.timeRelativity === 'after') {
        finalDate = moment(periodTime.referenceDate).add(periodTime.amount, periodTime.unit);
      } else {
        finalDate = moment(periodTime.referenceDate).subtract(periodTime.amount, periodTime.unit);
      }
      if (periodTime.rounding === 'startOf') finalDate.startOf(periodTime.unit);
      if (periodTime.rounding === 'endOf') finalDate.endOf(periodTime.unit);
    } else if (periodTime.type === 'absolute') {
      finalDate = periodTime.time ? moment(periodTime.time).clone() : moment();
    } else {
      // time type now
      finalDate = moment(periodTime.referenceDate);
    }
  
    return finalDate;
  };


export const formatDate = (timestamp, formatStr = 'DD/MM/YYYY HH:mm:ss', languageId = 'en') => {
    try {
      if (!timestamp || timestamp === NO_VALUE_DISPLAY) return NO_VALUE_DISPLAY;
      if (formatStr === 'time ago' && languageId) {
        return moment(timestamp).locale(languageId).fromNow();
      }
  
      return moment(timestamp).format(formatStr);
    } catch (error) {
      return NO_VALUE_DISPLAY;
    }
};

export const getFilterDateRange = (filters) => {
  const { from, to, sliderValue = 0, sliderUnit, step, stepRange = 1 } = filters;

  let startTime = getFinalPeriodDate(from);
  let endTime = getFinalPeriodDate(to);

  const dataMaxLength = Math.ceil(endTime.diff(startTime, step) / stepRange);

  if (filters.displayType === 'table') {
    const { gte, lte } = paginationByTime(filters);

    startTime = moment(gte);
    endTime = moment(lte);
  }

  if (sliderValue !== null && sliderUnit) {
    endTime.subtract(sliderValue * -1, sliderUnit);
    startTime.subtract(sliderValue * -1, sliderUnit);
  }

  const paginationMaxLength = endTime.diff(startTime, step) / stepRange;

  return { startTime, endTime, dataMaxLength, paginationMaxLength: Math.ceil(paginationMaxLength) };
};