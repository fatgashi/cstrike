const SCHEDULE_TYPES = {
  INTERVAL: 'interval',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  CUSTOM: 'custom',
};

const WEEKDAY_OPTIONS = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

const SAFE_INTERVAL_PRESETS = [1, 2, 3, 4, 5, 6, 7, 10, 12, 13, 15, 17, 20, 30];

const TIMEZONE_OPTIONS = [
  { value: 'Europe/Belgrade', label: 'Europe/Belgrade' },
  { value: 'UTC', label: 'UTC' },
];

function pad2(value) {
  return String(value).padStart(2, '0');
}

function isValidMinute(value) {
  return Number.isInteger(value) && value >= 0 && value <= 59;
}

function isValidHour(value) {
  return Number.isInteger(value) && value >= 0 && value <= 23;
}

function isValidWeekday(value) {
  return Number.isInteger(value) && value >= 0 && value <= 6;
}

function toInt(value) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : NaN;
}

function normalizeCronExpression(value = '') {
  return String(value).trim().replace(/\s+/g, ' ');
}

function buildCronExpression({
  scheduleType,
  intervalMinutes,
  minute,
  hour,
  weekday,
  customCronExpression,
}) {
  switch (scheduleType) {
    case SCHEDULE_TYPES.INTERVAL: {
      const interval = toInt(intervalMinutes);
      if (!Number.isInteger(interval) || interval < 1 || interval > 59) {
        throw new Error('Interval must be an integer from 1 to 59.');
      }
      return `*/${interval} * * * *`;
    }
    case SCHEDULE_TYPES.HOURLY: {
      const minuteValue = toInt(minute);
      if (!isValidMinute(minuteValue)) {
        throw new Error('Minute must be between 0 and 59.');
      }
      return `${minuteValue} * * * *`;
    }
    case SCHEDULE_TYPES.DAILY: {
      const minuteValue = toInt(minute);
      const hourValue = toInt(hour);
      if (!isValidMinute(minuteValue) || !isValidHour(hourValue)) {
        throw new Error('Daily schedule requires valid hour and minute.');
      }
      return `${minuteValue} ${hourValue} * * *`;
    }
    case SCHEDULE_TYPES.WEEKLY: {
      const minuteValue = toInt(minute);
      const hourValue = toInt(hour);
      const weekdayValue = toInt(weekday);
      if (
        !isValidMinute(minuteValue) ||
        !isValidHour(hourValue) ||
        !isValidWeekday(weekdayValue)
      ) {
        throw new Error('Weekly schedule requires valid weekday, hour, and minute.');
      }
      return `${minuteValue} ${hourValue} * * ${weekdayValue}`;
    }
    case SCHEDULE_TYPES.CUSTOM: {
      const normalized = normalizeCronExpression(customCronExpression);
      if (!normalized) {
        throw new Error('Custom cron expression is required.');
      }
      return normalized;
    }
    default:
      throw new Error('Unsupported schedule type.');
  }
}

function buildMinuteMarksText(interval) {
  const marks = [];
  for (let m = 0; m < 60; m += interval) {
    marks.push(m);
  }
  return marks.join(', ');
}

function describeIntervalCron(interval) {
  if (60 % interval === 0) {
    return interval === 1 ? 'Every minute' : `Every ${interval} minutes`;
  }
  return `At minute marks ${buildMinuteMarksText(interval)} of each hour`;
}

function describeCronExpression(expression) {
  const parsed = parseCronExpression(expression);
  return parsed.description;
}

function parseCronExpression(expression) {
  const normalized = normalizeCronExpression(expression);

  const intervalMatch = normalized.match(/^\*\/(\d{1,2}) \* \* \* \*$/);
  if (intervalMatch) {
    const interval = toInt(intervalMatch[1]);
    if (interval >= 1 && interval <= 59) {
      return {
        type: SCHEDULE_TYPES.INTERVAL,
        intervalMinutes: interval,
        minute: 0,
        hour: 0,
        weekday: 0,
        customCronExpression: normalized,
        description: describeIntervalCron(interval),
      };
    }
  }

  const hourlyMatch = normalized.match(/^(\d{1,2}) \* \* \* \*$/);
  if (hourlyMatch) {
    const minute = toInt(hourlyMatch[1]);
    if (isValidMinute(minute)) {
      return {
        type: SCHEDULE_TYPES.HOURLY,
        intervalMinutes: 5,
        minute,
        hour: 0,
        weekday: 0,
        customCronExpression: normalized,
        description: `At minute ${minute} of every hour`,
      };
    }
  }

  const dailyMatch = normalized.match(/^(\d{1,2}) (\d{1,2}) \* \* \*$/);
  if (dailyMatch) {
    const minute = toInt(dailyMatch[1]);
    const hour = toInt(dailyMatch[2]);
    if (isValidMinute(minute) && isValidHour(hour)) {
      return {
        type: SCHEDULE_TYPES.DAILY,
        intervalMinutes: 5,
        minute,
        hour,
        weekday: 0,
        customCronExpression: normalized,
        description: `Daily at ${pad2(hour)}:${pad2(minute)}`,
      };
    }
  }

  const weeklyMatch = normalized.match(/^(\d{1,2}) (\d{1,2}) \* \* ([0-6])$/);
  if (weeklyMatch) {
    const minute = toInt(weeklyMatch[1]);
    const hour = toInt(weeklyMatch[2]);
    const weekday = toInt(weeklyMatch[3]);
    if (isValidMinute(minute) && isValidHour(hour) && isValidWeekday(weekday)) {
      const dayLabel = WEEKDAY_OPTIONS.find((day) => day.value === weekday)?.label || 'Unknown';
      return {
        type: SCHEDULE_TYPES.WEEKLY,
        intervalMinutes: 5,
        minute,
        hour,
        weekday,
        customCronExpression: normalized,
        description: `Every ${dayLabel} at ${pad2(hour)}:${pad2(minute)}`,
      };
    }
  }

  return {
    type: SCHEDULE_TYPES.CUSTOM,
    intervalMinutes: 5,
    minute: 0,
    hour: 0,
    weekday: 0,
    customCronExpression: normalized,
    description: normalized ? 'Custom schedule' : 'Custom schedule',
  };
}

export {
  SCHEDULE_TYPES,
  WEEKDAY_OPTIONS,
  SAFE_INTERVAL_PRESETS,
  TIMEZONE_OPTIONS,
  normalizeCronExpression,
  buildCronExpression,
  parseCronExpression,
  describeCronExpression,
};
