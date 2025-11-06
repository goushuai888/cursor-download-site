/**
 * 应用配置
 */

export const config = {
  // 自动同步配置
  autoSync: {
    // 是否启用自动同步
    enabled: true,
    
    // 同步间隔（毫秒）
    // 默认：1小时 = 60 * 60 * 1000
    // 30分钟 = 30 * 60 * 1000
    // 15分钟 = 15 * 60 * 1000
    interval: 60 * 60 * 1000, // 1小时
    
    // 外部 API 地址
    externalApis: {
      latest: 'https://versions.ccursor.org/api/version/list.php',
      old: 'https://versions.ccursor.org/api/version/old_versions.json',
    },
  },
  
  // 缓存配置
  cache: {
    // API 响应缓存时间（秒）
    maxAge: 300, // 5分钟
    
    // stale-while-revalidate 时间（秒）
    staleWhileRevalidate: 600, // 10分钟
  },
} as const;

export default config;

