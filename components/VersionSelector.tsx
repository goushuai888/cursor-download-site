'use client';

import * as React from 'react';
import { Version, Language } from '@/types';
import { getTranslation } from '@/lib/i18n';
import { trackEvent } from '@/components/BaiduAnalytics';
import { Search, Tag } from 'lucide-react';

interface VersionSelectorProps {
  versions: Version[];
  selectedVersion: Version | null;
  onSelectVersion: (version: Version) => void;
  language: Language;
}

export default function VersionSelector({
  versions,
  selectedVersion,
  onSelectVersion,
  language,
}: VersionSelectorProps) {
  const [search, setSearch] = React.useState('');
  const [showAll, setShowAll] = React.useState(false);
  const [filteredVersions, setFilteredVersions] = React.useState<Version[]>(versions);

  React.useEffect(() => {
    if (!search) {
      // 如果没有搜索，默认只显示前10个版本
      setFilteredVersions(showAll ? versions : versions.slice(0, 10));
    } else {
      const filtered = versions.filter(
        (v) =>
          v.version.toLowerCase().includes(search.toLowerCase()) ||
          v.date.includes(search)
      );
      setFilteredVersions(filtered);
    }
  }, [search, versions, showAll]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col sticky top-8" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
      {/* Header */}
      <div className="mb-4 flex-shrink-0">
        <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary-500" />
          {getTranslation('versionsTitle', language)}
        </h3>
        <p className="text-sm text-gray-500">
          {versions.length} {getTranslation('availableVersions', language)}
        </p>
      </div>

      {/* Search Box */}
      <div className="relative mb-4 flex-shrink-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={getTranslation('search', language)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Results count */}
      {search && (
        <div className="mb-3 text-sm text-gray-600 flex-shrink-0">
          {getTranslation('foundVersions', language)} {filteredVersions.length} {filteredVersions.length > 1 ? getTranslation('versionsCount', language).toLowerCase() : getTranslation('versionLabel', language).toLowerCase()}
        </div>
      )}

      {/* Version List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
        <div className="space-y-1">
          {filteredVersions.map((version, index) => {
            const isSelected = selectedVersion?.version === version.version && 
                              selectedVersion?.buildId === version.buildId;
            const isLatest = index === 0 && !search;
            
            return (
                      <button
                        key={`${version.version}-${version.buildId}`}
                        onClick={() => {
                          onSelectVersion(version);
                          trackEvent('Version', 'Select', version.version, parseFloat(version.version));
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Version Number */}
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-base ${
                      isSelected ? 'text-white' : 'text-gray-900'
                    }`}>
                      {version.version}
                    </span>
                    {isLatest && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {getTranslation('latestBadge', language)}
                      </span>
                    )}
                  </div>
                  
                  {/* Date */}
                  <span className={`text-sm ${
                    isSelected ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {version.date}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {filteredVersions.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">{getTranslation('noVersionsFound', language)}</p>
            <p className="text-sm text-gray-400 mt-1">{getTranslation('tryDifferentSearch', language)}</p>
          </div>
        )}
      </div>

      {/* Show More Button */}
      {!search && versions.length > 10 && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200"
          >
            {showAll ? `↑ ${language === 'zh' ? '显示最新10个' : language === 'ja' ? '最新の10個を表示' : language === 'ko' ? '최신 10개 표시' : language === 'es' ? 'Mostrar 10 recientes' : language === 'fr' ? 'Afficher les 10 récents' : language === 'de' ? 'Zeige neueste 10' : 'Show Latest 10'}` : `↓ ${language === 'zh' ? `显示全部 ${versions.length} 个版本` : language === 'ja' ? `すべての ${versions.length} バージョンを表示` : language === 'ko' ? `모든 ${versions.length} 버전 표시` : language === 'es' ? `Mostrar todas las ${versions.length} versiones` : language === 'fr' ? `Afficher toutes les ${versions.length} versions` : language === 'de' ? `Alle ${versions.length} Versionen anzeigen` : `Show All ${versions.length} Versions`}`}
          </button>
        </div>
      )}
    </div>
  );
}
