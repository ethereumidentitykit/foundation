'use client'

import React from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import {
  type Address,
  Avatar,
  DEFAULT_FALLBACK_AVATAR,
  fetchAccount,
  isLinkValid,
  ProfileTooltip,
  truncateAddress,
} from 'ethereum-identity-kit'

import { cn } from '#/lib/utilities'
import LoadingCell from '#/components/loaders/loading-cell'

interface UserProps {
  address: Address
  className?: string
  wrapperClassName?: string
  loadingCellHeight?: string
  loadingCellWidth?: string
  avatarSize?: string
  fontSize?: string
  alignTooltip?: 'left' | 'right'
  disableTooltip?: boolean
}

const User: React.FC<UserProps> = ({
  address,
  className,
  wrapperClassName,
  loadingCellHeight = '28px',
  loadingCellWidth = '60%',
  avatarSize = '18px',
  fontSize = '15px',
  alignTooltip = 'right',
  disableTooltip = false,
}) => {
  const { address: connectedAddress } = useAccount()

  const { data: profile, isLoading: profileIsLoading } = useQuery({
    queryKey: ['profile', address],
    queryFn: () => fetchAccount(address),
    enabled: !!address,
  })

  if (profileIsLoading) {
    return <LoadingCell style={{ height: loadingCellHeight, width: loadingCellWidth }} />
  }

  const headerImage = profile?.ens?.records?.header
  const headerImageSrc = headerImage
    ? isLinkValid(headerImage)
      ? headerImage
      : profile?.ens?.name
        ? `https://metadata.ens.domains/mainnet/header/${profile.ens.name}`
        : null
    : null

  const displayName = profile?.ens?.name ?? truncateAddress(address)
  const avatarPx = parseInt(avatarSize, 10)

  return (
    <TooltipWrapper
      address={address}
      connectedAddress={connectedAddress}
      alignTooltip={alignTooltip}
      disableTooltip={disableTooltip}
    >
      <div className={cn('flex justify-end', wrapperClassName)}>
        <a
          href={`https://efp.app/${address}?ssr=false`}
          target='_blank'
          rel='noopener noreferrer'
          className={cn(
            'bg-tertiary relative flex w-fit flex-row items-center gap-1.5 overflow-hidden rounded-sm px-1 py-0.5 transition hover:opacity-70',
            className,
            disableTooltip && 'pointer-events-none'
          )}
        >
          {headerImageSrc && (
            <Image
              src={headerImageSrc}
              alt=''
              width={400}
              height={80}
              unoptimized
              className='absolute top-0 left-0 z-0 h-full w-full object-cover opacity-20'
            />
          )}
          <Avatar
            address={address}
            name={profile?.ens?.name}
            src={profile?.ens?.avatar}
            fallback={DEFAULT_FALLBACK_AVATAR}
            style={{
              width: avatarSize,
              minWidth: avatarSize,
              height: avatarSize,
              minHeight: avatarSize,
              zIndex: 10,
            }}
          />
          <div className='relative w-full' style={{ maxWidth: `calc(100% - ${avatarPx + 6}px)` }}>
            <p className='z-10 truncate font-semibold' style={{ fontSize }}>
              {displayName}
            </p>
          </div>
        </a>
      </div>
    </TooltipWrapper>
  )
}

interface TooltipWrapperProps {
  children: React.ReactElement
  address: Address
  connectedAddress?: Address
  alignTooltip: 'left' | 'right'
  disableTooltip: boolean
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  address,
  connectedAddress,
  alignTooltip,
  disableTooltip,
}) => {
  if (disableTooltip) return children

  return (
    <ProfileTooltip
      addressOrName={address}
      connectedAddress={connectedAddress}
      showStatus={true}
      horizontalOffset={12}
      horizontalPlacement={alignTooltip}
      verticalPlacement='auto'
      boundary='scrollParent'
      keepTooltipOnHover={true}
      showFollowButton={true}
      showDelay={750}
    >
      {children}
    </ProfileTooltip>
  )
}

export default User
