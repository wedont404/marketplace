import { adminProfiles, contributors, dbConnections, htmlShowcases, templates, uploads, users } from "@/lib/data";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(action, options = {}) {
  if (!API_URL) {
    return null;
  }

  const url = new URL(API_URL);
  url.searchParams.set("action", action);

  if (options.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    });
  }

  const response = await fetch(url.toString(), {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify({ action, ...options.body }) : undefined,
    cache: options.cache || "no-store"
  });

  if (!response.ok) {
    throw new Error(`API request failed for action "${action}"`);
  }

  return response.json();
}

export async function getTemplates() {
  const result = await request("getTemplates");
  return result?.data || templates;
}

export async function getTemplate(id) {
  const result = await request("getTemplate", { query: { id } });
  return result?.data || templates.find((item) => item.id === id) || null;
}

export async function sendMessage(payload) {
  const result = await request("sendMessage", {
    method: "POST",
    body: payload
  });

  return result || { success: true };
}

export async function addOrder(payload) {
  const result = await request("addOrder", {
    method: "POST",
    body: payload
  });

  return result || { success: true, paymentStatus: "placeholder" };
}

export async function getContributors() {
  const result = await request("getContributors");
  return result?.data || contributors;
}

export async function getUploads() {
  const result = await request("getUploads");
  return result?.data || uploads;
}

export async function getUsers() {
  const result = await request("getUsers");
  return result?.data || users;
}

export async function loginUser(payload) {
  const result = await request("loginUser", {
    method: "POST",
    body: payload
  });

  const matched = users.find(
    (entry) => entry.email.toLowerCase() === payload.email.toLowerCase() && entry.password === payload.password
  );

  return result?.data || (matched ? {
    userId: matched.userId,
    name: matched.name,
    email: matched.email,
    role: matched.role,
    purchasedItems: matched.purchasedItems,
    favorites: matched.favorites
  } : null);
}

export async function registerUser(payload) {
  const result = await request("registerUser", {
    method: "POST",
    body: payload
  });

  return result?.data || {
    userId: `user-${Date.now()}`,
    name: payload.name,
    email: payload.email,
    role: payload.role || "Contributor",
    purchasedItems: [],
    favorites: []
  };
}

export async function uploadTemplate(payload) {
  const result = await request("uploadTemplate", {
    method: "POST",
    body: payload
  });

  return result || {
    success: true,
    id: `upload-${Date.now()}`,
    zipFileLink: payload.zipFileLink || "https://drive.google.com/file/d/placeholder/view"
  };
}

export async function getAdminProfiles() {
  const result = await request("getAdminProfiles");
  return result?.data || adminProfiles;
}

export async function saveAdminProfile(payload) {
  const result = await request("saveAdminProfile", {
    method: "POST",
    body: payload
  });

  return result || { success: true, data: payload };
}

export async function getHtmlShowcases() {
  const result = await request("getHtmlShowcases");
  return result?.data || htmlShowcases;
}

export async function getDbConnections() {
  const result = await request("getDbConnections");
  return result?.data || dbConnections;
}
