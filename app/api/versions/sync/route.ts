import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

/**
 * 从外部 API 同步版本数据到本地
 * 访问 /api/versions/sync 来更新本地版本数据
 */
export async function POST() {
  try {
    // 获取最新版本
    const listResponse = await fetch(
      'https://versions.ccursor.org/api/version/list.php'
    );
    const latestVersions = await listResponse.json();

    // 获取旧版本
    const oldResponse = await fetch(
      'https://versions.ccursor.org/api/version/old_versions.json'
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

    // 写入本地文件
    const filePath = path.join(process.cwd(), 'data', 'versions.json');
    await writeFile(filePath, JSON.stringify(allVersions, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: `成功同步 ${allVersions.length} 个版本`,
      count: allVersions.length,
    });
  } catch (error) {
    console.error('Failed to sync versions:', error);
    return NextResponse.json(
      { error: 'Failed to sync versions', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: '请使用 POST 请求来同步版本数据',
    usage: 'POST /api/versions/sync',
  });
}

