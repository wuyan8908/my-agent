const TEMPLATE_PATTERN = /\{\{([a-zA-Z0-9_]+)\}\}/g;

function renderTemplate(input, context) {
  return input.replace(TEMPLATE_PATTERN, (_, key) => {
    const value = context[key];
    return value === undefined || value === null ? "" : String(value);
  });
}

module.exports = {
  renderTemplate
};
