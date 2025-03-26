import GithubIcon from 'public/assets/icons/socials/github.svg'
import DiscordIcon from 'public/assets/icons/socials/discord.svg'
import TwitterIcon from 'public/assets/icons/socials/twitter.svg'
import TelegramIcon from 'public/assets/icons/socials/telegram.svg'
import EtherscanIcon from 'public/assets/icons/socials/etherscan.svg'

export const APP_NAME = 'Ethereum Identity Foundation'
export const APP_NAME_SHORT = 'EIF'
export const APP_DESCRIPTION = "We're bringing identity onchain with the Ethereum identity stack."
export const APP_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:6969'

export const DEFAULT_AVATAR_URL = '/assets/art/default-avatar.svg'

export const SECOND = 1_000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR

export const profileCardSocials = [
  {
    name: 'etherscan',
    url: (address: string) => `https://etherscan.io/address/${address}`,
    icon: EtherscanIcon,
  },
  {
    name: 'com.twitter',
    url: (username: string) => `https://twitter.com/${username}`,
    icon: TwitterIcon,
  },
  {
    name: 'com.github',
    url: (username: string) => `https://github.com/${username}`,
    icon: GithubIcon,
  },
  {
    name: 'org.telegram',
    url: (username: string) => `https://t.me/${username}`,
    icon: TelegramIcon,
  },
  {
    name: 'com.discord',
    url: (username: string) => `https://discord.com/users/${username}`,
    icon: DiscordIcon,
  },
] as const
