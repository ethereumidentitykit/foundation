import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from '#/components/avatar'
import { truncateAddress } from '#/lib/utilities'
import LoadingCell from '#/components/loaders/loading-cell'
import { fetchCommonFollowers, noCommonFollowers } from 'ethereum-identity-kit'

interface CommonFollowersProps {
  address: Address
}

const CommonFollowers: React.FC<CommonFollowersProps> = ({ address }) => {
  const { address: userAddress } = useAccount()

  const { data, isLoading } = useQuery({
    queryKey: ['common-followers', address, userAddress],
    queryFn: async () => {
      if (!userAddress) return noCommonFollowers

      const response = await fetchCommonFollowers(userAddress, address)
      return response
    },
  })

  if (!userAddress || (data?.results?.length || 0) === 0) return null

  const displayedAvatars = data?.results.slice(0, 3)
  const displayedNames = data?.results.slice(0, 2)
  const resultLength = data?.length || 0

  if (isLoading || data?.results.length === 0) return null

  const commonFollowersText = (count: number) => {
    if (count === 1) return 'follows you'
    if (count === 2) return 'follow you'
    if (count === 3) return 'other follows you'
    return 'others follow you'
  }

  return (
    <div className='flex w-[344px] items-center justify-start gap-2 lg:w-108'>
      <div className='flex'>
        {isLoading ? (
          <>
            <LoadingCell className='z-0 h-9 w-9 rounded-full' />
            <LoadingCell className='z-10 -ml-[18px] h-9 w-9 rounded-full' />
            <LoadingCell className='z-20 -ml-[18px] h-9 w-9 rounded-full' />
          </>
        ) : (
          displayedAvatars?.map((result, index) => (
            <Avatar
              key={result.address}
              size={`w-9 h-9 rounded-full hover:scale-110 cursor-pointer transition-all shadow-sm ${index === 0 ? 'z-0' : `-ml-[18px] z-${index * 10}`}`}
              avatarUrl={result.avatar}
              name={result.name || result.address}
              onClick={() => {
                window.open(`https://efp.app/${result.address}`, '_blank')
              }}
            />
          ))
        )}
      </div>
      {isLoading ? (
        <LoadingCell className='h-10 rounded-sm' style={{ width: 'calc(100% - 80px)' }} />
      ) : (
        <p
          className='text-text-neutral notification-item-text w-full overflow-hidden text-left text-xs font-medium break-keep sm:text-sm'
          style={{ width: 'calc(100% - 80px)' }}
        >
          {displayedNames?.map((profile, index) => (
            <span key={profile.address}>
              <span
                onClick={() => window.open(`https://efp.app/${profile.address}`, '_blank')}
                className='cursor-pointer transition-all hover:underline hover:opacity-80'
              >
                {`${profile.name || truncateAddress(profile.address)}`}
              </span>
              {`${resultLength === 2 ? (index === 0 ? ' and ' : ' ') : resultLength === 1 ? ' ' : ', '}`}
            </span>
          ))}
          {`${resultLength > 2 ? `and ${resultLength - 2}` : ''} ${commonFollowersText(resultLength)}`}{' '}
        </p>
      )}
    </div>
  )
}

export default CommonFollowers
