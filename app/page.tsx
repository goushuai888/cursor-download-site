'use client';

import { useState, useEffect } from 'react';
import { Version, Language } from '@/types';
import { fetchVersions } from '@/lib/versions';
import VersionSelector from '@/components/VersionSelector';
import DownloadSection from '@/components/DownloadSection';
import LanguageSelector from '@/components/LanguageSelector';

export default function Home() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('zh');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVersions() {
      setLoading(true);
      const data = await fetchVersions();
      setVersions(data);
      if (data.length > 0) {
        setSelectedVersion(data[0]);
      }
      setLoading(false);
    }
    loadVersions();
  }, []);

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0] as Language;
    const supportedLangs: Language[] = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de'];
    if (supportedLangs.includes(browserLang)) {
      setCurrentLanguage(browserLang);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-gray-600">加载版本数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Cursor Download Center
          </h1>
          <p className="text-xl text-gray-600">
            The AI-first code editor - Download any version
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Version Selector - 1/3 width on large screens */}
          <div className="lg:col-span-1">
            <VersionSelector
              versions={versions}
              selectedVersion={selectedVersion}
              onSelectVersion={setSelectedVersion}
              language={currentLanguage}
            />
          </div>

          {/* Download Section - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            {selectedVersion ? (
              <DownloadSection version={selectedVersion} language={currentLanguage} />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-gray-500 text-lg">Select a version to download</p>
              </div>
            )}
          </div>
        </div>

        {/* Language Selector - Fixed bottom right */}
        <div className="fixed bottom-8 right-8 z-40">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-12 pb-8">
          <p>
            Made with ❤️ for Cursor users |{' '}
            <a
              href="https://cursor.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 transition-colors"
            >
              Official Website
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
