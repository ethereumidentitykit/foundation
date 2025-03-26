import { cn } from '#/lib/utilities'
import { useFollowerState } from 'ethereum-identity-kit'
import React from 'react'
import type { Address } from 'viem'

interface FollowsYouProps {
  addressOrName: Address | string
  connectedAddress: Address
  list?: number
}

const FollowsYou: React.FC<FollowsYouProps> = ({ addressOrName, connectedAddress, list }) => {
  const { followerTag } = useFollowerState({ addressOrName: addressOrName, connectedAddress, list })

  return (
    <div
      className={cn(
        'bg-tertiary text-text! w-fit rounded-sm px-2 py-[3px] text-xs font-semibold',
        followerTag.className
      )}
    >
      {followerTag.text}
    </div>
  )
}

export default FollowsYou
