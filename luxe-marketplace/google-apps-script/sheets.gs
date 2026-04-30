function getSpreadsheet_() {
  return SpreadsheetApp.openById(CONFIG.spreadsheetId);
}

function getSheet_(name) {
  const sheet = getSpreadsheet_().getSheetByName(name);
  if (!sheet) {
    throw new Error("Missing sheet: " + name);
  }
  return sheet;
}

function ensureSheet_(name, headers) {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  const currentHeaders = sheet.getLastColumn() > 0
    ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    : [];

  if (currentHeaders.join("|") !== headers.join("|")) {
    sheet.clear();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  return sheet;
}

function ensureSchema_() {
  Object.keys(CONFIG.sheets).forEach(function (sheetName) {
    ensureSheet_(sheetName, CONFIG.sheets[sheetName]);
  });
}

function readRows_(sheetName) {
  const sheet = getSheet_(sheetName);
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const headers = values[0];
  return values.slice(1).map(function (row) {
    const item = {};
    headers.forEach(function (header, index) {
      item[header] = row[index];
    });
    return item;
  }).filter(function (item) {
    return Object.values(item).some(function (value) {
      return value !== "";
    });
  });
}

function appendRow_(sheetName, rowObject) {
  const headers = CONFIG.sheets[sheetName];
  const sheet = getSheet_(sheetName);
  const row = headers.map(function (header) {
    return rowObject[header] !== undefined ? rowObject[header] : "";
  });
  sheet.appendRow(row);
  return rowObject;
}

function replaceRowByKey_(sheetName, keyField, keyValue, nextObject) {
  const sheet = getSheet_(sheetName);
  const headers = CONFIG.sheets[sheetName];
  const values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i += 1) {
    const rowObject = {};
    headers.forEach(function (header, index) {
      rowObject[header] = values[i][index];
    });

    if (String(rowObject[keyField]) === String(keyValue)) {
      const nextRow = headers.map(function (header) {
        return nextObject[header] !== undefined ? nextObject[header] : rowObject[header];
      });
      sheet.getRange(i + 1, 1, 1, headers.length).setValues([nextRow]);
      return objectFromRow_(headers, nextRow);
    }
  }

  appendRow_(sheetName, nextObject);
  return nextObject;
}

function deleteRowByKey_(sheetName, keyField, keyValue) {
  const sheet = getSheet_(sheetName);
  const values = sheet.getDataRange().getValues();
  const headers = CONFIG.sheets[sheetName];

  for (var i = 1; i < values.length; i += 1) {
    const rowObject = {};
    headers.forEach(function (header, index) {
      rowObject[header] = values[i][index];
    });

    if (String(rowObject[keyField]) === String(keyValue)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }

  return false;
}

function findRowByKey_(sheetName, keyField, keyValue) {
  return readRows_(sheetName).find(function (row) {
    return String(row[keyField]) === String(keyValue);
  }) || null;
}

function objectFromRow_(headers, row) {
  const item = {};
  headers.forEach(function (header, index) {
    item[header] = row[index];
  });
  return item;
}

function seedDefaults_() {
  ensureSchema_();

  if (readRows_("AdminProfiles").length === 0) {
    [
      {
        adminId: "admin-1",
        name: "Tresor",
        email: "tresor@luxe.rw",
        title: "Founder Workspace",
        themeName: "Obsidian Gold",
        accent: "#f3c34a",
        surface: "#110d06",
        styleNote: "Editorial luxury panels with strong gold highlights.",
        updatedAt: nowIso_()
      },
      {
        adminId: "admin-2",
        name: "Cyusa",
        email: "cyusa@luxe.rw",
        title: "Cyusa Control Room",
        themeName: "Cobalt Glass",
        accent: "#72a7ff",
        surface: "#081221",
        styleNote: "Cool blue glass panels for analytics-heavy decisions.",
        updatedAt: nowIso_()
      },
      {
        adminId: "admin-3",
        name: "Asly",
        email: "asly@luxe.rw",
        title: "Asly Creative Desk",
        themeName: "Rose Carbon",
        accent: "#ff8fb7",
        surface: "#1a0d18",
        styleNote: "Soft rose highlights for curation, branding, and previews.",
        updatedAt: nowIso_()
      }
    ].forEach(function (row) {
      appendRow_("AdminProfiles", row);
    });
  }

  if (readRows_("DbConnections").length === 0) {
    appendRow_("DbConnections", {
      connectionId: "db-001",
      name: "Primary Google Sheets",
      type: "Google Sheets",
      target: CONFIG.spreadsheetId,
      status: "Connected",
      notes: "Primary marketplace database",
      updatedAt: nowIso_()
    });
  }

  if (readRows_("HtmlShowcases").length === 0) {
    [
      {
        indexId: "idx-001",
        name: "Luxury Product Grid",
        slug: "luxury-product-grid",
        priceRwf: 45000,
        category: "Index HTML",
        previewTitle: "Product cards with premium hover reveal",
        previewDescription: "Ready-to-wire index.html storefront with spotlight hero, card matrix, and backend notes.",
        backendSpec: "Needs Templates, Reviews, and SiteSettings actions.",
        previewImage: "",
        status: "Ready"
      },
      {
        indexId: "idx-002",
        name: "Agency Landing Index",
        slug: "agency-landing-index",
        priceRwf: 60000,
        category: "Index HTML",
        previewTitle: "High-conversion agency launch page",
        previewDescription: "Optimized for bundles, testimonial blocks, and premium CTA flows.",
        backendSpec: "Needs Templates, Messages, and Orders actions.",
        previewImage: "",
        status: "Ready"
      }
    ].forEach(function (row) {
      appendRow_("HtmlShowcases", row);
    });
  }

  if (readRows_("Users").length === 0) {
    [
      { userId: "admin-1", name: "Tresor", email: "tresor@luxe.rw", passwordHash: hashPassword_("tresor123"), role: "Admin", purchasedItems: "[]", favorites: "[]", createdAt: nowIso_(), status: "Active" },
      { userId: "admin-2", name: "Cyusa", email: "cyusa@luxe.rw", passwordHash: hashPassword_("cyusa123"), role: "Admin", purchasedItems: "[]", favorites: "[]", createdAt: nowIso_(), status: "Active" },
      { userId: "admin-3", name: "Asly", email: "asly@luxe.rw", passwordHash: hashPassword_("asly123"), role: "Admin", purchasedItems: "[]", favorites: "[]", createdAt: nowIso_(), status: "Active" },
      { userId: "user-001", name: "Studio Contributor", email: "contributor@luxe.rw", passwordHash: hashPassword_("demo123"), role: "Contributor", purchasedItems: "[]", favorites: "[]", createdAt: nowIso_(), status: "Active" }
    ].forEach(function (row) {
      appendRow_("Users", row);
    });
  }
}
