# Cursor Download Center

A modern, beautiful download portal for Cursor editor versions built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

✨ **Key Features:**

- 🎨 Modern, responsive UI with beautiful gradients
- 🔍 Search and filter versions
- 🌍 Multi-language support (English, 简体中文, 日本語, 한국어, Español, Français, Deutsch)
- 💻 Multi-platform support (Windows, macOS, Linux)
- 🏗️ Multiple download channels (Official, Todesk, AWS)
- 📱 Fully responsive design
- ⚡ Built with Next.js 14 for optimal performance
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Package Manager:** npm/yarn/pnpm

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd /Users/shuai/wwwroot/cursor
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
cursor/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── VersionSelector.tsx
│   ├── DownloadSection.tsx
│   └── LanguageSelector.tsx
├── lib/                   # Utility functions
│   ├── i18n.ts           # Internationalization
│   └── versions.ts       # Version data and URL generators
├── types/                 # TypeScript type definitions
│   └── index.ts
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Customization

### Adding New Versions

Edit `lib/versions.ts` and add new version objects to the `versions` array:

```typescript
{
  version: '0.44.0',
  code: '0.44.0',
  date: '2025-02-01',
  downloadChannel: ['official', 'todesktop', 'aws'],
}
```

### Adding New Languages

1. Add the language to `types/index.ts`:
```typescript
export type Language = 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'your-lang';
```

2. Add translations in `lib/i18n.ts`:
```typescript
export const translations: Record<Language, Translations> = {
  // ... existing translations
  'your-lang': {
    loading: 'Translation...',
    // ... other translations
  },
};
```

3. Add language option:
```typescript
export const languages: LanguageOption[] = [
  // ... existing languages
  { code: 'your-lang', name: 'Your Language' },
];
```

### Styling

The project uses Tailwind CSS. You can customize the theme in `tailwind.config.ts`:

- Colors
- Spacing
- Animations
- And more...

## Building for Production

```bash
npm run build
npm start
```

This will create an optimized production build and start the server.

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

You can also deploy to:
- Netlify
- AWS Amplify
- Docker
- Any Node.js hosting service

## Environment Variables

Currently, this project doesn't require environment variables. If you need to add API endpoints or other configuration, create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by [versions.ccursor.org](https://versions.ccursor.org/)
- Built with love for the Cursor community
- Icons by [Lucide](https://lucide.dev/)

## Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ for Cursor users**

