function handleGetAction_(action, params) {
  switch (action) {
    case "getTemplates":
      return ok_(readRows_("Templates").map(normalizeTemplateRow_));
    case "getTemplate":
      return ok_(normalizeTemplateRow_(findRowByKey_("Templates", "id", params.id)));
    case "getContributors":
      return ok_(readRows_("Contributors"));
    case "getUploads":
      return ok_(readRows_("Uploads"));
    case "getUsers":
      return ok_(readRows_("Users").map(sanitizeUser_));
    case "getAdminProfiles":
      return ok_(readRows_("AdminProfiles"));
    case "getHtmlShowcases":
      return ok_(readRows_("HtmlShowcases"));
    case "getDbConnections":
      return ok_(readRows_("DbConnections"));
    case "bootstrap":
      ensureSchema_();
      seedDefaults_();
      return ok_({ ready: true });
    default:
      return fail_("Unknown GET action: " + action, 404);
  }
}

function handlePostAction_(action, payload) {
  switch (action) {
    case "sendMessage":
      return handleSendMessage_(payload);
    case "addOrder":
      return handleAddOrder_(payload);
    case "uploadTemplate":
      return handleUploadTemplate_(payload);
    case "loginUser":
      return handleLoginUser_(payload);
    case "registerUser":
      return handleRegisterUser_(payload);
    case "saveAdminProfile":
      return handleSaveAdminProfile_(payload);
    case "saveHtmlShowcase":
      return handleSaveHtmlShowcase_(payload);
    case "saveDbConnection":
      return handleSaveDbConnection_(payload);
    case "deleteTemplate":
      return handleDeleteTemplate_(payload);
    default:
      return fail_("Unknown POST action: " + action, 404);
  }
}

function normalizeTemplateRow_(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price || 0),
    description: row.description,
    images: parseArrayField_(row.images),
    demoLink: row.demoLink,
    downloadLink: row.downloadLink,
    featured: normalizeBool_(row.featured),
    framework: row.framework,
    darkMode: row.darkMode,
    animationLevel: row.animationLevel,
    tags: parseArrayField_(row.tags),
    details: parseArrayField_(row.details),
    reviews: readRows_("Reviews").filter(function (review) {
      return String(review.productId) === String(row.id);
    })
  };
}

function handleSendMessage_(payload) {
  const row = {
    id: makeId_("msg"),
    name: payload.name || "",
    email: payload.email || "",
    message: payload.message || "",
    date: payload.date || nowIso_()
  };
  appendRow_("Messages", row);
  return ok_(row);
}

function handleAddOrder_(payload) {
  const row = {
    orderId: makeId_("ord"),
    productId: payload.productId || "",
    customerName: payload.customerName || "",
    email: payload.email || "",
    amount: payload.amount || 0,
    paymentStatus: payload.paymentStatus || "Pending",
    date: payload.date || nowIso_()
  };
  appendRow_("Orders", row);
  return ok_(row);
}

function handleUploadTemplate_(payload) {
  const assetLinks = storeUploadAssets_(payload);
  const templateId = payload.templateId || makeId_("tpl");
  const contributor = readRows_("Contributors").find(function (row) {
    return String(row.email).toLowerCase() === String(payload.contributorEmail || "").toLowerCase() ||
      String(row.name).toLowerCase() === String(payload.contributorName || "").toLowerCase();
  });

  const templateRow = {
    id: templateId,
    name: payload.productName || payload.productTitle || "",
    category: payload.category || "",
    price: payload.price || 0,
    description: payload.description || "",
    images: toArrayString_(payload.previewImage || assetLinks.previewLink),
    demoLink: payload.demoLink || "",
    downloadLink: assetLinks.zipLink || payload.zipFileLink || "",
    featured: payload.featured || false,
    framework: payload.framework || "",
    darkMode: payload.darkMode || "Dark",
    animationLevel: payload.animationLevel || "Medium",
    tags: toArrayString_(payload.tags),
    details: toArrayString_(payload.details || [])
  };

  replaceRowByKey_("Templates", "id", templateId, templateRow);

  const uploadRow = {
    uploadId: makeId_("upl"),
    contributorId: contributor ? contributor.contributorId : "",
    templateId: templateId,
    zipFileLink: assetLinks.zipLink || payload.zipFileLink || "",
    previewImage: assetLinks.previewLink || payload.previewImage || "",
    uploadDate: payload.dateUploaded || nowIso_(),
    productName: payload.productName || "",
    category: payload.category || "",
    framework: payload.framework || "",
    tags: payload.tags || "",
    price: payload.price || 0,
    demoLink: payload.demoLink || "",
    description: payload.description || ""
  };

  appendRow_("Uploads", uploadRow);

  if (contributor) {
    replaceRowByKey_("Contributors", "contributorId", contributor.contributorId, {
      contributorId: contributor.contributorId,
      name: contributor.name,
      email: contributor.email,
      role: contributor.role,
      uploadsCount: Number(contributor.uploadsCount || 0) + 1,
      status: contributor.status || "Active"
    });
  }

  return ok_({
    template: normalizeTemplateRow_(templateRow),
    upload: uploadRow
  });
}

function handleSaveAdminProfile_(payload) {
  const row = {
    adminId: payload.adminId || makeId_("admin"),
    name: payload.name || "",
    email: payload.email || "",
    title: payload.title || "",
    themeName: payload.themeName || "",
    accent: payload.accent || "",
    surface: payload.surface || "",
    styleNote: payload.styleNote || "",
    updatedAt: nowIso_()
  };

  return ok_(replaceRowByKey_("AdminProfiles", "adminId", row.adminId, row));
}

function handleSaveHtmlShowcase_(payload) {
  const row = {
    indexId: payload.indexId || makeId_("idx"),
    name: payload.name || "",
    slug: payload.slug || "",
    priceRwf: payload.priceRwf || 0,
    category: payload.category || "Index HTML",
    previewTitle: payload.previewTitle || "",
    previewDescription: payload.previewDescription || "",
    backendSpec: payload.backendSpec || "",
    previewImage: payload.previewImage || "",
    status: payload.status || "Ready"
  };

  return ok_(replaceRowByKey_("HtmlShowcases", "indexId", row.indexId, row));
}

function handleSaveDbConnection_(payload) {
  const row = {
    connectionId: payload.connectionId || makeId_("db"),
    name: payload.name || "",
    type: payload.type || "",
    target: payload.target || "",
    status: payload.status || "Ready",
    notes: payload.notes || "",
    updatedAt: nowIso_()
  };

  return ok_(replaceRowByKey_("DbConnections", "connectionId", row.connectionId, row));
}

function handleDeleteTemplate_(payload) {
  const deleted = deleteRowByKey_("Templates", "id", payload.id);
  return ok_({ deleted: deleted, id: payload.id });
}
