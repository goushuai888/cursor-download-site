'use client';

import { useState, useEffect } from 'react';
import { Version, Language } from '@/types';
import { fetchVersions, getOfficialDownloadUrl, getAwsDownloadUrl } from '@/lib/versions';
import { detectPlatform, getRecommendedPlatform, getArchDisplayName } from '@/lib/platform-detect';
import { getTranslation } from '@/lib/i18n';
import VersionSelector from '@/components/VersionSelector';
import DownloadSection from '@/components/DownloadSection';
import LanguageSelector from '@/components/LanguageSelector';
import { Download, Sparkles, Zap, Shield, Code2, Rocket } from 'lucide-react';

export default function Home() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('zh');
  const [loading, setLoading] = useState(true);
  const [detectedPlatform, setDetectedPlatform] = useState<ReturnType<typeof detectPlatform> | null>(null);
  const [manualArch, setManualArch] = useState<'x64' | 'arm64' | null>(null);

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

    // Detect platform
    const platform = detectPlatform();
    setDetectedPlatform(platform);
  }, []);

  // 获取快速下载链接
  const getQuickDownloadUrl = () => {
    if (!selectedVersion || !detectedPlatform) return '#';
    
    // 使用手动选择的架构或检测到的架构
    const arch = manualArch || detectedPlatform.arch;
    const platform = getRecommendedPlatform(detectedPlatform.os, arch);
    
    // 优先使用 AWS 下载
    if (selectedVersion.downloadChannel.includes('aws')) {
      const platformMap: Record<string, string> = {
        'win32-x64': 'win32-x64-user-setup',
        'win32-arm64': 'win32-arm64-user-setup',
        'darwin-arm64': 'darwin-arm64',
        'darwin-x64': 'darwin-x64',
        'linux-x64': 'linux-x64',
        'linux-arm64': 'linux-arm64',
      };
      return getAwsDownloadUrl(selectedVersion, platformMap[platform] || 'win32-x64-user-setup');
    }
    
    // 回退到官方下载
    const platformMap: Record<string, string> = {
      'win32-x64': 'windows/nsis/x64',
      'win32-arm64': 'windows/nsis/arm64',
      'darwin-arm64': 'mac/installer/arm64',
      'darwin-x64': 'mac/installer/x64',
      'linux-x64': 'linux/appImage/x64',
      'linux-arm64': 'linux/appImage/arm64',
    };
    return getOfficialDownloadUrl(selectedVersion, platformMap[platform] || 'windows/nsis/x64');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">{getTranslation('loadingVersions', currentLanguage)}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Language Selector - Fixed top right */}
      <div className="fixed top-8 right-8 z-50">
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Main Hero Content */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6 animate-bounce-subtle">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">{getTranslation('heroTag', currentLanguage)}</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              {currentLanguage === 'zh' ? '下载' : currentLanguage === 'ja' ? 'ダウンロード' : currentLanguage === 'ko' ? '다운로드' : currentLanguage === 'es' ? 'Descargar' : currentLanguage === 'fr' ? 'Télécharger' : currentLanguage === 'de' ? 'Herunterladen' : 'Download'}{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text animate-gradient">
                {getTranslation('heroTitle', currentLanguage)}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
              {getTranslation('heroSubtitle', currentLanguage)}
            </p>

            {/* Quick Download Button */}
            {selectedVersion && detectedPlatform && detectedPlatform.os !== 'unknown' && (
              <div className="mb-8 animate-slide-up">
                {/* Architecture Selector for Mac */}
                {detectedPlatform.os === 'mac' && detectedPlatform.arch === 'unknown' && (
                  <div className="mb-4 flex justify-center gap-3">
                    <button
                      onClick={() => setManualArch('arm64')}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        manualArch === 'arm64'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      🍎 Apple Silicon (M1/M2/M3)
                    </button>
                    <button
                      onClick={() => setManualArch('x64')}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        manualArch === 'x64'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      💻 Intel
                    </button>
                  </div>
                )}
                
                {/* Download Button */}
                {(detectedPlatform.arch !== 'unknown' || manualArch) && (
                  <>
                    <a
                      href={getQuickDownloadUrl()}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group"
                    >
                      <Download className="w-6 h-6 group-hover:animate-bounce" />
                      <span>
                        {getTranslation('downloadFor', currentLanguage)} {detectedPlatform.displayName}
                        <span className="text-sm font-normal ml-2 opacity-90">
                          ({getArchDisplayName(manualArch || detectedPlatform.arch)})
                        </span>
                      </span>
                    </a>
                    <p className="text-sm text-gray-500 mt-3">
                      {getTranslation('versionLabel', currentLanguage)} {selectedVersion.version} • {selectedVersion.date}
                    </p>
                  </>
                )}
                
                {/* Prompt to select architecture */}
                {detectedPlatform.arch === 'unknown' && !manualArch && (
                  <p className="text-sm text-gray-600 mt-3">
                    {currentLanguage === 'zh' ? '👆 请选择您的 Mac 芯片类型' :
                     currentLanguage === 'ja' ? '👆 Mac チップの種類を選択してください' :
                     currentLanguage === 'ko' ? '👆 Mac 칩 유형을 선택하세요' :
                     currentLanguage === 'es' ? '👆 Seleccione el tipo de chip de su Mac' :
                     currentLanguage === 'fr' ? '👆 Sélectionnez le type de puce de votre Mac' :
                     currentLanguage === 'de' ? '👆 Wählen Sie Ihren Mac-Chip-Typ' :
                     '👆 Please select your Mac chip type'}
                  </p>
                )}
              </div>
            )}

            {/* Version Stats */}
            <div className="flex justify-center gap-8 text-center">
              <div className="animate-fade-in animation-delay-200">
                <div className="text-3xl font-bold text-gray-900">{versions.length}+</div>
                <div className="text-sm text-gray-600">{getTranslation('versionsCount', currentLanguage)}</div>
              </div>
              <div className="animate-fade-in animation-delay-400">
                <div className="text-3xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">{getTranslation('platformsCount', currentLanguage)}</div>
              </div>
              <div className="animate-fade-in animation-delay-600">
                <div className="text-3xl font-bold text-gray-900">∞</div>
                <div className="text-sm text-gray-600">{getTranslation('possibilities', currentLanguage)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {getTranslation('featuresSectionTitle', currentLanguage)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{getTranslation('featureFastTitle', currentLanguage)}</h3>
              <p className="text-gray-600">
                {getTranslation('featureFastDesc', currentLanguage)}
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animation-delay-200">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{getTranslation('featureAiTitle', currentLanguage)}</h3>
              <p className="text-gray-600">
                {getTranslation('featureAiDesc', currentLanguage)}
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animation-delay-400">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{getTranslation('featurePrivacyTitle', currentLanguage)}</h3>
              <p className="text-gray-600">
                {getTranslation('featurePrivacyDesc', currentLanguage)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Download Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {getTranslation('chooseVersionTitle', currentLanguage)}
            </h2>
            <p className="text-lg text-gray-600">
              {getTranslation('chooseVersionSubtitle', currentLanguage)}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Version Selector - 1/4 width */}
            <div className="lg:col-span-1">
              <VersionSelector
                versions={versions}
                selectedVersion={selectedVersion}
                onSelectVersion={setSelectedVersion}
                language={currentLanguage}
              />
            </div>

            {/* Download Section - 3/4 width */}
            <div className="lg:col-span-3">
              {selectedVersion ? (
                <DownloadSection version={selectedVersion} language={currentLanguage} />
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">{getTranslation('selectVersion', currentLanguage)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Rocket className="w-5 h-5 text-primary-500" />
            <span className="text-gray-900 font-semibold">{getTranslation('footerForUsers', currentLanguage)}</span>
          </div>
          <p className="text-gray-600 mb-4">
            {getTranslation('footerMadeWith', currentLanguage)}
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a
              href="https://cursor.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 transition-colors"
            >
              {getTranslation('officialWebsite', currentLanguage)}
            </a>
            <span>•</span>
            <a
              href="https://docs.cursor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 transition-colors"
            >
              {getTranslation('documentation', currentLanguage)}
            </a>
            <span>•</span>
            <a
              href="https://www.cursor.com/changelog"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 transition-colors"
            >
              {getTranslation('changelog', currentLanguage)}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
