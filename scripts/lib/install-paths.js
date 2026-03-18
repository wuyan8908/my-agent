const path = require("path");

const GENERATED_ROOTS = {
  agents: "agents",
  docs: path.join("docs", "ai-team"),
  prompts: path.join("prompts", "ai-team"),
  workflows: path.join("workflows", "ai-team")
};

const METADATA_DIR = ".codex-team";
const MANIFEST_PATH = path.join(METADATA_DIR, "manifest.json");
const INSTALL_REPORT_PATH = path.join(METADATA_DIR, "install-report.json");
const START_PATH = path.join(METADATA_DIR, "start.md");
const ORCHESTRATOR_PROMPT_PATH = path.join(METADATA_DIR, "orchestrator-prompt.md");
const QUICK_REFERENCE_PATH = path.join(METADATA_DIR, "quick-reference.md");

function toPortablePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function isGeneratedContentPath(relativePath) {
  const portablePath = toPortablePath(relativePath);

  return Object.values(GENERATED_ROOTS).some((rootPath) => {
    const portableRoot = toPortablePath(rootPath);
    return portablePath === portableRoot || portablePath.startsWith(`${portableRoot}/`);
  });
}

function isMetadataPath(relativePath) {
  const portablePath = toPortablePath(relativePath);
  return portablePath.startsWith(`${toPortablePath(METADATA_DIR)}/`);
}

function isManagedPath(relativePath) {
  return isGeneratedContentPath(relativePath) || isMetadataPath(relativePath);
}

module.exports = {
  GENERATED_ROOTS,
  INSTALL_REPORT_PATH,
  MANIFEST_PATH,
  METADATA_DIR,
  ORCHESTRATOR_PROMPT_PATH,
  QUICK_REFERENCE_PATH,
  START_PATH,
  isGeneratedContentPath,
  isManagedPath,
  isMetadataPath,
  toPortablePath
};
