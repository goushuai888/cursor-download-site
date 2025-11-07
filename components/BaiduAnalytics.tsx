'use client';

import Script from 'next/script';

/**
 * 百度统计组件
 * 站点ID: 8dc38a600d03d54a0db67f6e5ecaca8a
 */
export default function BaiduAnalytics() {
  return (
    <>
      <Script
        id="baidu-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?8dc38a600d03d54a0db67f6e5ecaca8a";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `,
        }}
      />
    </>
  );
}

/**
 * 声明全局 _hmt 类型
 */
declare global {
  interface Window {
    _hmt: any[];
  }
}

/**
 * 追踪自定义事件
 * @param category 事件类别
 * @param action 事件操作
 * @param label 事件标签（可选）
 * @param value 事件值（可选）
 */
export function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window._hmt) {
    window._hmt.push(['_trackEvent', category, action, label, value]);
  }
}

/**
 * 追踪页面浏览
 * @param pageUrl 页面URL
 */
export function trackPageView(pageUrl: string) {
  if (typeof window !== 'undefined' && window._hmt) {
    window._hmt.push(['_trackPageview', pageUrl]);
  }
}

