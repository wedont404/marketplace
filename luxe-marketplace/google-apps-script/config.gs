const CONFIG = {
  spreadsheetId: "1M67XJtour1UwVTOnJow1tiy3Te_e6SHYfjrd9w_G0cw",
  drive: {
    zipFolderId: "",
    previewFolderId: ""
  },
  sheets: {
    Templates: ["id", "name", "category", "price", "description", "images", "demoLink", "downloadLink", "featured", "framework", "darkMode", "animationLevel", "tags", "details"],
    Orders: ["orderId", "productId", "customerName", "email", "amount", "paymentStatus", "date"],
    Users: ["userId", "name", "email", "passwordHash", "role", "purchasedItems", "favorites", "createdAt", "status"],
    Messages: ["id", "name", "email", "message", "date"],
    Reviews: ["id", "productId", "userName", "rating", "review"],
    Contributors: ["contributorId", "name", "email", "role", "uploadsCount", "status"],
    Uploads: ["uploadId", "contributorId", "templateId", "zipFileLink", "previewImage", "uploadDate", "productName", "category", "framework", "tags", "price", "demoLink", "description"],
    AdminProfiles: ["adminId", "name", "email", "title", "themeName", "accent", "surface", "styleNote", "updatedAt"],
    HtmlShowcases: ["indexId", "name", "slug", "priceRwf", "category", "previewTitle", "previewDescription", "backendSpec", "previewImage", "status"],
    DbConnections: ["connectionId", "name", "type", "target", "status", "notes", "updatedAt"]
  }
};
