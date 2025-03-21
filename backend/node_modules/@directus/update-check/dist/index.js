// src/index.ts
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import boxen from "boxen";
import chalk from "chalk";
import { gte, prerelease } from "semver";

// src/cache.ts
import { buildStorage } from "axios-cache-interceptor";
import findCacheDirectory from "find-cache-dir";
import fs from "node:fs/promises";
import path from "node:path";
async function getCache() {
  const dir = findCacheDirectory({ name: "directus" });
  if (!dir) return;
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    return;
  }
  return buildStorage({
    async set(key, value) {
      const file = path.join(dir, key);
      const content = JSON.stringify(value);
      return fs.writeFile(file, content).catch(() => {
      });
    },
    async remove(key) {
      const file = path.join(dir, key);
      return fs.unlink(file).catch(() => {
      });
    },
    async find(key) {
      try {
        const file = path.join(dir, key);
        const content = await fs.readFile(file, { encoding: "utf8" });
        const value = JSON.parse(content);
        return value;
      } catch {
        return void 0;
      }
    },
    async clear() {
      try {
        const files = await fs.readdir(dir);
        await Promise.all(files.map((name) => fs.unlink(path.join(dir, name))));
      } catch {
      }
    }
  });
}

// src/index.ts
var cache = await getCache();
var instance = Axios.create();
var axios = cache ? setupCache(instance, { storage: cache }) : instance;
async function updateCheck(currentVersion) {
  let packageManifest;
  try {
    const response = await axios.get("https://registry.npmjs.org/directus", {
      headers: { accept: "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*" },
      timeout: 8e3
    });
    packageManifest = response.data;
  } catch {
    return;
  }
  const latestVersion = packageManifest?.["dist-tags"]?.["latest"];
  const versions = packageManifest?.versions;
  if (!latestVersion || !versions || gte(currentVersion, latestVersion)) return;
  const allVersions = Object.keys(versions).filter((version) => !prerelease(version));
  const indexOfCurrent = allVersions.indexOf(currentVersion);
  const indexOfLatest = allVersions.indexOf(latestVersion);
  const versionDifference = indexOfCurrent !== -1 && indexOfLatest !== -1 ? Math.abs(indexOfLatest - indexOfCurrent) : null;
  const message = [
    chalk.bold(`Update available!`),
    "",
    chalk.bold(`${chalk.red(currentVersion)} \u2192 ${chalk.green(latestVersion)}`),
    ...versionDifference ? [chalk.dim(`${versionDifference} ${versionDifference > 1 ? "versions" : "version"} behind`)] : [],
    "",
    "More information:",
    chalk.blue(`https://github.com/directus/directus/releases`)
  ];
  let borderColor;
  if (versionDifference && versionDifference > 5) {
    borderColor = "red";
  } else if (versionDifference && versionDifference > 2) {
    borderColor = "yellow";
  } else {
    borderColor = "magenta";
  }
  const boxenOptions = {
    padding: 1,
    margin: 1,
    align: "center",
    borderColor,
    borderStyle: "round"
  };
  console.warn(boxen(message.join("\n"), boxenOptions));
}
export {
  updateCheck
};
