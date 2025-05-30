interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'production' | 'test'
  /** `git rev-parse HEAD`. Generated in next.config.mjs */
  readonly APP_VERSION: string
  readonly NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string
  readonly NEXT_PUBLIC_BASE_URL: string
  readonly NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string
  readonly NEXT_PUBLIC_LOCAL_RPC: string
  readonly NEXT_PUBLIC_MAINNET_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_BASE_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_SITE_URL: string
  readonly ANALYZE: 'true' | 'false'
  /* automatically added by Vercel */
  readonly VERCEL_URL?: string
  readonly NEXT_PUBLIC_VERCEL_URL?: string
  readonly NEXT_PUBLIC_REPORT_WEB_VITALS: 'true' | 'false'
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
