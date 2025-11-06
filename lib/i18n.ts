import { Language, LanguageOption, Translations } from '@/types';

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '简体中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];

export const translations: Record<Language, Translations> = {
  en: {
    loading: 'Loading...',
    search: 'Search versions...',
    downloadVersion: 'Download Version',
    officialDownload: 'Official Download',
    todeskDownload: 'Todesk Download',
    awsDownload: 'AWS Download',
    awsDownloadUserSetup: 'AWS User Setup',
    awsDownloadSystemSetup: 'AWS System Setup',
  },
  zh: {
    loading: '加载中...',
    search: '搜索版本...',
    downloadVersion: '下载版本',
    officialDownload: '官方下载',
    todeskDownload: 'Todesk 下载',
    awsDownload: 'AWS 下载',
    awsDownloadUserSetup: 'AWS 用户安装',
    awsDownloadSystemSetup: 'AWS 系统安装',
  },
  ja: {
    loading: '読み込み中...',
    search: 'バージョンを検索...',
    downloadVersion: 'バージョンをダウンロード',
    officialDownload: '公式ダウンロード',
    todeskDownload: 'Todeskダウンロード',
    awsDownload: 'AWSダウンロード',
    awsDownloadUserSetup: 'AWSユーザーセットアップ',
    awsDownloadSystemSetup: 'AWSシステムセットアップ',
  },
  ko: {
    loading: '로딩 중...',
    search: '버전 검색...',
    downloadVersion: '버전 다운로드',
    officialDownload: '공식 다운로드',
    todeskDownload: 'Todesk 다운로드',
    awsDownload: 'AWS 다운로드',
    awsDownloadUserSetup: 'AWS 사용자 설치',
    awsDownloadSystemSetup: 'AWS 시스템 설치',
  },
  es: {
    loading: 'Cargando...',
    search: 'Buscar versiones...',
    downloadVersion: 'Descargar Versión',
    officialDownload: 'Descarga Oficial',
    todeskDownload: 'Descarga Todesk',
    awsDownload: 'Descarga AWS',
    awsDownloadUserSetup: 'Configuración de Usuario AWS',
    awsDownloadSystemSetup: 'Configuración del Sistema AWS',
  },
  fr: {
    loading: 'Chargement...',
    search: 'Rechercher des versions...',
    downloadVersion: 'Télécharger la Version',
    officialDownload: 'Téléchargement Officiel',
    todeskDownload: 'Téléchargement Todesk',
    awsDownload: 'Téléchargement AWS',
    awsDownloadUserSetup: 'Configuration Utilisateur AWS',
    awsDownloadSystemSetup: 'Configuration Système AWS',
  },
  de: {
    loading: 'Wird geladen...',
    search: 'Versionen suchen...',
    downloadVersion: 'Version herunterladen',
    officialDownload: 'Offizieller Download',
    todeskDownload: 'Todesk Download',
    awsDownload: 'AWS Download',
    awsDownloadUserSetup: 'AWS Benutzer-Setup',
    awsDownloadSystemSetup: 'AWS System-Setup',
  },
};

export function getTranslation(key: keyof Translations, lang: Language): string {
  return translations[lang][key];
}

