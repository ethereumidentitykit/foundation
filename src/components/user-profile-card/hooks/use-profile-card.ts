'use client'

import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'
import { resolveEnsProfile } from '#/utils/ens'
import { useFollowingState } from 'ethereum-identity-kit'

export const useProfileCard = (address: Address) => {
  const { data: fetchedEnsProfile } = useQuery({
    queryKey: ['ens metadata', address],
    queryFn: async () => {
      if (!address) return null
      return await resolveEnsProfile(address)
    },
  })

  const profileName = fetchedEnsProfile?.name
  const profileAvatar = fetchedEnsProfile?.avatar

  const { address: connectedAddress } = useAccount()
  const { state: followState } = useFollowingState({ lookupAddressOrName: address, connectedAddress })

  const isConnectedUserCard = address.toLowerCase() === `/${connectedAddress?.toLowerCase()}`

  const onProfileStatClick = ({ addressOrName, stat }: { addressOrName: string; stat: string }) => {
    window.open(`https://efp.app/${addressOrName}?tab=${stat}`, '_blank')
  }

  return {
    profileName,
    profileAvatar,
    isConnectedUserCard,
    followState,
    onProfileStatClick,
  }
}
