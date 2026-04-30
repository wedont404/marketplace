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
    role: row.role,
    purchasedItems: parseArrayField_(row.purchasedItems),
    favorites: parseArrayField_(row.favorites),
    createdAt: row.createdAt,
    status: row.status
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
