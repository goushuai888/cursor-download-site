'use client';

import { Version, Language } from '@/types';
import { getTranslation } from '@/lib/i18n';
import {
  getOfficialDownloadUrl,
  getTodeskDownloadUrl,
  getAwsDownloadUrl,
} from '@/lib/versions';
import { Download, Monitor, Apple, HardDrive, ChevronRight } from 'lucide-react';

interface DownloadSectionProps {
  version: Version;
  language: Language;
}

interface DownloadButtonProps {
  href: string;
  label: string;
  className: string;
}

function DownloadButton({ href, label, className }: DownloadButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Download className="w-4 h-4" />
      <span>{label}</span>
    </a>
  );
}

interface ArchCardProps {
  archName: string;
  children: React.ReactNode;
}

function ArchCard({ archName, children }: ArchCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 hover:border-primary-300 transition-all duration-200">
      <div className="flex items-center gap-2 mb-4">
        <ChevronRight className="w-5 h-5 text-primary-500" />
        <h4 className="text-base font-bold text-gray-800">{archName}</h4>
      </div>
      <div className="flex flex-col gap-2.5">
        {children}
      </div>
    </div>
  );
}

export default function DownloadSection({ version, language }: DownloadSectionProps) {
  const hasChannel = (channel: string) => version.downloadChannel.includes(channel);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {getTranslation('downloadVersion', language)} <span className="text-primary-600">{version.version}</span>
        </h2>
        <p className="text-sm text-gray-500">发布日期: {version.date}</p>
      </div>

      <div className="space-y-10">
        {/* Windows Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-blue-100 rounded-lg">
              <Monitor className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Windows</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* x64 */}
            <ArchCard archName="x64 (64位)">
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'windows/nsis/x64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-blue-600 hover:bg-blue-700"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'win32-x64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-purple-600 hover:bg-purple-700"
                />
              )}
              {hasChannel('aws') && (
                <>
                  <DownloadButton
                    href={getAwsDownloadUrl(version, 'win32-x64-user-setup')}
                    label={getTranslation('awsDownloadUserSetup', language)}
                    className="bg-orange-600 hover:bg-orange-700"
                  />
                  <DownloadButton
                    href={getAwsDownloadUrl(version, 'win32-x64-system-setup')}
                    label={getTranslation('awsDownloadSystemSetup', language)}
                    className="bg-orange-700 hover:bg-orange-800"
                  />
                </>
              )}
            </ArchCard>

            {/* ARM64 */}
            <ArchCard archName="ARM64">
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'windows/nsis/arm64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-blue-600 hover:bg-blue-700"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'win32-arm64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-purple-600 hover:bg-purple-700"
                />
              )}
              {hasChannel('aws') && (
                <>
                  <DownloadButton
                    href={getAwsDownloadUrl(version, 'win32-arm64-user-setup')}
                    label={getTranslation('awsDownloadUserSetup', language)}
                    className="bg-orange-600 hover:bg-orange-700"
                  />
                  <DownloadButton
                    href={getAwsDownloadUrl(version, 'win32-arm64-system-setup')}
                    label={getTranslation('awsDownloadSystemSetup', language)}
                    className="bg-orange-700 hover:bg-orange-800"
                  />
                </>
              )}
            </ArchCard>
          </div>
        </section>

        {/* macOS Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-gray-100 rounded-lg">
              <Apple className="w-7 h-7 text-gray-800" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">macOS</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Universal */}
            <ArchCard archName="Universal (通用)">
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'mac/installer/universal')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-blue-600 hover:bg-blue-700"
                />
              )}
              {hasChannel('aws') && (
                <DownloadButton
                  href={getAwsDownloadUrl(version, 'darwin-universal')}
                  label={getTranslation('awsDownload', language)}
                  className="bg-orange-600 hover:bg-orange-700"
                />
              )}
            </ArchCard>

            {/* Apple Silicon */}
            <ArchCard archName="Apple Silicon (M系列)">
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'mac/installer/arm64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-blue-600 hover:bg-blue-700"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'darwin-arm64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-purple-600 hover:bg-purple-700"
                />
              )}
              {hasChannel('aws') && (
                <DownloadButton
                  href={getAwsDownloadUrl(version, 'darwin-arm64')}
                  label={getTranslation('awsDownload', language)}
                  className="bg-orange-600 hover:bg-orange-700"
                />
              )}
            </ArchCard>

            {/* Intel */}
            <ArchCard archName="Intel">
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'mac/installer/x64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-blue-600 hover:bg-blue-700"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'darwin-x64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-purple-600 hover:bg-purple-700"
                />
              )}
              {hasChannel('aws') && (
                <DownloadButton
                  href={getAwsDownloadUrl(version, 'darwin-x64')}
                  label={getTranslation('awsDownload', language)}
                  className="bg-orange-600 hover:bg-orange-700"
                />
              )}
            </ArchCard>
          </div>
        </section>

        {/* Linux Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-yellow-100 rounded-lg">
              <HardDrive className="w-7 h-7 text-yellow-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Linux</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* x86_64 */}
            <ArchCard archName="x86_64 (64位)">
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'linux/appImage/x64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-blue-600 hover:bg-blue-700"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'linux-x64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-purple-600 hover:bg-purple-700"
                />
              )}
              {hasChannel('aws') && (
                <DownloadButton
                  href={getAwsDownloadUrl(version, 'linux-x64')}
                  label={getTranslation('awsDownload', language)}
                  className="bg-orange-600 hover:bg-orange-700"
                />
              )}
            </ArchCard>

            {/* ARM64 */}
            <ArchCard archName="ARM64">
              {hasChannel('official') && (
                <DownloadButton
                  href={getOfficialDownloadUrl(version, 'linux/appImage/arm64')}
                  label={getTranslation('officialDownload', language)}
                  className="bg-blue-600 hover:bg-blue-700"
                />
              )}
              {hasChannel('todesktop') && (
                <DownloadButton
                  href={getTodeskDownloadUrl(version, 'linux-arm64')}
                  label={getTranslation('todeskDownload', language)}
                  className="bg-purple-600 hover:bg-purple-700"
                />
              )}
              {hasChannel('aws') && (
                <DownloadButton
                  href={getAwsDownloadUrl(version, 'linux-arm64')}
                  label={getTranslation('awsDownload', language)}
                  className="bg-orange-600 hover:bg-orange-700"
                />
              )}
            </ArchCard>
          </div>
        </section>
      </div>

      {/* Info Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>官方下载</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-600 rounded"></div>
            <span>ToDesk 下载</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-600 rounded"></div>
            <span>AWS 下载</span>
          </div>
        </div>
      </div>
    </div>
  );
}
