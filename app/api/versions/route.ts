import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import config from '@/lib/config';

export const dynamic = 'force-dynamic'; // 禁用缓存，确保获取最新数据

// 缓存状态
let lastSyncTime = 0;
let cachedVersions: any[] = [];

/**
 * 从外部 API 同步最新版本数据
 */
async function syncVersionsFromExternal(): Promise<any[]> {
  try {
    console.log('开始从外部 API 同步版本数据...');
    
    // 获取最新版本
    const listResponse = await fetch(
      config.autoSync.externalApis.latest,
      { cache: 'no-store' }
    );
    const latestVersions = await listResponse.json();

    // 获取旧版本
    const oldResponse = await fetch(
      config.autoSync.externalApis.old,
      { cache: 'no-store' }
    );
    const oldVersions = await oldResponse.json();

    // 合并并去重
    const allVersionsMap = new Map();
    [...latestVersions, ...oldVersions].forEach((v: any) => {
      if (!allVersionsMap.has(v.version)) {
        allVersionsMap.set(v.version, v);
      }
    });

    const allVersions = Array.from(allVersionsMap.values());

    // 写入本地文件作为备份
    const filePath = path.join(process.cwd(), 'data', 'versions.json');
    await writeFile(filePath, JSON.stringify(allVersions, null, 2), 'utf-8');

    console.log(`✅ 成功同步 ${allVersions.length} 个版本`);
    
    return allVersions;
  } catch (error) {
    console.error('同步版本数据失败:', error);
    throw error;
  }
}

/**
 * 从本地文件读取版本数据
 */
async function loadVersionsFromFile(): Promise<any[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'versions.json');
    const fileContent = await readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('读取本地版本文件失败:', error);
    return [];
  }
}

export async function GET() {
  try {
    const now = Date.now();
    const shouldSync = config.autoSync.enabled && (now - lastSyncTime > config.autoSync.interval);

    if (shouldSync) {
      // 尝试从外部 API 同步
      try {
        cachedVersions = await syncVersionsFromExternal();
        lastSyncTime = now;
        console.log('✅ 自动同步完成，数据已更新');
      } catch (syncError) {
        console.warn('自动同步失败，使用本地缓存数据');
        // 如果同步失败，尝试从本地文件读取
        if (cachedVersions.length === 0) {
          cachedVersions = await loadVersionsFromFile();
        }
      }
    }

    // 如果还是没有数据，尝试从本地文件读取
    if (cachedVersions.length === 0) {
      cachedVersions = await loadVersionsFromFile();
    }

    return NextResponse.json(cachedVersions, {
      headers: {
        'Cache-Control': `public, s-maxage=${config.cache.maxAge}, stale-while-revalidate=${config.cache.staleWhileRevalidate}`,
        'X-Last-Sync': lastSyncTime ? new Date(lastSyncTime).toISOString() : 'never',
        'X-Version-Count': cachedVersions.length.toString(),
        'X-Auto-Sync': config.autoSync.enabled ? 'enabled' : 'disabled',
      },
    });
  } catch (error) {
    console.error('Failed to fetch versions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch versions' },
      { status: 500 }
    );
  }
}

