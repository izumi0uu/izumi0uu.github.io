import { execSync } from "child_process";

interface GitResult {
  time: string;
  shortHash: string;
  fullHash: string;
  message: string;
}

const getLatestCommitInfo = (): GitResult => {
  try {
    const separator = "___";
    const command = `git log -1 --pretty=format:"%ad${separator}%h${separator}%H${separator}%s" --date=format:'%Y-%m-%d %H:%M:%S'`;
    const output = execSync(command, { encoding: "utf-8" }).toString().trim().split(separator);

    if (output.length !== 4) {
      throw new Error("Could not parse the latest Git commit output.");
    }

    return {
      time: output[0],
      shortHash: output[1],
      fullHash: output[2],
      message: output[3],
    };
  } catch (error) {
    console.warn("Failed to get git commit info:", error);
    return {
      time: new Date().toISOString().slice(0, 19).replace("T", " "),
      shortHash: "unknown",
      fullHash: "unknown",
      message: "No commit info available",
    };
  }
};

const getLatestCommitInfoAsString = (): string => {
  const commitInfo = getLatestCommitInfo();

  const commitInfoString = Object.entries(commitInfo)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  return commitInfoString;
};

export { getLatestCommitInfo, getLatestCommitInfoAsString, type GitResult };
