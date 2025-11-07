'use client';

import * as React from 'react';
import { Version, Language } from '@/types';
import { getTranslation } from '@/lib/i18n';
import { Search, Clock, Tag } from 'lucide-react';

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
  const [filteredVersions, setFilteredVersions] = React.useState<Version[]>(versions);

  React.useEffect(() => {
    if (!search) {
      setFilteredVersions(versions);
    } else {
      const filtered = versions.filter(
        (v) =>
          v.version.toLowerCase().includes(search.toLowerCase()) ||
          v.date.includes(search)
      );
      setFilteredVersions(filtered);
    }
  }, [search, versions]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary-500" />
          Versions
        </h3>
        <p className="text-sm text-gray-500">
          {versions.length} available versions
        </p>
      </div>

      {/* Search Box */}
      <div className="relative mb-4">
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
        <div className="mb-3 text-sm text-gray-600">
          Found {filteredVersions.length} version{filteredVersions.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Version List */}
      <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
        {filteredVersions.map((version, index) => {
          const isSelected = selectedVersion?.version === version.version && 
                            selectedVersion?.buildId === version.buildId;
          const isLatest = index === 0;
          
          return (
            <button
              key={`${version.version}-${version.buildId}`}
              onClick={() => onSelectVersion(version)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-800 hover:shadow-md hover:scale-102'
              }`}
            >
              {/* Background effect on hover */}
              {!isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-lg flex items-center gap-2">
                    <span>{version.version}</span>
                    {isLatest && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        Latest
                      </span>
                    )}
                  </div>
                </div>
                
                <div className={`flex items-center gap-1.5 text-sm ${
                  isSelected ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{version.date}</span>
                </div>

                {/* Download channels indicator */}
                <div className="mt-2 flex gap-1">
                  {version.downloadChannel.map((channel) => (
                    <span
                      key={channel}
                      className={`text-xs px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}

        {filteredVersions.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No versions found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
