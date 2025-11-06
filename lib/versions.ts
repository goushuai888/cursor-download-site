import { Version } from "@/types";

export interface VersionData {
  version: string;
  buildId: string;
  downloadChannel: string[];
  date: string;
}

const BASE_URLS = {
  official: "https://downloader.cursor.sh/builds",
  todesktop: "https://download.todesktop.com/230313mzl4w4u92",
  aws: "https://downloads.cursor.com/production",
  awsNightly: "https://downloads.cursor.com/nightly",
};

// 缓存版本数据
let cachedVersions: VersionData[] | null = null;

export async function fetchVersions(): Promise<VersionData[]> {
  if (cachedVersions) {
    return cachedVersions;
  }

  try {
    // 使用自己的 API 接口
    const response = await fetch("/api/versions", {
      cache: "no-store", // 禁用缓存，确保获取最新数据
    });
    
    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`);
    }
    
    const versions: VersionData[] = await response.json();
    
    // 按版本号排序（降序）
    const sortedVersions = versions.sort((a, b) => {
      return compareVersions(b.version, a.version);
    });
    
    cachedVersions = sortedVersions;
    return sortedVersions;
  } catch (error) {
    console.error("Failed to fetch versions:", error);
    return [];
  }
}

function compareVersions(version1: string, version2: string): number {
  const v1Parts = version1.split(".").map(Number);
  const v2Parts = version2.split(".").map(Number);

  const maxLength = Math.max(v1Parts.length, v2Parts.length);

  for (let i = 0; i < maxLength; i++) {
    const v1Part = i < v1Parts.length ? v1Parts[i] : 0;
    const v2Part = i < v2Parts.length ? v2Parts[i] : 0;

    if (v1Part > v2Part) return 1;
    if (v1Part < v2Part) return -1;
  }

  return 0;
}

export function getOfficialDownloadUrl(
  versionData: VersionData,
  platform: string
): string {
  return `${BASE_URLS.official}/${versionData.buildId}/${platform}`;
}

export function getTodeskDownloadUrl(
  versionData: VersionData,
  platform: string
): string {
  const { version, buildId } = versionData;
  let fileName = "";

  switch (platform) {
    case "win32-x64":
      fileName = `Cursor Setup ${version} - Build ${buildId}-x64.exe`;
      break;
    case "win32-arm64":
      fileName = `Cursor Setup ${version} - Build ${buildId}-arm64.exe`;
      break;
    case "darwin-universal":
      fileName = `Cursor ${version} - Build ${buildId}-universal.dmg`;
      break;
    case "darwin-arm64":
      fileName = `Cursor ${version} - Build ${buildId}-arm64.dmg`;
      break;
    case "darwin-x64":
      fileName = `Cursor ${version} - Build ${buildId}-x64.dmg`;
      break;
    case "linux-x64":
      fileName = `cursor-${version}-build-${buildId}-x86_64.AppImage`;
      break;
    case "linux-arm64":
      fileName = `cursor-${version}-build-${buildId}-arm64.AppImage`;
      break;
    default:
      return "#";
  }

  const encodedFileName = encodeURIComponent(fileName);
  return `${BASE_URLS.todesktop}/${encodedFileName}`;
}

export function getAwsDownloadUrl(
  versionData: VersionData,
  platform: string
): string {
  return getAwsCoreDownloadUrl(BASE_URLS.aws, versionData, platform);
}

export function getAwsNightlyDownloadUrl(
  versionData: VersionData,
  platform: string
): string {
  return getAwsCoreDownloadUrl(BASE_URLS.awsNightly, versionData, platform);
}

function getAwsCoreDownloadUrl(
  baseUrl: string,
  versionData: VersionData,
  platform: string
): string {
  const { version, buildId } = versionData;
  let fileName = "";

  switch (platform) {
    case "darwin-universal":
      fileName = `${buildId}/darwin/universal/Cursor-darwin-universal.dmg`;
      break;
    case "darwin-x64":
      fileName = `${buildId}/darwin/x64/Cursor-darwin-x64.dmg`;
      break;
    case "darwin-arm64":
      fileName = `${buildId}/darwin/arm64/Cursor-darwin-arm64.dmg`;
      break;
    case "win32-x64-system-setup":
      fileName = `${buildId}/win32/x64/system-setup/CursorSetup-x64-${version}.exe`;
      break;
    case "win32-x64-user-setup":
      fileName = `${buildId}/win32/x64/user-setup/CursorUserSetup-x64-${version}.exe`;
      break;
    case "win32-arm64-system-setup":
      fileName = `${buildId}/win32/arm64/system-setup/CursorSetup-arm64-${version}.exe`;
      break;
    case "win32-arm64-user-setup":
      fileName = `${buildId}/win32/arm64/user-setup/CursorUserSetup-arm64-${version}.exe`;
      break;
    case "linux-x64":
      if (compareVersions(version, "0.47.9") >= 0) {
        fileName = `${buildId}/linux/x64/Cursor-${version}-x86_64.AppImage`;
      } else {
        fileName = `client/linux/x64/appimage/Cursor-${version}-${buildId}.deb.glibc2.25-x86_64.AppImage`;
      }
      break;
    case "linux-arm64":
      fileName = `${buildId}/linux/arm64/Cursor-${version}-aarch64.AppImage`;
      break;
  }
  return `${baseUrl}/${fileName}`;
}
