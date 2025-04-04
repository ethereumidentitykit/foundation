import React from 'react'
import Link from 'next/link'
import type { Address } from 'viem'
import { usePathname } from 'next/navigation'
import type { StatsResponse } from '#/types/requests'
import LoadingCell from '#/components/loaders/loading-cell'
import { formatNumber } from '#/utils/format/format-number'

interface StatsProps {
  address: Address
  list?: number | null
  stats?: StatsResponse | null
  isLoading?: boolean
}

const Stats = ({ address, list, stats, isLoading }: StatsProps) => {
  const pathname = usePathname()

  const url = pathname === `/${address}` || pathname === `/${list}` ? pathname : `/${list ?? address}`

  return (
    <div className='xs:gap-6 flex gap-4 sm:gap-8'>
      <Link
        href={`https://efp.app/${url}?tab=following`}
        target='_blank'
        className='flex items-center gap-2 transition-all hover:scale-105'
      >
        {isLoading ? (
          <LoadingCell className='h-7 w-14 rounded-sm' />
        ) : (
          <p className='text-xl font-bold 2xl:text-2xl'>{formatNumber(stats?.following_count || 0)}</p>
        )}
        <p className='text-text-neutral text-lg 2xl:text-xl'>Following</p>
      </Link>
      <Link
        href={`https://efp.app/${url}?tab=followers`}
        target='_blank'
        className='flex items-center gap-2 transition-all hover:scale-105'
      >
        {isLoading ? (
          <LoadingCell className='h-7 w-14 rounded-sm' />
        ) : (
          <p className='text-xl font-bold 2xl:text-2xl'>{formatNumber(stats?.followers_count || 0)}</p>
        )}
        <p className='text-text-neutral text-lg 2xl:text-xl'>Followers</p>
      </Link>
    </div>
  )
}

export default Stats
