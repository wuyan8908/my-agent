const TEMPLATE_PATTERN = /\{\{([a-zA-Z0-9_]+)\}\}/g;

const CONTEXT_ALIASES = {
  blueprint: ["blueprintName", "projectType"],
  blueprintName: ["blueprint", "projectType"],
  projectType: ["blueprint", "blueprintName"],
  stack: ["detectedStack"],
  detectedStack: ["stack"],
  businessFocus: ["businessConcerns"],
  businessConcerns: ["businessFocus"]
};

function renderTemplate(input, context = {}) {
  const resolvedContext = resolveContext(context);

  return input.replace(TEMPLATE_PATTERN, (_, key) => {
    const value = resolvedContext[key];
    return formatValue(value);
  });
}

function resolveContext(context) {
  const resolved = { ...context };

  for (const [key, aliases] of Object.entries(CONTEXT_ALIASES)) {
    if (resolved[key] !== undefined && resolved[key] !== null) continue;

    for (const alias of aliases) {
      const aliasValue = resolved[alias];
      if (aliasValue !== undefined && aliasValue !== null) {
        resolved[key] = aliasValue;
        break;
      }
    }
  }

  return resolved;
}

function formatValue(value) {
  if (value === undefined || value === null) return "";
  if (Array.isArray(value)) return value.map((entry) => String(entry)).join(", ");
  return String(value);
}

module.exports = {
  renderTemplate
};
