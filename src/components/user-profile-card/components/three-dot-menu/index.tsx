import type { Address } from 'viem'
import React, { useState } from 'react'

import { cn } from '#/lib/utilities'
import CopyValue from './components/copy-value'
import type { FollowState } from '#/types/common'
import { useClickAway } from '@uidotdev/usehooks'

interface ThreeDotMenuProps {
  address: Address
  profileList?: number | null
  primaryList?: number | null
  profileName?: string | null
  isConnectedUserCard: boolean
  showMoreOptions: boolean
  followState: FollowState
  openBlockModal?: () => void
  openQrCodeModal?: () => void
  openListSettingsModal?: () => void
}

const ThreeDotMenu: React.FC<ThreeDotMenuProps> = ({
  address,
  profileList,
  primaryList,
  profileName,
  showMoreOptions,
}) => {
  const [threeDotMenuOpen, setThreeDotMenuOpen] = useState(false)
  const threeDotMenuRef = useClickAway<HTMLDivElement>(() => {
    setThreeDotMenuOpen(false)
  })

  return (
    <div className={showMoreOptions ? 'block' : 'hidden'} ref={threeDotMenuRef}>
      <div
        className='bg-nav-item shadow-small flex cursor-pointer items-center gap-[3px] rounded-sm px-[5px] py-[11px] transition-all hover:scale-110'
        onClick={() => setThreeDotMenuOpen(!threeDotMenuOpen)}
      >
        <div className='bg-text h-1 w-1 rounded-full'></div>
        <div className='bg-text h-1 w-1 rounded-full'></div>
        <div className='bg-text h-1 w-1 rounded-full'></div>
      </div>
      <div
        className={cn(
          threeDotMenuOpen && showMoreOptions ? 'flex' : 'hidden',
          'bg-neutral shadow-medium absolute top-9 right-0 z-50 w-fit flex-col items-center gap-2 rounded-sm'
        )}
      >
        <CopyValue value={address} text='Copy Address' />
        <CopyValue
          value={`https://efp.app/${
            profileList ? (profileList === Number(primaryList) ? address : profileList) : address
          }`}
          text='Copy Profile Link'
        />
        {profileName && <CopyValue value={profileName} text='Copy ENS Name' />}
      </div>
    </div>
  )
}

export default ThreeDotMenu
