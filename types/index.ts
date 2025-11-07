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
  // Loading & Search
  loading: string;
  search: string;
  loadingVersions: string;
  
  // Hero Section
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  downloadFor: string;
  versionLabel: string;
  releasedOn: string;
  
  // Stats
  versionsCount: string;
  platformsCount: string;
  possibilities: string;
  
  // Features
  featuresSectionTitle: string;
  featureFastTitle: string;
  featureFastDesc: string;
  featureAiTitle: string;
  featureAiDesc: string;
  featurePrivacyTitle: string;
  featurePrivacyDesc: string;
  
  // Version Selector
  versionsTitle: string;
  availableVersions: string;
  foundVersions: string;
  noVersionsFound: string;
  tryDifferentSearch: string;
  latestBadge: string;
  
  // Download Section
  downloadVersion: string;
  chooseVersionTitle: string;
  chooseVersionSubtitle: string;
  selectVersion: string;
  downloadSources: string;
  
  // Download Buttons
  officialDownload: string;
  todeskDownload: string;
  awsDownload: string;
  awsDownloadUserSetup: string;
  awsDownloadSystemSetup: string;
  
  // Platforms
  windows: string;
  macos: string;
  linux: string;
  
  // Architecture
  recommended: string;
  universal: string;
  appleSilicon: string;
  intel: string;
  
  // Download Info
  downloadSourceLegend: string;
  officialSource: string;
  todeskMirror: string;
  awsCdn: string;
  downloadTip: string;
  
  // Footer
  footerMadeWith: string;
  footerForUsers: string;
  officialWebsite: string;
  documentation: string;
  changelog: string;
}

export type Platform = 'windows' | 'mac' | 'linux';
export type Architecture = 'x64' | 'arm64' | 'universal';

