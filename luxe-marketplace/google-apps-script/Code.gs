function doGet(e) {
  try {
    ensureSchema_();
    seedDefaults_();
    const action = e && e.parameter && e.parameter.action ? e.parameter.action : "bootstrap";
    return handleGetAction_(action, e.parameter || {});
  } catch (error) {
    return fail_(error.message, 500);
  }
}

function doPost(e) {
  try {
    ensureSchema_();
    seedDefaults_();
    const payload = parseBody_(e);
    const action = payload.action || (e && e.parameter ? e.parameter.action : "");
    return handlePostAction_(action, payload);
  } catch (error) {
    return fail_(error.message, 500);
  }
}
