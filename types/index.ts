export type DownloadChannel = 'official' | 'todesktop' | 'aws' | 'awsNightly';

export interface Version {
  version: string;
  buildId: string;
  date: string;
  downloadChannel: string[];
}

export type Language = 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'fr' | 'de';

export interface LanguageOption {
  code: Language;
  name: string;
}

export interface Translations {
  loading: string;
  search: string;
  downloadVersion: string;
  officialDownload: string;
  todeskDownload: string;
  awsDownload: string;
  awsDownloadUserSetup: string;
  awsDownloadSystemSetup: string;
}

export type Platform = 'windows' | 'mac' | 'linux';
export type Architecture = 'x64' | 'arm64' | 'universal';

