'use client'

import { WagmiProvider, type State } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TransactionModal, TransactionProvider } from 'ethereum-identity-kit'

import wagmiConfig from '#/lib/wagmi'
import { DAY, MINUTE } from '#/lib/constants'

type ProviderProps = {
  children: React.ReactNode
  initialState?: State
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { gcTime: 1 * DAY, staleTime: 5 * MINUTE },
  },
})

const Providers: React.FC<ProviderProps> = ({ children, initialState }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig} initialState={initialState}>
        <RainbowKitProvider coolMode={false}>
          <TransactionProvider>
            {/* <Navigation /> */}
            {children}
            <TransactionModal />
          </TransactionProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}

export default Providers
