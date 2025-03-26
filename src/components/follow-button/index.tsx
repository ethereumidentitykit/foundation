'use client'

import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import {
  FollowButton as IdentityFollowButton,
  useTransactions,
  type InitialFollowingState,
} from 'ethereum-identity-kit'

interface FollowButtonProps {
  address: Address
  className?: string
  isBlockedBy?: boolean
  disabled?: boolean
  initialState?: InitialFollowingState
}

const FollowButton: React.FC<FollowButtonProps> = ({
  address,
  className = '',
  isBlockedBy,
  initialState,
  ...props
}) => {
  const { openConnectModal } = useConnectModal()
  const { address: connectedAddress } = useAccount()
  const { selectedList } = useTransactions()

  if (address.toLowerCase() === connectedAddress?.toLowerCase()) return <div className='h-[39px] w-[110px]' />

  return (
    <IdentityFollowButton
      lookupAddress={address}
      connectedAddress={connectedAddress}
      onDisconnectedClick={openConnectModal}
      className={className}
      selectedList={selectedList}
      initialState={initialState}
      {...props}
    />
  )
}

export default FollowButton
