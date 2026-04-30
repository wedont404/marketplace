function saveDriveFileFromBase64_(base64Data, fileName, mimeType, folderId) {
  if (!base64Data || !folderId) {
    return "";
  }

  const folder = DriveApp.getFolderById(folderId);
  const cleanBase64 = String(base64Data).replace(/^data:.*;base64,/, "");
  const bytes = Utilities.base64Decode(cleanBase64);
  const blob = Utilities.newBlob(bytes, mimeType || MimeType.ZIP, fileName);
  const file = folder.createFile(blob);
  return file.getUrl();
}

function storeUploadAssets_(payload) {
  const zipLink = payload.base64Zip
    ? saveDriveFileFromBase64_(
        payload.base64Zip,
        (payload.productName || "template") + ".zip",
        MimeType.ZIP,
        CONFIG.drive.zipFolderId
      )
    : (payload.zipFileLink || "");

  const previewLink = payload.base64Preview
    ? saveDriveFileFromBase64_(
        payload.base64Preview,
        (payload.productName || "preview") + ".png",
        "image/png",
        CONFIG.drive.previewFolderId
      )
    : (payload.previewImage || "");

  return {
    zipLink: zipLink,
    previewLink: previewLink
  };
}
