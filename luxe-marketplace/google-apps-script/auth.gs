function hashPassword_(password) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password);
  return digest.map(function (byte) {
    const value = (byte < 0 ? byte + 256 : byte).toString(16);
    return value.length === 1 ? "0" + value : value;
  }).join("");
}

function sanitizeUser_(row) {
  if (!row) return null;
  return {
    userId: row.userId,
    name: row.name,
    email: row.email,
    phone: row.phone || "",
    role: row.role,
    purchasedItems: parseArrayField_(row.purchasedItems),
    favorites: parseArrayField_(row.favorites),
    createdAt: row.createdAt,
    status: row.status
  };
}

function getWhatsappConfig_() {
  const props = PropertiesService.getScriptProperties();
  return {
    token: props.getProperty("WHATSAPP_API_TOKEN") || "",
    phoneNumberId: props.getProperty("WHATSAPP_PHONE_NUMBER_ID") || ""
  };
}

function sendWhatsAppVerification_(to, code) {
  const config = getWhatsappConfig_();
  if (!config.token || !config.phoneNumberId) {
    return {
      success: false,
      reason: "Missing WHATSAPP_API_TOKEN or WHATSAPP_PHONE_NUMBER_ID Script Properties."
    };
  }

  const url = "https://graph.facebook.com/" + CONFIG.whatsapp.graphVersion + "/" + config.phoneNumberId + "/messages";
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: to,
    type: "text",
    text: {
      preview_url: false,
      body: "Your Luxe Marketplace verification code is " + code + ". It expires in 15 minutes."
    }
  };

  const response = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + config.token
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  const status = response.getResponseCode();
  return {
    success: status >= 200 && status < 300,
    status: status,
    body: response.getContentText()
  };
}

function handleLoginUser_(payload) {
  const email = String(payload.email || "").toLowerCase();
  const passwordHash = hashPassword_(String(payload.password || ""));
  const user = readRows_("Users").find(function (row) {
    return String(row.email).toLowerCase() === email &&
      String(row.passwordHash) === passwordHash &&
      String(row.status || "Active") === "Active";
  });

  if (!user) {
    return fail_("Invalid credentials", 401);
  }

  return ok_(sanitizeUser_(user));
}

function handleRegisterUser_(payload) {
  const email = String(payload.email || "").toLowerCase().trim();
  const name = String(payload.name || "").trim();
  const password = String(payload.password || "").trim();
  const role = payload.role === "Customer" ? "Customer" : "Contributor";

  if (!email || !name || !password) {
    return fail_("Name, email, and password are required", 400);
  }

  const existing = readRows_("Users").find(function (row) {
    return String(row.email).toLowerCase() === email;
  });

  if (existing) {
    return fail_("Account already exists", 409);
  }

  const userId = makeId_("user");
  const userRow = {
    userId: userId,
    name: name,
    email: email,
    phone: payload.phone || "",
    passwordHash: hashPassword_(password),
    role: role,
    purchasedItems: "[]",
    favorites: "[]",
    createdAt: nowIso_(),
    status: "Active"
  };

  appendRow_("Users", userRow);

  if (role === "Contributor") {
    appendRow_("Contributors", {
      contributorId: makeId_("contrib"),
      name: name,
      email: email,
      role: "Contributor",
      uploadsCount: 0,
      status: "Active"
    });
  }

  return ok_(sanitizeUser_(userRow));
}

function findUserByIdentifier_(identifier) {
  const value = String(identifier || "").toLowerCase().trim();
  return readRows_("Users").find(function (row) {
    return String(row.email || "").toLowerCase() === value || String(row.phone || "").toLowerCase() === value;
  }) || null;
}

function handleRequestPasswordReset_(payload) {
  const identifier = String(payload.identifier || "").trim();
  const channel = payload.channel === "whatsapp" ? "whatsapp" : "email";
  const user = findUserByIdentifier_(identifier);

  if (!user) {
    return fail_("No account found for that email or number", 404);
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const resetRow = {
    resetId: makeId_("reset"),
    identifier: identifier,
    channel: channel,
    code: code,
    userId: user.userId,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    used: "false",
    createdAt: nowIso_()
  };

  appendRow_("PasswordResets", resetRow);

  if (channel === "email") {
    MailApp.sendEmail({
      to: user.email,
      subject: "Luxe Marketplace password reset code",
      htmlBody: "<p>Your verification code is:</p><h2>" + code + "</h2><p>This code expires in 15 minutes.</p>"
    });
  }

  if (channel === "whatsapp") {
    const whatsappResult = sendWhatsAppVerification_(user.phone || identifier, code);
    if (!whatsappResult.success) {
      return ok_({
        message: "WhatsApp delivery attempted but is not fully configured yet. Check Script Properties and PasswordResets sheet.",
        channel: channel,
        providerResult: whatsappResult
      });
    }
  }

  return ok_({
    message: channel === "email"
      ? "Verification code sent to email."
      : "Verification code sent to WhatsApp.",
    channel: channel
  });
}

function handleVerifyPasswordReset_(payload) {
  const identifier = String(payload.identifier || "").trim();
  const code = String(payload.code || "").trim();
  const newPassword = String(payload.newPassword || "").trim();

  if (!newPassword) {
    return fail_("New password is required", 400);
  }

  const resetRow = readRows_("PasswordResets").reverse().find(function (row) {
    return String(row.identifier) === identifier &&
      String(row.code) === code &&
      String(row.used) !== "true" &&
      new Date(row.expiresAt).getTime() > Date.now();
  });

  if (!resetRow) {
    return fail_("Invalid or expired verification code", 400);
  }

  const user = findRowByKey_("Users", "userId", resetRow.userId);
  if (!user) {
    return fail_("User not found", 404);
  }

  replaceRowByKey_("Users", "userId", user.userId, {
    userId: user.userId,
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    passwordHash: hashPassword_(newPassword),
    role: user.role,
    purchasedItems: user.purchasedItems,
    favorites: user.favorites,
    createdAt: user.createdAt,
    status: user.status
  });

  replaceRowByKey_("PasswordResets", "resetId", resetRow.resetId, {
    resetId: resetRow.resetId,
    identifier: resetRow.identifier,
    channel: resetRow.channel,
    code: resetRow.code,
    userId: resetRow.userId,
    expiresAt: resetRow.expiresAt,
    used: "true",
    createdAt: resetRow.createdAt
  });

  return ok_({ success: true });
}
