'use client'

import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { ProfileCard } from 'ethereum-identity-kit'

import { cn } from '#/lib/utilities'
import FollowButton from '#/components/follow-button'
import ThreeDotMenu from './components/three-dot-menu'
import { useProfileCard } from './hooks/use-profile-card'

interface UserProfileCardProps {
  address: Address
  profileList?: number | null
  showMoreOptions?: boolean
  className?: string
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ address, profileList, showMoreOptions, className }) => {
  const { address: connectedAddress } = useAccount()
  const { followState, profileName, isConnectedUserCard, onProfileStatClick } = useProfileCard(address)

  return (
    <div className={cn('bg-neutral flex w-[364px] flex-col gap-4 rounded-sm pb-3', className)}>
      <ProfileCard
        list={profileList}
        onStatClick={onProfileStatClick}
        showFollowerState={true}
        addressOrName={address}
        connectedAddress={connectedAddress}
        onProfileClick={() => {
          window.open(`https://efp.app/${address}`, '_blank')
        }}
        className='bg-neutral'
        options={{
          nameMenu: (
            <ThreeDotMenu
              address={address}
              profileList={profileList}
              profileName={profileName}
              showMoreOptions={!!showMoreOptions}
              isConnectedUserCard={isConnectedUserCard}
              followState={followState}
            />
          ),
          followButton: <FollowButton address={address} />,
        }}
        style={{
          width: '100%',
          zIndex: 10,
        }}
      />
    </div>
  )
}

export default UserProfileCard
