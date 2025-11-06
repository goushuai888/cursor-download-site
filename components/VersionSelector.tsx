'use client';

import * as React from 'react';
import { Version, Language } from '@/types';
import { getTranslation } from '@/lib/i18n';
import { Search } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={getTranslation('search', language)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
        {filteredVersions.map((version) => (
          <button
            key={`${version.version}-${version.buildId}`}
            onClick={() => onSelectVersion(version)}
            className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
              selectedVersion?.version === version.version && selectedVersion?.buildId === version.buildId
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
            }`}
          >
            <div className="font-semibold text-lg">{version.version}</div>
            <div
              className={`text-sm ${
                selectedVersion?.version === version.version && selectedVersion?.buildId === version.buildId ? 'text-primary-100' : 'text-gray-500'
              }`}
            >
              {version.date}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
