import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GitGud - Interactive Git Learning Platform',
    short_name: 'GitGud',
    description: 'Learn Git commands and concepts through fun, interactive challenges',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f0f',
    theme_color: '#f1f5f9',
    icons: [
      {
        src: '/gitBranch.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/gitIcon.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
      },
    ],
    categories: ['education', 'developer'],
    lang: 'en',
  }
}
