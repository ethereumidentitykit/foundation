'use client'

import React from 'react'
import { useAccount } from 'wagmi'
import { FullWidthProfile } from 'ethereum-identity-kit'
import FollowButton from '../follow-button'

interface UserProfileCardProps {
  address: `0x${string}`
  role?: string
  className?: string
}

const UserProfile: React.FC<UserProfileCardProps> = ({ address, role, className }) => {
  const { address: userAddress } = useAccount()

  return (
    <FullWidthProfile
      addressOrName={address}
      connectedAddress={userAddress}
      onProfileClick={(addressOrName: string) => {
        window.open(`https://efp.app/${addressOrName}?ssr=false`)
      }}
      onStatClick={({ addressOrName, stat }: { addressOrName: string; stat: string }) => {
        window.open(`https://efp.app/${addressOrName}?tab=${stat}`)
      }}
      role={role}
      options={{
        followButton: <FollowButton address={address} />,
      }}
      showPoaps={false}
    />
  )
}

export default UserProfile
