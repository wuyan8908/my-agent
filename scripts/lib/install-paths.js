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
  return portablePath === toPortablePath(MANIFEST_PATH) || portablePath === toPortablePath(INSTALL_REPORT_PATH);
}

function isManagedPath(relativePath) {
  return isGeneratedContentPath(relativePath) || isMetadataPath(relativePath);
}

module.exports = {
  GENERATED_ROOTS,
  INSTALL_REPORT_PATH,
  MANIFEST_PATH,
  METADATA_DIR,
  isGeneratedContentPath,
  isManagedPath,
  isMetadataPath,
  toPortablePath
};
