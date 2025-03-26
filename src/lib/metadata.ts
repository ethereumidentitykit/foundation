import type { Metadata } from 'next'

export const metadataBaseUrl = new URL('https://ethid.org')

export const metadataTitle = 'Ethereum Identity Foundation'
export const metadataSiteName = 'Ethereum Identity Foundation'
export const metadataDescription = "We're bringing identity onchain with the Ethereum identity stack."

export const sharedMetadataIcons: Metadata['icons'] = [
  {
    rel: 'icon',
    url: 'https://ethid.org/assets/favicon.ico',
  },
]

export const sharedMetadataOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  title: metadataTitle,
  description: metadataDescription,
  locale: 'en_US',
  siteName: metadataSiteName,
  url: 'https://ethid.org',
  emails: ['contact@ethid.org'],
}

export const sharedMetadataTwitter: Metadata['twitter'] = {
  card: 'summary_large_image',
  site: '@efp',
  creator: '@efp',
  description: metadataDescription,
}

export const sharedMetadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  applicationName: metadataSiteName,
  keywords: [
    'efp',
    'ethereum identity foundation',
    'ethereum identity stack',
    'identity',
    'protocol',
    'social graph',
    'ethereum',
    'ethereum identity',
    'ethereum identity kit',
    'ethereum follow protocol',
  ],
  icons: sharedMetadataIcons,
  openGraph: sharedMetadataOpenGraph,
  authors: {
    name: 'Ethereum Identity Foundation',
    url: 'https://ethid.org',
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    notranslate: false,
  },
  metadataBase: metadataBaseUrl,
}
