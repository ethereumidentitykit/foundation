'use client'

import type { Address } from 'viem'
import React, { useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'
import { Refresh, useFollowingState } from 'ethereum-identity-kit'
import ThreeDotMenu from '#/components/user-profile-card/components/three-dot-menu'
import { formatNumber } from '#/utils/format/format-number'
import { useAccount } from 'wagmi'

interface MoreOptionsProps {
  address: Address
  profileList?: number | null
  primaryList?: number | null
  profileName?: string | null
  isConnectedUserCard: boolean
  openBlockModal?: () => void
  openQrCodeModal?: () => void
  openListSettingsModal?: () => void
  refetchData?: () => void
}

const MoreOptions: React.FC<MoreOptionsProps> = ({
  address,
  profileList,
  primaryList,
  profileName,
  openBlockModal,
  openQrCodeModal,
  isConnectedUserCard,
  openListSettingsModal,
  refetchData,
}) => {
  const [cardTooltipOpen, setCardTooltipOpen] = useState(false)
  const clickAwayCardTooltip = useClickAway<HTMLDivElement>(() => {
    setCardTooltipOpen(false)
  })

  const { address: userAddress } = useAccount()
  const { state: followingState } = useFollowingState({
    lookupAddressOrName: address,
    connectedAddress: userAddress,
  })

  return (
    <div className='absolute top-4 right-8 flex gap-2 lg:top-6'>
      {profileList && profileList !== Number(primaryList) && (
        <div ref={clickAwayCardTooltip} className='group relative z-50 cursor-help'>
          <p
            onClick={() => setCardTooltipOpen(!cardTooltipOpen)}
            className='bg-nav-item shadow-small rounded-sm px-2 py-1 text-end text-[12px] font-medium text-red-300 italic'
          >
            Not confirmed by user
          </p>
          <div
            className={`${
              cardTooltipOpen ? 'block' : 'hidden'
            } bg-nav-item shadow-small absolute top-9 left-0 w-68 rounded-sm p-2 text-sm transition-all group-hover:block`}
          >
            This list is not confirmed to be owned by the displayed user. A user must set a list as their Primary List
            to confirm it as their list.
          </div>
        </div>
      )}
      {profileList && (
        <p
          className='bg-nav-item shadow-small cursor-pointer rounded-sm px-2 py-[3px] text-sm font-semibold transition-all hover:scale-110 hover:opacity-60 sm:text-sm'
          onClick={() => openListSettingsModal?.()}
        >
          #{formatNumber(profileList)}
        </p>
      )}
      {refetchData && (
        <button
          onClick={refetchData}
          className='bg-nav-item shadow-small rounded-sm p-1 transition-all hover:scale-110 hover:opacity-60'
        >
          <Refresh height={16} width={16} />
        </button>
      )}
      <ThreeDotMenu
        address={address}
        profileList={profileList}
        primaryList={primaryList}
        profileName={profileName}
        isConnectedUserCard={isConnectedUserCard}
        showMoreOptions={true}
        followState={followingState}
        openBlockModal={openBlockModal}
        openQrCodeModal={openQrCodeModal}
        openListSettingsModal={openListSettingsModal}
      />
    </div>
  )
}

export default MoreOptions
