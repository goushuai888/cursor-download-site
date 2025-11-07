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
    // Loading & Search
    loading: 'Loading...',
    search: 'Search versions...',
    loadingVersions: 'Loading version data...',
    
    // Hero Section
    heroTag: 'AI-First Code Editor',
    heroTitle: 'Cursor',
    heroSubtitle: 'The world\'s most advanced AI-powered code editor.\nWrite code faster with intelligent autocomplete and chat.',
    downloadFor: 'Download for',
    versionLabel: 'Version',
    releasedOn: 'Released',
    
    // Stats
    versionsCount: 'Versions',
    platformsCount: 'Platforms',
    possibilities: 'Possibilities',
    
    // Features
    featuresSectionTitle: 'Why Choose Cursor?',
    featureFastTitle: 'Lightning Fast',
    featureFastDesc: 'AI-powered autocomplete that predicts your next move. Write code at the speed of thought.',
    featureAiTitle: 'AI Chat Built-in',
    featureAiDesc: 'Chat with AI directly in your editor. Get instant answers and code suggestions.',
    featurePrivacyTitle: 'Privacy First',
    featurePrivacyDesc: 'Your code stays private. Choose your own AI model and keep your data secure.',
    
    // Version Selector
    versionsTitle: 'Versions',
    availableVersions: 'available versions',
    foundVersions: 'Found',
    noVersionsFound: 'No versions found',
    tryDifferentSearch: 'Try a different search term',
    latestBadge: 'Latest',
    
    // Download Section
    downloadVersion: 'Version',
    chooseVersionTitle: 'Choose Your Version',
    chooseVersionSubtitle: 'Select any version and download for your platform',
    selectVersion: 'Select a version to download',
    downloadSources: 'Download Sources',
    
    // Download Buttons
    officialDownload: 'Official Download',
    todeskDownload: 'ToDesk Download',
    awsDownload: 'AWS Download',
    awsDownloadUserSetup: 'AWS User Setup',
    awsDownloadSystemSetup: 'AWS System Setup',
    
    // Platforms
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    
    // Architecture
    recommended: 'Recommended',
    universal: 'Universal',
    appleSilicon: 'Apple Silicon (M Series)',
    intel: 'Intel',
    
    // Download Info
    downloadSourceLegend: 'Download Sources',
    officialSource: 'Official Download',
    todeskMirror: 'ToDesktop Mirror',
    awsCdn: 'AWS CDN',
    downloadTip: '💡 Tip: Choose the download source closest to your region for faster speeds.',
    
    // Footer
    footerMadeWith: 'Made with ❤️ for Cursor users',
    footerForUsers: 'Cursor Download Center',
    officialWebsite: 'Official Website',
    documentation: 'Documentation',
    changelog: 'Changelog',
  },
  zh: {
    // Loading & Search
    loading: '加载中...',
    search: '搜索版本...',
    loadingVersions: '正在加载版本数据...',
    
    // Hero Section
    heroTag: 'AI 驱动的代码编辑器',
    heroTitle: 'Cursor',
    heroSubtitle: '全球最先进的 AI 代码编辑器\n通过智能自动补全和对话功能，更快速地编写代码',
    downloadFor: '下载',
    versionLabel: '版本',
    releasedOn: '发布于',
    
    // Stats
    versionsCount: '个版本',
    platformsCount: '个平台',
    possibilities: '无限可能',
    
    // Features
    featuresSectionTitle: '为什么选择 Cursor？',
    featureFastTitle: '闪电般快速',
    featureFastDesc: 'AI 驱动的自动补全预测您的下一步操作，以思维的速度编写代码。',
    featureAiTitle: '内置 AI 对话',
    featureAiDesc: '直接在编辑器中与 AI 对话，获取即时答案和代码建议。',
    featurePrivacyTitle: '隐私优先',
    featurePrivacyDesc: '您的代码保持私密。选择自己的 AI 模型，确保数据安全。',
    
    // Version Selector
    versionsTitle: '版本列表',
    availableVersions: '个可用版本',
    foundVersions: '找到',
    noVersionsFound: '未找到版本',
    tryDifferentSearch: '尝试其他搜索词',
    latestBadge: '最新',
    
    // Download Section
    downloadVersion: '版本',
    chooseVersionTitle: '选择您的版本',
    chooseVersionSubtitle: '选择任意版本并为您的平台下载',
    selectVersion: '选择一个版本进行下载',
    downloadSources: '个下载源',
    
    // Download Buttons
    officialDownload: '官方下载',
    todeskDownload: 'ToDesk 下载',
    awsDownload: 'AWS 下载',
    awsDownloadUserSetup: 'AWS 用户安装',
    awsDownloadSystemSetup: 'AWS 系统安装',
    
    // Platforms
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    
    // Architecture
    recommended: '推荐',
    universal: '通用版',
    appleSilicon: 'Apple Silicon (M 系列)',
    intel: 'Intel',
    
    // Download Info
    downloadSourceLegend: '下载源',
    officialSource: '官方下载',
    todeskMirror: 'ToDesktop 镜像',
    awsCdn: 'AWS CDN',
    downloadTip: '💡 提示：选择离您最近的下载源以获得更快的下载速度。',
    
    // Footer
    footerMadeWith: '用 ❤️ 为 Cursor 用户打造',
    footerForUsers: 'Cursor 下载中心',
    officialWebsite: '官方网站',
    documentation: '文档',
    changelog: '更新日志',
  },
  ja: {
    // Loading & Search
    loading: '読み込み中...',
    search: 'バージョンを検索...',
    loadingVersions: 'バージョンデータを読み込んでいます...',
    
    // Hero Section
    heroTag: 'AI ファーストのコードエディタ',
    heroTitle: 'Cursor',
    heroSubtitle: '世界最先端の AI パワードコードエディタ\nインテリジェントなオートコンプリートとチャットでコードを高速に書く',
    downloadFor: 'ダウンロード',
    versionLabel: 'バージョン',
    releasedOn: 'リリース日',
    
    // Stats
    versionsCount: 'バージョン',
    platformsCount: 'プラットフォーム',
    possibilities: '無限の可能性',
    
    // Features
    featuresSectionTitle: 'なぜ Cursor を選ぶのか？',
    featureFastTitle: '超高速',
    featureFastDesc: 'AI パワードのオートコンプリートが次の動作を予測。思考の速度でコードを書く。',
    featureAiTitle: 'AI チャット内蔵',
    featureAiDesc: 'エディタ内で AI と直接チャット。即座に回答とコード提案を取得。',
    featurePrivacyTitle: 'プライバシー優先',
    featurePrivacyDesc: 'コードは非公開のまま。独自の AI モデルを選択してデータを安全に保つ。',
    
    // Version Selector
    versionsTitle: 'バージョン',
    availableVersions: '利用可能なバージョン',
    foundVersions: '見つかりました',
    noVersionsFound: 'バージョンが見つかりません',
    tryDifferentSearch: '別の検索語を試してください',
    latestBadge: '最新',
    
    // Download Section
    downloadVersion: 'バージョン',
    chooseVersionTitle: 'バージョンを選択',
    chooseVersionSubtitle: 'お好きなバージョンを選択してプラットフォーム用にダウンロード',
    selectVersion: 'ダウンロードするバージョンを選択',
    downloadSources: 'ダウンロードソース',
    
    // Download Buttons
    officialDownload: '公式ダウンロード',
    todeskDownload: 'ToDesk ダウンロード',
    awsDownload: 'AWS ダウンロード',
    awsDownloadUserSetup: 'AWS ユーザーセットアップ',
    awsDownloadSystemSetup: 'AWS システムセットアップ',
    
    // Platforms
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    
    // Architecture
    recommended: '推奨',
    universal: 'ユニバーサル',
    appleSilicon: 'Apple Silicon (M シリーズ)',
    intel: 'Intel',
    
    // Download Info
    downloadSourceLegend: 'ダウンロードソース',
    officialSource: '公式ダウンロード',
    todeskMirror: 'ToDesktop ミラー',
    awsCdn: 'AWS CDN',
    downloadTip: '💡 ヒント：最速ダウンロードのため、お近くのダウンロードソースを選択してください。',
    
    // Footer
    footerMadeWith: 'Cursor ユーザーのために ❤️ で作成',
    footerForUsers: 'Cursor ダウンロードセンター',
    officialWebsite: '公式ウェブサイト',
    documentation: 'ドキュメント',
    changelog: '変更履歴',
  },
  ko: {
    // Loading & Search
    loading: '로딩 중...',
    search: '버전 검색...',
    loadingVersions: '버전 데이터를 불러오는 중...',
    
    // Hero Section
    heroTag: 'AI 우선 코드 에디터',
    heroTitle: 'Cursor',
    heroSubtitle: '세계에서 가장 진보된 AI 기반 코드 에디터\n지능형 자동완성과 채팅으로 더 빠르게 코드 작성',
    downloadFor: '다운로드',
    versionLabel: '버전',
    releasedOn: '출시일',
    
    // Stats
    versionsCount: '버전',
    platformsCount: '플랫폼',
    possibilities: '무한한 가능성',
    
    // Features
    featuresSectionTitle: '왜 Cursor를 선택해야 할까요?',
    featureFastTitle: '초고속',
    featureFastDesc: 'AI 기반 자동완성이 다음 동작을 예측합니다. 생각의 속도로 코드를 작성하세요.',
    featureAiTitle: '내장 AI 채팅',
    featureAiDesc: '에디터에서 바로 AI와 채팅하세요. 즉시 답변과 코드 제안을 받아보세요.',
    featurePrivacyTitle: '프라이버시 우선',
    featurePrivacyDesc: '코드는 비공개로 유지됩니다. 자체 AI 모델을 선택하고 데이터를 안전하게 보호하세요.',
    
    // Version Selector
    versionsTitle: '버전',
    availableVersions: '사용 가능한 버전',
    foundVersions: '찾음',
    noVersionsFound: '버전을 찾을 수 없음',
    tryDifferentSearch: '다른 검색어를 시도해보세요',
    latestBadge: '최신',
    
    // Download Section
    downloadVersion: '버전',
    chooseVersionTitle: '버전 선택',
    chooseVersionSubtitle: '원하는 버전을 선택하고 플랫폼용으로 다운로드',
    selectVersion: '다운로드할 버전 선택',
    downloadSources: '다운로드 소스',
    
    // Download Buttons
    officialDownload: '공식 다운로드',
    todeskDownload: 'ToDesk 다운로드',
    awsDownload: 'AWS 다운로드',
    awsDownloadUserSetup: 'AWS 사용자 설치',
    awsDownloadSystemSetup: 'AWS 시스템 설치',
    
    // Platforms
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    
    // Architecture
    recommended: '추천',
    universal: '범용',
    appleSilicon: 'Apple Silicon (M 시리즈)',
    intel: 'Intel',
    
    // Download Info
    downloadSourceLegend: '다운로드 소스',
    officialSource: '공식 다운로드',
    todeskMirror: 'ToDesktop 미러',
    awsCdn: 'AWS CDN',
    downloadTip: '💡 팁: 더 빠른 속도를 위해 가까운 다운로드 소스를 선택하세요.',
    
    // Footer
    footerMadeWith: 'Cursor 사용자를 위해 ❤️ 로 제작',
    footerForUsers: 'Cursor 다운로드 센터',
    officialWebsite: '공식 웹사이트',
    documentation: '문서',
    changelog: '변경 로그',
  },
  es: {
    // Loading & Search
    loading: 'Cargando...',
    search: 'Buscar versiones...',
    loadingVersions: 'Cargando datos de versión...',
    
    // Hero Section
    heroTag: 'Editor de código AI-First',
    heroTitle: 'Cursor',
    heroSubtitle: 'El editor de código con IA más avanzado del mundo\nEscribe código más rápido con autocompletado inteligente y chat',
    downloadFor: 'Descargar para',
    versionLabel: 'Versión',
    releasedOn: 'Lanzado',
    
    // Stats
    versionsCount: 'Versiones',
    platformsCount: 'Plataformas',
    possibilities: 'Posibilidades',
    
    // Features
    featuresSectionTitle: '¿Por qué elegir Cursor?',
    featureFastTitle: 'Ultrarrápido',
    featureFastDesc: 'Autocompletado con IA que predice tu próximo movimiento. Escribe código a la velocidad del pensamiento.',
    featureAiTitle: 'Chat IA integrado',
    featureAiDesc: 'Chatea con IA directamente en tu editor. Obtén respuestas instantáneas y sugerencias de código.',
    featurePrivacyTitle: 'Privacidad primero',
    featurePrivacyDesc: 'Tu código permanece privado. Elige tu propio modelo de IA y mantén tus datos seguros.',
    
    // Version Selector
    versionsTitle: 'Versiones',
    availableVersions: 'versiones disponibles',
    foundVersions: 'Encontrado',
    noVersionsFound: 'No se encontraron versiones',
    tryDifferentSearch: 'Prueba con un término de búsqueda diferente',
    latestBadge: 'Última',
    
    // Download Section
    downloadVersion: 'Versión',
    chooseVersionTitle: 'Elige tu versión',
    chooseVersionSubtitle: 'Selecciona cualquier versión y descarga para tu plataforma',
    selectVersion: 'Selecciona una versión para descargar',
    downloadSources: 'Fuentes de descarga',
    
    // Download Buttons
    officialDownload: 'Descarga Oficial',
    todeskDownload: 'Descarga ToDesk',
    awsDownload: 'Descarga AWS',
    awsDownloadUserSetup: 'Configuración de Usuario AWS',
    awsDownloadSystemSetup: 'Configuración del Sistema AWS',
    
    // Platforms
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    
    // Architecture
    recommended: 'Recomendado',
    universal: 'Universal',
    appleSilicon: 'Apple Silicon (Serie M)',
    intel: 'Intel',
    
    // Download Info
    downloadSourceLegend: 'Fuentes de descarga',
    officialSource: 'Descarga Oficial',
    todeskMirror: 'Espejo ToDesktop',
    awsCdn: 'AWS CDN',
    downloadTip: '💡 Consejo: Elige la fuente de descarga más cercana a tu región para mayor velocidad.',
    
    // Footer
    footerMadeWith: 'Hecho con ❤️ para usuarios de Cursor',
    footerForUsers: 'Centro de Descargas de Cursor',
    officialWebsite: 'Sitio Web Oficial',
    documentation: 'Documentación',
    changelog: 'Registro de cambios',
  },
  fr: {
    // Loading & Search
    loading: 'Chargement...',
    search: 'Rechercher des versions...',
    loadingVersions: 'Chargement des données de version...',
    
    // Hero Section
    heroTag: 'Éditeur de code AI-First',
    heroTitle: 'Cursor',
    heroSubtitle: 'L\'éditeur de code IA le plus avancé au monde\nÉcrivez du code plus rapidement avec l\'autocomplétion intelligente et le chat',
    downloadFor: 'Télécharger pour',
    versionLabel: 'Version',
    releasedOn: 'Publié',
    
    // Stats
    versionsCount: 'Versions',
    platformsCount: 'Plateformes',
    possibilities: 'Possibilités',
    
    // Features
    featuresSectionTitle: 'Pourquoi choisir Cursor ?',
    featureFastTitle: 'Ultra Rapide',
    featureFastDesc: 'Autocomplétion IA qui prédit votre prochain mouvement. Écrivez du code à la vitesse de la pensée.',
    featureAiTitle: 'Chat IA intégré',
    featureAiDesc: 'Discutez avec l\'IA directement dans votre éditeur. Obtenez des réponses instantanées et des suggestions de code.',
    featurePrivacyTitle: 'Confidentialité d\'abord',
    featurePrivacyDesc: 'Votre code reste privé. Choisissez votre propre modèle d\'IA et gardez vos données en sécurité.',
    
    // Version Selector
    versionsTitle: 'Versions',
    availableVersions: 'versions disponibles',
    foundVersions: 'Trouvé',
    noVersionsFound: 'Aucune version trouvée',
    tryDifferentSearch: 'Essayez un autre terme de recherche',
    latestBadge: 'Dernière',
    
    // Download Section
    downloadVersion: 'Version',
    chooseVersionTitle: 'Choisissez votre version',
    chooseVersionSubtitle: 'Sélectionnez n\'importe quelle version et téléchargez pour votre plateforme',
    selectVersion: 'Sélectionnez une version à télécharger',
    downloadSources: 'Sources de téléchargement',
    
    // Download Buttons
    officialDownload: 'Téléchargement Officiel',
    todeskDownload: 'Téléchargement ToDesk',
    awsDownload: 'Téléchargement AWS',
    awsDownloadUserSetup: 'Configuration Utilisateur AWS',
    awsDownloadSystemSetup: 'Configuration Système AWS',
    
    // Platforms
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    
    // Architecture
    recommended: 'Recommandé',
    universal: 'Universel',
    appleSilicon: 'Apple Silicon (Série M)',
    intel: 'Intel',
    
    // Download Info
    downloadSourceLegend: 'Sources de téléchargement',
    officialSource: 'Téléchargement Officiel',
    todeskMirror: 'Miroir ToDesktop',
    awsCdn: 'AWS CDN',
    downloadTip: '💡 Astuce : Choisissez la source de téléchargement la plus proche de votre région pour une vitesse optimale.',
    
    // Footer
    footerMadeWith: 'Fait avec ❤️ pour les utilisateurs de Cursor',
    footerForUsers: 'Centre de Téléchargement Cursor',
    officialWebsite: 'Site Web Officiel',
    documentation: 'Documentation',
    changelog: 'Journal des modifications',
  },
  de: {
    // Loading & Search
    loading: 'Wird geladen...',
    search: 'Versionen suchen...',
    loadingVersions: 'Versionsdaten werden geladen...',
    
    // Hero Section
    heroTag: 'AI-First Code-Editor',
    heroTitle: 'Cursor',
    heroSubtitle: 'Der fortschrittlichste KI-gestützte Code-Editor der Welt\nSchreiben Sie Code schneller mit intelligenter Autovervollständigung und Chat',
    downloadFor: 'Herunterladen für',
    versionLabel: 'Version',
    releasedOn: 'Veröffentlicht',
    
    // Stats
    versionsCount: 'Versionen',
    platformsCount: 'Plattformen',
    possibilities: 'Möglichkeiten',
    
    // Features
    featuresSectionTitle: 'Warum Cursor wählen?',
    featureFastTitle: 'Blitzschnell',
    featureFastDesc: 'KI-gestützte Autovervollständigung, die Ihren nächsten Zug vorhersagt. Code mit Gedankengeschwindigkeit schreiben.',
    featureAiTitle: 'Integrierter KI-Chat',
    featureAiDesc: 'Chatten Sie direkt in Ihrem Editor mit KI. Erhalten Sie sofortige Antworten und Code-Vorschläge.',
    featurePrivacyTitle: 'Datenschutz zuerst',
    featurePrivacyDesc: 'Ihr Code bleibt privat. Wählen Sie Ihr eigenes KI-Modell und halten Sie Ihre Daten sicher.',
    
    // Version Selector
    versionsTitle: 'Versionen',
    availableVersions: 'verfügbare Versionen',
    foundVersions: 'Gefunden',
    noVersionsFound: 'Keine Versionen gefunden',
    tryDifferentSearch: 'Versuchen Sie einen anderen Suchbegriff',
    latestBadge: 'Neueste',
    
    // Download Section
    downloadVersion: 'Version',
    chooseVersionTitle: 'Wählen Sie Ihre Version',
    chooseVersionSubtitle: 'Wählen Sie eine beliebige Version und laden Sie sie für Ihre Plattform herunter',
    selectVersion: 'Wählen Sie eine Version zum Herunterladen',
    downloadSources: 'Download-Quellen',
    
    // Download Buttons
    officialDownload: 'Offizieller Download',
    todeskDownload: 'ToDesk Download',
    awsDownload: 'AWS Download',
    awsDownloadUserSetup: 'AWS Benutzer-Setup',
    awsDownloadSystemSetup: 'AWS System-Setup',
    
    // Platforms
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    
    // Architecture
    recommended: 'Empfohlen',
    universal: 'Universal',
    appleSilicon: 'Apple Silicon (M-Serie)',
    intel: 'Intel',
    
    // Download Info
    downloadSourceLegend: 'Download-Quellen',
    officialSource: 'Offizieller Download',
    todeskMirror: 'ToDesktop-Spiegel',
    awsCdn: 'AWS CDN',
    downloadTip: '💡 Tipp: Wählen Sie die Download-Quelle in Ihrer Nähe für schnellere Geschwindigkeiten.',
    
    // Footer
    footerMadeWith: 'Mit ❤️ für Cursor-Benutzer gemacht',
    footerForUsers: 'Cursor Download-Center',
    officialWebsite: 'Offizielle Website',
    documentation: 'Dokumentation',
    changelog: 'Änderungsprotokoll',
  },
};

export function getTranslation(key: keyof Translations, lang: Language): string {
  return translations[lang][key];
}
