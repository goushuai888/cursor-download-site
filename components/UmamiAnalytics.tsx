'use client';

import Script from 'next/script';

/**
 * Umami 统计组件
 * 部署 Umami 后，请更新以下配置
 */
export default function UmamiAnalytics() {
  // 配置你的 Umami 信息
  const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '';
  const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC || '';

  // 如果没有配置，不加载
  if (!UMAMI_WEBSITE_ID || !UMAMI_SRC) {
    return null;
  }

  return (
    <Script
      async
      defer
      data-website-id={UMAMI_WEBSITE_ID}
      src={UMAMI_SRC}
      strategy="afterInteractive"
    />
  );
}

/**
 * 追踪自定义事件
 * @param eventName 事件名称
 * @param eventData 事件数据（可选）
 */
export function trackUmamiEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(eventName, eventData);
  }
}

/**
 * 追踪页面浏览
 * @param url 页面URL
 * @param referrer 来源URL（可选）
 */
export function trackUmamiPageView(url: string, referrer?: string) {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track((props: any) => ({
      ...props,
      url,
      referrer
    }));
  }
}

