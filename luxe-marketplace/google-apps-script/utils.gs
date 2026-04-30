function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function ok_(data, meta) {
  return jsonResponse_({
    success: true,
    data: data || null,
    meta: meta || {}
  });
}

function fail_(message, status, details) {
  return jsonResponse_({
    success: false,
    error: message,
    status: status || 400,
    details: details || null
  });
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return {};
  }
}

function nowIso_() {
  return new Date().toISOString();
}

function makeId_(prefix) {
  return prefix + "-" + Utilities.getUuid().split("-")[0];
}

function toArrayString_(value) {
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  if (value === null || value === undefined || value === "") {
    return JSON.stringify([]);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return JSON.stringify([]);
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) return trimmed;
    return JSON.stringify(trimmed.split(",").map(function (item) {
      return item.trim();
    }).filter(String));
  }

  return JSON.stringify([value]);
}

function parseArrayField_(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return String(value).split(",").map(function (item) {
      return item.trim();
    }).filter(String);
  }
}

function normalizeBool_(value) {
  if (typeof value === "boolean") return value;
  return String(value).toLowerCase() === "true";
}
