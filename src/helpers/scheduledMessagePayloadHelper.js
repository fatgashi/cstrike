const ALLOWED_FIELDS = ['name', 'message', 'cronExpression', 'timezone', 'enabled'];

function sanitizeScheduledMessagePayload(payload = {}) {
  const safe = {};
  ALLOWED_FIELDS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      safe[key] = payload[key];
    }
  });
  return safe;
}

export { ALLOWED_FIELDS, sanitizeScheduledMessagePayload };
