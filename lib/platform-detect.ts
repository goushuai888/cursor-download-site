/**
 * 平台检测工具
 * 自动识别用户的操作系统和架构
 */

export type PlatformType = 'windows' | 'mac' | 'linux' | 'unknown';
export type ArchType = 'x64' | 'arm64' | 'unknown';

export interface DetectedPlatform {
  os: PlatformType;
  arch: ArchType;
  displayName: string;
  icon: string;
}

/**
 * 检测用户的操作系统
 */
export function detectOS(): PlatformType {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform?.toLowerCase() || '';
  
  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows';
  }
  
  if (platform.includes('mac') || userAgent.includes('mac')) {
    return 'mac';
  }
  
  if (platform.includes('linux') || userAgent.includes('linux')) {
    return 'linux';
  }
  
  return 'unknown';
}

/**
 * 检测用户的CPU架构
 * 注意：浏览器检测 Apple Silicon 并不完全可靠，建议让用户手动选择
 */
export function detectArch(): ArchType {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform?.toLowerCase() || '';
  
  // 检测 ARM 架构
  if (
    platform.includes('arm') || 
    userAgent.includes('arm') ||
    platform.includes('aarch64')
  ) {
    return 'arm64';
  }
  
  // 检测 Apple Silicon
  // MacIntel 可能是 Intel 或 Apple Silicon（Rosetta）
  // 所以 macOS 默认返回 unknown，让用户手动选择
  if (platform.includes('mac')) {
    // 尝试通过 userAgent 中的信息判断
    if (userAgent.includes('arm64') || userAgent.includes('aarch64')) {
      return 'arm64';
    }
    // 对于 Mac，返回 unknown 以触发手动选择
    return 'unknown';
  }
  
  // 默认为 x64
  return 'x64';
}

/**
 * 获取完整的平台信息
 */
export function detectPlatform(): DetectedPlatform {
  const os = detectOS();
  const arch = detectArch();
  
  const displayNames: Record<PlatformType, string> = {
    windows: 'Windows',
    mac: 'macOS',
    linux: 'Linux',
    unknown: 'Unknown',
  };
  
  const icons: Record<PlatformType, string> = {
    windows: '🪟',
    mac: '🍎',
    linux: '🐧',
    unknown: '💻',
  };
  
  return {
    os,
    arch,
    displayName: displayNames[os],
    icon: icons[os],
  };
}

/**
 * 获取推荐的下载平台字符串
 */
export function getRecommendedPlatform(os: PlatformType, arch: ArchType): string {
  switch (os) {
    case 'windows':
      return arch === 'arm64' ? 'win32-arm64' : 'win32-x64';
    case 'mac':
      return arch === 'arm64' ? 'darwin-arm64' : 'darwin-x64';
    case 'linux':
      return arch === 'arm64' ? 'linux-arm64' : 'linux-x64';
    default:
      return 'win32-x64'; // 默认推荐 Windows x64
  }
}

/**
 * 获取架构显示名称
 */
export function getArchDisplayName(arch: ArchType): string {
  return arch === 'arm64' ? 'ARM64' : 'x64 (64-bit)';
}

