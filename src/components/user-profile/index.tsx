'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { Bio, fetchProfileDetails, fetchProfileStats } from 'ethereum-identity-kit'
import { useIsClient } from '@uidotdev/usehooks'
import { ens_beautify } from '@adraffy/ens-normalize'

import { Avatar } from '../avatar'
import Stats from './components/stats'
import FollowsYou from '../follows-you'
import Loading from './components/loading'
import FollowButton from '../follow-button'
import { isLinkValid } from '#/utils/validity'
import MoreOptions from './components/more-options'
import { cn, truncateAddress } from '#/lib/utilities'
import ImageWithFallback from '../image-with-fallback'
import EnsLogo from 'public/assets/icons/socials/ens.svg'
import Links from '../user-profile-card/components/links'
import Socials from '../user-profile-card/components/socials'
import DefaultHeader from 'public/assets/art/default-header.svg'
import Achievements from '../user-profile-card/components/achievements'
import CommonFollowers from '../user-profile-card/components/common-followers'

interface UserProfileCardProps {
  address: `0x${string}`
  role?: string
  className?: string
}

const UserProfile: React.FC<UserProfileCardProps> = ({ address, role, className }) => {
  const [fetchFreshData, setFetchFreshData] = useState(false)

  const isClient = useIsClient()
  const { address: userAddress } = useAccount()
  const {
    data: profile,
    isLoading,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ['profile', address, fetchFreshData],
    queryFn: () => fetchProfileDetails(address, undefined, fetchFreshData),
  })
  const {
    data: stats,
    isLoading: isStatsLoading,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['stats', address, fetchFreshData],
    queryFn: () => fetchProfileStats(address, undefined, fetchFreshData),
  })

  return isLoading ? (
    <Loading />
  ) : profile?.address ? (
    <div className='relative flex h-fit w-full flex-col items-center'>
      <div
        id='user-profile-content'
        className={cn('relative hidden w-full max-w-[1920px] px-4 pt-18 pb-12 md:block xl:px-8', className)}
      >
        <div className='bg-neutral absolute top-0 left-0 -z-10 h-full w-full rounded-none'>
          <ImageWithFallback
            src={isLinkValid(profile?.ens?.records?.header) ? profile?.ens?.records?.header : DefaultHeader}
            fallback={DefaultHeader}
            alt='Profile Summary Card'
            width={1440}
            height={600}
            className='h-full w-full object-cover opacity-20'
          />
        </div>
        {role && <p className='font-roboto-serif absolute top-6 left-8 text-xl font-medium italic'>{role}</p>}
        <MoreOptions
          address={profile.address}
          isConnectedUserCard={userAddress === profile.address}
          primaryList={Number(profile.primary_list)}
          profileName={profile.ens?.name}
          refetchData={() => {
            if (fetchFreshData) {
              refetchProfile()
              refetchStats()
            } else {
              setFetchFreshData(true)
            }
          }}
        />
        <div className={cn('absolute right-8 bottom-30 flex flex-col items-end gap-3 pb-5', role && 'bottom-6')}>
          {profile.ens?.records?.status && (
            <p className='bg-nav-item shadow-small hidden w-fit max-w-[364px] rounded-sm px-2 py-1 text-center text-sm font-medium italic lg:block'>
              &quot;{profile.ens.records.status}&quot;
            </p>
          )}
          <Achievements profile={profile} isLoading={isLoading} />
        </div>
        <div className='xs:gap-3 flex w-full items-start gap-2 sm:gap-4'>
          <Link href={`https://efp.app/${profile.address}`} target='_blank'>
            <Avatar
              avatarUrl={profile.ens?.avatar}
              name={profile.ens?.name || profile.address}
              size='2xl:h-[125px] h-[100px] 2xl:w-[125px] w-[100px] my-0 hover:scale-105 transition-all'
            />
          </Link>
          <div className='w-summary-details flex flex-col gap-4'>
            <div className='xs:gap-3 flex w-full items-center gap-2 sm:gap-4'>
              <Link
                href={`https://efp.app/${profile.address}`}
                target='_blank'
                className='max-w-summary-name truncate text-4xl leading-12 font-bold transition-all hover:scale-105 2xl:text-[42px] 2xl:leading-14'
              >
                {profile.ens?.name ? ens_beautify(profile.ens?.name) : truncateAddress(profile.address)}
              </Link>
              {userAddress === profile.address ? (
                <Link href={`https://app.ens.domains/${profile.ens.name}`} target='_blank'>
                  <button className='flex items-center gap-1 rounded-sm bg-[#0080BC] p-1.5 py-2 font-semibold text-white transition-all hover:scale-110 hover:bg-[#07A9F5]'>
                    <EnsLogo className='h-auto w-5' />
                    <p>Edit Profile</p>
                  </button>
                </Link>
              ) : (
                <FollowButton address={profile.address} />
              )}
              {userAddress && <FollowsYou connectedAddress={userAddress} addressOrName={profile.address} />}
            </div>
            <div className='flex items-center justify-start gap-8 lg:-mt-1 lg:h-10'>
              <Stats address={profile.address} stats={stats} isLoading={isStatsLoading} />
              <div className='hidden lg:block'>
                <CommonFollowers address={profile.address} />
              </div>
            </div>
            {profile.ens?.records?.status && (
              <p className='bg-nav-item shadow-small w-fit rounded-sm px-2 py-1 text-sm font-medium italic lg:hidden'>
                &quot;{profile.ens.records.status}&quot;
              </p>
            )}
            <div className='max-w-2/3 lg:max-w-1/2 2xl:text-lg'>
              <Bio description={profile.ens?.records?.description} fontSize={18} maxLines={5} />
            </div>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
              <Socials profile={profile} />
              <Links profile={profile} />
            </div>
            <div className='block pt-1 lg:hidden'>
              <CommonFollowers address={profile.address} />
            </div>
          </div>
        </div>
      </div>
      <div
        className='bg-neutral 3xl:block absolute top-0 left-0 -z-10 hidden w-screen rounded-none'
        style={{ height: isClient ? document.getElementById('user-profile-content')?.clientHeight : 420 }}
      >
        <ImageWithFallback
          src={isLinkValid(profile?.ens?.records?.header) ? profile?.ens?.records?.header : DefaultHeader}
          fallback={DefaultHeader}
          alt='Profile Summary Card'
          width={1440}
          height={600}
          className='h-full w-full object-cover opacity-20'
        />
      </div>
    </div>
  ) : null
}

export default UserProfile
