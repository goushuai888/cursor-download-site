'use client';

import { useState } from 'react';
import { Version, Language } from '@/types';
import { getTranslation } from '@/lib/i18n';
import {
  getOfficialDownloadUrl,
  getTodeskDownloadUrl,
  getAwsDownloadUrl,
} from '@/lib/versions';
import { Download, Monitor, Apple, HardDrive, CheckCircle, Sparkles } from 'lucide-react';

interface DownloadSectionProps {
  version: Version;
  language: Language;
}

type Platform = 'windows' | 'mac' | 'linux';

interface DownloadButtonProps {
  href: string;
  label: string;
  className: string;
  icon?: 'official' | 'todesktop' | 'aws';
}

function DownloadButton({ href, label, className, icon }: DownloadButtonProps) {
  const IconComponent = icon === 'official' ? CheckCircle : icon === 'todesktop' ? Sparkles : Download;
  
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 ${className} overflow-hidden`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <IconComponent className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform" />
      <span className="relative z-10">{label}</span>
    </a>
  );
}

interface ArchCardProps {
  archName: string;
  children: React.ReactNode;
  recommended?: boolean;
}

function ArchCard({ archName, children, recommended }: ArchCardProps) {
  return (
    <div className={`relative bg-gradient-to-br ${recommended ? 'from-blue-50 to-purple-50 border-2 border-blue-300' : 'from-gray-50 to-gray-100 border border-gray-200'} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg`}>
      {recommended && (
        <div className="absolute -top-3 right-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
            <Sparkles className="w-3 h-3" />
            Recommended
          </span>
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-800">{archName}</h4>
        {recommended && (
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

export default function DownloadSection({ version, language }: DownloadSectionProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('windows');
  const hasChannel = (channel: string) => version.downloadChannel.includes(channel);

  const platforms = [
    { id: 'windows' as Platform, name: 'Windows', icon: Monitor, color: 'blue' },
    { id: 'mac' as Platform, name: 'macOS', icon: Apple, color: 'gray' },
    { id: 'linux' as Platform, name: 'Linux', icon: HardDrive, color: 'yellow' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header with Version Info */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">
              Version {version.version}
            </h2>
            <p className="text-blue-100 text-sm">
              Released: {version.date}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <CheckCircle className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-semibold">
              {version.downloadChannel.length} Download Sources
            </span>
          </div>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex gap-2 px-8 py-4 overflow-x-auto">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isActive = selectedPlatform === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-lg scale-105'
                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? `text-${platform.color}-600` : 'text-gray-500'}`} />
                <span>{platform.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Download Content */}
      <div className="p-8">
        {/* Windows */}
        {selectedPlatform === 'windows' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <ArchCard archName="x64 (64-bit)" recommended>
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'windows/nsis/x64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  icon="official"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'win32-x64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  icon="todesktop"
                />
              )}
              {hasChannel('aws') && (
                <>
                  <DownloadButton
                    href={getAwsDownloadUrl(version, 'win32-x64-user-setup')}
                    label={getTranslation('awsDownloadUserSetup', language)}
                    className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                    icon="aws"
                  />
                  <DownloadButton
                    href={getAwsDownloadUrl(version, 'win32-x64-system-setup')}
                    label={getTranslation('awsDownloadSystemSetup', language)}
                    className="bg-gradient-to-r from-orange-700 to-orange-800 hover:from-orange-800 hover:to-orange-900"
                    icon="aws"
                  />
                </>
              )}
            </ArchCard>

            <ArchCard archName="ARM64">
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'windows/nsis/arm64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  icon="official"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'win32-arm64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  icon="todesktop"
                />
              )}
              {hasChannel('aws') && (
                <>
                  <DownloadButton
                    href={getAwsDownloadUrl(version, 'win32-arm64-user-setup')}
                    label={getTranslation('awsDownloadUserSetup', language)}
                    className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                    icon="aws"
                  />
                  <DownloadButton
                    href={getAwsDownloadUrl(version, 'win32-arm64-system-setup')}
                    label={getTranslation('awsDownloadSystemSetup', language)}
                    className="bg-gradient-to-r from-orange-700 to-orange-800 hover:from-orange-800 hover:to-orange-900"
                    icon="aws"
                  />
                </>
              )}
            </ArchCard>
          </div>
        )}

        {/* macOS */}
        {selectedPlatform === 'mac' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <ArchCard archName="Universal (通用)">
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'mac/installer/universal')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  icon="official"
                />
              )}
              {hasChannel('aws') && (
                <DownloadButton
                  href={getAwsDownloadUrl(version, 'darwin-universal')}
                  label={getTranslation('awsDownload', language)}
                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                  icon="aws"
                />
              )}
            </ArchCard>

            <ArchCard archName="Apple Silicon (M Series)" recommended>
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'mac/installer/arm64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  icon="official"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'darwin-arm64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  icon="todesktop"
                />
              )}
              {hasChannel('aws') && (
                <DownloadButton
                  href={getAwsDownloadUrl(version, 'darwin-arm64')}
                  label={getTranslation('awsDownload', language)}
                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                  icon="aws"
                />
              )}
            </ArchCard>

            <ArchCard archName="Intel">
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'mac/installer/x64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  icon="official"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'darwin-x64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  icon="todesktop"
                />
              )}
              {hasChannel('aws') && (
                <DownloadButton
                  href={getAwsDownloadUrl(version, 'darwin-x64')}
                  label={getTranslation('awsDownload', language)}
                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                  icon="aws"
                />
              )}
            </ArchCard>
          </div>
        )}

        {/* Linux */}
        {selectedPlatform === 'linux' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <ArchCard archName="x86_64 (64-bit)" recommended>
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'linux/appImage/x64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  icon="official"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'linux-x64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  icon="todesktop"
                />
              )}
              {hasChannel('aws') && (
                <DownloadButton
                  href={getAwsDownloadUrl(version, 'linux-x64')}
                  label={getTranslation('awsDownload', language)}
                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                  icon="aws"
                />
              )}
            </ArchCard>

            <ArchCard archName="ARM64">
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'linux/appImage/arm64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  icon="official"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'linux-arm64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  icon="todesktop"
                />
              )}
              {hasChannel('aws') && (
                <DownloadButton
                  href={getAwsDownloadUrl(version, 'linux-arm64')}
                  label={getTranslation('awsDownload', language)}
                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                  icon="aws"
                />
              )}
            </ArchCard>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700"></div>
              <span className="text-gray-600 font-medium">Official Download</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-700"></div>
              <span className="text-gray-600 font-medium">ToDesktop Mirror</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-700"></div>
              <span className="text-gray-600 font-medium">AWS CDN</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            💡 Tip: Choose the download source closest to your region for faster speeds.
          </p>
        </div>
      </div>
    </div>
  );
}
